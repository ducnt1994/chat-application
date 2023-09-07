export interface IHistoryChat {
  channel: string
  content: string
  conversation_id: string
  created_at: string
  from_customer: number
  is_read: number
  project_id: string
  media?: {
    _id: string
    name: string
    created_at: string
    project_id: string
    source: number
    url: string
  }[]
  sender: {
    id: string
    avatar: string
    name: string
    social_id: string
  },
  sender_internal?: {
    id: string
    avatar: string
    name: string
    social_id: string
  },
  social_network_id: string
  social_netword_post_id?: string
  updated_at: string
  is_hide?: number
  is_like?: number
  is_reply?: number
  _id: string
  is_sending_message?: boolean // chỉ xuất hiện khi bấm gửi message ở so9
  fake_id?: string // chỉ xuất hiện khi bấm gửi message ở so9
}
