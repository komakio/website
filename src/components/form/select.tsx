import React, { memo, FC } from 'react';
import styled, { CSSProperties, css } from 'styled-components';
import { selectInputStyles } from './_common';
import { FieldError } from 'react-hook-form';
import { colors } from '@utils/colors';

interface SelectProps {
  register: any;
  name: string;
  style?: CSSProperties;
  error?: FieldError;
}

const SelectComponent = styled.select<{ hasError: boolean }>`
  ${selectInputStyles}

  ${({ hasError }) =>
    hasError &&
    css`
      border: 1px solid ${colors.red200} !important;
      box-shadow: none !important;
    `}
`;

export const Select: FC<SelectProps> = memo(
  ({ register, name, children, style, error, ...props }) => {
    return (
      <SelectComponent
        hasError={!!error}
        name={name}
        style={style}
        {...props}
        ref={register}
      >
        {children}
      </SelectComponent>
    );
  }
);

interface OptionProps {
  children: string | string[];
  value: string;
}

export const Option: FC<OptionProps> = memo(({ value, children }) => {
  return <option value={value}>{children}</option>;
});
