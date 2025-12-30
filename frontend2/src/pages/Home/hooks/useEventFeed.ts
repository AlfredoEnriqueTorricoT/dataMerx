import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

export const useEventFeed = () => {
  const state = useSelector((state: RootState) => state.EventFeed)

  return {
    events: state.events,
    pagination: state.pagination,
    searchTerm: state.searchTerm,
    filterDate: state.filterDate,
    status: state.status,
    message: state.message,
    hasMore: state.pagination.nextPageUrl !== null,
    isEmpty: state.events.length === 0,
  }
}
