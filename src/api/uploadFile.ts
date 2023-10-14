import { API } from "../libs/client";

export interface IFormUpload extends FormData {
  image: any,
  projectId: string,
  folder: string
}

const CDN_URI = {
  UPLOAD_IMAGE: "/v1/upload/image",
  UPLOAD_VIDEO_INIT_METADATA: "/v1/upload/video/metadata",
  UPLOAD_VIDEO_PART: "/v1/upload/video/upload",
};

export const uploadImage = async (data : any) => {
  const res = await API.post(CDN_URI.UPLOAD_IMAGE, data, {
    baseURL: process.env.REACT_APP_CDN_API + "api",
  });
  return res.data;
};