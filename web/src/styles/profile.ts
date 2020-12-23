import styled from "styled-components";

export const Container = styled.div`
  > header { 
    height: 144px;
    background: #28262e;
    display:flex;
    align-items: center;
    div { 
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;
    }
    svg { 
      color: #999591;
      width: 24px;
      height: 24px;
    }
  }
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 100px;  
  form {
    margin: 0 80px;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;

    }
  }
`;