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

// Predefined responses for small talk and greetings
const smallTalkResponses = {
  hello: "Hello! I'm Solvars AI. How can I assist you today?",
  hi: "Hi there! How can I help you with Solvars' services?",
  hey: "Hey! What can I do for you today?",
  "how are you":
    "I'm just a chatbot, but I'm here and ready to help! How can I assist you?",
  "what's up":
    "Not much! Just here to assist you with Solvars' services. How can I help?",
  bye: "Goodbye! Feel free to return anytime if you need help. Have a great day! 😊",
  ok: "Alright! Let me know if you have any other questions. 😊",
  okay: "Got it! If you need anything else, just ask. 😊",
  "thank you": "You're very welcome! I'm here whenever you need help. 🚀",
  thanks: "Anytime! Let me know if you have more questions. 😊",
};

// Common questions a user might ask a digital agency
const agencyQuestions = {
  "what services do you offer?":
    "We offer web development, graphic design, digital marketing, and video editing. Let me know if you need more details!",
  "do you create eCommerce websites?":
    "Yes! We specialize in creating eCommerce websites with secure payment gateways and user-friendly designs.",
  "can you help with SEO?":
    "Yes! We provide SEO services to improve your website’s ranking on search engines.",
  "how long does a project take?":
    "Project timelines vary based on complexity. Typically, a website takes a few weeks to a few months to complete.",
  "do you provide ongoing support?":
    "Yes! We offer maintenance and support services even after your project is completed.",
  "how can I contact you?":
    "You can reach us via our contact page or customer support. Let me know if you need more details!",
  "where is your company located?":
    "Solvars is a global digital agency, and we work with international clients worldwide.",
};

// Pricing-related questions
const pricingQuestions = {
  "how much does a website cost?":
    "Pricing depends on your requirements. Please contact us for a custom quote!",
  "what are your rates for digital marketing?":
    "Our digital marketing packages vary based on your needs. Reach out to us for detailed pricing!",
  "how much do you charge for SEO services?":
    "SEO pricing depends on the competition and scope of work. Contact us for a tailored quote!",
  "what is the cost of a logo design?":
    "Logo design prices depend on complexity. Get in touch with us for a price estimate!",
  "do you offer discounts?":
    "We offer special pricing for bulk projects. Contact us to discuss available discounts.",
};

export async function POST(req) {
  try {
    const { message } = await req.json();
    const lowerCaseMessage = message.toLowerCase().trim();

    // Check for small talk responses
    if (smallTalkResponses[lowerCaseMessage]) {
      return NextResponse.json({
        message: smallTalkResponses[lowerCaseMessage],
      });
    }

    // Check for agency service-related questions
    if (agencyQuestions[lowerCaseMessage]) {
      return NextResponse.json({ message: agencyQuestions[lowerCaseMessage] });
    }

    // Check for pricing-related questions
    if (pricingQuestions[lowerCaseMessage]) {
      return NextResponse.json({ message: pricingQuestions[lowerCaseMessage] });
    }

    // OpenAI API for more complex queries
    const systemMessage = `
You are Solvars AI, a helpful chatbot representing Solvars. Your task is to respond to all user messages strictly based on the provided context. 
Always introduce yourself as Solvars AI and ensure your answers are polite, professional, and relevant. 
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
