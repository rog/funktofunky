import Twit from 'twit'
import debug from 'debug'
import config from './config'

const d = debug('app:funktofunky')
const T = new Twit(config.twitter)

T.get(
  'search/tweets',
  { q:'coldplay since:2011-11-11', count: 2 },
  function(err, data, response) {
    console.log(data)
  }
)
