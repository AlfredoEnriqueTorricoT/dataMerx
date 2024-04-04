import {
    GET_PLATFORM_COUNT,
    POST_PLATFORM_COUNT,
    PUT_PLATFORM_COUNT,
    DELETE_PLATFORM_COUNT,
    POST_AND_GET_PLATFORM_COUNT,
    PUT_AND_GET_PLATFORM_COUNT,
    DELETE_AND_GET_PLATFORM_COUNT,
    UPDATE_PLATFORM_COUNT_STORAGE,
} from "./actionTypes"

const INITIAL_PLATFORM_COUNT = {
    status: 200,
    message: "",
    platformCountList: [],
}

const PlatformCountReducer = (state = INITIAL_PLATFORM_COUNT, action) => {
    switch (action.type) {
        case GET_PLATFORM_COUNT:
            return {
                ...state,
                status: "waiting response"
            }
            
        case POST_PLATFORM_COUNT:
            return {
                ...state,
                status: "waiting response"
            }

        case PUT_PLATFORM_COUNT:
            return {
                ...state,
                status: "waiting response"
            }

        case DELETE_PLATFORM_COUNT:
            return {
                ...state,
                status: "waiting response"
            }

        case POST_AND_GET_PLATFORM_COUNT:
            return {
                ...state,
                status: "waiting response"
            }

        case PUT_AND_GET_PLATFORM_COUNT:
            return {
                ...state,
                status: "waiting response"
            }

        case DELETE_AND_GET_PLATFORM_COUNT:
            return {
                ...state,
                status: "waiting response"
            }

        case UPDATE_PLATFORM_COUNT_STORAGE:
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

export default PlatformCountReducer