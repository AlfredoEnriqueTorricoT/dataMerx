import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EventModel, PaginationModel, CommentModel } from '../models/EventFeedModel'

interface EventFeedState {
  events: EventModel[]
  pagination: PaginationModel
  searchTerm: string
  filterDate: string | null
  status: number
  message: string
}

const initialPagination: PaginationModel = {
  currentPage: 1,
  lastPage: 1,
  perPage: 15,
  total: 0,
  from: 0,
  to: 0,
  nextPageUrl: null,
  prevPageUrl: null,
}

const initialState: EventFeedState = {
  events: [],
  pagination: initialPagination,
  searchTerm: '',
  filterDate: null,
  status: 0,
  message: '',
}

const eventFeedSlice = createSlice({
  name: 'eventFeed',
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<EventModel[]>) => {
      state.events = action.payload
    },
    appendEvents: (state, action: PayloadAction<EventModel[]>) => {
      // Evitar duplicados
      const existingIds = new Set(state.events.map((e) => e.id))
      const newEvents = action.payload.filter((e) => !existingIds.has(e.id))
      state.events = [...state.events, ...newEvents]
    },
    setPagination: (state, action: PayloadAction<PaginationModel>) => {
      state.pagination = action.payload
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
    },
    setFilterDate: (state, action: PayloadAction<string | null>) => {
      state.filterDate = action.payload
    },
    setStatus: (state, action: PayloadAction<{ status: number; message: string }>) => {
      state.status = action.payload.status
      state.message = action.payload.message
    },
    addCommentToEvent: (
      state,
      action: PayloadAction<{ eventId: number; comment: CommentModel }>
    ) => {
      const { eventId, comment } = action.payload
      const event = state.events.find((e) => e.id === eventId)
      if (event) {
        if (comment.parentId) {
          // Es una respuesta, buscar el comentario padre
          const addReplyToComment = (comments: CommentModel[]): boolean => {
            for (const c of comments) {
              if (c.id === comment.parentId) {
                c.replies = [...c.replies, comment]
                return true
              }
              if (c.replies.length > 0 && addReplyToComment(c.replies)) {
                return true
              }
            }
            return false
          }
          addReplyToComment(event.comments)
        } else {
          // Es un comentario principal
          event.comments = [...event.comments, comment]
        }
      }
    },
    removeCommentFromEvent: (
      state,
      action: PayloadAction<{ eventId: number; commentId: number }>
    ) => {
      const { eventId, commentId } = action.payload
      const event = state.events.find((e) => e.id === eventId)
      if (event) {
        const removeComment = (comments: CommentModel[]): CommentModel[] => {
          return comments
            .filter((c) => c.id !== commentId)
            .map((c) => ({
              ...c,
              replies: removeComment(c.replies),
            }))
        }
        event.comments = removeComment(event.comments)
      }
    },
    resetFeed: (state) => {
      state.events = []
      state.pagination = initialPagination
      state.searchTerm = ''
      state.filterDate = null
    },
  },
})

export const {
  setEvents,
  appendEvents,
  setPagination,
  setSearchTerm,
  setFilterDate,
  setStatus,
  addCommentToEvent,
  removeCommentFromEvent,
  resetFeed,
} = eventFeedSlice.actions

export default eventFeedSlice.reducer
