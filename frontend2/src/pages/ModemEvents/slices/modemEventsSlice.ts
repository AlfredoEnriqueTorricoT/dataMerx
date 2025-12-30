import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EventModel, CommentModel } from '../../Home/models/EventFeedModel'

interface ModemEventsState {
  events: EventModel[]
  modemId: number | null
  modemImei: string | null
  status: number
  message: string
}

const initialState: ModemEventsState = {
  events: [],
  modemId: null,
  modemImei: null,
  status: 0,
  message: '',
}

const modemEventsSlice = createSlice({
  name: 'modemEvents',
  initialState,
  reducers: {
    setModemEvents: (state, action: PayloadAction<EventModel[]>) => {
      state.events = action.payload
    },
    setModemInfo: (state, action: PayloadAction<{ modemId: number; modemImei: string | null }>) => {
      state.modemId = action.payload.modemId
      state.modemImei = action.payload.modemImei
    },
    setStatus: (state, action: PayloadAction<{ status: number; message: string }>) => {
      state.status = action.payload.status
      state.message = action.payload.message
    },
    addCommentToModemEvent: (
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
    removeCommentFromModemEvent: (
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
    resetModemEvents: (state) => {
      state.events = []
      state.modemId = null
      state.modemImei = null
    },
  },
})

export const {
  setModemEvents,
  setModemInfo,
  setStatus,
  addCommentToModemEvent,
  removeCommentFromModemEvent,
  resetModemEvents,
} = modemEventsSlice.actions

export default modemEventsSlice.reducer
