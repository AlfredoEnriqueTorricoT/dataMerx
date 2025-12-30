import { useState, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { SimEventsApiService } from '../services/SimEventsApiService'
import {
  setSimEvents,
  setSimInfo,
  addCommentToSimEvent,
  removeCommentFromSimEvent,
  resetSimEvents,
} from '../slices/simEventsSlice'
import { CreateCommentPayload } from '../../Home/models/EventFeedModel'

export const useSimEventsFetch = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isCommenting, setIsCommenting] = useState(false)
  const dispatch = useDispatch()
  const service = useMemo(() => new SimEventsApiService(), [])

  const fetchEventsBySimId = async (simId: number, simNumber?: string | null) => {
    const result = await service.getEventsBySimId(simId, setIsLoading)
    if (result.data) {
      dispatch(setSimEvents(result.data))
      dispatch(setSimInfo({ simId, simNumber: simNumber || null }))
    }
    return { success: result.status === 200, message: result.message }
  }

  const createComment = async (payload: CreateCommentPayload) => {
    setIsCommenting(true)
    try {
      const result = await service.createComment(payload)
      if (result.data) {
        dispatch(addCommentToSimEvent({ eventId: payload.event_id, comment: result.data }))
      }
      return { success: result.status === 200 || result.status === 201, message: result.message }
    } finally {
      setIsCommenting(false)
    }
  }

  const deleteComment = async (eventId: number, commentId: number) => {
    const result = await service.deleteComment(commentId)
    if (result.status === 200) {
      dispatch(removeCommentFromSimEvent({ eventId, commentId }))
    }
    return { success: result.status === 200, message: result.message }
  }

  const reset = () => {
    dispatch(resetSimEvents())
  }

  return {
    isLoading,
    isCommenting,
    fetchEventsBySimId,
    createComment,
    deleteComment,
    reset,
  }
}
