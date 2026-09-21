import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is not set');
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

const T4_SYSTEM_CONTEXT = `
You are the official AI Travel Consultant of "T4 TICKETS & TRAVEL SERVICES" (Managed by Muhammad Aamir Aziz).
IATA Accredited global travel gateway.
Official Slogan: "سستی ترین ٹکٹ ، بہترین سروس ، ہر سفر بے فکر" (Cheapest Tickets, Best Service, Every Journey Worry-Free).
Contact Information:
- WhatsApp / Phone (KSA): +966 50 267 4930
- WhatsApp / Phone (PK): +92 301 7355753
- Email: T4tickets@gmail.com
- Main Branch Locations in Saudi Arabia: Bariq, Al Majardah, Muhayil Asir, Abha.
- Partner Airlines: Saudia, PIA, Qatar Airways, Emirates, flydubai, flyadeal, flynas, Air Arabia, Fly Jinnah, AirSial, airblue, SereneAir.
- Core Services:
  1. Airline Tickets (Domestic & International)
  2. Visit Visas (Saudi Arabia, UAE/Dubai, Qatar, Oman, UK, Schengen, etc.)
  3. VIP Umrah Packages (Luxury & Economy hotels in Makkah & Madinah close to Haram, transport, Ziyarat tours)
  4. Travel Insurance
  5. Work Visas processing & consultation
  6. GCC Medical Appointments (Gamca / Wafid medical slip booking)
  7. Group & Family Ticket Bookings

Tone and Guidelines:
- Be exceptionally courteous, professional, and knowledgeable.
- Answer in the same language the customer uses (English, Urdu, or Arabic). If Urdu is used, you can respond in clear Urdu (or Roman Urdu if they write in Roman Urdu).
- Provide practical travel advice: recommended airlines, best flight connections, baggage guidelines, hotel options in Makkah/Madinah, and visa checklists.
- Always include a friendly invitation to finalize booking or get special discounted quote through WhatsApp with Muhammad Aamir Aziz (+966 50 267 4930).
`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'T4 TICKETS & TRAVEL SERVICES AI Engine',
      geminiConfigured: !!process.env.GEMINI_API_KEY
    });
  });

  // AI Chat endpoint
  app.post('/api/gemini/chat', async (req, res) => {
    try {
      const { message, conversationHistory = [] } = req.body;
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message is required' });
      }

      const ai = getAI();
      const formattedHistory = conversationHistory
        .slice(-8)
        .map((msg: { sender: string; text: string }) => ({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        }));

      const contents = [
        ...formattedHistory,
        { role: 'user', parts: [{ text: message }] }
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction: T4_SYSTEM_CONTEXT,
          temperature: 0.7,
        }
      });

      const reply = response.text || 'I am happy to assist with your travel booking. Please contact our WhatsApp at +966 50 267 4930.';
      return res.json({ reply });
    } catch (err: any) {
      console.error('Error in /api/gemini/chat:', err);
      return res.status(500).json({
        error: err.message || 'Failed to generate AI travel advice',
        fallback: 'For instant flight booking and VIP Umrah packages, contact Muhammad Aamir Aziz directly on WhatsApp: +966 50 267 4930 or +92 301 7355753.'
      });
    }
  });

  // AI Smart Trip & Umrah Itinerary Generator
  app.post('/api/gemini/itinerary', async (req, res) => {
    try {
      const {
        tripType,
        origin,
        destination,
        durationDays,
        travelers,
        budgetLevel,
        currency = 'SAR',
        specialNotes
      } = req.body;

      const ai = getAI();
      const prompt = `
Create a comprehensive, personalized travel plan for a client of T4 TICKETS & TRAVEL SERVICES.

Trip Details:
- Type: ${tripType || 'Umrah / Vacation'}
- Origin: ${origin || 'Lahore / Islamabad / Karachi'}
- Destination: ${destination || 'Jeddah / Makkah & Madinah'}
- Duration: ${durationDays || 10} days
- Travelers: ${travelers || '2 Adults'}
- Budget Level: ${budgetLevel || 'Moderate Luxury'}
- Preferred Currency: ${currency}
- Specific Requirements: ${specialNotes || 'Close to Haram, best flight route'}

Please generate a detailed plan in JSON format with the following keys:
{
  "title": "Inspiring Trip Title",
  "summary": "Brief 2-3 sentence overview of this curated package",
  "airlineRecommendation": {
    "preferredAirlines": ["Saudia", "PIA", "AirSial"],
    "routeSummary": "Direct or optimal 1-stop layover route",
    "baggageTips": "Standard baggage allowance advice"
  },
  "hotelRecommendations": [
    {
      "city": "City Name (e.g. Makkah)",
      "hotelName": "Example hotel name (e.g. Swissotel Makkah or Pullman Zamzam)",
      "distance": "Distance to Haram / city center",
      "rating": 5,
      "approxPricePerNight": "Price with currency"
    }
  ],
  "dailySchedule": [
    {
      "day": 1,
      "title": "Arrival & Welcome",
      "activities": ["Activity 1", "Activity 2"],
      "prayerOrZiyaratHighlight": "Special spiritual or sightseeing highlight"
    }
  ],
  "estimatedBudget": {
    "flights": "Estimated flights cost with currency",
    "accommodation": "Estimated accommodation cost",
    "transportAndVisas": "Estimated visa and ground transport",
    "totalEstimated": "Total estimated amount with currency"
  },
  "travelTips": [
    "Important tip 1 (e.g. Nusuk app booking)",
    "Important tip 2",
    "Important tip 3"
  ],
  "whatsAppBookingText": "A pre-written WhatsApp booking inquiry text the user can send to +966 50 267 4930"
}
Output strictly valid JSON.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction: T4_SYSTEM_CONTEXT,
          responseMimeType: 'application/json',
          temperature: 0.4,
        }
      });

      const responseText = response.text || '{}';
      const parsed = JSON.parse(responseText);
      return res.json({ success: true, itinerary: parsed });
    } catch (err: any) {
      console.error('Error in /api/gemini/itinerary:', err);
      return res.status(500).json({
        error: err.message || 'Failed to generate itinerary',
        fallbackMessage: 'Please WhatsApp +966 50 267 4930 for custom itinerary planning.'
      });
    }
  });

  // AI Visa & GCC Medical Guide
  app.post('/api/gemini/visa-guide', async (req, res) => {
    try {
      const { nationality, destinationCountry, visaType } = req.body;
      const ai = getAI();

      const prompt = `
Provide an exact, up-to-date visa requirement and document checklist for:
Nationality: ${nationality || 'Pakistani'}
Destination: ${destinationCountry || 'Saudi Arabia'}
Visa Type: ${visaType || 'Tourist / Umrah / Work'}

Generate JSON with:
{
  "destination": "${destinationCountry}",
  "visaCategory": "${visaType}",
  "overview": "Short summary of visa policy and eligibility",
  "documentChecklist": [
    "Original passport with 6 months validity",
    "Passport size photographs with white background",
    "Proof of funds / Bank statement",
    "Confirmed return flight ticket with T4 Tickets"
  ],
  "gccMedicalRequired": true or false,
  "gccMedicalDetails": "If Saudi Arabia work visa or GCC, explain Gamca / Wafid medical appointment procedure handled by T4 Tickets",
  "processingTime": "e.g. 24 to 72 hours for eVisa / 10-15 days for work visa",
  "estimatedFees": "Approximate fee range",
  "keyAdvice": "Crucial practical advice for smooth approval",
  "whatsAppInquiry": "Pre-filled text for user to WhatsApp T4 Tickets"
}
Output strictly valid JSON.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction: T4_SYSTEM_CONTEXT,
          responseMimeType: 'application/json',
          temperature: 0.3,
        }
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json({ success: true, guide: parsed });
    } catch (err: any) {
      console.error('Error in /api/gemini/visa-guide:', err);
      return res.status(500).json({ error: err.message || 'Failed to load visa guide' });
    }
  });

  // Vite middleware for development or static serving for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`T4 Tickets server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
