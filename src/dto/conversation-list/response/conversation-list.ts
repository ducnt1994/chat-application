import {IChannelItem} from "../../channel/info/channel-item";
import {ICustomerInformation} from "../../customer/info/customer-information";

export interface IConversationList {

}

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
  _id: string
}