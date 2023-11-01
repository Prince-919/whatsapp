import createHttpError from "http-errors";
import { ConversationModel, UserModel } from "../model/index.js";

export const doesConversationExist = async (sender_id, receiver_id) => {
  let conversation = await ConversationModel.find({
    isGroup: false,
    $and: [{ users: { $elemMatch: { $eq: sender_id } } }],
    $and: [{ users: { $elemMatch: { $eq: receiver_id } } }],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  if (!conversation) {
    throw createHttpError.BadRequest("Oops...Something went wrong !");
  }

  // Message model populate
  conversation = await UserModel.populate(conversation, {
    path: "latestMessage.sender",
    select: "name email picture status",
  });
  return conversation[0];
};

export const createConversation = async (data) => {
  const newConversation = await ConversationModel.create(data);
  if (!newConversation) {
    throw createHttpError.BadRequest("Oops...Something went wrong !");
  }
  return newConversation;
};

export const populateConversation = async (
  id,
  fieldToPopulate,
  fieldToRemove
) => {
  const populatedConversation = await ConversationModel.findOne({
    _id: id,
  }).populate(fieldToPopulate, fieldToRemove);
  if (!populatedConversation) {
    throw createHttpError.BadRequest("Oops...Something went wrong !");
  }
  return populatedConversation;
};

export const getUserConversations = async (user_id) => {
  let conversations;
  await ConversationModel.find({
    users: { $elemMatch: { $eq: user_id } },
  })
    .populate("users", "-password")
    .populate("admin", "-password")
    .populate("latestMessage")
    .sort({ updatedAt: -1 })
    .then(async (results) => {
      results = await UserModel.populate(results, {
        path: "latestMessage.sender",
        select: "name email picture, status",
      });
      conversations = results;
    })
    .catch((err) => {
      throw createHttpError.BadRequest("Oops...Something went wrong !");
    });
  return conversations;
};
