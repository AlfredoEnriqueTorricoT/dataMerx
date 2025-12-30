import { useState, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { CarEventsApiService } from '../services/CarEventsApiService'
import {
  setCarEvents,
  setCarInfo,
  addCommentToCarEvent,
  removeCommentFromCarEvent,
  resetCarEvents,
} from '../slices/carEventsSlice'
import { CreateCommentPayload } from '../../Home/models/EventFeedModel'

export const useCarEventsFetch = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isCommenting, setIsCommenting] = useState(false)
  const dispatch = useDispatch()
  const service = useMemo(() => new CarEventsApiService(), [])

  const fetchEventsByCarId = async (carId: number, carPlaca?: string | null) => {
    const result = await service.getEventsByCarId(carId, setIsLoading)
    if (result.data) {
      dispatch(setCarEvents(result.data))
      dispatch(setCarInfo({ carId, carPlaca: carPlaca || null }))
    }
    return { success: result.status === 200, message: result.message }
  }

  const createComment = async (payload: CreateCommentPayload) => {
    setIsCommenting(true)
    try {
      const result = await service.createComment(payload)
      if (result.data) {
        dispatch(addCommentToCarEvent({ eventId: payload.event_id, comment: result.data }))
      }
      return { success: result.status === 200 || result.status === 201, message: result.message }
    } finally {
      setIsCommenting(false)
    }
  }

  const deleteComment = async (eventId: number, commentId: number) => {
    const result = await service.deleteComment(commentId)
    if (result.status === 200) {
      dispatch(removeCommentFromCarEvent({ eventId, commentId }))
    }
    return { success: result.status === 200, message: result.message }
  }

  const reset = () => {
    dispatch(resetCarEvents())
  }

  return {
    isLoading,
    isCommenting,
    fetchEventsByCarId,
    createComment,
    deleteComment,
    reset,
  }
}
