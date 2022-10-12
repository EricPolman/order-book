import { OrderBookDto } from '@polman-order-book/models';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { OrderBookCenter } from './OrderBookCenter';
import { OrderBookHeader } from './OrderBookHeader';
import { OrderBookTable } from './OrderBookTable';

export function OrderBook() {
  const { data } = useQuery<OrderBookDto>(
    ['order-book'],
    async () => {
      const response = await axios.get<OrderBookDto>(
        'http://localhost:3333/api'
      );
      return response.data;
    },
    {
      refetchInterval: 5,
    }
  );

  // useEffect(() => {
  //   const ws = new WebSocket('ws://localhost:3334');

  //   ws.addEventListener('open', function open() {
  //     ws.addEventListener('message', function message(msg) {
  //       setWsData(msg.data);
  //     });
  //   });

  //   return () => {
  //     ws.close();
  //   };
  // }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const highestBid = Math.max(...data.bids.map(b => +b.price));
  const lowestAsk = Math.min(...data.asks.map(a => +a.price));
  const spread = Math.abs(highestBid - lowestAsk);
  const midMarketPrice = (highestBid + lowestAsk) / 2;

  return <div style={{width: 200}}>
    <OrderBookHeader />
    <OrderBookTable entries={data.bids} side="bids" maximumVisible={25} shouldRenderInReverseOrder />
    <OrderBookCenter spread={spread} midMarketPrice={midMarketPrice} />
    <OrderBookTable entries={data.asks} side="asks" maximumVisible={25} />
    </div>;
}
