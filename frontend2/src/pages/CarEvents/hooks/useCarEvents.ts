import { useSelector } from 'react-redux'
import { RootState } from '../../../store/types'

export const useCarEvents = () => {
  const state = useSelector((state: RootState) => state.CarEvents)

  return {
    events: state.events,
    carId: state.carId,
    carPlaca: state.carPlaca,
    status: state.status,
    message: state.message,
    isEmpty: state.events.length === 0,
    getEventById: (id: number) => state.events.find((event) => event.id === id),
  }
}
