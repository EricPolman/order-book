import { OrderBookEntry } from '@polman-order-book/models'
import styled from 'styled-components';

const StyledTable = styled.table<{$side: "asks" | "bids"}>`
  position: relative;

  border: 1px solid #777;
  border-collapse: separate;
  border-spacing: 0;
  tr {
    background-color: ${props => props.$side === "asks" ? "red" : "green"};
    border: none;
  }

  td {
    width: 100px;
    max-height: 20px;
    span {
      position: relative;
      z-index: 2;
    }
  }

  td:first-child {
    text-align: left;
    padding-left: 0.5rem;
  }

  td:last-child {
    text-align: right;
    padding-right: 0.5rem;
  }
`;

interface AmountBarProps {
  $percentage: number;
}
const styledDiv = styled.div<AmountBarProps>``;
const AmountBar = styled(styledDiv).attrs<{$percentage: number}>(props => ({
  style: {width: props.$percentage * 200
  }
}))`
  z-index: 1;
  position: absolute;
  transform: translateY(-2px);
  right: 0;
  height: 20px;
  background-color: rgba(255, 255, 255, 0.5);
`;

interface Props {
  entries: OrderBookEntry[];
  maximumVisible: number;
  shouldRenderInReverseOrder?: boolean;
  side: "asks" | "bids";
  onRowClick(row: OrderBookEntry): void;
}

export function OrderBookTable({
  entries,
  maximumVisible,
  shouldRenderInReverseOrder,
  side,
  onRowClick
}: Props) {
  const entriesToRender = (shouldRenderInReverseOrder ? [...entries].reverse() : entries).slice(0, maximumVisible);
  if (shouldRenderInReverseOrder) {
    entriesToRender.reverse();
  }
  return (
    <StyledTable $side={side}>
      <tbody>
        {entriesToRender.map(e => (
          <tr key={e.price} onClick={() => onRowClick(e)}>
            <td>
              {/* <AmountBar $percentage={+e.amount} /> */}
              <span>{e.amount}</span>
            </td>
            <td><span>{e.price}</span></td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  )
}
