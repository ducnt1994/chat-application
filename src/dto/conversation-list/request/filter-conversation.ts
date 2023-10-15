import {IFilter} from "../response/conversation-list";

export interface IFilterConversation {
  project_id: string
  page: number
  filter: IFilter
  search?: string
}