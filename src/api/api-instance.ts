import axios from "axios";


export const instanceLocal = axios.create({
    // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    // для запросов на смену пароля менять урл на https://neko-back.herokuapp.com/2.0/
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const instanceExternal = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})
