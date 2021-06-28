
const ws = require('ws')
const wss = new ws.Server({port:8000});
const w = new ws('wss://api-pub.bitfinex.com/ws/2');

let msg = JSON.stringify({ 
  event: 'subscribe', 
  channel: 'ticker', 
  symbol: 'tBTCUSD' 
})

  w.on('open', () => w.send(msg))
  wss.on("connection", ws=>{
    w.on('message', (msg) => (ws.send(msg)));
});