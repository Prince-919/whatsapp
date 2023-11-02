import { MessageModel } from "../model/index.js";

export const createMessage = async (data) => {
  let newMessage = await MessageModel.create(data);
  if (!newMessage) {
    throw createHttpError.BadRequest("Oops...Something went wrong !");
  }
  return newMessage;
};

export const populateMessage = async (id) => {
  let message = await MessageModel.findById(id)
    .populate({
      path: "sender",
      select: "name picture",
      model: "UserModel",
    })
    .populate({
      path: "conversation",
      select: "name isGroup users",
      model: "ConversationModel",
      populate: {
        path: "users",
        select: "name email picture status",
        model: "UserModel",
      },
    });
  if (!message) {
    throw createHttpError.BadRequest("Oops...Something went wrong !");
  }
  return message;
};

export const getConversationMessage = async (conversation_id) => {
  const message = await MessageModel.find({
    conversation: conversation_id,
  })
    .populate("sender", "name email picture status")
    .populate("conversation");
  if (!message) {
    if (!message) {
      throw createHttpError.BadRequest("Oops...Something went wrong !");
    }
  }
  return message;
};
