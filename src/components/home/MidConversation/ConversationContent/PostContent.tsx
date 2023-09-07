import {IMetaData} from "../../../../dto";
import {Image} from "antd";
import {CONVERSATION_TYPE_MEDIA_VIDEO} from "../../../../utils/constants/conversation";

export default function PostContent({postData} : {
  postData: IMetaData
}) {
  return (
    <div className={`pb-6 border-b border-b-gray-300`}>
      <div className={`whitespace-pre-line text-left text-sm text-gray-900`} dangerouslySetInnerHTML={{__html: postData.content}}>
      </div>

      <div className={`mt-2 flex gap-2`}>
        {
          postData.media.map((item, key) => {
            return <div key={key}>
              <div className={`w-[120px] rounded-md h-[120px] border border-gray-200 flex items-center justify-center relative bg-white`}>
                <Image className={`max-w-full max-h-full object-contain`} alt={'avatar'} src={item.type === CONVERSATION_TYPE_MEDIA_VIDEO ? item.thumb : item.url}/>
              </div>
            </div>
          })
        }
      </div>
    </div>

  )
}