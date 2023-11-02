import logger from "../config/logger.config.js";
import { updateLatestMessage } from "../services/conversation.service.js";
import {
  createMessage,
  getConversationMessage,
  populateMessage,
} from "../services/message.service.js";

export const sendMessage = async (req, res, next) => {
  try {
    const user_id = req.user.userId;
    const { message, conversation_id, files } = req.body;
    if (!conversation_id && (!message || !files)) {
      logger.error("Please provide a conversation id and a message");
      return res.sendStatus(400);
    }
    const messageData = {
      sender: user_id,
      message,
      conversation: conversation_id,
      files: files || [],
    };
    let newMessage = await createMessage(messageData);
    let populatedMessage = await populateMessage(newMessage._id);
    await updateLatestMessage(conversation_id, newMessage);
    res.json(populatedMessage);
  } catch (error) {
    next(error);
  }
};
export const getMessages = async (req, res, next) => {
  try {
    const conversation_id = req.params.conversation_id;
    if (!conversation_id) {
      logger.error("Please provide a conversation id in params.");
      return res.sendStatus(400);
    }
    const message = await getConversationMessage(conversation_id);
    res.json(message);
  } catch (error) {
    next(error);
  }
};
