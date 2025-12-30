import { httpRequestWithAuth, transformApiData } from '../../../shared/utils/httpService'
import { ApiResponse, SetStateFn } from '../../../shared/types'
import {
  EventModel,
  EventApiResponse,
  PaginatedApiResponse,
  PaginationModel,
  CreateCommentPayload,
  CommentModel,
  CommentApiResponse,
} from '../models/EventFeedModel'
import {
  adaptEventListResponseToModel,
  adaptPaginationResponseToModel,
  adaptCommentResponseToModel,
} from '../adapters/eventFeedAdapter'

interface EventFeedApiResponseWrapper {
  status: number
  message: string
  data: PaginatedApiResponse<EventApiResponse>
}

interface CommentApiResponseWrapper {
  status: number
  message: string
  data: CommentApiResponse
}

export interface EventFeedResult {
  events: EventModel[]
  pagination: PaginationModel
}

export class EventFeedApiService {
  /**
   * Obtener feed de eventos con paginación
   */
  async getFeed(
    page: number = 1,
    date?: string | null,
    search?: string | null,
    setLoading?: SetStateFn
  ): Promise<ApiResponse<EventFeedResult>> {
    let url = `event/feed?page=${page}`

    if (date) {
      url += `&date=${date}`
    }

    if (search) {
      url += `&search=${encodeURIComponent(search)}`
    }

    const res = await httpRequestWithAuth.get<EventFeedApiResponseWrapper>(url, setLoading)

    return transformApiData(res, (data) => ({
      events: adaptEventListResponseToModel(data.data.data || []),
      pagination: adaptPaginationResponseToModel(data.data),
    }))
  }

  /**
   * Crear un comentario en un evento
   */
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

  /**
   * Eliminar un comentario
   */
  async deleteComment(commentId: number, setLoading?: SetStateFn): Promise<ApiResponse<void>> {
    return await httpRequestWithAuth.delete<void>(`comment/${commentId}`, setLoading)
  }
}
