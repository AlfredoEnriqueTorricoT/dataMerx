import { httpRequestWithAuth, transformApiData } from '../../../shared/utils/httpService'
import { ApiResponse, SetStateFn } from '../../../shared/types'
import {
  EventModel,
  EventApiResponse,
  CreateCommentPayload,
  CommentModel,
  CommentApiResponse,
} from '../../Home/models/EventFeedModel'
import {
  adaptEventListResponseToModel,
  adaptCommentResponseToModel,
} from '../../Home/adapters/eventFeedAdapter'

interface WatchEventsApiResponseWrapper {
  status: number
  message: string
  data: EventApiResponse[]
}

interface CommentApiResponseWrapper {
  status: number
  message: string
  data: CommentApiResponse
}

export class WatchEventsApiService {
  async getEventsByWatchId(
    watchId: number,
    setLoading?: SetStateFn
  ): Promise<ApiResponse<EventModel[]>> {
    const res = await httpRequestWithAuth.get<WatchEventsApiResponseWrapper>(
      `event/watch/${watchId}`,
      setLoading
    )

    return transformApiData(res, (data) => adaptEventListResponseToModel(data.data || []))
  }

  async createComment(
    payload: CreateCommentPayload,
    setLoading?: SetStateFn
  ): Promise<ApiResponse<CommentModel>> {
    const res = await httpRequestWithAuth.post<CommentApiResponseWrapper>(
      'comment',
      payload,
      setLoading
    )

    return transformApiData(res, (data) => adaptCommentResponseToModel(data.data))
  }

  async deleteComment(commentId: number, setLoading?: SetStateFn): Promise<ApiResponse<void>> {
    return await httpRequestWithAuth.delete<void>(`comment/${commentId}`, setLoading)
  }
}
