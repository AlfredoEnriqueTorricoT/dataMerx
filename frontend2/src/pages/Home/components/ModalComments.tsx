import React, { useState } from 'react'
import { Modal, UncontrolledTooltip } from 'reactstrap'
import { EventModel, CommentModel, CreateCommentPayload } from '../models/EventFeedModel'
import { useEventFeed, useEventFeedFetch } from '../hooks'
import { showToast } from 'components/toast'
import ImageGallery from './ImageGallery'

const API_BASE_URL = 'http://localhost:8000/storage/'

interface FetchResult {
  success: boolean
  message?: string
}

interface ModalCommentsProps {
  eventId: number | null
  isOpen: boolean
  onClose: () => void
  // Props opcionales para uso externo (ModemEvents)
  events?: EventModel[]
  onCreateComment?: (payload: CreateCommentPayload) => Promise<FetchResult>
  onDeleteComment?: (eventId: number, commentId: number) => Promise<FetchResult>
  isCommenting?: boolean
}

interface CommentItemProps {
  comment: CommentModel
  eventId: number
  onReply: (parentId: number) => void
  onDelete: (commentId: number) => void
  level?: number
}

const getAuthUser = () => {
  try {
    const authUser = localStorage.getItem('authUser')
    return authUser ? JSON.parse(authUser) : null
  } catch {
    return null
  }
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  eventId,
  onReply,
  onDelete,
  level = 0,
}) => {
  const authUser = getAuthUser()
  const canDelete = authUser?.auth === 0

  const getInitials = (name: string | undefined): string => {
    if (!name) return 'U'
    const words = name.trim().split(/\s+/)
    if (words.length === 1) return words[0].charAt(0).toUpperCase()
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase()
  }

  const formatRelativeDate = (dateString: string): string => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Ahora'
    if (diffMins < 60) return `${diffMins}m`
    if (diffHours < 24) return `${diffHours}h`
    if (diffDays < 7) return `${diffDays}d`

    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
  }

  const formatFullDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const commentDateId = `comment-date-${comment.id}`

  const marginLeft = level > 0 ? `${Math.min(level * 20, 60)}px` : '0'

  return (
    <div style={{ marginLeft }}>
      <div className="d-flex mb-3">
        <div className="avatar-xs me-2">
          <span className="avatar-title rounded-circle bg-primary bg-soft text-primary font-size-12">
            {getInitials(comment.user?.name)}
          </span>
        </div>
        <div className="flex-grow-1">
          <div className="bg-light rounded p-2">
            <div className="d-flex justify-content-between align-items-start">
              <h6 className="mb-0 font-size-13">{comment.user?.name || 'Usuario'}</h6>
              <small
                id={commentDateId}
                className="text-muted"
                style={{ cursor: 'pointer' }}
              >
                {formatRelativeDate(comment.createdAt)}
              </small>
              <UncontrolledTooltip placement="top" target={commentDateId}>
                {formatFullDate(comment.createdAt)}
              </UncontrolledTooltip>
            </div>
            <p className="mb-0 mt-1 font-size-13" style={{ whiteSpace: 'pre-wrap' }}>
              {comment.comment}
            </p>
          </div>
          <div className="mt-1">
            <button
              className="btn btn-link btn-sm text-muted p-0 me-3"
              onClick={() => onReply(comment.id)}
            >
              Responder
            </button>
            {canDelete && (
              <button
                className="btn btn-link btn-sm text-danger p-0"
                onClick={() => onDelete(comment.id)}
              >
                Eliminar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Respuestas anidadas */}
      {comment.replies.length > 0 && (
        <div>
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              eventId={eventId}
              onReply={onReply}
              onDelete={onDelete}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const ModalComments: React.FC<ModalCommentsProps> = ({
  eventId,
  isOpen,
  onClose,
  events: externalEvents,
  onCreateComment,
  onDeleteComment,
  isCommenting: externalIsCommenting,
}) => {
  const [newComment, setNewComment] = useState('')
  const [replyingTo, setReplyingTo] = useState<number | null>(null)

  // Usar Redux si no se proveen props externos
  const { events: reduxEvents } = useEventFeed()
  const {
    createComment: reduxCreateComment,
    deleteComment: reduxDeleteComment,
    isCommenting: reduxIsCommenting,
  } = useEventFeedFetch()

  // Usar props externos si están disponibles, sino usar Redux
  const eventList = externalEvents ?? reduxEvents
  const createComment = onCreateComment ?? reduxCreateComment
  const deleteComment = onDeleteComment ?? reduxDeleteComment
  const isCommenting = externalIsCommenting ?? reduxIsCommenting

  // Obtener el evento actualizado desde la lista
  const event = eventId ? eventList.find((e) => e.id === eventId) : null

  if (!event) return null

  const getImageUrl = (url: string): string => {
    if (url.startsWith('http')) return url
    return `${API_BASE_URL}${url}`
  }

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return

    const result = await createComment({
      event_id: event.id,
      comment: newComment.trim(),
      parent_id: replyingTo,
    })

    if (result.success) {
      setNewComment('')
      setReplyingTo(null)
      showToast({ type: 'success', message: 'Comentario agregado' })
    } else {
      showToast({ type: 'warning', message: 'No se pudo agregar el comentario' })
    }
  }

  const handleReply = (parentId: number) => {
    setReplyingTo(parentId)
  }

  const handleCancelReply = () => {
    setReplyingTo(null)
    setNewComment('')
  }

  const handleDelete = async (commentId: number) => {
    const result = await deleteComment(event.id, commentId)
    if (result.success) {
      showToast({ type: 'success', message: 'Comentario eliminado' })
    } else {
      showToast({ type: 'warning', message: 'No se pudo eliminar el comentario' })
    }
  }

  const getReplyingToUser = (): string | null => {
    if (!replyingTo) return null

    const findComment = (comments: CommentModel[]): CommentModel | null => {
      for (const c of comments) {
        if (c.id === replyingTo) return c
        const found = findComment(c.replies)
        if (found) return found
      }
      return null
    }

    const comment = findComment(event.comments)
    return comment?.user?.name || 'Usuario'
  }

  const replyingToUser = getReplyingToUser()

  return (
    <Modal isOpen={isOpen} toggle={onClose} size="lg" scrollable>
      <div className="modal-header">
        <div>
          <h5 className="modal-title mb-0">{event.title}</h5>
          <small className="text-muted">{event.user?.name || 'Sistema'}</small>
        </div>
        <button type="button" className="btn-close" onClick={onClose} aria-label="Cerrar"></button>
      </div>

      <div className="modal-body">
        {/* Detalle del evento */}
        <div className="mb-4 pb-3 border-bottom">
          <p className="text-muted mb-0" style={{ whiteSpace: 'pre-wrap' }}>
            {event.detail}
          </p>

          {/* Imágenes del evento */}
          {event.images.length > 0 && (
            <div className="mt-3">
              <ImageGallery
                images={event.images.map((img) => ({
                  id: img.id,
                  url: getImageUrl(img.url),
                }))}
              />
            </div>
          )}
        </div>

        {/* Lista de comentarios */}
        <div className="mb-4">
          <h6 className="mb-3">
            Comentarios
            {event.comments.length > 0 && (
              <span className="badge bg-secondary ms-2">{event.comments.length}</span>
            )}
          </h6>

          {event.comments.length === 0 ? (
            <p className="text-muted text-center py-3">
              No hay comentarios. ¡Sé el primero en comentar!
            </p>
          ) : (
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {event.comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  eventId={event.id}
                  onReply={handleReply}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Input para nuevo comentario */}
      <div className="modal-footer flex-column align-items-stretch">
        {replyingTo && (
          <div className="d-flex justify-content-between align-items-center mb-2 bg-light p-2 rounded">
            <small className="text-muted">
              Respondiendo a <strong>{replyingToUser}</strong>
            </small>
            <button className="btn btn-link btn-sm p-0" onClick={handleCancelReply}>
              Cancelar
            </button>
          </div>
        )}
        <div className="d-flex gap-2 w-100">
          <input
            type="text"
            className="form-control"
            placeholder={replyingTo ? 'Escribe una respuesta...' : 'Escribe un comentario...'}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSubmitComment()
              }
            }}
            disabled={isCommenting}
          />
          <button
            className="btn btn-primary"
            onClick={handleSubmitComment}
            disabled={!newComment.trim() || isCommenting}
          >
            {isCommenting ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              <i className="fas fa-paper-plane"></i>
            )}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ModalComments
