import { useState, useEffect } from "react";
import Head from "next/head";

// ── Translations ───────────────────────────────────────────────────────────────
const T = {
  en: {
    dir: "ltr",
    bodyFont: "'Jost', sans-serif",
    navWa: "WhatsApp",
    footerSub: "Luxury photobooth & Instax - Qatar",
    footerWa: "WhatsApp: 60094003",
    steps: ["Service", "Package", "Add-ons", "Date", "Details"],
    backToServices: "Back to services",
    backToPackages: "Back to packages",
    backToAddons: "Back to add-ons",
    backToCalendar: "Back to calendar",
    heroTag: "Qatar - Luxury Events",
    heroSub: "Luxury photobooth and Instax camera rental for events in Qatar.",
    heroCta: "Book Your Experience",
    svcTag: "Our Services",
    svcTitle: "Choose Your Experience",
    svcSub: "Two elegant offerings for your event.",
    whyTag: "The OneTime Experience",
    whyTitle: "Every detail, considered.",
    whyItems: [
      { t: "Female Attendant", d: "Professional, dedicated staff at every event." },
      { t: "Custom Designs", d: "Templates crafted to match your event theme." },
      { t: "Qatar-Based", d: "Local expertise, seamless setup and removal." },
    ],
    ctaTitle: "Ready to create memories?",
    ctaSub: "Browse packages and book your date in minutes.",
    ctaBtn: "Get Started",
    step1Tag: "Step 1",
    step1Title: "Select a Service",
    step1Sub: "Choose the experience you would like to book.",
    from: "From",
    step2Tag: function(n) { return "Step 2 - " + n; },
    step2Title: "Choose Your Package",
    step2Sub: "All packages include a female attendant.",
    mostPop: "Most Popular",
    continueAddons: "Continue to Add-ons",
    step3Tag: "Step 3 - Add-ons",
    step3Title: "Customize Your Booking",
    step3Sub: "All add-ons are optional.",
    extraHours: "Additional Hours",
    extraHoursSub: "300 QAR / hour",
    extraPhotos: "Additional Photos",
    extraPhotosSub: "150 QAR / 10 photos",
    customCard: "Custom Card Design",
    customCardSub: "Optional printed cards for your guests.",
    cardLayout: "Card Layout",
    cardQtyLabel: "Quantity (1-200)",
    cardQtyNote: "Maximum 200 cards per booking.",
    layout1Name: "Layout 1 - Tall",
    layout1Desc: "3 photos in a tall format",
    layout2Name: "Layout 2 - Big",
    layout2Desc: "1 photo in a larger format",
    perCard: "QAR / card",
    continueCalendar: "Continue to Calendar",
    errCardLayout: "Please select a card layout.",
    errCardQty: "Quantity must be between 1 and 200.",
    step4Tag: function(n) { return "Step 4 - " + n; },
    step4Title: "Select Date & Time",
    step4Sub2: "Up to 2 bookings per date.",
    step4Sub1: "1 booking per date.",
    months: ["January","February","March","April","May","June","July","August","September","October","November","December"],
    days: ["Su","Mo","Tu","We","Th","Fr","Sa"],
    available: "Available",
    oneSlot: "1 slot left",
    unavailable: "Unavailable",
    slots: function(n) { return n >= 2 ? (n + " slots") : n === 1 ? "1 slot" : "full"; },
    eventTime: "Event Time",
    selDate: "Selected Date",
    time: "Time",
    submit: "Submit Booking",
    errTime: "Please select an event time.",
    step5Tag: "Step 5 - Your Details",
    step5Title: "Tell Us About Your Event",
    step5Sub: "Almost done - just a few details.",
    labelName: "Full Name *",
    labelPhone: "Phone Number *",
    labelLocation: "Event Location *",
    phName: "Fatima Al-Khalid",
    phPhone: "+974 5XXX XXXX",
    phLocation: "Pearl Ballroom, Doha",
    errName: "Full name is required.",
    errPhone: "Phone number is required.",
    errLocation: "Event location is required.",
    continueConfirm: "Submit Booking Request",
    noPayNote: "No payment required. We will contact you to confirm and arrange the deposit.",
    service: "Service",
    package: "Package",
    total: "Total",
    selected: "Selected",
    price: "Price",
    qar: "QAR",
    confirmTag: "Booking Received",
    confirmTitle: "Thank You",
    confirmWa: "Contact on WhatsApp: 60094003",
    confirmBack: "Return to Home",
    confirmText: [
      "Your request has been received. We will contact you to confirm the booking and arrange the deposit.",
      "Please contact us on WhatsApp at 60094003 to send the event theme as soon as possible.",
      "Installation and removal procedures:\n\nThe male and female staff will arrive one full hour before the event to install and prepare the equipment.\n\nWhen the booked time ends, the female attendant will shut down the device. If removal is possible immediately after the event, the equipment will be collected directly. Otherwise, pickup will be arranged later at the earliest suitable time.",
    ],
    scrollHint: "Scroll",
  },
  ar: {
    dir: "rtl",
    bodyFont: "'Tajawal', sans-serif",
    navWa: "\u0648\u0627\u062a\u0633\u0627\u0628",
    footerSub: "\u062a\u0623\u062c\u064a\u0631 \u0641\u0648\u062a\u0648\u0628\u0648\u062b \u0648\u0643\u0627\u0645\u064a\u0631\u0627 \u0625\u0646\u0633\u062a\u0627\u0643\u0633 \u0641\u0627\u062e\u0631\u0629 \u00b7 \u0642\u0637\u0631",
    footerWa: "\u0648\u0627\u062a\u0633\u0627\u0628: 60094003",
    steps: ["\u0627\u0644\u062e\u062f\u0645\u0629", "\u0627\u0644\u0628\u0627\u0642\u0629", "\u0627\u0644\u0625\u0636\u0627\u0641\u0627\u062a", "\u0627\u0644\u062a\u0627\u0631\u064a\u062e", "\u0627\u0644\u062a\u0641\u0627\u0635\u064a\u0644"],
    backToServices: "\u0631\u062c\u0648\u0639 \u0644\u0644\u062e\u062f\u0645\u0627\u062a",
    backToPackages: "\u0631\u062c\u0648\u0639 \u0644\u0644\u0628\u0627\u0642\u0627\u062a",
    backToAddons: "\u0631\u062c\u0648\u0639 \u0644\u0644\u0625\u0636\u0627\u0641\u0627\u062a",
    backToCalendar: "\u0631\u062c\u0648\u0639 \u0644\u0644\u062a\u0642\u0648\u064a\u0645",
    heroTag: "\u0642\u0637\u0631 \u00b7 \u0641\u0639\u0627\u0644\u064a\u0627\u062a \u0641\u0627\u062e\u0631\u0629",
    heroSub: "\u062a\u0623\u062c\u064a\u0631 \u0641\u0648\u062a\u0648\u0628\u0648\u062b \u0648\u0643\u0627\u0645\u064a\u0631\u0627 \u0625\u0646\u0633\u062a\u0627\u0643\u0633 \u0627\u0644\u0641\u0627\u062e\u0631\u0629 \u0644\u0644\u0641\u0639\u0627\u0644\u064a\u0627\u062a \u0641\u064a \u0642\u0637\u0631.",
    heroCta: "\u0627\u062d\u062c\u0632\u064a \u062a\u062c\u0631\u0628\u062a\u0643",
    svcTag: "\u062e\u062f\u0645\u0627\u062a\u0646\u0627",
    svcTitle: "\u0627\u062e\u062a\u0627\u0631\u064a \u062a\u062c\u0631\u0628\u062a\u0643",
    svcSub: "\u062e\u064a\u0627\u0631\u062a\u0627\u0646 \u0623\u0646\u064a\u0642\u062a\u0627\u0646 \u0644\u0641\u0639\u0627\u0644\u064a\u062a\u0643.",
    whyTag: "\u062a\u062c\u0631\u0628\u0629 OneTime",
    whyTitle: "\u0643\u0644 \u0627\u0644\u062a\u0641\u0627\u0635\u064a\u0644\u060c \u0628\u0639\u0646\u0627\u064a\u0629.",
    whyItems: [
      { t: "\u0645\u0631\u0627\u0641\u0642\u0629 \u0623\u0646\u062b\u0649", d: "\u0637\u0627\u0642\u0645 \u0645\u062d\u062a\u0631\u0641 \u0648\u0645\u062e\u0635\u0635 \u0641\u064a \u0643\u0644 \u0641\u0639\u0627\u0644\u064a\u0629." },
      { t: "\u062a\u0635\u0627\u0645\u064a\u0645 \u0645\u062e\u0635\u0635\u0629", d: "\u0642\u0648\u0627\u0644\u0628 \u0645\u0635\u0645\u0645\u0629 \u0644\u062a\u062a\u0646\u0627\u0633\u0628 \u0645\u0639 \u062b\u064a\u0645 \u0641\u0639\u0627\u0644\u064a\u062a\u0643." },
      { t: "\u0642\u0637\u0631 \u0645\u062d\u0644\u064a\u0627\u064b", d: "\u062e\u0628\u0631\u0629 \u0645\u062d\u0644\u064a\u0629\u060c \u062a\u0631\u0643\u064a\u0628 \u0648\u0641\u0643 \u0633\u0644\u0633." },
    ],
    ctaTitle: "\u0645\u0633\u062a\u0639\u062f\u0629 \u0644\u0635\u0646\u0639 \u0630\u0643\u0631\u064a\u0627\u062a\u061f",
    ctaSub: "\u062a\u0635\u0641\u062d\u064a \u0627\u0644\u0628\u0627\u0642\u0627\u062a \u0648\u0627\u062d\u062c\u0632\u064a \u0645\u0648\u0639\u062f\u0643 \u0641\u064a \u062f\u0642\u0627\u0626\u0642.",
    ctaBtn: "\u0627\u0628\u062f\u0626\u064a \u0627\u0644\u0622\u0646",
    step1Tag: "\u0627\u0644\u062e\u0637\u0648\u0629 1",
    step1Title: "\u0627\u062e\u062a\u0627\u0631\u064a \u0627\u0644\u062e\u062f\u0645\u0629",
    step1Sub: "\u0627\u062e\u062a\u0627\u0631\u064a \u0627\u0644\u062a\u062c\u0631\u0628\u0629 \u0627\u0644\u062a\u064a \u062a\u0648\u062f\u064a\u0646 \u062d\u062c\u0632\u0647\u0627.",
    from: "\u064a\u0628\u062f\u0623 \u0645\u0646",
    step2Tag: function(n) { return "\u0627\u0644\u062e\u0637\u0648\u0629 2 - " + n; },
    step2Title: "\u0627\u062e\u062a\u0627\u0631\u064a \u0627\u0644\u0628\u0627\u0642\u0629",
    step2Sub: "\u062c\u0645\u064a\u0639 \u0627\u0644\u0628\u0627\u0642\u0627\u062a \u062a\u0634\u0645\u0644 \u0645\u0631\u0627\u0641\u0642\u0629 \u0623\u0646\u062b\u0649.",
    mostPop: "\u0627\u0644\u0623\u0643\u062b\u0631 \u0637\u0644\u0628\u0627\u064b",
    continueAddons: "\u0645\u062a\u0627\u0628\u0639\u0629 \u0644\u0644\u0625\u0636\u0627\u0641\u0627\u062a",
    step3Tag: "\u0627\u0644\u062e\u0637\u0648\u0629 3 - \u0627\u0644\u0625\u0636\u0627\u0641\u0627\u062a",
    step3Title: "\u062e\u0635\u0635\u064a \u062d\u062c\u0632\u0643",
    step3Sub: "\u062c\u0645\u064a\u0639 \u0627\u0644\u0625\u0636\u0627\u0641\u0627\u062a \u0627\u062e\u062a\u064a\u0627\u0631\u064a\u0629.",
    extraHours: "\u0633\u0627\u0639\u0627\u062a \u0625\u0636\u0627\u0641\u064a\u0629",
    extraHoursSub: "300 \u0631\u064a\u0627\u0644 / \u0633\u0627\u0639\u0629",
    extraPhotos: "\u0635\u0648\u0631 \u0625\u0636\u0627\u0641\u064a\u0629",
    extraPhotosSub: "150 \u0631\u064a\u0627\u0644 / 10 \u0635\u0648\u0631",
    customCard: "\u062a\u0635\u0645\u064a\u0645 \u0643\u0627\u0631\u062a \u0645\u062e\u0635\u0635",
    customCardSub: "\u0643\u0631\u0648\u062a \u0645\u0637\u0628\u0648\u0639\u0629 \u0627\u062e\u062a\u064a\u0627\u0631\u064a\u0629 \u0644\u0636\u064a\u0648\u0641\u0643.",
    cardLayout: "\u062a\u0635\u0645\u064a\u0645 \u0627\u0644\u0643\u0627\u0631\u062a",
    cardQtyLabel: "\u0627\u0644\u0643\u0645\u064a\u0629 (1-200)",
    cardQtyNote: "\u0627\u0644\u062d\u062f \u0627\u0644\u0623\u0642\u0635\u0649 200 \u0643\u0627\u0631\u062a \u0644\u0643\u0644 \u062d\u062c\u0632.",
    layout1Name: "\u0627\u0644\u062a\u0635\u0645\u064a\u0645 1 - \u0637\u0648\u0644\u064a",
    layout1Desc: "3 \u0635\u0648\u0631 \u0628\u062a\u0635\u0645\u064a\u0645 \u0637\u0648\u0644\u064a",
    layout2Name: "\u0627\u0644\u062a\u0635\u0645\u064a\u0645 2 - \u0643\u0628\u064a\u0631",
    layout2Desc: "\u0635\u0648\u0631\u0629 \u0648\u0627\u062d\u062f\u0629 \u0628\u062d\u062c\u0645 \u0623\u0643\u0628\u0631",
    perCard: "\u0631\u064a\u0627\u0644 / \u0643\u0627\u0631\u062a",
    continueCalendar: "\u0645\u062a\u0627\u0628\u0639\u0629 \u0644\u0644\u062a\u0642\u0648\u064a\u0645",
    errCardLayout: "\u064a\u0631\u062c\u0649 \u0627\u062e\u062a\u064a\u0627\u0631 \u062a\u0635\u0645\u064a\u0645 \u0627\u0644\u0643\u0627\u0631\u062a.",
    errCardQty: "\u0627\u0644\u0643\u0645\u064a\u0629 \u064a\u062c\u0628 \u0623\u0646 \u062a\u0643\u0648\u0646 \u0628\u064a\u0646 1 \u0648 200.",
    step4Tag: function(n) { return "\u0627\u0644\u062e\u0637\u0648\u0629 4 - " + n; },
    step4Title: "\u0627\u062e\u062a\u0627\u0631\u064a \u0627\u0644\u062a\u0627\u0631\u064a\u062e \u0648\u0627\u0644\u0648\u0642\u062a",
    step4Sub2: "\u064a\u062a\u0648\u0641\u0631 \u062d\u062c\u0632\u0627\u0646 \u0643\u062d\u062f \u0623\u0642\u0635\u0649 \u0641\u064a \u0627\u0644\u064a\u0648\u0645.",
    step4Sub1: "\u064a\u062a\u0648\u0641\u0631 \u062d\u062c\u0632 \u0648\u0627\u062d\u062f \u0641\u064a \u0627\u0644\u064a\u0648\u0645.",
    months: ["\u064a\u0646\u0627\u064a\u0631","\u0641\u0628\u0631\u0627\u064a\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064a\u0644","\u0645\u0627\u064a\u0648","\u064a\u0648\u0646\u064a\u0648","\u064a\u0648\u0644\u064a\u0648","\u0623\u063a\u0633\u0637\u0633","\u0633\u0628\u062a\u0645\u0628\u0631","\u0623\u0643\u062a\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062f\u064a\u0633\u0645\u0628\u0631"],
    days: ["\u0623\u062d","\u0625\u062b","\u062b","\u0623\u0631","\u062e","\u062c","\u0633"],
    available: "\u0645\u062a\u0627\u062d",
    oneSlot: "\u0645\u0648\u0639\u062f \u0648\u0627\u062d\u062f",
    unavailable: "\u0645\u062d\u062c\u0648\u0632",
    slots: function(n) { return n >= 2 ? (n + " \u0645\u0648\u0627\u0639\u064a\u062f") : n === 1 ? "\u0645\u0648\u0639\u062f \u0648\u0627\u062d\u062f" : "\u0645\u062d\u062c\u0648\u0632"; },
    eventTime: "\u0648\u0642\u062a \u0627\u0644\u0641\u0639\u0627\u0644\u064a\u0629",
    selDate: "\u0627\u0644\u062a\u0627\u0631\u064a\u062e \u0627\u0644\u0645\u062e\u062a\u0627\u0631",
    time: "\u0627\u0644\u0648\u0642\u062a",
    submit: "\u062a\u0623\u0643\u064a\u062f \u0627\u0644\u062d\u062c\u0632",
    errTime: "\u064a\u0631\u062c\u0649 \u062a\u062d\u062f\u064a\u062f \u0648\u0642\u062a \u0627\u0644\u0641\u0639\u0627\u0644\u064a\u0629.",
    step5Tag: "\u0627\u0644\u062e\u0637\u0648\u0629 5 - \u062a\u0641\u0627\u0635\u064a\u0644\u0643",
    step5Title: "\u0623\u062e\u0628\u0631\u064a\u0646\u0627 \u0639\u0646 \u0641\u0639\u0627\u0644\u064a\u062a\u0643",
    step5Sub: "\u062e\u0637\u0648\u0629 \u0623\u062e\u064a\u0631\u0629 - \u0628\u0639\u0636 \u0627\u0644\u062a\u0641\u0627\u0635\u064a\u0644 \u0641\u0642\u0637.",
    labelName: "\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644 *",
    labelPhone: "\u0631\u0642\u0645 \u0627\u0644\u062c\u0648\u0627\u0644 *",
    labelLocation: "\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0639\u0627\u0644\u064a\u0629 *",
    phName: "\u0641\u0627\u0637\u0645\u0629 \u0627\u0644\u062e\u0627\u0644\u062f",
    phPhone: "+974 5XXX XXXX",
    phLocation: "\u0642\u0627\u0639\u0629 \u0628\u064a\u0631\u0644\u060c \u0627\u0644\u062f\u0648\u062d\u0629",
    errName: "\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644 \u0645\u0637\u0644\u0648\u0628.",
    errPhone: "\u0631\u0642\u0645 \u0627\u0644\u062c\u0648\u0627\u0644 \u0645\u0637\u0644\u0648\u0628.",
    errLocation: "\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0639\u0627\u0644\u064a\u0629 \u0645\u0637\u0644\u0648\u0628.",
    continueConfirm: "\u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u062d\u062c\u0632",
    noPayNote: "\u0644\u0627 \u064a\u0644\u0632\u0645 \u0627\u0644\u062f\u0641\u0639 \u0627\u0644\u0622\u0646. \u0633\u0646\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0643 \u0644\u062a\u0623\u0643\u064a\u062f \u0627\u0644\u062d\u062c\u0632 \u0648\u062a\u0631\u062a\u064a\u0628 \u0627\u0644\u0639\u0631\u0628\u0648\u0646.",
    service: "\u0627\u0644\u062e\u062f\u0645\u0629",
    package: "\u0627\u0644\u0628\u0627\u0642\u0629",
    total: "\u0627\u0644\u0625\u062c\u0645\u0627\u0644\u064a",
    selected: "\u0627\u0644\u0645\u062e\u062a\u0627\u0631",
    price: "\u0627\u0644\u0633\u0639\u0631",
    qar: "\u0631\u064a\u0627\u0644",
    confirmTag: "\u062a\u0645 \u0627\u0633\u062a\u0644\u0627\u0645 \u0627\u0644\u062d\u062c\u0632",
    confirmTitle: "\u0634\u0643\u0631\u0627\u064b \u0644\u0643",
    confirmWa: "\u062a\u0648\u0627\u0635\u0644\u064a \u0639\u0628\u0631 \u0648\u0627\u062a\u0633\u0627\u0628: 60094003",
    confirmBack: "\u0627\u0644\u0639\u0648\u062f\u0629 \u0644\u0644\u0631\u0626\u064a\u0633\u064a\u0629",
    confirmText: [
      "\u062a\u0645 \u0627\u0633\u062a\u0644\u0627\u0645 \u0637\u0644\u0628\u0643. \u0633\u0646\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0643 \u0644\u062a\u0623\u0643\u064a\u062f \u0627\u0644\u062d\u062c\u0632 \u0648\u062a\u0631\u062a\u064a\u0628 \u0627\u0644\u0639\u0631\u0628\u0648\u0646.",
      "\u064a\u0631\u062c\u0649 \u0627\u0644\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627 \u0639\u0644\u0649 \u0648\u0627\u062a\u0633\u0627\u0628 \u0639\u0644\u0649 \u0627\u0644\u0631\u0642\u0645 60094003 \u0644\u0625\u0631\u0633\u0627\u0644 \u062b\u064a\u0645 \u0627\u0644\u0641\u0639\u0627\u0644\u064a\u0629 \u0641\u064a \u0623\u0642\u0631\u0628 \u0648\u0642\u062a.",
      "\u0625\u062c\u0631\u0627\u0621\u0627\u062a \u0627\u0644\u062a\u0631\u0643\u064a\u0628 \u0648\u0627\u0644\u0641\u0643:\n\n\u0633\u064a\u0635\u0644 \u0627\u0644\u0637\u0627\u0642\u0645 \u0627\u0644\u0630\u0643\u0648\u0631\u064a \u0648\u0627\u0644\u0623\u0646\u062b\u0648\u064a \u0642\u0628\u0644 \u0633\u0627\u0639\u0629 \u0643\u0627\u0645\u0644\u0629 \u0645\u0646 \u0627\u0644\u0641\u0639\u0627\u0644\u064a\u0629 \u0644\u0644\u062a\u0631\u0643\u064a\u0628 \u0648\u0627\u0644\u062a\u062c\u0647\u064a\u0632.\n\n\u0639\u0646\u062f \u0627\u0646\u062a\u0647\u0627\u0621 \u0627\u0644\u0648\u0642\u062a \u0627\u0644\u0645\u062d\u062c\u0648\u0632\u060c \u0633\u062a\u0642\u0648\u0645 \u0627\u0644\u0645\u0631\u0627\u0641\u0642\u0629 \u0628\u0625\u064a\u0642\u0627\u0641 \u062a\u0634\u063a\u064a\u0644 \u0627\u0644\u062c\u0647\u0627\u0632. \u0648\u0625\u0646 \u0623\u0645\u0643\u0646 \u0641\u0643 \u0627\u0644\u062a\u0631\u0643\u064a\u0628 \u0641\u0648\u0631 \u0627\u0646\u062a\u0647\u0627\u0621 \u0627\u0644\u0641\u0639\u0627\u0644\u064a\u0629 \u064a\u062a\u0645 \u0627\u0633\u062a\u0644\u0627\u0645 \u0627\u0644\u0623\u062c\u0647\u0632\u0629 \u0645\u0628\u0627\u0634\u0631\u0629\u060c \u0648\u0625\u0644\u0627 \u0633\u064a\u064f\u0631\u062a\u0628 \u0627\u0644\u0627\u0633\u062a\u0644\u0627\u0645 \u0644\u0627\u062d\u0642\u0627\u064b \u0641\u064a \u0623\u0642\u0631\u0628 \u0648\u0642\u062a \u0645\u0646\u0627\u0633\u0628.",
    ],
    scrollHint: "\u0645\u0631\u0631",
  },
};

// ── Service Data ───────────────────────────────────────────────────────────────
const SERVICES = {
  photobooth: {
    id: "photobooth",
    emoji: "\uD83D\uDCF8",
    name: { en: "Photobooth", ar: "\u0641\u0648\u062a\u0648\u0628\u0648\u062b" },
    description: {
      en: "Unlimited photos, custom designs, and a dedicated female attendant for your event.",
      ar: "\u0635\u0648\u0631 \u063a\u064a\u0631 \u0645\u062d\u062f\u0648\u062f\u0629\u060c \u062a\u0635\u0627\u0645\u064a\u0645 \u0645\u062e\u0635\u0635\u0629\u060c \u0648\u0645\u0631\u0627\u0641\u0642\u0629 \u0623\u0646\u062b\u0649 \u0645\u062e\u0635\u0635\u0629 \u0644\u0641\u0639\u0627\u0644\u064a\u062a\u0643.",
    },
    maxBookingsPerDay: 2,
    packages: [
      {
        id: "pb-1",
        name: { en: "Package 1", ar: "\u0627\u0644\u0628\u0627\u0642\u0629 1" },
        price: 1500,
        features: {
          en: ["2 Hours", "Unlimited Photos", "Female Attendant", "Custom Design (Photo Only)"],
          ar: ["\u0633\u0627\u0639\u062a\u0627\u0646", "\u0635\u0648\u0631 \u063a\u064a\u0631 \u0645\u062d\u062f\u0648\u062f\u0629", "\u0645\u0631\u0627\u0641\u0642\u0629 \u0623\u0646\u062b\u0649", "\u062a\u0635\u0645\u064a\u0645 \u0645\u062e\u0635\u0635 (\u0635\u0648\u0631\u0629 \u0641\u0642\u0637)"],
        },
      },
      {
        id: "pb-2",
        name: { en: "Package 2", ar: "\u0627\u0644\u0628\u0627\u0642\u0629 2" },
        price: 1750,
        popular: true,
        features: {
          en: ["3 Hours", "Unlimited Photos", "Female Attendant", "Custom Design (Photo Only)"],
          ar: ["3 \u0633\u0627\u0639\u0627\u062a", "\u0635\u0648\u0631 \u063a\u064a\u0631 \u0645\u062d\u062f\u0648\u062f\u0629", "\u0645\u0631\u0627\u0641\u0642\u0629 \u0623\u0646\u062b\u0649", "\u062a\u0635\u0645\u064a\u0645 \u0645\u062e\u0635\u0635 (\u0635\u0648\u0631\u0629 \u0641\u0642\u0637)"],
        },
      },
      {
        id: "pb-3",
        name: { en: "Package 3", ar: "\u0627\u0644\u0628\u0627\u0642\u0629 3" },
        price: 2000,
        features: {
          en: ["4 Hours", "Unlimited Photos", "Female Attendant", "Custom Design (Photo Only)"],
          ar: ["4 \u0633\u0627\u0639\u0627\u062a", "\u0635\u0648\u0631 \u063a\u064a\u0631 \u0645\u062d\u062f\u0648\u062f\u0629", "\u0645\u0631\u0627\u0641\u0642\u0629 \u0623\u0646\u062b\u0649", "\u062a\u0635\u0645\u064a\u0645 \u0645\u062e\u0635\u0635 (\u0635\u0648\u0631\u0629 \u0641\u0642\u0637)"],
        },
      },
    ],
    cardLayouts: [
      { id: "tall", pricePerCard: 3 },
      { id: "big", pricePerCard: 5 },
    ],
  },
  instax: {
    id: "instax",
    emoji: "\uD83C\uDF9E\uFE0F",
    name: { en: "Instax Camera", ar: "\u0643\u0627\u0645\u064a\u0631\u0627 \u0625\u0646\u0633\u062a\u0627\u0643\u0633" },
    description: {
      en: "Instant film prints your guests keep forever, with customized cards and a female attendant.",
      ar: "\u0635\u0648\u0631 \u0641\u0648\u0631\u064a\u0629 \u064a\u062d\u062a\u0641\u0638 \u0628\u0647\u0627 \u0636\u064a\u0648\u0641\u0643 \u0644\u0644\u0623\u0628\u062f\u060c \u0645\u0639 \u0643\u0631\u0648\u062a \u0645\u062e\u0635\u0635\u0629 \u0648\u0645\u0631\u0627\u0641\u0642\u0629 \u0623\u0646\u062b\u0649.",
    },
    maxBookingsPerDay: 1,
    packages: [
      {
        id: "ix-1",
        name: { en: "Package 1", ar: "\u0627\u0644\u0628\u0627\u0642\u0629 1" },
        price: 1300,
        features: {
          en: ["30 Photos", "Female Attendant", "Customized Cards"],
          ar: ["30 \u0635\u0648\u0631\u0629", "\u0645\u0631\u0627\u0641\u0642\u0629 \u0623\u0646\u062b\u0649", "\u0643\u0631\u0648\u062a \u0645\u062e\u0635\u0635\u0629"],
        },
      },
      {
        id: "ix-2",
        name: { en: "Package 2", ar: "\u0627\u0644\u0628\u0627\u0642\u0629 2" },
        price: 1500,
        popular: true,
        features: {
          en: ["50 Photos", "Female Attendant", "Customized Cards"],
          ar: ["50 \u0635\u0648\u0631\u0629", "\u0645\u0631\u0627\u0641\u0642\u0629 \u0623\u0646\u062b\u0649", "\u0643\u0631\u0648\u062a \u0645\u062e\u0635\u0635\u0629"],
        },
      },
      {
        id: "ix-3",
        name: { en: "Package 3", ar: "\u0627\u0644\u0628\u0627\u0642\u0629 3" },
        price: 1700,
        features: {
          en: ["70 Photos", "Female Attendant", "Customized Cards"],
          ar: ["70 \u0635\u0648\u0631\u0629", "\u0645\u0631\u0627\u0641\u0642\u0629 \u0623\u0646\u062b\u0649", "\u0643\u0631\u0648\u062a \u0645\u062e\u0635\u0635\u0629"],
        },
      },
    ],
  },
};

// ── Helpers ────────────────────────────────────────────────────────────────────
function pad(n) { return String(n).padStart(2, "0"); }
function fmtDate(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
function fmtDisplay(d, lang) { return d.getDate() + " " + T[lang].months[d.getMonth()] + " " + d.getFullYear(); }

// ── Shared Components ──────────────────────────────────────────────────────────
function Navbar({ lang, setLang, onHome }) {
  var t = T[lang];
  return (
    <nav className="nav" dir={t.dir}>
      <div className="nav-inner">
        <button className="nav-logo" onClick={onHome}>
          <div className="nav-dot">OQ</div>
          <span className="nav-name">OneTime_QA</span>
        </button>
        <div className="nav-right" style={{ fontFamily: t.bodyFont }}>
          <button className="lang-btn" style={{ fontFamily: t.bodyFont }} onClick={function() { setLang(lang === "en" ? "ar" : "en"); }}>
            {lang === "en" ? "\u0639\u0631\u0628\u064a" : "EN"}
          </button>
          <a href="https://wa.me/97460094003" target="_blank" rel="noopener noreferrer" className="nav-wa btn" style={{ fontFamily: t.bodyFont }}>
            {t.navWa}
          </a>
        </div>
      </div>
    </nav>
  );
}

function Footer({ lang }) {
  var t = T[lang];
  return (
    <footer className="foot" dir={t.dir} style={{ fontFamily: t.bodyFont }}>
      <div className="foot-in">
        <div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "var(--b50)" }}>OneTime_QA</p>
          <p style={{ fontSize: 12, color: "var(--f200)", marginTop: 3 }}>{t.footerSub}</p>
        </div>
        <div style={{ textAlign: t.dir === "rtl" ? "left" : "right", fontSize: 12, color: "var(--f200)" }}>
          <p>{t.footerWa}</p>
          <p style={{ marginTop: 4 }}>{"© " + new Date().getFullYear() + " OneTime_QA"}</p>
        </div>
      </div>
    </footer>
  );
}

function StepBar({ step, lang }) {
  var t = T[lang];
  return (
    <div className="steps" dir={t.dir} style={{ fontFamily: t.bodyFont }}>
      {t.steps.map(function(label, i) {
        var n = i + 1;
        var done = n < step;
        var active = n === step;
        return (
          <div className="step-wrap" key={label}>
            <div className="step-col">
              <div className={"step-circle " + (done ? "step-done" : active ? "step-active" : "step-idle")}>
                {done ? "\u2713" : n}
              </div>
              <p className={"step-lbl " + (active ? "step-lbl-on" : "step-lbl-off")}>{label}</p>
            </div>
            {i < t.steps.length - 1 && (
              <div className={"step-line " + (done ? "step-line-done" : "")} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function BackBtn({ onClick, label, dir, font }) {
  return (
    <button className="btn btn-ghost" onClick={onClick} style={{ marginBottom: 20, fontFamily: font }}>
      {dir === "rtl" ? (label + " \u203a") : ("\u2039 " + label)}
    </button>
  );
}

function SumBar({ items, cta, onCta, disabled, light, lang }) {
  var t = T[lang];
  var btnStyle = { fontFamily: t.bodyFont };
  if (light) {
    btnStyle.background = "var(--b50)";
    btnStyle.color = "var(--f600)";
    btnStyle.boxShadow = "none";
  }
  return (
    <div className="sbar a2" style={{ marginTop: 16, fontFamily: t.bodyFont }} dir={t.dir}>
      <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
        {items.map(function(item) {
          var l = item[0];
          var v = item[1];
          return (
            <div key={l}>
              <p className="sum-lbl">{l}</p>
              <p className="sum-val">{v}</p>
            </div>
          );
        })}
      </div>
      {cta && (
        <button className="btn btn-primary" onClick={onCta} disabled={disabled} style={btnStyle}>
          {cta}
        </button>
      )}
    </div>
  );
}

function OqInput({ label, type, ph, val, set, err, disabled, lang }) {
  var t = T[lang];
  return (
    <div dir={t.dir}>
      <p className="lbl-u" style={{ marginBottom: 8, fontFamily: t.bodyFont }}>{label}</p>
      <input
        type={type || "text"}
        className={"oq-input" + (err ? " err" : "")}
        placeholder={ph}
        value={val}
        onChange={function(e) { set(e.target.value); }}
        disabled={disabled}
        autoComplete="off"
        style={{ fontFamily: t.bodyFont, textAlign: t.dir === "rtl" ? "right" : "left" }}
      />
      {err && <p className="err-msg" style={{ fontFamily: t.bodyFont }}>{err}</p>}
    </div>
  );
}

function Counter({ val, dec, inc }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <button className="ctr-btn" onClick={dec}>-</button>
      <span style={{ fontSize: 16, fontWeight: 500, color: "var(--f600)", minWidth: 20, textAlign: "center" }}>{val}</span>
      <button className="ctr-btn" onClick={inc}>+</button>
    </div>
  );
}

// ── Page 1: Landing ────────────────────────────────────────────────────────────
function Landing({ lang, go }) {
  var t = T[lang];
  var F = t.bodyFont;
  var minPrice = function(svc) { return Math.min.apply(null, svc.packages.map(function(p) { return p.price; })); };
  return (
    <div dir={t.dir} style={{ fontFamily: F }}>
      <section className="hero">
        <div className="orb1" />
        <div className="orb2" />
        <div style={{ position: "relative" }}>
          <span className="tag a0">{t.heroTag}</span>
          <h1 className="d1 a1" style={{ color: "var(--f600)", marginTop: 16, fontFamily: "'Cormorant Garamond', serif" }}>
            {"OneTime"}
            <span style={{ color: "var(--f300)" }}>{"_"}</span>
            {"QA"}
          </h1>
          <div className="hline a1" />
          <p className="a2" style={{ color: "var(--f400)", fontSize: 16, lineHeight: 1.8, maxWidth: 400, margin: "0 auto 36px" }}>
            {t.heroSub}
          </p>
          <button className="btn btn-primary a3" onClick={function() { go(); }} style={{ fontFamily: F }}>
            {t.heroCta}
          </button>
        </div>
        <div className="hscroll">
          <span style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--f400)" }}>
            {t.scrollHint}
          </span>
          <div className="sline" />
        </div>
      </section>

      <section style={{ maxWidth: 960, margin: "0 auto", padding: "60px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span className="tag">{t.svcTag}</span>
          <h2 className="d2" style={{ color: "var(--f600)", marginTop: 12, marginBottom: 8, fontFamily: "'Cormorant Garamond', serif" }}>
            {t.svcTitle}
          </h2>
          <p style={{ color: "var(--f300)", fontSize: 13 }}>{t.svcSub}</p>
        </div>
        <div className="g2">
          {Object.values(SERVICES).map(function(svc) {
            return (
              <div key={svc.id} className="card card-pad svc" onClick={function() { go(svc.id); }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: "var(--b100)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 16 }}>
                  {svc.emoji}
                </div>
                <h3 className="d3" style={{ color: "var(--f600)", marginBottom: 8 }}>{svc.name[lang]}</h3>
                <p style={{ color: "var(--f300)", fontSize: 13, lineHeight: 1.75, marginBottom: 20 }}>{svc.description[lang]}</p>
                <p style={{ color: "var(--f500)", fontSize: 13, fontWeight: 500 }}>
                  {t.from + " " + minPrice(svc).toLocaleString() + " " + t.qar + " \u2192"}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="dark">
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <span className="tag">{t.whyTag}</span>
          <h2 style={{ fontSize: "clamp(26px, 5vw, 42px)", margin: "16px 0 48px", color: "var(--b50)", fontWeight: 300, fontFamily: "'Cormorant Garamond', serif" }}>
            {t.whyTitle}
          </h2>
          <div className="g3" style={{ gap: 32 }}>
            {t.whyItems.map(function(x) {
              return (
                <div key={x.t}>
                  <p style={{ color: "var(--g300)", fontSize: 18, marginBottom: 10 }}>{"\u2736"}</p>
                  <h3 style={{ fontSize: 20, color: "var(--b50)", marginBottom: 8, fontFamily: "'Cormorant Garamond', serif" }}>{x.t}</h3>
                  <p style={{ color: "var(--f200)", fontSize: 13, lineHeight: 1.75 }}>{x.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section style={{ padding: "72px 20px", textAlign: "center" }}>
        <h2 className="d2" style={{ color: "var(--f600)", marginBottom: 12, fontFamily: "'Cormorant Garamond', serif" }}>
          {t.ctaTitle}
        </h2>
        <p style={{ color: "var(--f300)", fontSize: 13, marginBottom: 28 }}>{t.ctaSub}</p>
        <button className="btn btn-primary" onClick={function() { go(); }} style={{ fontFamily: F }}>
          {t.ctaBtn}
        </button>
      </section>
    </div>
  );
}

// ── Page 2: Service Selection ──────────────────────────────────────────────────
function SvcPage({ lang, onNext }) {
  var t = T[lang];
  var F = t.bodyFont;
  var minPrice = function(svc) { return Math.min.apply(null, svc.packages.map(function(p) { return p.price; })); };
  return (
    <div className="page-wide" dir={t.dir} style={{ fontFamily: F }}>
      <StepBar step={1} lang={lang} />
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <span className="tag">{t.step1Tag}</span>
        <h1 className="d2" style={{ color: "var(--f600)", marginTop: 12, marginBottom: 6, fontFamily: "'Cormorant Garamond', serif" }}>
          {t.step1Title}
        </h1>
        <p style={{ color: "var(--f300)", fontSize: 13 }}>{t.step1Sub}</p>
      </div>
      <div className="g2">
        {Object.values(SERVICES).map(function(svc) {
          return (
            <div key={svc.id} className="card card-pad svc a0" onClick={function() { onNext(svc.id); }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{svc.emoji}</div>
              <h3 className="d3" style={{ color: "var(--f600)", marginBottom: 6 }}>{svc.name[lang]}</h3>
              <p style={{ color: "var(--f300)", fontSize: 13, lineHeight: 1.75, marginBottom: 16 }}>{svc.description[lang]}</p>
              <p style={{ color: "var(--f500)", fontSize: 13, fontWeight: 500 }}>
                {t.from + " " + minPrice(svc).toLocaleString() + " " + t.qar + " \u2192"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Page 3: Package Selection ──────────────────────────────────────────────────
function PkgPage({ lang, serviceId, onNext, onBack }) {
  var t = T[lang];
  var svc = SERVICES[serviceId];
  var F = t.bodyFont;
  var [pkg, setPkg] = useState(null);

  if (!svc) { return null; }

  return (
    <div className="page-wide" dir={t.dir} style={{ fontFamily: F }}>
      <StepBar step={2} lang={lang} />
      <BackBtn onClick={onBack} label={t.backToServices} dir={t.dir} font={F} />
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <span className="tag">{t.step2Tag(svc.name[lang])}</span>
        <h1 className="d2" style={{ color: "var(--f600)", marginTop: 12, marginBottom: 6, fontFamily: "'Cormorant Garamond', serif" }}>
          {t.step2Title}
        </h1>
        <p style={{ color: "var(--f300)", fontSize: 13 }}>{t.step2Sub}</p>
      </div>
      <div className="g3" style={{ marginBottom: 8, marginTop: 16 }}>
        {svc.packages.map(function(p) {
          var isSelected = pkg && pkg.id === p.id;
          return (
            <div key={p.id} className={"card pkg-card" + (isSelected ? " sel" : "")} onClick={function() { setPkg(p); }}>
              {p.popular && <div className="pkg-pop">{t.mostPop}</div>}
              {isSelected && (
                <div className="chk">
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
              <p className="lbl-u" style={{ marginBottom: 4 }}>{p.name[lang]}</p>
              <p style={{ fontSize: 28, fontFamily: "'Cormorant Garamond', serif", color: "var(--f600)" }}>
                {p.price.toLocaleString()}
                <span style={{ fontSize: 12, fontFamily: F, color: "var(--f300)", marginInlineStart: 4 }}>{t.qar}</span>
              </p>
              <div className="oq-div" style={{ margin: "12px 0" }} />
              <ul style={{ listStyle: "none", padding: 0 }}>
                {p.features[lang].map(function(f) {
                  return (
                    <li key={f} style={{ display: "flex", gap: 6, fontSize: 12, color: "var(--f400)", marginBottom: 6, alignItems: "flex-start" }}>
                      <span style={{ color: "var(--f200)", marginTop: 1 }}>{"\u2736"}</span>
                      {f}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
      {pkg && (
        <SumBar
          lang={lang}
          items={[[t.selected, pkg.name[lang]], [t.price, pkg.price.toLocaleString() + " " + t.qar]]}
          cta={t.continueAddons}
          onCta={function() { onNext(pkg); }}
          light
        />
      )}
    </div>
  );
}

// ── Page 4: Add-ons ────────────────────────────────────────────────────────────
function AddOnsPage({ lang, serviceId, pkg, onNext, onBack }) {
  var t = T[lang];
  var svc = SERVICES[serviceId];
  var F = t.bodyFont;
  var [xh, setXh] = useState(0);
  var [xp, setXp] = useState(0);
  var [ac, setAc] = useState(false);
  // cardQtys: { tall: 0, big: 0 } — independent qty per layout
  var [cardQtys, setCardQtys] = useState({ tall: 0, big: 0 });
  var [ce, setCe] = useState("");

  if (!svc || !pkg) { return null; }

  function setQty(id, val) {
    var v = Math.min(200, Math.max(0, val));
    setCardQtys(function(prev) {
      var next = Object.assign({}, prev);
      next[id] = v;
      return next;
    });
    setCe("");
  }

  var totalCards = (cardQtys.tall || 0) + (cardQtys.big || 0);
  var ctTall = svc.cardLayouts ? (svc.cardLayouts.find(function(l) { return l.id === "tall"; }) || { pricePerCard: 3 }).pricePerCard * (cardQtys.tall || 0) : 0;
  var ctBig  = svc.cardLayouts ? (svc.cardLayouts.find(function(l) { return l.id === "big"; })  || { pricePerCard: 5 }).pricePerCard * (cardQtys.big  || 0) : 0;
  var ct = ctTall + ctBig;
  var xt = (serviceId === "photobooth" ? xh * 300 : 0) + (serviceId === "instax" ? xp * 150 : 0);
  var gt = pkg.price + xt + ct;

  function handleNext() {
    if (ac && totalCards === 0) { setCe(t.errCardQty); return; }
    if (ac && totalCards > 200) { setCe(t.errCardQty); return; }
    onNext({
      extraHours: xh,
      extraPhotos: xp,
      addCard: ac,
      cardQtys: ac ? cardQtys : { tall: 0, big: 0 },
      totalCards: ac ? totalCards : 0,
    });
  }

  return (
    <div className="page-narrow" dir={t.dir} style={{ fontFamily: F }}>
      <StepBar step={3} lang={lang} />
      <BackBtn onClick={onBack} label={t.backToPackages} dir={t.dir} font={F} />
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <span className="tag">{t.step3Tag}</span>
        <h1 className="d2" style={{ color: "var(--f600)", marginTop: 12, marginBottom: 6, fontFamily: "'Cormorant Garamond', serif" }}>
          {t.step3Title}
        </h1>
        <p style={{ color: "var(--f300)", fontSize: 13 }}>{t.step3Sub}</p>
      </div>

      <div className="card card-pad a0" style={{ marginBottom: 14 }}>
        {serviceId === "photobooth" && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 16, marginBottom: 16, borderBottom: "1px solid var(--b200)" }}>
            <div>
              <p style={{ fontSize: 14, fontWeight: 500, color: "var(--f600)" }}>{t.extraHours}</p>
              <p style={{ fontSize: 12, color: "var(--f300)", marginTop: 2 }}>{t.extraHoursSub}</p>
            </div>
            <Counter val={xh} dec={function() { setXh(Math.max(0, xh - 1)); }} inc={function() { setXh(xh + 1); }} />
          </div>
        )}
        {serviceId === "instax" && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 16, marginBottom: 16, borderBottom: "1px solid var(--b200)" }}>
            <div>
              <p style={{ fontSize: 14, fontWeight: 500, color: "var(--f600)" }}>{t.extraPhotos}</p>
              <p style={{ fontSize: 12, color: "var(--f300)", marginTop: 2 }}>{t.extraPhotosSub}</p>
            </div>
            <Counter val={xp} dec={function() { setXp(Math.max(0, xp - 1)); }} inc={function() { setXp(xp + 1); }} />
          </div>
        )}
        {serviceId === "photobooth" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ fontSize: 14, fontWeight: 500, color: "var(--f600)" }}>{t.customCard}</p>
                <p style={{ fontSize: 12, color: "var(--f300)", marginTop: 2 }}>{t.customCardSub}</p>
              </div>
              <button
                className="tog"
                onClick={function() { setAc(!ac); setCe(""); setCardQtys({ tall: 0, big: 0 }); }}
                style={{ background: ac ? "var(--f500)" : "var(--b300)" }}
              >
                <div
                  className="tth"
                  style={{ transform: ac ? (t.dir === "rtl" ? "translateX(-20px)" : "translateX(20px)") : "translateX(4px)" }}
                />
              </button>
            </div>
            {ac && (
              <div style={{ marginTop: 20, display: "grid", gap: 16 }}>
                <p className="lbl-u" style={{ marginBottom: 4 }}>{t.cardLayout}</p>
                {svc.cardLayouts.map(function(l) {
                  var lName = l.id === "tall" ? t.layout1Name : t.layout2Name;
                  var lDesc = l.id === "tall" ? t.layout1Desc : t.layout2Desc;
                  var qty = cardQtys[l.id] || 0;
                  var lineTotal = l.pricePerCard * qty;
                  return (
                    <div key={l.id} className="card" style={{ padding: 16 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                        <div>
                          <p style={{ fontSize: 13, fontWeight: 600, color: "var(--f600)" }}>{lName}</p>
                          <p style={{ fontSize: 12, color: "var(--f300)", marginTop: 2 }}>{lDesc}</p>
                          <p style={{ fontSize: 12, color: "var(--f400)", marginTop: 4 }}>{l.pricePerCard + " " + t.perCard}</p>
                        </div>
                        {qty > 0 && (
                          <p style={{ fontSize: 13, color: "var(--f500)", fontWeight: 600 }}>
                            {"= " + lineTotal + " " + t.qar}
                          </p>
                        )}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <Counter
                          val={qty}
                          dec={function() { setQty(l.id, qty - 1); }}
                          inc={function() { setQty(l.id, qty + 1); }}
                        />
                        <p style={{ fontSize: 11, color: "var(--f200)" }}>{t.cardQtyNote}</p>
                      </div>
                    </div>
                  );
                })}
                {ac && totalCards > 0 && (
                  <div style={{ background: "var(--b100)", borderRadius: 12, padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ fontSize: 13, color: "var(--f500)", fontWeight: 500 }}>
                      {lang === "ar" ? ("الإجمالي: " + totalCards + " كارت") : ("Total: " + totalCards + " cards")}
                    </p>
                    <p style={{ fontSize: 14, color: "var(--f600)", fontWeight: 700 }}>{ct + " " + t.qar}</p>
                  </div>
                )}
                {ce && <p className="err-msg">{ce}</p>}
              </div>
            )}
          </div>
        )}
      </div>

      <SumBar
        lang={lang}
        items={[[t.total, gt.toLocaleString() + " " + t.qar]]}
        cta={t.continueCalendar}
        onCta={handleNext}
        light
      />
    </div>
  );
}

// ── Page 5: Calendar + Time ────────────────────────────────────────────────────
function CalPage({ lang, serviceId, onNext, onBack }) {
  var t = T[lang];
  var svc = SERVICES[serviceId];
  var F = t.bodyFont;
  var [vd, setVd] = useState(new Date());
  var [sel, setSel] = useState(null);
  var [et, setEt] = useState("");
  var [te, setTe] = useState("");
  var [availability, setAvailability] = useState({});
  var [loadingAvail, setLoadingAvail] = useState(false);

  if (!svc) { return null; }

  var yr = vd.getFullYear();
  var mo = vd.getMonth();
  var dim = new Date(yr, mo + 1, 0).getDate();
  var fd = new Date(yr, mo, 1).getDay();
  var now = new Date();
  now.setHours(0, 0, 0, 0);

  // Fetch availability from real API when month changes
  useEffect(function() {
    setLoadingAvail(true);
    fetch("/api/availability?service=" + serviceId + "&year=" + yr + "&month=" + (mo + 1))
      .then(function(r) { return r.json(); })
      .then(function(data) { setAvailability(data.availability || {}); })
      .catch(function() { setAvailability({}); })
      .finally(function() { setLoadingAvail(false); });
  }, [serviceId, yr, mo]);

  function getSlots(d) {
    var key = fmtDate(new Date(yr, mo, d));
    var booked = availability[key] || 0;
    return svc.maxBookingsPerDay - booked;
  }

  function isPast(d) {
    var x = new Date(yr, mo, d);
    x.setHours(0, 0, 0, 0);
    return x < now;
  }

  function isSelected(d) {
    return sel && fmtDate(new Date(yr, mo, d)) === fmtDate(sel);
  }

  function handleContinue() {
    if (!et.trim()) { setTe(t.errTime); return; }
    setTe("");
    onNext({ date: sel, eventTime: et });
  }

  var prevMonth = new Date(yr, mo - 1, 1);
  var todayMonth = new Date();
  var canGoPrev = prevMonth >= new Date(todayMonth.getFullYear(), todayMonth.getMonth(), 1);

  return (
    <div className="page-narrow" dir={t.dir} style={{ fontFamily: F }}>
      <StepBar step={4} lang={lang} />
      <BackBtn onClick={onBack} label={t.backToAddons} dir={t.dir} font={F} />
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <span className="tag">{t.step4Tag(svc.name[lang])}</span>
        <h1 className="d2" style={{ color: "var(--f600)", marginTop: 12, marginBottom: 6, fontFamily: "'Cormorant Garamond', serif" }}>
          {t.step4Title}
        </h1>
        <p style={{ color: "var(--f300)", fontSize: 13 }}>
          {svc.id === "photobooth" ? t.step4Sub2 : t.step4Sub1}
        </p>
      </div>

      <div className="card card-pad a0" style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <button
            className="ctr-btn"
            onClick={function() { if (canGoPrev) setVd(new Date(yr, mo - 1, 1)); }}
            style={{ opacity: canGoPrev ? 1 : 0.3, cursor: canGoPrev ? "pointer" : "default" }}
          >
            {"\u2039"}
          </button>
          <p style={{ fontSize: 20, fontFamily: "'Cormorant Garamond', serif", color: "var(--f600)" }}>
            {t.months[mo] + " " + yr}
          </p>
          <button className="ctr-btn" onClick={function() { setVd(new Date(yr, mo + 1, 1)); }}>
            {"\u203a"}
          </button>
        </div>

        <div className="cal-grid" style={{ marginBottom: 4 }}>
          {t.days.map(function(d) { return <div key={d} className="cal-head">{d}</div>; })}
        </div>

        <div className="cal-grid">
          {Array.from({ length: fd }).map(function(_, i) { return <div key={"e" + i} />; })}
          {Array.from({ length: dim }).map(function(_, i) {
            var d = i + 1;
            var p = isPast(d);
            var s = p ? 0 : getSlots(d);
            var on = isSelected(d);
            var cls = "cal-day" + (p ? " pa" : s <= 0 ? " fu" : on ? " on" : " av");
            return (
              <div
                key={d}
                className={cls}
                onClick={function() { if (!p && s > 0) setSel(new Date(yr, mo, d)); }}
              >
                <span className="day-num">{d}</span>
                {!p && (
                  <span className={"slot-txt " + (s >= 2 ? "sc2" : s === 1 ? "sc1" : "sc0")}>
                    {t.slots(s)}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="oq-div" />
        <div style={{ display: "flex", gap: 20 }}>
          {[["var(--f300)", t.available], ["var(--g400)", t.oneSlot], ["#e57373", t.unavailable]].map(function(item) {
            var c = item[0];
            var l = item[1];
            return (
              <div key={l} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--f300)" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: c, display: "inline-block" }} />
                {l}
              </div>
            );
          })}
        </div>
      </div>

      {sel && (
        <div className="card card-pad a1" style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--b100)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
              {"\uD83D\uDD50"}
            </div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 500, color: "var(--f600)" }}>{t.eventTime}</p>
              <p style={{ fontSize: 12, color: "var(--f300)", marginTop: 1 }}>{fmtDisplay(sel, lang)}</p>
            </div>
          </div>
          <input
            type="time"
            className={"oq-input" + (te ? " err" : "")}
            value={et}
            onChange={function(e) { setEt(e.target.value); setTe(""); }}
            style={{ fontFamily: F }}
          />
          {te && <p className="err-msg" style={{ marginTop: 6 }}>{te}</p>}
        </div>
      )}

      {sel && (
        <SumBar
          lang={lang}
          items={[[t.selDate, fmtDisplay(sel, lang)], [t.time, et || "-"]]}
          cta={t.submit}
          onCta={handleContinue}
          light
        />
      )}
    </div>
  );
}

// ── Page 6: Details Form ───────────────────────────────────────────────────────
function DetPage({ lang, serviceId, pkg, addOns, date, eventTime, onNext, onBack }) {
  var t = T[lang];
  var svc = SERVICES[serviceId];
  var F = t.bodyFont;
  var [n, setN] = useState("");
  var [p, setP] = useState("");
  var [l, setL] = useState("");
  var [e, setE] = useState({});

  if (!svc || !pkg || !addOns) { return null; }

  var ci = addOns.addCard && addOns.cardLayout && svc.cardLayouts
    ? svc.cardLayouts.find(function(x) { return x.id === addOns.cardLayout; })
    : null;
  var ct = ci ? ci.pricePerCard * addOns.cardQty : 0;
  var xt = (serviceId === "photobooth" ? addOns.extraHours * 300 : 0) + (serviceId === "instax" ? addOns.extraPhotos * 150 : 0);
  var gt = pkg.price + xt + ct;

  var [submitting, setSubmitting] = useState(false);
  var [submitErr, setSubmitErr] = useState("");

  function fmtDateStr(d) {
    if (!d) return "";
    var yr = d.getFullYear();
    var mo = String(d.getMonth() + 1).padStart(2, "0");
    var dy = String(d.getDate()).padStart(2, "0");
    return yr + "-" + mo + "-" + dy;
  }

  function validate() {
    var err = {};
    if (!n.trim()) { err.n = t.errName; }
    if (!p.trim()) { err.p = t.errPhone; }
    if (!l.trim()) { err.l = t.errLocation; }
    setE(err);
    return Object.keys(err).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    setSubmitting(true);
    setSubmitErr("");
    try {
      var payload = {
        serviceType: serviceId,
        packageId: pkg.id,
        packageName: pkg.name[lang],
        eventDate: fmtDateStr(date),
        eventTime: eventTime,
        fullName: n,
        phone: p,
        eventLocation: l,
        extraHours: addOns.extraHours || 0,
        extraPhotos: addOns.extraPhotos || 0,
        addCard: addOns.addCard || false,
        cardQtys: addOns.cardQtys || { tall: 0, big: 0 },
        totalCards: addOns.totalCards || 0,
      };
      var res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      var data = await res.json();
      if (res.ok) {
        onNext({ fullName: n, phone: p, location: l });
      } else {
        setSubmitErr(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setSubmitErr("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="page-narrow" dir={t.dir} style={{ fontFamily: F }}>
      <StepBar step={5} lang={lang} />
      <BackBtn onClick={onBack} label={t.backToCalendar} dir={t.dir} font={F} />
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <span className="tag">{t.step5Tag}</span>
        <h1 className="d2" style={{ color: "var(--f600)", marginTop: 12, marginBottom: 6, fontFamily: "'Cormorant Garamond', serif" }}>
          {t.step5Title}
        </h1>
        <p style={{ color: "var(--f300)", fontSize: 13 }}>{t.step5Sub}</p>
      </div>

      <div className="sbar a0" style={{ marginBottom: 20 }}>
        {[[t.service, svc.name[lang]], [t.package, pkg.name[lang]], [t.total, gt.toLocaleString() + " " + t.qar]].map(function(item) {
          var lb = item[0];
          var v = item[1];
          return (
            <div key={lb}>
              <p className="sum-lbl">{lb}</p>
              <p className="sum-val">{v}</p>
            </div>
          );
        })}
      </div>

      <div className="card card-pad a1" style={{ marginBottom: 14 }}>
        <div style={{ display: "grid", gap: 18 }}>
          <OqInput lang={lang} label={t.labelName} ph={t.phName} val={n} set={setN} err={e.n} />
          <OqInput lang={lang} label={t.labelPhone} type="tel" ph={t.phPhone} val={p} set={setP} err={e.p} />
          <OqInput lang={lang} label={t.labelLocation} ph={t.phLocation} val={l} set={setL} err={e.l} />
        </div>
      </div>

      {submitErr && (
        <p style={{ fontSize: 13, color: "#c62828", textAlign: "center", marginBottom: 12, fontFamily: F }}>
          {submitErr}
        </p>
      )}

      <button
        className="btn btn-primary btn-full a2"
        style={{ fontFamily: F, opacity: submitting ? 0.6 : 1 }}
        disabled={submitting}
        onClick={handleSubmit}
      >
        {submitting ? (lang === "ar" ? "جاري الإرسال..." : "Submitting...") : t.continueConfirm}
      </button>
      <p style={{ fontSize: 11, color: "var(--f200)", textAlign: "center", marginTop: 10, lineHeight: 1.7 }}>
        {t.noPayNote}
      </p>
    </div>
  );
}

// ── Page 7: Confirmation ───────────────────────────────────────────────────────
function ConfPage({ lang, onHome }) {
  var t = T[lang];
  var F = t.bodyFont;
  return (
    <div className="page-narrow" dir={t.dir} style={{ paddingTop: 60, textAlign: "center", fontFamily: F }}>
      <div className="confirm-icon a0">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--f500)" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <span className="tag a1">{t.confirmTag}</span>
      <h1 className="d2 a1" style={{ color: "var(--f600)", marginTop: 14, marginBottom: 32, fontFamily: "'Cormorant Garamond', serif" }}>
        {t.confirmTitle}
      </h1>
      <div className="card card-pad a2" style={{ textAlign: t.dir === "rtl" ? "right" : "left", marginBottom: 28 }}>
        {t.confirmText.map(function(para, i) {
          return (
            <p key={i} style={{ fontSize: 14, color: "var(--f500)", lineHeight: 1.85, marginTop: i > 0 ? 18 : 0, whiteSpace: "pre-line" }}>
              {para}
            </p>
          );
        })}
      </div>
      <a
        href="https://wa.me/97460094003"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary a3"
        style={{ display: "inline-flex", marginBottom: 20, fontFamily: F }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.847L.057 23.5l5.797-1.522A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.793 9.793 0 01-5.032-1.388l-.36-.214-3.44.904.919-3.352-.235-.375A9.787 9.787 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
        </svg>
        {t.confirmWa}
      </a>
      <br />
      <button
        className="btn btn-ghost"
        onClick={onHome}
        style={{ fontSize: 13, color: "var(--f300)", textDecoration: "underline", fontFamily: F }}
      >
        {t.confirmBack}
      </button>
    </div>
  );
}

// ── Root App ───────────────────────────────────────────────────────────────────
export default function App() {
  var [lang, setLang] = useState("ar");
  var [page, setPage] = useState("landing");
  var [bk, setBk] = useState({});

  // Set document direction and font on mount and lang change
  useEffect(function() {
    document.documentElement.setAttribute("dir", T[lang].dir);
    document.body.style.fontFamily = T[lang].bodyFont;
  }, [lang]);

  function goHome() {
    setPage("landing");
    setBk({});
  }

  function handleLang(l) {
    setLang(l);
  }

  return (
    <div className="app">
      <Navbar lang={lang} setLang={handleLang} onHome={goHome} />

      {page === "landing" && (
        <Landing
          lang={lang}
          go={function(id) {
            setBk(id ? { serviceId: id } : {});
            setPage("service");
          }}
        />
      )}

      {page === "service" && (
        <SvcPage
          lang={lang}
          onNext={function(id) {
            setBk({ serviceId: id });
            setPage("package");
          }}
        />
      )}

      {page === "package" && bk.serviceId && (
        <PkgPage
          lang={lang}
          serviceId={bk.serviceId}
          onNext={function(pkg) {
            setBk(function(b) { return Object.assign({}, b, { pkg: pkg }); });
            setPage("addons");
          }}
          onBack={function() { setPage("service"); }}
        />
      )}

      {page === "addons" && bk.serviceId && bk.pkg && (
        <AddOnsPage
          lang={lang}
          serviceId={bk.serviceId}
          pkg={bk.pkg}
          onNext={function(addOns) {
            setBk(function(b) { return Object.assign({}, b, { addOns: addOns }); });
            setPage("calendar");
          }}
          onBack={function() { setPage("package"); }}
        />
      )}

      {page === "calendar" && bk.serviceId && (
        <CalPage
          lang={lang}
          serviceId={bk.serviceId}
          onNext={function(result) {
            setBk(function(b) { return Object.assign({}, b, { date: result.date, eventTime: result.eventTime }); });
            setPage("details");
          }}
          onBack={function() { setPage("addons"); }}
        />
      )}

      {page === "details" && bk.serviceId && bk.pkg && bk.addOns && (
        <DetPage
          lang={lang}
          serviceId={bk.serviceId}
          pkg={bk.pkg}
          addOns={bk.addOns}
          date={bk.date}
          eventTime={bk.eventTime}
          onNext={function(det) {
            setBk(function(b) { return Object.assign({}, b, det); });
            setPage("confirmation");
          }}
          onBack={function() { setPage("calendar"); }}
        />
      )}

      {page === "confirmation" && (
        <ConfPage lang={lang} onHome={goHome} />
      )}

      <Footer lang={lang} />
    </div>
  );
}
