import {API} from "../libs/client";
import {IReplyTopicItem} from "../dto/reply-topic";
import {IReplySampleItem} from "../dto/reply-sample";

export const loadListTopic = async (projectId : string): Promise<IReplyTopicItem[]> => {
  const uri = `projects/${projectId}/reply-topic`;
  const res = await API.get(uri);
  return res.data.data;
};

export const createTopic = async (projectId : string, data: {name: string, color: string}): Promise<string> => {
  const uri = `projects/${projectId}/reply-topic`;
  const res = await API.post(uri, data);
  return res.data.data;
};

export const delTopic = async (projectId : string, topicId: string): Promise<boolean> => {
  const uri = `projects/${projectId}/reply-topic/${topicId}`;
  const res = await API.delete(uri);
  return res.data.data;
};

export const loadListReplySample = async (projectId : string): Promise<IReplySampleItem[]> => {
  const uri = `projects/${projectId}/reply-sample`;
  const res = await API.get(uri);
  return res.data.data;
};

export const addReplySample = async (projectId : string, data: {}): Promise<IReplySampleItem> => {
  const uri = `projects/${projectId}/reply-sample`;
  const res = await API.post(uri, data);
  return res.data.data;
};

export const updateReplySample = async (projectId : string, data: {}, replySampleId : string): Promise<IReplySampleItem> => {
  const uri = `projects/${projectId}/reply-sample/${replySampleId}`;
  console.log(replySampleId)
  const res = await API.put(uri, data);
  return res.data.data;
};

export const delReplySample = async (projectId : string, sampleId: string): Promise<boolean> => {
  const uri = `projects/${projectId}/reply-sample/${sampleId}`;
  const res = await API.delete(uri);
  return res.data.data;
};