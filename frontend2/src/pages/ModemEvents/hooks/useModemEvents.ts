import { useSelector } from 'react-redux'
import { RootState } from '../../../store/types'

export const useModemEvents = () => {
  const state = useSelector((state: RootState) => state.ModemEvents)

  return {
    events: state.events,
    modemId: state.modemId,
    modemImei: state.modemImei,
    status: state.status,
    message: state.message,
    isEmpty: state.events.length === 0,
    getEventById: (id: number) => state.events.find((event) => event.id === id),
  }
}
