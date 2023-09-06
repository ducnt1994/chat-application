
import { API } from "../libs/client";
import {IFilterConversation} from "../dto";
import {IHistoryChat} from "../dto/conversation-list/response/history-chat";

/**
 * @param {{params: {project_id: string, page: number}}} data
 * @returns
 */
export const getConversations = async (data : IFilterConversation) => {
  const uri = "/projects/bot-chat/conversations";
  const res = await API.post(uri, data);
  return res.data.data;
};

// /**
//  * @param {string} conversationId
//  * @param {{params: {project_id: string}}} data
//  * @returns
//  */
// export const getConversation = async (conversationId, data = {}) => {
//   const uri = `/projects/bot-chat/conversations/${conversationId}`;
//   const res = await API.get(uri, data);
//   return res.data;
// };
//
/**
 * @param {string} conversationId
 * @param {{params: {project_id: string, page: number}}} data
 * @returns
 */
export const getConversationChats = async (conversationId : string, data = {}): Promise<IHistoryChat[]> => {
  const uri = `/projects/bot-chat/conversations/${conversationId}/chats/list`;
  const res = await API.get(uri, data);
  return res.data.data;
};
//
// /**
//  * @param {{project_id: string, channel: string, customer_id: string}} data
//  * @returns
//  */
// export const createChat = async (data = {}) => {
//   const uri = `/projects/bot-chat/conversations/create`;
//   const res = await API.post(uri, data);
//   return res.data;
// };
//
// /**
//  * @param {string} conversationId
//  * @param {{project_id: string, content: string, image: string}} data
//  * @returns
//  */
// export const sendChat = async (conversationId, data = {}) => {
//   const uri = `/projects/bot-chat/conversations/${conversationId}/chats`;
//   const res = await API.post(uri, data);
//   return res.data;
// };
//
// /**
//  * @param {string} conversationId
//  * @param {{project_id: string}} data
//  * @returns
//  */
// export const confirmRead = async (conversationId, data = {}) => {
//   const uri = `projects/bot-chat/conversations/${conversationId}/markRead`;
//   const res = await API.post(uri, data);
//   return res.data;
// };
// export const confirmUnread = async (conversationId, data = {}) => {
//   const uri = `projects/bot-chat/conversations/${conversationId}/mark-unread`;
//   const res = await API.post(uri, data);
//   return res.data;
// };
//
// /**
//  * @param {project_id: string} project_id
//  * @returns
//  */
// export const getConversationUnread = async (data = {}) => {
//   const uri = `projects/bot-chat/conversations/unRead`;
//   const res = await API.get(uri, data);
//   return res.data;
// };
//
// /**
//  * @param {string} conversationId
//  * @param {{params: {project_id: string, page: number}}} data
//  * @returns
//  */
// export const getConversationComments = async (conversationId, data = {}) => {
//   const uri = `/projects/bot-chat/conversations/${conversationId}/comments/list`;
//   const res = await API.get(uri, data);
//   return res.data;
// };
//
// /**
//  * @param {string} conversationId
//  * @param {{project_id: string, content: string, image: string}} data
//  * @returns
//  */
// export const sendComment = async (conversationId, data = {}) => {
//   const uri = `/projects/bot-chat/conversations/${conversationId}/comments`;
//   const res = await API.post(uri, data);
//   return res.data;
// };
//
// /**
//  * @param {string} conversationId
//  * @param {{project_id: string, content: string, image: string}} data
//  * @returns
//  */
// export const addNoteConversation = async (conversationId, data = {}) => {
//   const uri = `/projects/bot-chat/conversations/${conversationId}/add-note`;
//   const res = await API.post(uri, data);
//   return res.data;
// };
//
// export const getAllTag = async (projectId, data) => {
//   const uri = `projects/${projectId}/tags/list`;
//   const res = await API.get(uri, data);
//   return res.data;
// };
//
// export const getChannels = async (projectId, data) => {
//   data.status = 1;
//   const uri = `/projects/${projectId}/channels/list`;
//   const res = await API.get(uri, data);
//   return res.data;
// };