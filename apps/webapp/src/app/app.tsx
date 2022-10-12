import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { OrderBook } from './OrderBook/OrderBook';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <OrderBook />
    </QueryClientProvider>
  );
}

export default App;
