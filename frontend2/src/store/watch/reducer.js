import {
    GET_WATCH,
    POST_WATCH,
    PUT_WATCH,
    DELETE_WATCH,
    POST_AND_GET_WATCH,
    PUT_AND_GET_WATCH,
    DELETE_AND_GET_WATCH,
    UPDATE_WATCH_STORAGE,
} from "./actionTypes"

const INITIAL_WATCH = {
    status: 200,
    message: "",
    watchList: [],
    eventList: []
}

const Watch = (state = INITIAL_WATCH, action) => {
    switch (action.type) {
        case GET_WATCH:
            return {
                ...state,
                status: "waiting response"
            }
            
        case POST_WATCH:
            return {
                ...state,
                status: "waiting response"
            }

        case PUT_WATCH:
            return {
                ...state,
                status: "waiting response"
            }

        case DELETE_WATCH:
            return {
                ...state,
                status: "waiting response"
            }

        case POST_AND_GET_WATCH:
            return {
                ...state,
                status: "waiting response"
            }

        case PUT_AND_GET_WATCH:
            return {
                ...state,
                status: "waiting response"
            }

        case DELETE_AND_GET_WATCH:
            return {
                ...state,
                status: "waiting response"
            }

        case UPDATE_WATCH_STORAGE:
            return {
                ...state,
                [action.saveAs]: action.payload,
                status: action.status,
                message: action.message || ""
            }

        default:
            return state
    }
}

export default Watch