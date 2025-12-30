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

interface ModemEventsApiResponseWrapper {
  status: number
  message: string
  data: EventApiResponse[]
}

interface CommentApiResponseWrapper {
  status: number
  message: string
  data: CommentApiResponse
}

export class ModemEventsApiService {
  /**
   * Obtener eventos de un modem específico
   */
  async getEventsByModemId(
    modemId: number,
    setLoading?: SetStateFn
  ): Promise<ApiResponse<EventModel[]>> {
    const res = await httpRequestWithAuth.get<ModemEventsApiResponseWrapper>(
      `event/modem/${modemId}`,
      setLoading
    )

    return transformApiData(res, (data) => adaptEventListResponseToModel(data.data || []))
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
