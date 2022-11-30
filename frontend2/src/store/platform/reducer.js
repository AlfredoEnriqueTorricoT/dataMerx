import {
    GET_PLATFORM,
    POST_PLATFORM,
    PUT_PLATFORM,
    DELETE_PLATFORM,
    POST_AND_GET_PLATFORM,
    PUT_AND_GET_PLATFORM,
    DELETE_AND_GET_PLATFORM,
    UPDATE_PLATFORM_STORAGE,
} from "./actionTypes"

const INITIAL_PLATFORM = {
    status: "waiting response",
    platformList: []
}

const Platform = (state = INITIAL_PLATFORM, action) => {
    switch (action.type) {
        case GET_PLATFORM:
            return {
                ...state,
                status: "waiting response"
            }
            
        case POST_PLATFORM:
            return {
                ...state,
                status: "waiting response"
            }

        case PUT_PLATFORM:
            return {
                ...state,
                status: "waiting response"
            }

        case DELETE_PLATFORM:
            return {
                ...state,
                status: "waiting response"
            }

        case POST_AND_GET_PLATFORM:
            return {
                ...state,
                status: "waiting response"
            }

        case PUT_AND_GET_PLATFORM:
            return {
                ...state,
                status: "waiting response"
            }

        case DELETE_AND_GET_PLATFORM:
            return {
                ...state,
                status: "waiting response"
            }

        case UPDATE_PLATFORM_STORAGE:
            return {
                ...state,
                [action.saveAs]: action.payload,
                status: action.status
            }

        default:
            return state
    }
}

export default Platform