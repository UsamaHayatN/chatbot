import { NextResponse } from "next/server";
import { OpenAI } from "openai"; // Corrected import

// Set up OpenAI API configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Predefined paragraph with Solvars' services
const solvarsInfo = `
At Solvars, we offer a wide range of digital services to help businesses thrive online, including web development, graphic design, digital marketing, and video editing. 
Our web development services include custom website creation, eCommerce platform development, and responsive designs tailored to your needs. 
We use technologies like MERN stack (MongoDB, Express.js, React.js, and Node.js) for building scalable, high-performance web applications. 
Our digital marketing packages include SEO, social media management, and PPC campaigns to enhance your online presence. 
Graphic design services cover branding, logo creation, and visual content. 
We offer competitive pricing based on the scope of the project and can provide custom quotes for web development, marketing, or design services. 
The timeline for web development projects depends on the complexity but typically takes a few weeks to a few months. 
Once a project is completed, we also offer ongoing support and maintenance. 
Our team is ready to assist you in booking a consultation, providing project updates, or answering any questions related to our services. 
Solvars is located globally, and we happily work with international clients. You can easily reach out to us via our contact page or by messaging our customer support team. 
We’re here to guide you through each step and help you achieve your business goals with innovative digital solutions.
`;

export async function POST(req) {
  try {
    const { message } = await req.json(); // Extract user message from the request body

    const systemMessage = `
You are Solvars.AI, a helpful chatbot representing Solvars. Your task is to respond to all user messages strictly based on the provided context. 
Always introduce yourself as Solvars.AI and ensure your answers are polite, professional, and relevant. 
Use the following context to answer questions:

${solvarsInfo}

Instructions:
- If the user asks about Solvars' services, pricing, timelines, or support, provide detailed and helpful responses based on the context.
- If the question is irrelevant to Solvars' services, respond with: "I'm sorry, I can only answer questions related to Solvars' services."
- Be autonomous and conversational when generating responses within the context of Solvars' information.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: message },
      ],
    });

    // Extract bot's reply from the response
    const botReply = response.choices[0].message.content;

    return NextResponse.json({ message: botReply });
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    return NextResponse.json(
      { error: "Failed to generate a response. Please try again later." },
      { status: 500 }
    );
  }
}
