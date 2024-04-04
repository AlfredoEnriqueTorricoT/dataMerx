import {
    GET_REPORT_DEVICE,
    POST_REPORT_DEVICE,
    PUT_REPORT_DEVICE,
    DELETE_REPORT_DEVICE,
    POST_AND_GET_REPORT_DEVICE,
    PUT_AND_GET_REPORT_DEVICE,
    DELETE_AND_GET_REPORT_DEVICE,
    UPDATE_REPORT_DEVICE_STORAGE,
} from "./actionTypes"

const INITIAL_REPORT_DEVICE = {
    status: 200,
    message: "",
    reportDeviceSigueloList: [],
}

const ReportDeviceSiguelo = (state = INITIAL_REPORT_DEVICE, action) => {
    switch (action.type) {
        case GET_REPORT_DEVICE:
            return {
                ...state,
                status: "waiting response"
            }
            
        case POST_REPORT_DEVICE:
            return {
                ...state,
                status: "waiting response"
            }

        case PUT_REPORT_DEVICE:
            return {
                ...state,
                status: "waiting response"
            }

        case DELETE_REPORT_DEVICE:
            return {
                ...state,
                status: "waiting response"
            }

        case POST_AND_GET_REPORT_DEVICE:
            return {
                ...state,
                status: "waiting response"
            }

        case PUT_AND_GET_REPORT_DEVICE:
            return {
                ...state,
                status: "waiting response"
            }

        case DELETE_AND_GET_REPORT_DEVICE:
            return {
                ...state,
                status: "waiting response"
            }

        case UPDATE_REPORT_DEVICE_STORAGE:
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

export default ReportDeviceSiguelo