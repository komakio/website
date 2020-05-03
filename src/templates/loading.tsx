import React, { FC, memo } from 'react';
import styled from 'styled-components';

const size = 300;

const Container = styled.div`
  position: fixed;
  top: calc(50% - ${size / 2}px);
  left: calc(50% - ${size / 2}px);

  .ripple {
    display: inline-block;
    position: relative;
    width: ${size}px;
    height: ${size}px;

    div {
      position: absolute;
      border: 4px solid #008c59;
      opacity: 1;
      border-radius: 50%;
      animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;

      &:nth-child(2) {
        animation-delay: -0.5s;
      }
    }
  }
`;

export const Loading: FC = memo(() => {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
@keyframes lds-ripple {
  0% {
    top: ${size / 2 - 5}px;
    left: ${size / 2 - 5}px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: ${size - 10}px;
    height: ${size - 10}px;
    opacity: 0;
  }
}
`,
        }}
      ></style>
      <Container>
        <div className="ripple">
          <div></div>
          <div></div>
        </div>
      </Container>
    </>
  );
});
