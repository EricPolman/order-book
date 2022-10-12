import {
  OrderBookConfig,
  OrderBookDto,
} from '@polman-order-book/models';

export class OrderBookService {
  bids: Record<string, string>;
  asks: Record<string, string>;
  midMarketPrice: number;
  sequenceNumber: number;

  constructor(public config: OrderBookConfig) {}

  init() {
    this.bids = {};
    for (let i = 0; i < this.config.initialBidsCount; ++i) {
      const price = this.config.initialMidMarketPrice * (1.0 - Math.pow(Math.random(), 0.5));
      this.bids[price.toFixed(2)] = Math.random().toFixed(this.config.amountDecimals);
    }

    this.asks = {};
    for (let i = 0; i < this.config.initialAsksCount; ++i) {
      const price = this.config.initialMidMarketPrice + 20000 * Math.pow(Math.random(), 0.5);
      this.asks[price.toFixed(2)] = Math.random().toFixed(this.config.amountDecimals);
    }

    this.sequenceNumber = 0;
  }

  startRunning() {
    setInterval(() => this.update(), this.config.updateFrequencyInMs);
  }

  update() {
    this.init();
  }

  getState(): Omit<OrderBookDto, 'updateType'> {
    const sortedAsks = Object.entries(this.asks).map(([price, amount]) => ({ price, amount })).sort((a, b) => +a.price < +b.price ? -1 : 1);
    const sortedBids = Object.entries(this.bids).map(([price, amount]) => ({ price, amount })).sort((a, b) => +a.price < +b.price ? -1 : 1);

    return {
      asks: sortedAsks,
      bids: sortedBids,
      sequence: this.sequenceNumber,
      marketPair: this.config.marketPair,
      timestamp: +new Date(),
    };
  }
}
