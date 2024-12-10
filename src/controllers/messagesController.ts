import { Request, Response } from "express";
import pool from "../models/db";

export const fetchAllMessagesByConversationId = async (
  req: Request,
  res: Response
) => {
  const { conversationId } = req.params;

  try {
    const result = await pool.query(
      `
				SELECT m.id, m.content, m.sender_id, m.conversation_id, m.created_at
				FROM messages m
				WHERE m.conversation_id = $1
				ORDER BY m.created_at ASC;
			`,
      [conversationId]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

export const saveMessage = async (
  conversationId: string,
  senderId: string,
  content: string
) => {
  console.log(
    `Conservation id: ${conversationId}, Sender ID: ${senderId}, Content: ${content}`
  );
  try {
    const result = await pool.query(
      `
				INSERT INTO messages(conversation_id, sender_id, content)
				VALUES($1, $2, $3)
				RETURNING *;
			`,
      [conversationId, senderId, content]
    );

    console.log(result.rows);
    return result.rows[0];
  } catch (error) {
    console.log(`Error saving message ${error}`);
    throw new Error("Failed to save message");
  }
};
