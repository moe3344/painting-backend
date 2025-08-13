const express = require('express');
const OpenAI = require('openai');
const Joi = require('joi');
const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const chatSchema = Joi.object({
  prompt: Joi.string().min(10).max(1000).required(),
});

router.post('/chat', async (req, res, next) => {
  const { error, value } = chatSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const systemPrompt = `
You are a friendly and helpful AI assistant for MOE Painting, a house painting company in Calgary.
Your goal is to answer user questions, provide helpful information, and encourage them to get a quote.
- Be concise and friendly.
- Always mention the company name, MOE Painting.
- If you don't know an answer, say so and suggest they call or fill out the contact form.
- Keep responses under 150 words.
- Key services: Interior Painting, Exterior Painting, Cabinet Refinishing.
- Key features: Fully insured, quality guarantee, on-time service.
- Service area: Calgary and surrounding areas.
- Contact: Call (403) 555-1234 or get a quote on the website.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: value.prompt }
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    const responseContent = completion.choices[0].message.content;
    res.json({ response: responseContent });

  } catch (err) {
    console.error('OpenAI API error:', err);
    next(new Error('Failed to get a response from the AI assistant.'));
  }
});

module.exports = router;