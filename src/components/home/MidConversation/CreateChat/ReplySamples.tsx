import {Image, Space, Table, Tooltip, Typography} from "antd";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store";
import {ColumnsType} from "antd/es/table";
import {IReplySampleItem} from "../../../../dto/reply-sample";
import {IMAGE_ERROR} from "../../../../utils/constants/conversation";
import styles from "./custom-table.module.scss"

export function ReplySamples({handleSelectSample} : {
  handleSelectSample: (item: IReplySampleItem) => void
}) {
  const {replySamples, replyTopics} = useSelector((state : RootState) => state.conversationScript)

  function getTopicInfo(topicId: string) {
    const indexTopic = replyTopics?.findIndex((item) => item._id === topicId)
    if(indexTopic !== undefined && indexTopic >= 0){
      return {
        name: replyTopics ? replyTopics[indexTopic].name : 'N/A',
        color: replyTopics ? replyTopics[indexTopic].color : 'red'
      }
    }
    return {
      name: '',
      color: ''
    }
  }
  const columns: ColumnsType<IReplySampleItem> = [
    {
      title: <Typography className={`text-xs`}></Typography>,
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
        return <Tooltip placement={'top'} title={shortcut}><div className={`p-0`}>{
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
        return getTopicInfo(replyTopicId) && <Tooltip placement={'top'} title={getTopicInfo(replyTopicId)?.name || ""}>
          <div className={`text-white font-semibold text-xs px-2 py-1 rounded-lg text-center max-w-[100px]`}
                                                  style={{backgroundColor: `${getTopicInfo(replyTopicId)?.color}`}}>
          {getTopicInfo(replyTopicId)?.name.length > 7 ? getTopicInfo(replyTopicId)?.name.substring(0,4) + '...' : getTopicInfo(replyTopicId)?.name}
        </div></Tooltip>
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
  return (
    <Space>
      {
        !replySamples && <Space>
          <Typography className={`text-sm font-bold text-black`}>Chưa cài đặt câu trả lời mẫu</Typography>
        </Space>
      }
      <Space className={`flex flex-col gap-2 ${styles.CustomTable}`}>
        {
          replySamples && <Table
            scroll={{y: 200}}
            pagination={false}
            className={`max-h-[300px] w-[550px]`}
            columns={columns}
            dataSource={replySamples}
            rowKey={({ _id }) => _id}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  handleSelectSample(record)
                }, // click row
              };
            }}
          />
        }
      </Space>


    </Space>
  )
}