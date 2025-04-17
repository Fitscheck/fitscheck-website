import React from 'react';
import styled from 'styled-components';
import { Button } from './button';

const LoginButton = () => {
  return (
    <StyledWrapper>
      <Button className="button" variant={"outline"}>
        <p className="text">Log In</p>
      </Button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 15px;
    gap: 15px;
    background-color: #181717;
    outline: 3px #181717 solid;
    outline-offset: -3px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: 400ms;
  }

  .button .text {
    color: white;
    font-weight: 700;
    font-size: 1em;
    transition: 400ms;
  }

  .button:hover {
    background-color: transparent;
  }

  .button:hover .text {
    color: #181717;
  }`;

export default LoginButton;
