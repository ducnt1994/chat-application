import ListItemConversation from "./ListItemConversation";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store";
import {Spin} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import Cookies from "js-cookie";
import {IConversationItem} from "../../../../dto";
import {getConversations} from "../../../../api/conversation";
import {setConversationList} from "../../../../reducers/conversationSlice";
import {useEffect, useState} from "react";

export default function ListConversations() {
  // eslint-disable-next-line
  const {
    conversations,
    isLoadingConversations,
    conversationPage,
    filters,
    searchText,
    scrollToTop
  } = useSelector((state : RootState) => state.conversation)
  const userInfor = JSON.parse(Cookies.get('userInfor') || "{}")
  const dispatch = useDispatch();
  const [hasMoreConversation, setHasMoreConversation] = useState<boolean>(true)
  const loadMoreConversation = async () => {
    const conversations : IConversationItem[] = await getConversations({
      project_id: userInfor?.last_project_active || "",
      page: conversationPage,
      filter: filters,
      ...(searchText && {search: searchText})
    });
    if(!conversations || conversations.length === 0){
      setHasMoreConversation(false)
    }
    dispatch(setConversationList(conversations))
  }

  useEffect(() => {
    const scrollDom = document.getElementById('left-conversation')
    if(scrollDom){
      scrollDom.scrollTo({top: 0, behavior: 'smooth'})
    }
  }, [scrollToTop]);

  return (
    <div id={'left-conversation'}>
      <InfiniteScroll
        dataLength={conversationPage * 20}
        next={loadMoreConversation}
        hasMore={hasMoreConversation}
        loader={<Spin size={'small'}/>}
        height={"calc(100vh - 108px)"}
      >
        {
          isLoadingConversations && <div className={`flex items-center h-full justify-center`}>
            <Spin size="large">
            </Spin>
          </div>
        }
        {
          !isLoadingConversations && conversations.length === 0 && <div className={`mt-2 font-bold`}>Không có cuộc hội thoại nào</div>
        }


        {
          !isLoadingConversations && conversations.length > 0 && conversations.map((conv, key) => {
            return <ListItemConversation key={key} conversationItem={conv}/>
          })
        }
      </InfiniteScroll>
    </div>

  )
}