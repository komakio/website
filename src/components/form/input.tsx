import React, { memo, FC } from 'react';
import styled from 'styled-components';
import { colors } from '@utils/colors';
import { selectInputStyles } from './_common';

interface InputProps {
  register: any;
  name: string;
  type?: HTMLInputElement['type'];
  onChangeText?: (text: string) => void;
}

const InputComponent = styled.input`
  ${selectInputStyles}
`;

export const Input: FC<InputProps> = memo(
  ({ register, onChangeText, name, ...props }) => {
    return (
      <InputComponent
        name={name}
        onChange={event => onChangeText?.(event.target.value)}
        {...props}
        ref={register}
      />
    );
  }
);
