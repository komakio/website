import React, { memo, FC } from 'react';
import { CheckboxView } from './checkbox-view';
import { Controller, Control, FieldError } from 'react-hook-form';

interface CheckboxProps {
  control: Control<Record<string, any>>;
  name: string;
  isRequired?: boolean;
  label: string | JSX.Element;
  error?: FieldError;
}

export const Checkbox: FC<CheckboxProps> = memo(
  ({ control, name, isRequired, label, error }) => {
    return (
      <Controller
        as={CheckboxView}
        name={name}
        control={control}
        label={label}
        hasError={!!error}
        rules={isRequired ? { validate: value => !!value } : {}}
      />
    );
  }
);
