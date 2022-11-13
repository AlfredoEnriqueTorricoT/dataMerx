import {
    GET_DATA,
    POST_DATA,
    PUT_DATA,
    DELETE_DATA,
    POST_AND_GET_DATA,
    PUT_AND_GET_DATA,
    DELETE_AND_GET_DATA,
    UPDATE_STORAGE
} from "./actionTypes"

export const getData = data => ({
    type: GET_DATA,
    ...data
})

const postData = data => ({
    type: POST_DATA,
    ...data
})

const putData = data => ({
    type: PUT_DATA,
    ...data
})

const deleteData = data => ({
    type: DELETE_DATA,
    ...data
})

const postAndGetData = data => ({
    type: POST_AND_GET_DATA,
    ...data
})

const putAndGetData = data => ({
    type: PUT_AND_GET_DATA,
    ...data
})

const deleteAndGetData = data => ({
    type: DELETE_AND_GET_DATA,
    ...data
})

export const updateStorage = data => ({
    type: UPDATE_STORAGE,
    ...data
})

export const createPetition = ({_petition, ..._rest} = data) => {
    switch (_petition) {
        case "GET":
            getData(_rest)
            break;

        case "POST":
            postData(_rest)
            break;

        case "PUT":
            putData(_rest)
            break;

        case "DELETE":
            deleteData(_rest)
            break;

        case "POST&GET":
            postAndGetData(_rest)
            break;

        case "PUT&GET":
            putAndGetData(_rest)
            break;
            
        case "DELETE&GET":
            deleteAndGetData(_rest)
            break;
    
        default:
            break;
    }
}