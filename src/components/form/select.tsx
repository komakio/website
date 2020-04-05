import React, { memo, FC } from 'react';
import styled, { CSSProperties } from 'styled-components';
import { selectInputStyles } from './_common';

interface SelectProps {
  register: any;
  name: string;
  style?: CSSProperties;
}

const SelectComponent = styled.select`
  ${selectInputStyles}
`;

export const Select: FC<SelectProps> = memo(
  ({ register, name, children, style, ...props }) => {
    return (
      <SelectComponent name={name} style={style} {...props} ref={register}>
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
