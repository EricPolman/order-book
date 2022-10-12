import styled from 'styled-components';

interface Props {
  midMarketPrice: number;
  spread: number;
}

const Column = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: stretch;
`;

const Row = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
border: 1px solid #999;
padding: 0.5rem;
`;

export function OrderBookCenter({ midMarketPrice, spread }: Props) {
  return (
    <Column>
      <Row><span>Spread</span>{spread.toFixed(2)}</Row>
      <Row><span>Mid-market</span>{midMarketPrice.toFixed(2)}</Row>
      <Row><span>Grouping</span>2 decimals</Row>
    </Column>
  )
}
