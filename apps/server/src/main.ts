/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { OrderBookDto } from '@polman-order-book/models';
import * as express from 'express';
import { OrderBookService } from './app/order-book.service';
// import { WebSocketServer } from 'ws';

const app = express();

const orderBookService = new OrderBookService({
  amountDecimals: 4,
  priceDecimals: 2,
  broadcastFrequencyInMs: 100,
  updateFrequencyInMs: 2,
  initialAsksCount: 30,
  initialBidsCount: 30,
  initialMidMarketPrice: 20000,
  marketPair: 'BTC-EUR',
});
orderBookService.init();
orderBookService.startRunning();

app.get('/api', (req, res: express.Response<OrderBookDto>) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.send({
    ...orderBookService.getState(),
    updateType: 'snapshot',
  });
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api!`);
});
server.on('error', console.error);

// const wss = new WebSocketServer({
//   port: 3334,
// });

// wss.on('connection', function connection(ws) {
//   ws.on('message', function message(data) {
//     console.log('received: %s', data);
//   });
//   setInterval(() => ws.send(`Number: ${Math.random()}`), 1000);
// });
