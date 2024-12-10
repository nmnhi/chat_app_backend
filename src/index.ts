import { json } from "body-parser";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import { saveMessage } from "./controllers/messagesController";
import authRoutes from "./routes/authRoutes";
import contactsRoutes from "./routes/contactsRoutes";
import conversationsRoutes from "./routes/conversationsRoutes";
import messageRoutes from "./routes/messagesRoutes";

const app = express();
const server = http.createServer(app);
app.use(json());
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.use("/auth", authRoutes);
app.use("/conversations", conversationsRoutes);
app.use("/messages", messageRoutes);
app.use("/contacts", contactsRoutes);

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
  socket.on("joinConversation", (conversationId) => {
    socket.join(conversationId);
    console.log(`User ${socket.id} joined conversation ${conversationId}`);
  });

  socket.on("sendMessage", async (message) => {
    const { conversationId, senderId, content } = message;

    try {
      const savedMessage = await saveMessage(conversationId, senderId, content);

      console.log("SendMessage: ");
      console.log(savedMessage);

      io.to(conversationId).emit("newMessage", savedMessage);
      io.emit("conversationUpdated", {
        conversationId,
        lastMessage: savedMessage.content,
        lastMessageTime: savedMessage.created_at
      });
    } catch (error) {
      console.error(`Error sending message ${error}`);
    }
  });
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
  });
});

const PORT = process.env.PORT || 6000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
