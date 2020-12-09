import React, {useEffect} from 'react'
import './EntryEdit.scss'

import {connect} from 'react-redux'
import {useParams} from 'react-router-dom'

import {getSingleEntryAction} from '../../redux/actions/db_get'
import EntryCreateForm from '../../components/EntryCreateForm/EntryCreateForm'
import GoHomeButton from '../../components/ButtonTypes/GoHomeButton/GoHomeButton'
import GoToEntryButton from '../../components/ButtonTypes/GoToEntryButton/GoToEntryButton'

import {useCallback} from 'react'
import {useHistory} from 'react-router-dom'

const EntryEdit = props => {
    const {getSingleEntry, current, path} = props
    const { storyId, entryId } = useParams()

    // START OF REDIRECT
    const history = useHistory()
    const goToStory = useCallback(() => history.push(`/story/${storyId}`), [history, storyId])
    const goToEntry = useCallback(() => history.push(`/story/${storyId}/entry/${entryId}`), [history, storyId, entryId])

    useEffect(()=>{
        if(path === 'deletedEntry'){ goToStory() }
        if(path === 'editedEntry'){ goToEntry() }
    },[path, goToStory, goToEntry])
    // END OF REDIRECT

    useEffect(()=>{
        getSingleEntry(storyId, entryId)
    }, [getSingleEntry, storyId, entryId])

    if(!current || !current.entry){
        return <div></div>
    }

    return (
        <div className='entry-edit'>
            <GoHomeButton />
            <GoToEntryButton />
            <EntryCreateForm edit={true} entry={current.entry[0]} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        current: state.page.current,
        path: state.page.path
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getSingleEntry: (storyId, entryId) => dispatch(getSingleEntryAction(storyId, entryId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EntryEdit)