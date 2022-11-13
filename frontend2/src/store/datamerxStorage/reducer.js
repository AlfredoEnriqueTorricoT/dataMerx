import {
    GET_DATA,
    POST_DATA,
    PUT_DATA,
    DELETE_DATA,
    POST_AND_GET_DATA,
    PUT_AND_GET_DATA,
    DELETE_AND_GET_DATA,
    UPDATE_STORAGE
} from "./actionTypes"

const INITIAL_DATA = {
    markModem: {},
    conectionState: {
        message: "",
        status: 200,
    }
}

const lowerStatus = (oldStatus) => {
    let newStatus;
    oldStatus > 0 ? newStatus = -1 : newStatus = oldStatus - 1;
    return newStatus
}

const upperStatus = (oldStatus, code) => {
    let newStatus;
    oldStatus < -1 ? newStatus = oldStatus + 1 : newStatus = code;
    return newStatus
}

const _datamerxStorage = (state = INITIAL_DATA, action) => {
    switch (action.type) {
        case GET_DATA:
            return {
                ...state,
                conectionState: {
                    ...state.conectionState,
                    status: lowerStatus(state.conectionState.status)
                },
            }
            
        case POST_DATA:
            return {
                ...state,
                conectionState: {
                    ...state.conectionState,
                    status: lowerStatus(state.conectionState.status)
                },
            }

        case PUT_DATA:
            return {
                ...state,
                conectionState: {
                    ...state.conectionState,
                    status: lowerStatus(state.conectionState.status)
                },
            }

        case DELETE_DATA:
            return {
                ...state,
                conectionState: {
                    ...state.conectionState,
                    status: lowerStatus(state.conectionState.status)
                },
            }

        case POST_AND_GET_DATA:
            return {
                ...state,
                conectionState: {
                    ...state.conectionState,
                    status: lowerStatus(state.conectionState.status)
                },
            }

        case PUT_AND_GET_DATA:
            return {
                ...state,
                conectionState: {
                    ...state.conectionState,
                    status: lowerStatus(state.conectionState.status)
                },
            }

        case DELETE_AND_GET_DATA:
            return {
                ...state,
                conectionState: {
                    ...state.conectionState,
                    status: lowerStatus(state.conectionState.status)
                },
            }

        case UPDATE_STORAGE:
            return {
                ...state,
                conectionState: {
                    ...state.conectionState,
                    status: upperStatus(state.conectionState.status, action.payload.status)
                },
                [action.saveIn]: {
                    ...state[action.saveIn],
                    [saveAs]: action.payload
                }
            }

        default:
            return state
    }
}

export default _datamerxStorage