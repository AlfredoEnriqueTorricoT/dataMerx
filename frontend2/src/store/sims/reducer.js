import {
    GET_SIM,
    POST_SIM,
    PUT_SIM,
    DELETE_SIM,
    POST_AND_GET_SIM,
    PUT_AND_GET_SIM,
    DELETE_AND_GET_SIM,
    UPDATE_SIM_STORAGE,
} from "./actionTypes"

const INITIAL_DATA = {
    status: "waiting response",
    simList: []
}

const Sims = (state = INITIAL_DATA, action) => {
    switch (action.type) {
        case GET_SIM:
            return {
                ...state,
                status: "waiting response"
            }
            
        case POST_SIM:
            return {
                ...state,
                status: "waiting response"
            }

        case PUT_SIM:
            return {
                ...state,
                status: "waiting response"
            }

        case DELETE_SIM:
            return {
                ...state,
                status: "waiting response"
            }

        case POST_AND_GET_SIM:
            return {
                ...state,
                status: "waiting response"
            }

        case PUT_AND_GET_SIM:
            return {
                ...state,
                status: "waiting response"
            }

        case DELETE_AND_GET_SIM:
            return {
                ...state,
                status: "waiting response"
            }

        case UPDATE_SIM_STORAGE:
            return {
                ...state,
                [action.saveAs]: action.payload,
                status: action.status
            }

        default:
            return state
    }
}

export default Sims