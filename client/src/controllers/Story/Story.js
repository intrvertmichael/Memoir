import React, {useState, useEffect} from 'react'
import './Story.scss'
import {connect} from 'react-redux'
import {useParams} from "react-router-dom";

import StoryCard from '../../components/StoryCard/StoryCard'
import TimelineCard from '../../components/TimelineCard/TimelineCard'

import {getSingleStoryAction} from '../../redux/actions/get'

import GoHomeButton from '../../components/ButtonTypes/GoHomeButton/GoHomeButton'
import ButtonsForStory from '../../components/ButtonGroups/ButtonsForStory/ButtonsForStory';

import {useCallback} from 'react'
import {useHistory} from 'react-router-dom'

const Story = props => {
    const {getSingleStory} = props
    const {current, user, path} = props

    const story = current? current.story : null
    const { storyId } = useParams()


    // go Home after submit
    const history = useHistory()
    const goTo = useCallback(() => history.push(`/`), [history])

    useEffect(()=>{
        if(path === 'gohome'){
            goTo()
        }
    },[goTo, path])


    useEffect(()=>{
        getSingleStory(storyId)
    }, [getSingleStory, storyId])

    // Progress Bar
    const [currentProgress, setCurrentProgress] = useState(0)
    useEffect(()=>{
        window.addEventListener('scroll', changeProgress)

        return () => {
            window.removeEventListener('scroll', changeProgress)
        }
    }, [])

    const changeProgress = e => {
        e.preventDefault()
        const height = document.body.clientHeight - window.innerHeight
        const current= window.scrollY

        setCurrentProgress( (current/height)*100 )
    }

    if(!story){
        return <div className='notfound'> Sorry we could not find that story. </div>
    } else {
        const entryComponents = []
        if(story.entries.length > 0){

            let sortedEntries = story.entries

            if(sortedEntries.length > 0){
                sortedEntries = sortedEntries.sort( (a,b) => {
                    return new Date(a.date) - new Date(b.date);
                })
            }

            sortedEntries.forEach( (entry, i) => {
                let position
                if(i === 0){ position = 'top' }   // first entry
                else if(i === story.entries.length -1){ position = 'bottom' }   // last entry
                else {   // middle entries
                    if(i%2 === 0){ position = 'left' }
                    else { position = 'right' }
                }

                entryComponents.push(
                    <TimelineCard
                        {...{
                            key: `entry_${entry.id}`,
                            position: position,
                            entry: entry
                        }}
                    />
                )
            })
        } else {
            entryComponents.push(<div key='0' className='notfound'> Seems this story doesn't have any entries yet. </div>)
        }

        return (
            <div className='timeline'>

                <GoHomeButton />
                {user? <ButtonsForStory {...{storyId}}/> : ''}

                <StoryCard
                    {...{
                        story: story,
                        specialStyle:{margin: '0px auto 50px auto', cursor:'auto', opacity:1},
                        inTimeline: true
                    }}
                />

                {entryComponents}

                <div className='progress-container'>
                    <div className='progress' style={{width: `${currentProgress}%`}} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(state)
    return {
        current: state.page.current,
        user: state.profile.user,
        path: state.page.path
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getSingleStory: storyId => dispatch(getSingleStoryAction(storyId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Story)