import { Component } from 'react'
import { Router } from '../routes'
import moment from 'moment'

import Images from './images'

// TODO: use react-transition group
// https://reactcommunity.org/react-transition-group

// TODO: prevent double click text selection:
// https://stackoverflow.com/a/28726111

const StoryDetails = ({ story, onPlayClick }) => (
  <div className='details'>

    <img
      className='play-button'
      src={'/static/play.svg'}
      onClick={e => onPlayClick(story)}
    />

    {story.location && (
      <div className='location'>
        {story.location}
      </div>
    )}

    <div className='description'>
      {story.description}
    </div>

    {story.images && <Images images={story.images} />}

    {/*
    {story.series && (
      <div className='series'>
        Series: {story.series}
      </div>
    )}
    */}

    {/*
    {story.tags && (
      <div className='tags'>
        {story.tags.map(tag => `#${tag}`).join(' ')}
      </div>
    )}
    */}

    <style jsx>{`
      .details {
        padding-bottom: 15px;
      }
      img {
        width: 40px;
        height: 40px;
        margin: 5px 0 -4px 0;
        cursor: pointer;
      }
      .description, .location {
        font-size: 85%;
        margin-top: 5px;
      }
    `}</style>

  </div>
)

class Story extends Component {
  state = {
    showDetails: false
  }

  render () {
    const { story, isUsersStory, onPlayClick } = this.props
    const { showDetails } = this.state

    return (
      <div className='story'>

        <div
          className='story-main'
          onClick={() => this.setState({ showDetails: !showDetails })}
        >
          <span className='author'>
            {story.author}
          </span>

          <span className='date'>
            {moment(story.publishedAt).format('MMMM Do, YYYY')}
          </span>

          <span className='title'>
            {story.title}
          </span>

          {isUsersStory && (
            <button onClick={e => {
              e.stopPropagation()
              Router.pushRoute(`/edit/${story.titleSlug}`)
            }}>
              edit
            </button>
          )}
        </div>

        {showDetails && (
          <StoryDetails
            story={story}
            onPlayClick={onPlayClick}
          />
        )}

        <style jsx>{`
          .story {
            margin-bottom: 10px;
          }
          .story-main {
            cursor: pointer;
          }
          .title {
            margin-right: 30px;
          }
          .date, .author {
            display: inline-block;
            margin-right: 30px;
            font-size: 85%;
          }

          @media (max-width: 500px) {
            .story {
              margin-bottom: 15px;
            }
            .date, .author {
              display: block;
              width: inherit;
              text-align: inherit;
              font-size: 14px;
              margin-bottom: 3px;
            }
          }
        `}</style>
      </div>

    )
  }
}

export default Story
