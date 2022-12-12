import {
    GET_EVENT,
    POST_EVENT,
    PUT_EVENT,
    DELETE_EVENT,
    POST_AND_GET_EVENT,
    PUT_AND_GET_EVENT,
    DELETE_AND_GET_EVENT,
    UPDATE_EVENT_STORAGE,
} from "./actionTypes"

const INITIAL_EVENT = {
    status: "waiting response",
    eventList: [],
    simList: [],
    modemList: [],
    carList: []
}

const Event = (state = INITIAL_EVENT, action) => {
    switch (action.type) {
        case GET_EVENT:
            return {
                ...state,
                status: "waiting response"
            }
            
        case POST_EVENT:
            return {
                ...state,
                status: "waiting response"
            }

        case PUT_EVENT:
            return {
                ...state,
                status: "waiting response"
            }

        case DELETE_EVENT:
            return {
                ...state,
                status: "waiting response"
            }

        case POST_AND_GET_EVENT:
            return {
                ...state,
                status: "waiting response"
            }

        case PUT_AND_GET_EVENT:
            return {
                ...state,
                status: "waiting response"
            }

        case DELETE_AND_GET_EVENT:
            return {
                ...state,
                status: "waiting response"
            }

        case UPDATE_EVENT_STORAGE:
            return {
                ...state,
                [action.saveAs]: action.payload,
                status: action.status
            }

        default:
            return state
    }
}

export default Event