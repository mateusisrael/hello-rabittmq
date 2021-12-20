const amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost', {port: 5671}, (connectionError, connection) => {
  if (connectionError) throw connectionError

  connection.createChannel((createChannelError, channel) => {
    if (createChannelError) throw createChannelError

    const QUEUE = 'hello'
    const MSG = 'Hello World!!!'

    // A fila só será criada se ainda não existir
    channel.assertQueue(QUEUE, { durable: false })

    //  O conteúdo da mensagem é uma matriz de bytes, então você pode codificar o que quiser lá.
    channel.sendToQueue(QUEUE, Buffer.from(MSG))
    console.log(`[X] Sent ${MSG}`)
  })
  
  setTimeout(() => {
    connection.close()
    process.exit(0)
  }, 500)
})
