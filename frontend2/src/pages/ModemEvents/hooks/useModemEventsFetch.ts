import { useState, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { ModemEventsApiService } from '../services/ModemEventsApiService'
import {
  setModemEvents,
  setModemInfo,
  addCommentToModemEvent,
  removeCommentFromModemEvent,
  resetModemEvents,
} from '../slices/modemEventsSlice'
import { CreateCommentPayload } from '../../Home/models/EventFeedModel'

export const useModemEventsFetch = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isCommenting, setIsCommenting] = useState(false)
  const dispatch = useDispatch()
  const service = useMemo(() => new ModemEventsApiService(), [])

  const fetchEventsByModemId = async (modemId: number, modemImei?: string | null) => {
    const result = await service.getEventsByModemId(modemId, setIsLoading)
    if (result.data) {
      dispatch(setModemEvents(result.data))
      dispatch(setModemInfo({ modemId, modemImei: modemImei || null }))
    }
    return { success: result.status === 200, message: result.message }
  }

  const createComment = async (payload: CreateCommentPayload) => {
    setIsCommenting(true)
    try {
      const result = await service.createComment(payload)
      if (result.data) {
        dispatch(addCommentToModemEvent({ eventId: payload.event_id, comment: result.data }))
      }
      return { success: result.status === 200 || result.status === 201, message: result.message }
    } finally {
      setIsCommenting(false)
    }
  }

  const deleteComment = async (eventId: number, commentId: number) => {
    const result = await service.deleteComment(commentId)
    if (result.status === 200) {
      dispatch(removeCommentFromModemEvent({ eventId, commentId }))
    }
    return { success: result.status === 200, message: result.message }
  }

  const reset = () => {
    dispatch(resetModemEvents())
  }

  return {
    isLoading,
    isCommenting,
    fetchEventsByModemId,
    createComment,
    deleteComment,
    reset,
  }
}
