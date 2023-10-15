import {IChannelItem} from "../../channel/info/channel-item";
import {ICustomerInformation} from "../../customer/info/customer-information";
import {IHistoryChat} from "./history-chat";

export interface IConversationItem {
  channel: string
  channel_infor: IChannelItem,
  created_at: string
  customer_info: ICustomerInformation
  is_read: number
  last_chat: {
    content: string
    created_at: string
    from_customer: number
    id: string
    image: string
  }
  last_user_care: {
    avatar: string
    id: string
    name: string
    social_id: string
  }
  number_new_chat: number
  project_id: string
  status: number
  type: number
  updated_at: string
  meta_data: IMetaData
  _id: string
}

export interface IMetaData {
  content: string
  facebook_post_id: string
  fb_pid: string
  id: string
  media: {
    _id: string
    url: string
    name: string
    type?: number
    source?: number
    thumb: string
  }[]
}

export interface IConversationItemLoaded {
  info: IConversationItem
  chatHistory: IHistoryChat[]
  conversationId: string
  customerInfor: ICustomerInformation
  isLoadingItem: false
}

export interface IFilter {
  not_read?: boolean
  has_phone?: boolean
  type?: number
  not_reply?: boolean
  range_time?: {
    from: string
    to: string
  },
}