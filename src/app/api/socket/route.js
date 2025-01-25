import { Server } from "socket.io";

let io;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (!io) {
    io = new Server(res.socket.server, {
      path: "/api/socket",
      addTrailingSlash: false,
    });

    // Event listeners for sockets
    io.on("connection", (socket) => {
      console.log("New client connected");

      // Listening for messages from the client
      socket.on("message", (data) => {
        console.log("Received message:", data.text);

        // Respond with a mock chatbot response
        const botResponse = `Bot: "${data.text}" received and processed.`;
        socket.emit("response", { message: botResponse });
      });

      // Handle disconnection
      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });

    console.log("Socket.io server initialized");
  }
  res.end();
}
