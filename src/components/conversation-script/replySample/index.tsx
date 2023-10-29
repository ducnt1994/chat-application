import ItemContent from "../../shared/ItemContent";
import {IconPlus, IconReply} from "../../../assets/svg/ConversationScript/IconConersationScript";
import {IReplySampleItem} from "../../../dto/reply-sample";
import {Image, Spin, Table, Tooltip, Typography} from "antd";
import {ColumnsType} from "antd/es/table";
import {IReplyTopicItem} from "../../../dto/reply-topic";
import {IMAGE_ERROR} from "../../../utils/constants/conversation";
import {lazy, Suspense, useState} from "react";

export default function ReplySample({listSamples, loadingSample, topics, setRepSample} : {
  listSamples: IReplySampleItem[] | undefined
  loadingSample: boolean
  topics: IReplyTopicItem[] | undefined
  setRepSample: (list: IReplySampleItem[]) => void
}) {
  const [openModalAdd, setOpenModalAdd] = useState(false)
  function getTopicInfo(topicId: string) {
    const indexTopic = topics?.findIndex((item) => item._id === topicId)
    if(indexTopic !== undefined && indexTopic >= 0){
      return {
        name: topics ? topics[indexTopic].name : 'N/A',
        color: topics ? topics[indexTopic].color : 'red'
      }
    }
    return null
  }

  const columns: ColumnsType<IReplySampleItem> = [
    {
      title: <Typography className={`text-xs`}>STT</Typography>,
      dataIndex: 'position',
      key: 'position',
      width: '10%'
    },
    {
      title: <Typography className={`text-xs`}>Phím tắt</Typography>,
      dataIndex: 'shortcut',
      key: 'shortcut',
      width: '15%',
      render: (shortcut: string) => {
        return <Tooltip placement={'top'} title={shortcut}><div>{
          typeof shortcut !== 'undefined'
            ? shortcut.length > 8
              ? shortcut.substring(0,5) + '...'
              : shortcut
            : ''
        }</div></Tooltip>
      }
    },
    {
      title: <Typography className={`text-xs`}>Chủ đề</Typography>,
      dataIndex: 'reply_topic_id',
      key: 'reply_topic_id',
      width: '20%',
      render: (replyTopicId: string) => {
        return getTopicInfo(replyTopicId) && <div className={`text-white font-bold text-xs px-2 py-1 rounded-lg text-center max-w-[100px]`}
                    style={{backgroundColor: `${getTopicInfo(replyTopicId)?.color}`}}>
          {getTopicInfo(replyTopicId)?.name}
        </div>
      }
    },
    {
      title: '',
      key: 'medias',
      dataIndex: 'medias',
      width: '10%',
      render: (_, { medias }) => (
        <>
          <Tooltip placement={'bottom'} title={<div className={`flex gap-2 flex-wrap`}>
            {
              medias.map((item) => {
                return <div className={`w-[28px] h-[28px] flex justify-center`} key={item}>
                  <Image fallback={IMAGE_ERROR} className={`w-full max-h-[28px]`} src={item} alt={item}/>
                </div>
              })
            }
          </div>}>
            {medias.length > 0 && <div className={`w-[28px] h-[28px] overflow-hidden relative`} style={{opacity: '0.5'}}>
              <Image src={medias[0]} alt={medias[0]} className={`w-[28px] max-h-full object-contain`} />
              {
                medias.length > 1 && <div
                  style={{
                    // transform: 'translate(-50%, -50%)',
                    paddingLeft: '4px',
                    paddingTop: '3px'
                  }}
                  className={`absolute top-0 left-0 font-bold text-white h-[28px] w-[28px] overflow-hidden bg-black bg-fixed opacity-90`}>
                  +{medias.length - 1}
                </div>
              }
            </div>
            }
          </Tooltip>

        </>
      ),
    },
    {
      title: <Typography className={`text-xs`}>Nội dung</Typography>,
      key: 'content',
      dataIndex: 'content',
      width: '50%',
      render: (content : any) => (
        <Tooltip placement={'left'} title={content || ""}>
          <div>{
            typeof content !== 'undefined'
              ? content.length > 50
                ? content.substring(0,45) + '...'
                : content
              : ''
          }</div>
        </Tooltip>
      ),
    },
  ];
  const genTableReply = () => {
    if(loadingSample){
      return <div className={`flex items-center h-full justify-center`}>
        <Spin size="large">
        </Spin>
      </div>
    } else {
      if(listSamples === undefined){
        return <>Không tồn tại câu trả lời mẫu</>
      } else if (listSamples.length === 0){
        return <div className={`flex justify-center text-sm font-semibold`}>Chưa có câu trả lời mẫu</div>
      } else {
        return <div className={`flex flex-col max-h-[800px] gap-2 overflow-auto`}>
          {
            listSamples && listSamples.length > 0 && <Table columns={columns} dataSource={listSamples} />
          }
        </div>
      }
    }
  }

  const handleCreateReplySample = (item: IReplySampleItem) => {
    const newListSample = [...listSamples || []]
    newListSample.push(item)
    setRepSample(newListSample)
    setOpenModalAdd(false)
  }
  
  return (
    <div>
      <ItemContent
        childContent={genTableReply()}
        iconTitle={<IconReply/>}
        title={'Mẫu câu trả lời nhanh'}
        iconExtra={<div className={`cursor-pointer`} onClick={() => setOpenModalAdd(true)}>
          <IconPlus/>
        </div>}
      />
      <Suspense>
        <ModalAddNewSample
          topics={topics}
          open={openModalAdd}
          handleClose={() => setOpenModalAdd(false)}
          handleConfirm={(item: IReplySampleItem) => handleCreateReplySample(item)}/>
      </Suspense>
    </div>
  )
}

const ModalAddNewSample = lazy(() => import('./ModalAddNewSample'))