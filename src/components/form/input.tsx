import React, { memo, FC, InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { colors } from '@utils/colors';

interface InputProps extends InputHTMLAttributes<string> {
  register: any;
}

const InputComponent = styled.input`
  padding: 8px 6px;
  outline: 0;
  background: #fafafa;
  border: 1px solid #dfe1e6;
  border-radius: 3px;
  min-width: 200px;

  &:focus {
    border-color: ${colors.blue200};
  }
`;

export const Input: FC<InputProps> = memo(({ register, ...props }) => {
  return <InputComponent {...props} ref={register} />;
});
