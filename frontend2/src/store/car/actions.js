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

export const getCar = data => ({
    type: GET_CAR,
    ...data
})

export const postCar = data => ({
    type: POST_CAR,
    ...data
})

export const putCar = data => ({
    type: PUT_CAR,
    ...data
})

export const deleteCar = data => ({
    type: DELETE_CAR,
    ...data
})

export const postAndGetCar = data => ({
    type: POST_AND_GET_CAR,
    ...data
})

export const putAndGetCar = data => ({
    type: PUT_AND_GET_CAR,
    ...data
})

export const deleteAndGetCar = data => ({
    type: DELETE_AND_GET_CAR,
    ...data
})

export const updateCarStorage = data => ({
    type: UPDATE_CAR_STORAGE,
    ...data
})