import {
    GET_M_BRAND,
    POST_M_BRAND,
    PUT_M_BRAND,
    DELETE_M_BRAND,
    POST_AND_GET_M_BRAND,
    PUT_AND_GET_M_BRAND,
    DELETE_AND_GET_M_BRAND,
    UPDATE_STORAGE,
} from "./actionTypes"

const INITIAL_M_BRAND = {
    status: "waiting response",
    modemBrandList: []
}

const ModemBrands = (state = INITIAL_M_BRAND, action) => {
    switch (action.type) {
        case GET_M_BRAND:
            return {
                ...state,
                status: "waiting response"
            }
            
        case POST_M_BRAND:
            return {
                ...state,
                status: "waiting response"
            }

        case PUT_M_BRAND:
            return {
                ...state,
                status: "waiting response"
            }

        case DELETE_M_BRAND:
            return {
                ...state,
                status: "waiting response"
            }

        case POST_AND_GET_M_BRAND:
            return {
                ...state,
                status: "waiting response"
            }

        case PUT_AND_GET_M_BRAND:
            return {
                ...state,
                status: "waiting response"
            }

        case DELETE_AND_GET_M_BRAND:
            return {
                ...state,
                status: "waiting response"
            }

        case UPDATE_STORAGE:
            return {
                ...state,
                [action.saveAs]: action.payload,
                status: action.status
            }

        default:
            return state
    }
}

export default ModemBrands