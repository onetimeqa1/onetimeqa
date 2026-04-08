// GET /api/availability?service=photobooth&year=2025&month=8
import { supabase } from "../../lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const { service, year, month } = req.query;
  if (!service || !year || !month) return res.status(400).json({ error: "Missing params" });

  const startDate = `${year}-${String(month).padStart(2, "0")}-01`;
  const lastDay = new Date(Number(year), Number(month), 0).getDate();
  const endDate = `${year}-${String(month).padStart(2, "0")}-${lastDay}`;

  const { data, error } = await supabase
    .from("bookings")
    .select("event_date")
    .eq("service_type", service)
    .gte("event_date", startDate)
    .lte("event_date", endDate)
    .in("status", ["pending", "confirmed"]);

  if (error) return res.status(500).json({ error: "Failed to fetch availability" });

  const availability = {};
  (data || []).forEach(({ event_date }) => {
    availability[event_date] = (availability[event_date] || 0) + 1;
  });

  return res.status(200).json({ availability });
}
