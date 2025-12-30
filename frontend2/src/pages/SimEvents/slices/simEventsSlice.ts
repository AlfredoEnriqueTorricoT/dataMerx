import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EventModel, CommentModel } from '../../Home/models/EventFeedModel'

interface SimEventsState {
  events: EventModel[]
  simId: number | null
  simNumber: string | null
  status: number
  message: string
}

const initialState: SimEventsState = {
  events: [],
  simId: null,
  simNumber: null,
  status: 0,
  message: '',
}

const simEventsSlice = createSlice({
  name: 'simEvents',
  initialState,
  reducers: {
    setSimEvents: (state, action: PayloadAction<EventModel[]>) => {
      state.events = action.payload
    },
    setSimInfo: (state, action: PayloadAction<{ simId: number; simNumber: string | null }>) => {
      state.simId = action.payload.simId
      state.simNumber = action.payload.simNumber
    },
    setStatus: (state, action: PayloadAction<{ status: number; message: string }>) => {
      state.status = action.payload.status
      state.message = action.payload.message
    },
    addCommentToSimEvent: (
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
    removeCommentFromSimEvent: (
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
    resetSimEvents: (state) => {
      state.events = []
      state.simId = null
      state.simNumber = null
    },
  },
})

export const {
  setSimEvents,
  setSimInfo,
  setStatus,
  addCommentToSimEvent,
  removeCommentFromSimEvent,
  resetSimEvents,
} = simEventsSlice.actions

export default simEventsSlice.reducer
