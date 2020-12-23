import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * { 
    margin: 0;
    box-sizing: border-box;
    padding: 0;
    outline: 0;
  }

  body { 
    background: #312e38;
    color: #fff;
  }

  body , input, button { 
    font-size: 16px;
  }

  h1, h2,h3,h4,h5,h6, strong { 
    font-weight: 500;
  }

button  { 
  cursor: pointer;
}
`;