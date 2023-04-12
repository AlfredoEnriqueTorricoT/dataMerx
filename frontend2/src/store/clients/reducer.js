import {
    GET_CLIENT,
    POST_CLIENT,
    PUT_CLIENT,
    DELETE_CLIENT,
    POST_AND_GET_CLIENT,
    PUT_AND_GET_CLIENT,
    DELETE_AND_GET_CLIENT,
    UPDATE_CLIENT_STORAGE,
} from "./actionTypes"

const INITIAL_CLIENT = {
    status: "waiting response",
    message: "",
    clientList: [],
    carList: [],
    modemList: [],
    simList: [],
    platformList: [],
    eventList: []
}

const Client = (state = INITIAL_CLIENT, action) => {
    switch (action.type) {
        case GET_CLIENT:
            return {
                ...state,
                status: "waiting response"
            }
            
        case POST_CLIENT:
            return {
                ...state,
                status: "waiting response"
            }

        case PUT_CLIENT:
            return {
                ...state,
                status: "waiting response"
            }

        case DELETE_CLIENT:
            return {
                ...state,
                status: "waiting response"
            }

        case POST_AND_GET_CLIENT:
            return {
                ...state,
                status: "waiting response"
            }

        case PUT_AND_GET_CLIENT:
            return {
                ...state,
                status: "waiting response"
            }

        case DELETE_AND_GET_CLIENT:
            return {
                ...state,
                status: "waiting response"
            }

        case UPDATE_CLIENT_STORAGE:
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

export default Client