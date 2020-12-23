import styled from "styled-components";

export const Container = styled.ul`
  height: 64px;
  border-radius: 12px;
  list-style: none;
  background: white;
  color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  margin-bottom: 8px;
  li + li {
    padding-left: 12px;
  }

  li {
    strong {
      font-weight: bold;
      color: #ff9000;
    }
  }
  div {
    svg {
      height: 32px;
      width: 32px;
      padding: 0 8px;
    }
  }
`;
