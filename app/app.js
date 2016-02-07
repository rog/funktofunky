import Twit from 'twit'
import log from 'debug'
import forEach from 'lodash.forEach'
import config from './config'

const T = new Twit(config.twitter)
const debug = log('app:FunkToFunky')

let sinceID = null

const getTweets = (term, since) => {
  const query = {
    q: since !== null ? `${term} -filter:retweets since_id:${since}` : `${term} -filter:retweets`,
    count: 10,
  }

  return new Promise((resolve) => {
    T.get('search/tweets', query, (err, data) => {
      if (err) {
        debug({ endpoint: 'search', result: err })
      }
      resolve(data)
    })
  })
}

function *validateTweet(tweet) {
  const tweetStr = `${tweet.user.name}: ${tweet.text} - ${tweet.id}`
  if (tweet.id > sinceID) {
    sinceID = tweet.id
    yield(tweetStr)
  }
}

const postTweet = (tweet) => {
  return new Promise((resolve) => {
    const tweetStr = `${tweet.user.name}: ${tweet.text} - ${tweet.id}`
    if (tweet.id > sinceID) {
      debug(tweetStr)
      resolve(tweet.id)
    }
    /* T.post('statuses/update', { status: tweet.user.name }, (err, data) => {
      resolve(data)
    }) */
  })
}

const printTweets = async () => {
  debug(sinceID)
  const tweets = await getTweets('coldplay', sinceID)
  forEach(tweets.statuses, (tweet) => {
    debug(validateTweet(tweet).next())
  })
}

setInterval(() => {
  printTweets()
}, 6000)
