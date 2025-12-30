import { useState, useMemo, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { EventFeedApiService } from '../services/EventFeedApiService'
import {
  setEvents,
  appendEvents,
  setPagination,
  setSearchTerm,
  setFilterDate,
  setStatus,
  addCommentToEvent,
  removeCommentFromEvent,
  resetFeed,
} from '../slices/eventFeedSlice'
import { CreateCommentPayload, CommentModel } from '../models/EventFeedModel'

interface FetchResult<T = void> {
  success: boolean
  message: string
  data?: T
}

export const useEventFeedFetch = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [isCommenting, setIsCommenting] = useState(false)
  const dispatch = useDispatch()
  const service = useMemo(() => new EventFeedApiService(), [])

  const fetchFeed = useCallback(
    async (
      page: number = 1,
      date?: string | null,
      search?: string | null
    ): Promise<FetchResult> => {
      const isFirstPage = page === 1

      if (isFirstPage) {
        setIsLoading(true)
      } else {
        setIsLoadingMore(true)
      }

      const result = await service.getFeed(
        page,
        date,
        search,
        isFirstPage ? setIsLoading : setIsLoadingMore
      )

      if (result.data) {
        if (isFirstPage) {
          dispatch(setEvents(result.data.events))
        } else {
          dispatch(appendEvents(result.data.events))
        }
        dispatch(setPagination(result.data.pagination))
        dispatch(setStatus({ status: result.status, message: result.message }))
      }

      return {
        success: result.status === 200,
        message: result.message,
      }
    },
    [dispatch, service]
  )

  const loadMore = useCallback(
    async (currentPage: number, date?: string | null, search?: string | null): Promise<FetchResult> => {
      return fetchFeed(currentPage + 1, date, search)
    },
    [fetchFeed]
  )

  const applyFilters = useCallback(
    async (date: string | null, search: string): Promise<FetchResult> => {
      dispatch(setFilterDate(date))
      dispatch(setSearchTerm(search))
      return fetchFeed(1, date, search || null)
    },
    [dispatch, fetchFeed]
  )

  const clearFilters = useCallback(async (): Promise<FetchResult> => {
    dispatch(resetFeed())
    return fetchFeed(1, null, null)
  }, [dispatch, fetchFeed])

  const createComment = useCallback(
    async (payload: CreateCommentPayload): Promise<FetchResult<CommentModel>> => {
      setIsCommenting(true)
      const result = await service.createComment(payload)
      setIsCommenting(false)

      if (result.status === 200 || result.status === 201) {
        if (result.data) {
          dispatch(
            addCommentToEvent({
              eventId: payload.event_id,
              comment: result.data,
            })
          )
        }
        return {
          success: true,
          message: result.message,
          data: result.data,
        }
      }

      return {
        success: false,
        message: result.message,
      }
    },
    [dispatch, service]
  )

  const deleteComment = useCallback(
    async (eventId: number, commentId: number): Promise<FetchResult> => {
      const result = await service.deleteComment(commentId)

      if (result.status === 200) {
        dispatch(removeCommentFromEvent({ eventId, commentId }))
        return {
          success: true,
          message: 'Comentario eliminado',
        }
      }

      return {
        success: false,
        message: result.message,
      }
    },
    [dispatch, service]
  )

  return {
    isLoading,
    isLoadingMore,
    isCommenting,
    fetchFeed,
    loadMore,
    applyFilters,
    clearFilters,
    createComment,
    deleteComment,
  }
}
