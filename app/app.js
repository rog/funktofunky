import Twit from 'twit'
import debug from 'debug'
import config from './config'
const deb = debug('app:FunkToFunky')

const T = new Twit(config.twitter)

const getTweets = () => {
  return new Promise((resolve) => {
    T.get(
      'search/tweets',
      { q: 'coldplay since:2011-11-11', count: 2 },
      (err, data) => {
        resolve(data)
      }
    )
  })
}

async function printTweets() {
  const tweets = await getTweets()
  deb(tweets)
}

printTweets()
