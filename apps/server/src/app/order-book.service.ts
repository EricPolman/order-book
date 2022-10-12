import {
  OrderBookConfig,
  OrderBookDto,
  OrderBookEntry,
} from '@polman-order-book/models';

export class OrderBookService {
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
  midMarketPrice: number;
  sequenceNumber: number;

  constructor(public config: OrderBookConfig) {}

  init() {
    this.bids = [];
    for (let i = 0; i < this.config.initialBidsCount; ++i) {
      const price =
        this.config.initialMidMarketPrice -
        i / Math.pow(10, this.config.priceDecimals);
      this.bids.push({
        amount: Math.random().toFixed(this.config.amountDecimals),
        price: price.toFixed(this.config.priceDecimals),
      });
    }

    this.asks = [];
    for (let i = 0; i < this.config.initialAsksCount; ++i) {
      const price =
        this.config.initialMidMarketPrice +
        i / Math.pow(10, this.config.priceDecimals);

      this.asks.push({
        amount: Math.random().toFixed(this.config.amountDecimals),
        price: price.toFixed(this.config.priceDecimals),
      });
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
    return {
      asks: this.asks,
      bids: this.bids,
      sequence: this.sequenceNumber,
      marketPair: this.config.marketPair,
      timestamp: +new Date(),
    };
  }
}
