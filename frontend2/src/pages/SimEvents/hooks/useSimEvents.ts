import { useSelector } from 'react-redux'
import { RootState } from '../../../store/types'

export const useSimEvents = () => {
  const state = useSelector((state: RootState) => state.SimEvents)

  return {
    events: state.events,
    simId: state.simId,
    simNumber: state.simNumber,
    status: state.status,
    message: state.message,
    isEmpty: state.events.length === 0,
    getEventById: (id: number) => state.events.find((event) => event.id === id),
  }
}
