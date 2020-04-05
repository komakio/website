import React, { memo, FC } from 'react';
import styled from 'styled-components';

interface CheckboxViewProps {
  onChange?: (value: boolean) => void;
  checked?: boolean;
  name: string;
  label: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;

  .label {
    margin-left: 5px;
    font-size: 14px;
    cursor: pointer;
  }
`;

const CheckboxContainer = styled.div<{ checked: boolean }>`
  display: inline-block;
  vertical-align: middle;
  padding-bottom: 5px;
  height: 16px;

  input[type='checkbox'] {
    border: 0;
    clip: rect(0 0 0 0);
    clippath: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  input:focus + .checkbox {
    box-shadow: 0 0 0 3px pink;
  }

  .checkbox {
    display: inline-block;
    width: 16px;
    height: 16px;
    background: ${props => (props.checked ? 'salmon' : 'papayawhip')};
    border-radius: 3px;
    transition: all 150ms;
    cursor: pointer;

    svg {
      fill: none;
      stroke: white;
      stroke-width: 2px;
    }
  }
`;

export const CheckboxView: FC<CheckboxViewProps> = memo(
  ({ checked, onChange, label, name }) => {
    return (
      <Container>
        <CheckboxContainer checked={checked}>
          <input
            type="checkbox"
            name={name}
            checked={checked}
            onChange={() => onChange(!checked)}
            id={`checkbox-${name}`}
          />
          <label className="checkbox" htmlFor={`checkbox-${name}`}>
            {checked && (
              <svg viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </label>
        </CheckboxContainer>
        {label && (
          <label htmlFor={`checkbox-${name}`} className="label">
            {label}
          </label>
        )}
      </Container>
    );
  }
);
