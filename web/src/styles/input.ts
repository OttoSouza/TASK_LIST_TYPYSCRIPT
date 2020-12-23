import styled, { css } from "styled-components";
import Tooltip from "../components/Tooltip";

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  width: 100%;
  padding: 16px;
  display: flex;
  align-items: center;
  color: #666360;
  & + div {
    margin-top: 8px;
  }

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}
  ${(props) =>
    props.isFocused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}


  input {
    color: white;
    flex: 1;
    border: 0;
    background: transparent;
    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

//vai la no  tooltip e e adicinar o css no container no tooltip
//tomar cuidado com a herança de estilizaçoes
export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }

  span{ 
    background: #c53030;
    color: #fff;

    &::before{ 
      border-color: #c53030 transparent;
    }
  }
`;

