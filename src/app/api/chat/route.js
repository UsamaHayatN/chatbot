import { NextResponse } from "next/server";
import { OpenAI } from "openai"; // Corrected import

// Set up OpenAI API configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { message } = await req.json(); // Extract user message from the request body

    // Send the user's message to OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [
        { role: "system", content: "You are a helpful chatbot." }, // System instructions for the bot
        { role: "user", content: message }, // User message
      ],
    });

    // Extract bot's reply from the response
    const botReply = response.choices[0].message.content;

    // Send the bot's reply back to the frontend
    return NextResponse.json({ message: botReply });
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    return NextResponse.json(
      { error: "Failed to generate a response. Please try again later." },
      { status: 500 }
    );
  }
}
