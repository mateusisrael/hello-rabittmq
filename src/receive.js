const amqp = require('amqplib/callback_api')
const CONNECT_CONFIG = {
  host: 'amqp://localhost',
  port: 5672
}

amqp.connect(
  CONNECT_CONFIG.host,
  { port: CONNECT_CONFIG.port },
  (connectionError, connection) => {
    if (connectionError) throw connectionError
    
    console.log()
    connection.createChannel((createChannelError, channel) => {
      if (createChannelError) throw createChannelError

      const queue = 'hello'
      channel.consume(queue, (msg) => {
        console.log(`[X] Received ${msg.content.toString()}`)
      })
    })
  }
)