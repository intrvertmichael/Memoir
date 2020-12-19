import axios from 'axios'

export const clearSearchAction = searchTerm => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SEARCH_RESULTS',
            payload: null
        })

        dispatch({
            type: 'ERROR',
            payload: null
        })
    }
}


export const searchTagAction = searchTerm => {
	return async (dispatch, getState) => {
        if(searchTerm.length < 3){
            dispatch({
                type: 'SEARCH_RESULTS',
                payload: null
            })

            dispatch({
                type: 'ERROR',
                payload: null
            })
        } else {
            try {
                const res = await axios.get(`http://localhost:3001/api/search/entries?tag=${searchTerm}`)

                dispatch({
                    type: 'SEARCH_RESULTS',
                    payload: res.data
                })

                dispatch({
                    type: 'ERROR',
                    payload: null
                })
            }
            catch(error){
                console.log({error})

                dispatch({
                    type: 'ERROR',
                    payload: error.response? error.response.data.msg : error.message
                })
            }
        }

    }
}