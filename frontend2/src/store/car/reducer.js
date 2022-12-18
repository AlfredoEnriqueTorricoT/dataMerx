import {
    GET_CAR,
    POST_CAR,
    PUT_CAR,
    DELETE_CAR,
    POST_AND_GET_CAR,
    PUT_AND_GET_CAR,
    DELETE_AND_GET_CAR,
    UPDATE_CAR_STORAGE,
} from "./actionTypes"

const INITIAL_CAR = {
    status: "waiting response",
    message: "",
    carList: [],
    modemList: [],
    simList: [],
    platformList: [],
    eventList: []
}

const Car = (state = INITIAL_CAR, action) => {
    switch (action.type) {
        case GET_CAR:
            return {
                ...state,
                status: "waiting response"
            }
            
        case POST_CAR:
            return {
                ...state,
                status: "waiting response"
            }

        case PUT_CAR:
            return {
                ...state,
                status: "waiting response"
            }

        case DELETE_CAR:
            return {
                ...state,
                status: "waiting response"
            }

        case POST_AND_GET_CAR:
            return {
                ...state,
                status: "waiting response"
            }

        case PUT_AND_GET_CAR:
            return {
                ...state,
                status: "waiting response"
            }

        case DELETE_AND_GET_CAR:
            return {
                ...state,
                status: "waiting response"
            }

        case UPDATE_CAR_STORAGE:
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

export default Car