import express from "express";
import { supabase } from "../config/supabase.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

/**
 * @swagger
 * tags:
 *   name: Triage
 *   description: AI symptom-triage chatbot
 */

/**
 * @swagger
 * /triage:
 *   post:
 *     summary: Ask the AI dental triage assistant a question / continue a triage chat
 *     tags: [Triage]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [history]
 *             properties:
 *               history:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     role: { type: string, enum: [user, model] }
 *                     text: { type: string }
 *     responses:
 *       200:
 *         description: >
 *           JSON response with status one of
 *           asking | done | redirect | insufficient | unavailable
 */
router.post("/triage", protect, async (req, res) => {
  try {
    const { history } = req.body; // [{ role: "user"|"model", text: "..." }]

    // Pull YOUR real services so the AI can only recommend what you offer
    const { data: services, error: servicesError } = await supabase
      .from("services")
      .select("service_name, description");

    if (servicesError) {
      console.error("Failed to load services for triage:", servicesError);
      return res.status(500).json({ status: "error", message: "Could not load services." });
    }

    const systemPrompt = `
You are a dental triage assistant for a clinic called Smilly.
Ask the patient a FEW short questions (max 4) about their symptoms.

Reasoning process (do this internally, in order):
1. Use your general knowledge of common dental symptoms and conditions to
   work out what type of care the patient's symptoms likely need (e.g.
   a cavity, a cracked tooth, an infected nerve, a cosmetic concern,
   an alignment issue, or just a routine check-up).
2. THEN check whether a matching service actually exists in this clinic's
   list below. Only recommend a service that is genuinely in this list —
   never recommend something just because it's on the list if it doesn't
   really fit what the patient described.
Services this clinic actually offers:
${JSON.stringify(services)}

Rules:
- Ask ONE short, simple question at a time. Prioritize learning: where the
  pain/issue is located, how long it's been happening, how severe it is,
  what triggers it (hot, cold, chewing, touch), and whether there's
  swelling, bleeding, or a visibly broken/damaged tooth.
- After 2-5 questions, give your result.
- If your reasoning identifies a real need that matches one of the services
  above, reply with status "done" for that service.
- If your reasoning is confident about what type of care is needed, but
  NONE of the services above actually match it, do NOT force a mismatched
  recommendation. Reply with status "unavailable", plainly describe (in
  non-clinical terms) what kind of care seems needed, and explain this
  clinic doesn't currently offer that specific treatment — suggest they
  call the clinic directly or book a general check-up for a referral.
- If the patient's answers stay vague, unclear, contradictory, or
  off-topic even after your questions, do NOT guess a service either.
  Instead reply with status "insufficient", briefly explain what was
  unclear, and suggest they either describe their symptom again with more
  detail or book a general appointment so a dentist can assess in person.
- NEVER diagnose a disease by clinical name. Only describe symptoms/care
  type in plain terms, and say which service (if any) fits.
- If symptoms sound urgent (severe swelling, trouble breathing,
  heavy bleeding, knocked-out tooth), set "urgent": true.
- If the message is ONLY about how to use the site (booking steps,
  hours, pricing) and has no symptom mentioned, reply with status "redirect".
  In that message, walk them through the actual booking steps on this site,
  with each step on its own line separated by a "\\n" newline character
  (not run together in one paragraph):
  1. Choose a dentist
  2. Choose one or more services
  3. Pick an available date and time slot
  4. Enter your contact info
  5. Confirm the appointment
  Keep it concrete and specific to these steps, not generic.
- Always reply in the same language the patient used in their most recent
  message (Khmer or English). Keep the JSON keys in English regardless.
Reply with JSON ONLY:
- To ask more:     { "status": "asking", "message": "your question" }
- When matched:    { "status": "done", "service": "name",
                     "reason": "why", "urgent": false }
- To redirect:     { "status": "redirect", "message": "the detailed step-by-step booking guide" }
- If unsure:       { "status": "insufficient", "message": "what was unclear and what to do next" }
- If not offered:  { "status": "unavailable", "message": "what care seems needed and that it isn't offered here" }
`;

    // Gemini uses roles "user" and "model"
    const contents = history.map((m) => ({
      role: m.role,
      parts: [{ text: m.text }],
    }));

    const r = await fetch(`${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents,
        generationConfig: { responseMimeType: "application/json" }, // JSON mode
      }),
    });

    const data = await r.json();

    if (!r.ok || data.error) {
      console.error("Gemini API error:", data.error || data);
      return res.status(502).json({ status: "error", message: "AI service is unavailable right now." });
    }

    const raw = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!raw) {
      console.error("Gemini response missing candidates:", data);
      return res.status(502).json({ status: "error", message: "AI service returned an unexpected response." });
    }

    res.json(JSON.parse(raw));
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Something went wrong." });
  }
});

export default router;
