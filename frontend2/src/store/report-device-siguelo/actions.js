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

export const getReportDevice = data => ({
    type: GET_REPORT_DEVICE,
    ...data
})

export const postReportDevice = data => ({
    type: POST_REPORT_DEVICE,
    ...data
})

export const putReportDevice = data => ({
    type: PUT_REPORT_DEVICE,
    ...data
})

export const deleteReportDevice = data => ({
    type: DELETE_REPORT_DEVICE,
    ...data
})

export const postAndGetReportDevice = data => ({
    type: POST_AND_GET_REPORT_DEVICE,
    ...data
})

export const putAndGetReportDevice = data => ({
    type: PUT_AND_GET_REPORT_DEVICE,
    ...data
})

export const deleteAndGetReportDevice = data => ({
    type: DELETE_AND_GET_REPORT_DEVICE,
    ...data
})

export const updateReportDeviceStorage = data => ({
    type: UPDATE_REPORT_DEVICE_STORAGE,
    ...data
})