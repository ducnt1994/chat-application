import {Typography} from "antd";
import Topic from "./topic";
import {useEffect, useState} from "react";
import {IReplyTopicItem} from "../../dto/reply-topic";
import Cookies from "js-cookie";
import {loadListReplySample, loadListTopic} from "../../api/conversationScript";
import {Note} from "./note";
import ReplySample from "./replySample";
import {IReplySampleItem} from "../../dto/reply-sample";

export default function ConversationScript() {
  const [topics, setTopics] = useState<IReplyTopicItem[] | undefined>()
  const [loadingTopic, setLoadingTopic] = useState(true)

  const [repSamples, setRepSample] = useState<IReplySampleItem[] | undefined>()
  const [loadingSample, setLoadingSample] = useState(true)

  const userInfor = JSON.parse(Cookies.get('userInfor') || "{}")
  
  const getListTopic = async () => {
    try {
      const listTopic = await loadListTopic(userInfor?.last_project_active as string);
      setTopics(listTopic)
      setLoadingTopic(false)
    } catch (e) {
      setTopics(undefined)
      setLoadingTopic(false)
    }
  }

  const getListRepSample = async () => {
    try {
      const listReply = await loadListReplySample(userInfor?.last_project_active as string);
      setRepSample(listReply)
      setLoadingSample(false)
    } catch (e) {
      setRepSample(undefined)
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
          <Topic topics={topics} setTopics={(newList : IReplyTopicItem[]) => setTopics(newList)} loadingTopic={loadingTopic}/>
          <Note/>
        </div>
        <div className={`flex-1`}>
          <ReplySample listSamples={repSamples} setRepSample={(list : IReplySampleItem[]) => setRepSample(list)} loadingSample={loadingSample} topics={topics}/>
        </div>
      </div>
    </div>
  )
}