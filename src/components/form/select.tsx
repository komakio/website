import React, { memo, FC } from 'react';
import styled from 'styled-components';
import { colors } from '@utils/colors';
import { selectInputStyles } from './_common';

interface SelectProps {
  register: any;
  name: string;
}

const SelectComponent = styled.select`
  ${selectInputStyles}
`;

export const Select: FC<SelectProps> = memo(
  ({ register, name, children, ...props }) => {
    return (
      <SelectComponent
        name={name}
        // onChange={event => onChangeText?.(event.target.value)}
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
