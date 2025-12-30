import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EventModel, CommentModel } from '../../Home/models/EventFeedModel'

interface CarEventsState {
  events: EventModel[]
  carId: number | null
  carPlaca: string | null
  status: number
  message: string
}

const initialState: CarEventsState = {
  events: [],
  carId: null,
  carPlaca: null,
  status: 0,
  message: '',
}

const carEventsSlice = createSlice({
  name: 'carEvents',
  initialState,
  reducers: {
    setCarEvents: (state, action: PayloadAction<EventModel[]>) => {
      state.events = action.payload
    },
    setCarInfo: (state, action: PayloadAction<{ carId: number; carPlaca: string | null }>) => {
      state.carId = action.payload.carId
      state.carPlaca = action.payload.carPlaca
    },
    setStatus: (state, action: PayloadAction<{ status: number; message: string }>) => {
      state.status = action.payload.status
      state.message = action.payload.message
    },
    addCommentToCarEvent: (
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
    removeCommentFromCarEvent: (
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
    resetCarEvents: (state) => {
      state.events = []
      state.carId = null
      state.carPlaca = null
    },
  },
})

export const {
  setCarEvents,
  setCarInfo,
  setStatus,
  addCommentToCarEvent,
  removeCommentFromCarEvent,
  resetCarEvents,
} = carEventsSlice.actions

export default carEventsSlice.reducer
