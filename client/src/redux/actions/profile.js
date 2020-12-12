import axios from 'axios'
import {history} from '../../index'

export const getMyProfileStuffAction = () => {
	return async (dispatch, getState) => {
        const userId = getState().profile.user.id
        const token = getState().profile.token

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        }

        try {
            const response = await axios.get(`http://localhost:3001/api/profile/${userId}`, {headers: headers})

            dispatch({
                type: 'ADD_ENTRIES_STORIES',
                payload: {myStories: response.data.stories, myEntries: response.data.userEntries}
            })
        }
        catch(error){
            dispatch({
                type: 'ERROR',
                payload: error.response? error.response.data.error : error.message
            })
        }
    }
}

export const storedProfileAction = formInfo => {
	return async (dispatch, getState) => {
        const retrievedProfile = localStorage.getItem('profile');
        if(retrievedProfile){
            const storedProfile = JSON.parse(retrievedProfile)
            dispatch({
                type: 'ADD_PROFILE',
                payload: storedProfile
            })
        }
    }
}

export const deleteProfileAction = () => {
    return async (dispatch, getState) => {
        const token = getState().profile.token
        const profileId = getState().profile.user.id

        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            }
            const res = await axios.delete(`http://localhost:3001/api/profile/${profileId}`, {headers: headers})

            console.log(res)

            localStorage.clear()
            dispatch({ type: 'REMOVE_PROFILE'})
            history.push('/')

        }
        catch(error){
            dispatch({
                type: 'ERROR',
                payload: error.response? error.response.data.error : error.message
            })
        }
    }
}