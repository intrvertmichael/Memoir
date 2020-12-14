import React, {useEffect} from 'react'
import './OthersStuff.scss'
import {connect} from 'react-redux'

import {getForeignEntriesAction} from '../../../redux/actions/foreignEntries'
import ListEntry from '../../../components/ListEntry/ListEntry'
import ErrorDisplay from '../../../components/ErrorDisplay/ErrorDisplay'


const OthersStuff = props => {
    const { getForeignEntries, foreignEntries } = props

    useEffect(() => {
        getForeignEntries()
    }, [getForeignEntries])

    const approved = []
    const pending = []
    const denied = []

    if(foreignEntries && foreignEntries.length>0){
        foreignEntries.forEach( entry => {

            if(entry.entry_status === 1){
                approved.push(<ListEntry {...{
                    key: entry.id,
                    entry: entry,
                    foreign: true
                }}/>)
            }
            else if(entry.entry_status === 2){
                pending.push(<ListEntry {...{
                    key: entry.id,
                    entry: entry,
                    foreign: true
                }}/>)
            }
            else if(entry.entry_status === 3){
                denied.push(<ListEntry {...{
                    key: entry.id,
                    entry: entry,
                    foreign: true
                }}/>)
            }
        })
    } else {
        return <ErrorDisplay message='There seems to not be any entries from other people'/>
    }

    return (
        <div className = 'othersStuff'>

            {
                pending.length>0?
                <div className='entries'>
                    <label> Need to be Approved: </label>
                    {pending? pending : ''}
                </div>
                : ''
            }

            {
                approved.length>0?
                <div className='entries'>
                    <label className='approved'> Approved: </label>
                    {approved? approved : ''}
                </div>
                : ''
            }

            {
                denied.length>0?
                <div className='entries'>
                    <label className='denied'> Denied: </label>
                    {denied? denied : ''}
                </div>
                : ''
            }

        </div>
    )
}

const mapStateToProps = state => {

    return {
        foreignEntries: state.profile.foreignEntries
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        getForeignEntries: () => dispatch(getForeignEntriesAction()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OthersStuff)