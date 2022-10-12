import { OrderBookDto } from '@polman-order-book/models';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function OrderBook() {
  const query = useQuery<OrderBookDto>(
    ['order-book'],
    async () => {
      const response = await axios.get<OrderBookDto>(
        'http://localhost:3333/api'
      );
      return response.data;
    },
    {
      refetchInterval: 50,
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

  return <div>{JSON.stringify(query.data)}</div>;
}
