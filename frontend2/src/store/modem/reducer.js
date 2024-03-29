import {
    GET_MODEM,
    POST_MODEM,
    PUT_MODEM,
    DELETE_MODEM,
    POST_AND_UPDATE_PENDING_MODEM,
    UPDATE_PENDING_MODEM,
    POST_AND_GET_MODEM,
    PUT_AND_GET_MODEM,
    DELETE_AND_GET_MODEM,
    UPDATE_MODEM_STORAGE,
} from "./actionTypes"

const INITIAL_MODEM = {
    status: "waiting response",
    message: "",
    carList: [],
    modemList: [],
    platformList: [],
    modemBrandList: [],
    simList: [],
    eventList: []
}

const Modem = (state = INITIAL_MODEM, action) => {
    switch (action.type) {
        case GET_MODEM:
            return {
                ...state,
                status: "waiting response"
            }
            
        case POST_MODEM:
            return {
                ...state,
                status: "waiting response"
            }

        case PUT_MODEM:
            return {
                ...state,
                status: "waiting response"
            }

        case DELETE_MODEM:
            return {
                ...state,
                status: "waiting response"
            }

        case POST_AND_UPDATE_PENDING_MODEM:
            return {
                ...state,
                status: "waiting response"
            }
        case UPDATE_PENDING_MODEM:
            return {
                ...state,
                status: 200,
                modemList: state.modemList.map(element => 
                    element.id == action.dataToUpdate.id ?
                        {...element, ...action.dataToUpdate} :
                        element
                )
            }

        case POST_AND_GET_MODEM:
            return {
                ...state,
                status: "waiting response"
            }

        case PUT_AND_GET_MODEM:
            return {
                ...state,
                status: "waiting response"
            }

        case DELETE_AND_GET_MODEM:
            return {
                ...state,
                status: "waiting response"
            }

        case UPDATE_MODEM_STORAGE:
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

export default Modem