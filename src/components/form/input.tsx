import React, { memo, FC } from 'react';
import styled, { css } from 'styled-components';
import { colors } from '@utils/colors';
import { selectInputStyles } from './_common';
import { FieldError } from 'react-hook-form';

interface InputProps {
  register: any;
  name: string;
  type?: HTMLInputElement['type'];
  onChangeText?: (text: string) => void;
  error?: FieldError;
  textarea?: boolean;
  autoComplete?: string;
}

const InputComponent = styled.input<{ hasError: boolean; textarea: boolean }>`
  ${selectInputStyles}

  ${({ hasError }) =>
    hasError &&
    css`
      border: 1px solid ${colors.red200} !important;
      box-shadow: none !important;
    `}
  ${({ textarea }) =>
    textarea &&
    css`
      height: 250px;
    `}
`;

export const Input: FC<InputProps> = memo(
  ({
    register,
    onChangeText,
    name,
    error,
    textarea,
    autoComplete,
    ...props
  }) => {
    return (
      <InputComponent
        as={textarea ? 'textarea' : undefined}
        name={name}
        onChange={event => onChangeText?.(event.target.value)}
        hasError={!!error}
        textarea={textarea}
        autoComplete={autoComplete}
        {...props}
        ref={register}
      />
    );
  }
);
