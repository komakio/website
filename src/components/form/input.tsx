import React, { memo, FC, InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface InputProps extends InputHTMLAttributes<string> {
  register: any;
}

const InputComponent = styled.input`
  height: 48px;
`;

export const Input: FC<InputProps> = memo(({ register }) => {
  return <InputComponent name="example" defaultValue="test" ref={register} />;
});
