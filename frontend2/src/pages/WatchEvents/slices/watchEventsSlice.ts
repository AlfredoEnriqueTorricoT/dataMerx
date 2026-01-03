import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EventModel, CommentModel } from '../../Home/models/EventFeedModel'

interface WatchEventsState {
  events: EventModel[]
  watchId: number | null
  watchCode: string | null
  status: number
  message: string
}

const initialState: WatchEventsState = {
  events: [],
  watchId: null,
  watchCode: null,
  status: 0,
  message: '',
}

const watchEventsSlice = createSlice({
  name: 'watchEvents',
  initialState,
  reducers: {
    setWatchEvents: (state, action: PayloadAction<EventModel[]>) => {
      state.events = action.payload
    },
    setWatchInfo: (state, action: PayloadAction<{ watchId: number; watchCode: string | null }>) => {
      state.watchId = action.payload.watchId
      state.watchCode = action.payload.watchCode
    },
    setStatus: (state, action: PayloadAction<{ status: number; message: string }>) => {
      state.status = action.payload.status
      state.message = action.payload.message
    },
    addCommentToWatchEvent: (
      state,
      action: PayloadAction<{ eventId: number; comment: CommentModel }>
    ) => {
      const { eventId, comment } = action.payload
      const event = state.events.find((e) => e.id === eventId)
      if (event) {
        if (comment.parentId) {
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
          event.comments = [...event.comments, comment]
        }
      }
    },
    removeCommentFromWatchEvent: (
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
    resetWatchEvents: (state) => {
      state.events = []
      state.watchId = null
      state.watchCode = null
    },
  },
})

export const {
  setWatchEvents,
  setWatchInfo,
  setStatus,
  addCommentToWatchEvent,
  removeCommentFromWatchEvent,
  resetWatchEvents,
} = watchEventsSlice.actions

export default watchEventsSlice.reducer
