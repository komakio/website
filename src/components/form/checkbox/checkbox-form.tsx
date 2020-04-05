import React, { memo, FC } from 'react';
import { CheckboxView } from './checkbox-view';
import { Controller, Control } from 'react-hook-form';

interface CheckboxProps {
  control: Control<Record<string, any>>;
  name: string;
  isRequired?: boolean;
  label: string;
}

export const Checkbox: FC<CheckboxProps> = memo(
  ({ control, name, isRequired, label }) => {
    return (
      <Controller
        as={CheckboxView}
        name={name}
        control={control}
        label={label}
        rules={isRequired ? { validate: value => !!value } : {}}
      />
    );
  }
);
