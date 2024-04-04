import {
    GET_TAG,
    POST_TAG,
    PUT_TAG,
    DELETE_TAG,
    POST_AND_GET_TAG,
    PUT_AND_GET_TAG,
    DELETE_AND_GET_TAG,
    UPDATE_TAG_STORAGE,
} from "./actionTypes"

const INITIAL_TAG = {
    status: 200,
    message: "",
    data: {
        tags:[],
        users:[]
    },
    userList: [],
    eventList: []
}

const Tag = (state = INITIAL_TAG, action) => {
    switch (action.type) {
        case GET_TAG:
            return {
                ...state,
                status: "waiting response"
            }
            
        case POST_TAG:
            return {
                ...state,
                status: "waiting response"
            }

        case PUT_TAG:
            return {
                ...state,
                status: "waiting response"
            }

        case DELETE_TAG:
            return {
                ...state,
                status: "waiting response"
            }

        case POST_AND_GET_TAG:
            return {
                ...state,
                status: "waiting response"
            }

        case PUT_AND_GET_TAG:
            return {
                ...state,
                status: "waiting response"
            }

        case DELETE_AND_GET_TAG:
            return {
                ...state,
                status: "waiting response"
            }

        case UPDATE_TAG_STORAGE:
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

export default Tag