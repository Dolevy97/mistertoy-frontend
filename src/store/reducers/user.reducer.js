import { userService } from "../../services/user.service.js"


export const SET_USER = 'SET_USER'
export const SET_USERS = 'SET_USERS'
export const SET_WATCHED_USER = 'SET_WATCHED_USER'


const initialState = {
    loggedInUser: userService.getLoggedinUser(),
    users: [],
    watchedUser: null
}

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {

        case SET_USER:
            console.log(action.user)
            return { ...state, loggedInUser: action.user }
        case SET_USERS:
            return { ...state, users: action.users }
        case SET_WATCHED_USER:
            return { ...state, watchedUser: action.user }

        default:
            return state;
    }
}