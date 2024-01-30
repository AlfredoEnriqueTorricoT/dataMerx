import {
    GET_USER,
    POST_USER,
    PUT_USER,
    DELETE_USER,
    POST_AND_GET_USER,
    PUT_AND_GET_USER,
    DELETE_AND_GET_USER,
    UPDATE_USER_STORAGE,
} from "./actionTypes"

const INITIAL_DATA = {
    status: "waiting response",
    userList: [],
    permissionsList: []
}

const Users = (state = INITIAL_DATA, action) => {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                status: "waiting response"
            }
            
        case POST_USER:
            return {
                ...state,
                status: "waiting response"
            }

        case PUT_USER:
            return {
                ...state,
                status: "waiting response"
            }

        case DELETE_USER:
            return {
                ...state,
                status: "waiting response"
            }

        case POST_AND_GET_USER:
            return {
                ...state,
                status: "waiting response"
            }

        case PUT_AND_GET_USER:
            return {
                ...state,
                status: "waiting response"
            }

        case DELETE_AND_GET_USER:
            return {
                ...state,
                status: "waiting response"
            }

        case UPDATE_USER_STORAGE:
            return {
                ...state,
                [action.saveAs]: action.payload,
                status: action.status
            }

        default:
            return state
    }
}

export default Users