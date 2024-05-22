import {writable} from "svelte/store";

const user = writable(JSON.parse(localStorage.getItem('user')) ?? null)
const userToken = writable(JSON.parse(localStorage.getItem('userToken')) ?? null)


export {
    user,
    userToken
}