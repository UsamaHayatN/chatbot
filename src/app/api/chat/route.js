import { NextResponse } from "next/server";
import { OpenAI } from "openai";

// Set up OpenAI API configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Predefined paragraph with Solvars' services
const solvarsInfo = `
Solvars provides web development, graphic design, digital marketing, and video editing services. 
We build modern websites using the MERN stack and offer SEO, social media management, and branding solutions. 
Our team ensures top-quality results with ongoing support. Reach out anytime!
`;

// Predefined responses for small talk
const smallTalkResponses = {
  hello: "Hey there! How can I help?",
  hi: "Hi! What can I do for you?",
  hey: "Hey! Need any help?",
  "how are you": "I'm good! Thanks for asking. How about you?",
  "what's up": "Not much! Just here to assist you. What's up with you?",
  bye: "Take care! Catch you later. 😊",
  ok: "Alright! Let me know if you need anything else. 😊",
  okay: "Got it! I'm here if you have more questions. 😊",
  "thank you": "You're welcome! Happy to help. 🚀",
  thanks: "Anytime! Let me know if you need anything else. 😊",
};

// Common service-related questions
const agencyQuestions = {
  "what services do you offer?":
    "We do web development, digital marketing, design, and video editing. Need details?",
  "do you create eCommerce websites?":
    "Yep! We build secure and user-friendly eCommerce sites.",
  "can you help with SEO?": "Absolutely! We can boost your search rankings.",
  "how long does a project take?":
    "Depends on the project, but usually a few weeks to a couple of months.",
  "do you provide ongoing support?":
    "Yes! We’re here even after the project is done.",
  "how can I contact you?":
    "You can reach us via our contact page or support team! Need the link?",
  "where is your company located?":
    "We're a global agency working with clients worldwide!",
};

// Pricing-related questions
const pricingQuestions = {
  "how much does a website cost?":
    "It depends on what you need. Want a custom quote?",
  "what are your rates for digital marketing?":
    "Pricing varies by package. I can share details if you’d like!",
  "how much do you charge for SEO services?":
    "SEO costs depend on your goals. Let’s discuss what you need!",
  "what is the cost of a logo design?":
    "Prices vary based on complexity. Want a quick estimate?",
  "do you offer discounts?": "We do for bulk projects! Want to chat about it?",
};

let firstInteraction = true; // Track if it's the first message

export async function POST(req) {
  try {
    const { message } = await req.json();
    const lowerCaseMessage = message.toLowerCase().trim();

    // First-time introduction
    if (firstInteraction) {
      firstInteraction = false;
      return NextResponse.json({
        message: "Hey! I'm Solvars AI. How can I assist you today?",
      });
    }

    // Check for predefined responses
    if (smallTalkResponses[lowerCaseMessage]) {
      return NextResponse.json({
        message: smallTalkResponses[lowerCaseMessage],
      });
    }

    if (agencyQuestions[lowerCaseMessage]) {
      return NextResponse.json({ message: agencyQuestions[lowerCaseMessage] });
    }

    if (pricingQuestions[lowerCaseMessage]) {
      return NextResponse.json({ message: pricingQuestions[lowerCaseMessage] });
    }

    // OpenAI API for complex queries
    const systemMessage = `
    You are Solvars AI, a friendly and professional chatbot. Keep responses short, natural, and engaging. Use this context to answer:
    ${solvarsInfo}
    If a question is unrelated, say: "I can help with anything related to Solvars!".
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: message },
      ],
    });

    const botReply = response.choices[0].message.content;

    return NextResponse.json({ message: botReply });
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    return NextResponse.json(
      { error: "Something went wrong. Try again later." },
      { status: 500 }
    );
  }
}
