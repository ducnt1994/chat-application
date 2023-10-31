import ItemContent from "../../shared/ItemContent";
import {IconEdit, IconPlus, IconReply, IconTrash} from "../../../assets/svg/ConversationScript/IconConersationScript";
import {IReplySampleItem} from "../../../dto/reply-sample";
import {Image, message, Spin, Table, Tooltip, Typography} from "antd";
import {ColumnsType} from "antd/es/table";
import {IMAGE_ERROR} from "../../../utils/constants/conversation";
import {lazy, Suspense, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setReplySamples} from "../../../reducers/conversationScriptSlice";
import {RootState} from "../../../store";
import {delReplySample} from "../../../api/conversationScript";
import {getUserInfor} from "../../../helper/common";

export default function ReplySample({ loadingSample} : {
  loadingSample: boolean
}) {
  const {replySamples, replyTopics} = useSelector((state : RootState) => state.conversationScript)
  const dispatch = useDispatch()
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [openModalUpdate, setOpenModalUpdate] = useState(false)
  const [currentRowHover, setCurrentRowHover] = useState('')
  function getTopicInfo(topicId: string) {
    const indexTopic = replyTopics?.findIndex((item) => item._id === topicId)
    if(indexTopic !== undefined && indexTopic >= 0){
      return {
        name: replyTopics ? replyTopics[indexTopic].name : 'N/A',
        color: replyTopics ? replyTopics[indexTopic].color : 'red'
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
      render: (content : string, record) => (
        <Tooltip placement={'left'} title={content || ""}>
          <div className={`relative`}>
            <div>{
              typeof content !== 'undefined'
                ? content.length > 40
                  ? content.substring(0,25) + '...'
                  : content
                : ''
            }</div>
            {
              currentRowHover === record._id && <div className={`absolute right-0 top-0 flex gap-2`}>
                <div className={`cursor-pointer`} onClick={() => {
                  setOpenModalUpdate(true)
                }}><IconEdit/></div>
                <div className={`cursor-pointer`} onClick={handleDeleteReplySample}><IconTrash/></div>
              </div>
            }
          </div>

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
      if(replySamples === undefined){
        return <>Không tồn tại câu trả lời mẫu</>
      } else if (replySamples.length === 0){
        return <div className={`flex justify-center text-sm font-semibold`}>Chưa có câu trả lời mẫu</div>
      } else {
        return <div className={`flex flex-col max-h-[800px] gap-2 overflow-auto`}>
          {
            replySamples && replySamples.length > 0 && <Table
              rowKey={({ _id }) => _id}
              columns={columns}
              dataSource={replySamples}
              onRow={(record, rowIndex) => {
                return {
                  onMouseEnter: (event) => {
                    setCurrentRowHover(record._id)
                  }, // mouse enter row
                  onMouseLeave: (event) => {
                    setCurrentRowHover('')
                  }, // mouse leave row
                };
              }}
            />
          }
        </div>
      }
    }
  }
  
  const handleDeleteReplySample = async () => {
    try {
      const delSample = await delReplySample(getUserInfor()?.last_project_active, currentRowHover)
      if(delSample){
        const newListSample = [...replySamples || []]
        const findIndexSampleByIdDel = newListSample.findIndex((item) => item._id === currentRowHover)
        if(findIndexSampleByIdDel >= 0){
          newListSample.splice(findIndexSampleByIdDel, 1)
          dispatch(setReplySamples(newListSample))
        }
        message.success('Xoá câu trả lời mẫu thành công')
      }
    } catch (e) {
      message.error('Xoá câu trả lời mẫu thất bại')
    }
  }

  const handleCreateReplySample = (item: IReplySampleItem) => {
    const newListSample = [...replySamples || []]
    newListSample.push(item)
    dispatch(setReplySamples(newListSample))
    setOpenModalAdd(false)
  }

  const handleUpdareReplySample = (item: IReplySampleItem) => {
    const newListSample = [...replySamples || []]
    const replaceItem = newListSample.findIndex((itemReplace) => itemReplace._id === item._id)
    if(replaceItem){
      newListSample.splice(replaceItem, 1, item)
      dispatch(setReplySamples(newListSample))
    }
    dispatch(setReplySamples(newListSample))
    setOpenModalUpdate(false)
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
          open={openModalAdd}
          handleClose={() => setOpenModalAdd(false)}
          handleConfirm={(item: IReplySampleItem) => handleCreateReplySample(item)}/>
      </Suspense>
      <Suspense>
        <ModalUpdateSample
          open={openModalUpdate}
          handleClose={() => setOpenModalUpdate(false)}
          handleConfirm={(item: IReplySampleItem) => handleUpdareReplySample(item)}
          currentSampleId={currentRowHover}
        />
      </Suspense>
    </div>
  )
}

const ModalAddNewSample = lazy(() => import('./ModalAddNewSample'))
const ModalUpdateSample = lazy(() => import('./ModalUpdateSample'))