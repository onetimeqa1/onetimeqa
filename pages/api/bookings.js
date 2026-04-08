// POST /api/bookings
import { supabase } from "../../lib/supabase";
import { sendBookingEmail } from "../../lib/email";

const MAX_BOOKINGS = { photobooth: 2, instax: 1 };

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const {
    serviceType, packageId, packageName,
    eventDate, eventTime, fullName, phone, eventLocation,
    extraHours, extraPhotos,
    addCard, cardQtys, totalCards,
  } = req.body;

  // Validate required fields
  if (!serviceType || !packageId || !eventDate || !eventTime || !fullName || !phone || !eventLocation) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  if (!["photobooth", "instax"].includes(serviceType)) {
    return res.status(400).json({ error: "Invalid service type." });
  }

  if (addCard && totalCards > 200) {
    return res.status(400).json({ error: "Card quantity cannot exceed 200." });
  }

  // Check availability
  const { data: existing, error: countErr } = await supabase
    .from("bookings")
    .select("id")
    .eq("service_type", serviceType)
    .eq("event_date", eventDate)
    .in("status", ["pending", "confirmed"]);

  if (countErr) return res.status(500).json({ error: "Failed to check availability." });

  const maxPerDay = MAX_BOOKINGS[serviceType] || 1;
  if ((existing || []).length >= maxPerDay) {
    return res.status(409).json({ error: "This date is fully booked. Please choose another date." });
  }

  // Insert booking
  const { data: booking, error: insertErr } = await supabase
    .from("bookings")
    .insert([{
      service_type: serviceType,
      package_id: packageId,
      package_name: packageName,
      event_date: eventDate,
      event_time: eventTime,
      full_name: fullName,
      phone,
      event_location: eventLocation,
      extra_hours: extraHours || 0,
      extra_photos: extraPhotos || 0,
      add_custom_card: addCard || false,
      card_qty_tall: (cardQtys && cardQtys.tall) || 0,
      card_qty_big: (cardQtys && cardQtys.big) || 0,
      total_cards: totalCards || 0,
      status: "pending",
    }])
    .select()
    .single();

  if (insertErr) return res.status(500).json({ error: "Failed to save booking." });

  // Send email (don't fail if email fails)
  try {
    await sendBookingEmail({
      bookingId: booking.id,
      serviceType, packageName, eventDate, eventTime,
      fullName, phone, eventLocation,
      extraHours: extraHours || 0,
      extraPhotos: extraPhotos || 0,
      addCard: addCard || false,
      cardQtys: cardQtys || { tall: 0, big: 0 },
      totalCards: totalCards || 0,
    });
  } catch (emailErr) {
    console.error("Email failed:", emailErr);
  }

  return res.status(200).json({ success: true, bookingId: booking.id });
}
