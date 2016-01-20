import Twit from 'twit'
import config from './config'

const T = new Twit(config.twitter)

T.post(
  'statuses/update',
  { status: 'hello world!' },
  function(err, data, response) {
    console.log(data)
  }
)
