import styled from 'styled-components';

const StyledTable = styled.table`
  position: relative;
  border: 1px solid #999;
  padding: 0.25rem 0.5rem;
  border-collapse: separate;
  border-spacing: 0;
  tr {
    border: none;
  }

  th {
    width: 100px;
    max-height: 20px;
    span {
      position: relative;
      z-index: 2;
    }
  }

  th:first-child {
    text-align: left;
  }

  th:last-child {
    text-align: right;
  }
`;


export function OrderBookHeader() {
  return (
    <StyledTable>
      <thead>
          <tr>
            <th>Amount</th>
            <th>Price</th>
          </tr>
      </thead>
    </StyledTable>
  )
}
