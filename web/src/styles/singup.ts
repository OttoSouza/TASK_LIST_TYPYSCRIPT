import styled, { keyframes } from "styled-components";
import { shade } from "polished";

const appearFromTop = keyframes`
  from { 
    opacity: 0;
  transform: translateY(-50%);
  },
  to { 
    opacity:1;
    transform: translateY(0)
  }
`;
export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  animation: ${appearFromTop} 1s;
  form {
    margin: 0 80px;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }
  }

  > a {
    color: #ff9000;
    display: block;
    margin-top: 64px;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: color 0.2s;
    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, "#ff9000")};
    }
  }
`;
