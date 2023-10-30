import {Typography} from "antd";
import Topic from "./topic";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {loadListReplySample, loadListTopic} from "../../api/conversationScript";
import {Note} from "./note";
import ReplySample from "./replySample";
import {useDispatch} from "react-redux";
import {setReplySamples, setReplyTopics} from "../../reducers/conversationScriptSlice";

export default function ConversationScript() {
  const dispatch = useDispatch()
  const [loadingTopic, setLoadingTopic] = useState(true)
  const [loadingSample, setLoadingSample] = useState(true)

  const userInfor = JSON.parse(Cookies.get('userInfor') || "{}")
  
  const getListTopic = async () => {
    try {
      const listTopic = await loadListTopic(userInfor?.last_project_active as string);
      dispatch(setReplyTopics(listTopic))
      setLoadingTopic(false)
    } catch (e) {
      dispatch(setReplyTopics(undefined))
      setLoadingTopic(false)
    }
  }

  const getListRepSample = async () => {
    try {
      const listReply = await loadListReplySample(userInfor?.last_project_active as string);
      dispatch(setReplySamples(listReply))
      setLoadingSample(false)
    } catch (e) {
      dispatch(setReplySamples(undefined))
      setLoadingSample(false)
    }
  }



  useEffect(() => {
    getListTopic()
    getListRepSample()
    // eslint-disable-next-line
  }, []);
  
  return (
    <div className={`m-auto 2xl:max-w-[1200px] max-w-[1100px]`}>
      <Typography className={`text-2xl`}>Mẫu câu trả lời nhanh</Typography>
      <div className={`mt-6 flex gap-4`}>
        <div className={`w-[356px]`}>
          <Topic loadingTopic={loadingTopic}/>
          <Note/>
        </div>
        <div className={`flex-1`}>
          <ReplySample loadingSample={loadingSample}/>
        </div>
      </div>
    </div>
  )
}