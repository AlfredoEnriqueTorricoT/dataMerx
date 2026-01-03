import { useSelector } from 'react-redux'
import { RootState } from '../../../store/types'

export const useWatchEvents = () => {
  const state = useSelector((state: RootState) => state.WatchEvents)

  return {
    events: state.events,
    watchId: state.watchId,
    watchCode: state.watchCode,
    status: state.status,
    message: state.message,
    isEmpty: state.events.length === 0,
    getEventById: (id: number) => state.events.find((event) => event.id === id),
  }
}
