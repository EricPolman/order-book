export interface OrderBookConfig {
  marketPair: string;
  initialMidMarketPrice: number;

  priceDecimals: number;
  amountDecimals: number;

  initialBidsCount: number;
  initialAsksCount: number;

  updateFrequencyInMs: number;
  broadcastFrequencyInMs: number;
}

export interface OrderBookEntry {
  price: string;
  amount: string;
}

export interface OrderBookDto {
  marketPair: string;
  sequence: number;
  timestamp: number;
  updateType: 'snapshot' | 'delta';
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
}
