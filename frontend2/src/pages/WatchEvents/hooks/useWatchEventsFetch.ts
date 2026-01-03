import { useState, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { WatchEventsApiService } from '../services/WatchEventsApiService'
import {
  setWatchEvents,
  setWatchInfo,
  addCommentToWatchEvent,
  removeCommentFromWatchEvent,
  resetWatchEvents,
} from '../slices/watchEventsSlice'
import { CreateCommentPayload } from '../../Home/models/EventFeedModel'

export const useWatchEventsFetch = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isCommenting, setIsCommenting] = useState(false)
  const dispatch = useDispatch()
  const service = useMemo(() => new WatchEventsApiService(), [])

  const fetchEventsByWatchId = async (watchId: number, watchCode?: string | null) => {
    const result = await service.getEventsByWatchId(watchId, setIsLoading)
    if (result.data) {
      dispatch(setWatchEvents(result.data))
      dispatch(setWatchInfo({ watchId, watchCode: watchCode || null }))
    }
    return { success: result.status === 200, message: result.message }
  }

  const createComment = async (payload: CreateCommentPayload) => {
    setIsCommenting(true)
    try {
      const result = await service.createComment(payload)
      if (result.data) {
        dispatch(addCommentToWatchEvent({ eventId: payload.event_id, comment: result.data }))
      }
      return { success: result.status === 200 || result.status === 201, message: result.message }
    } finally {
      setIsCommenting(false)
    }
  }

  const deleteComment = async (eventId: number, commentId: number) => {
    const result = await service.deleteComment(commentId)
    if (result.status === 200) {
      dispatch(removeCommentFromWatchEvent({ eventId, commentId }))
    }
    return { success: result.status === 200, message: result.message }
  }

  const reset = () => {
    dispatch(resetWatchEvents())
  }

  return {
    isLoading,
    isCommenting,
    fetchEventsByWatchId,
    createComment,
    deleteComment,
    reset,
  }
}
