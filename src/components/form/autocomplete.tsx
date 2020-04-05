import React, { memo, FC, useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '@utils/colors';
import { Input } from './input';
import { Manager, Reference, Popper } from 'react-popper';
import { useDebounce } from 'use-debounce';
import { State, Modifier } from '@popperjs/core';

interface AutoCompleteProps {
  register: any;
  name: string;
}

const InputContainer = styled.div`
  width: 100%;
`;

const DropdownContainer = styled.div<{ width: number }>`
  background: #fafafa;
  border: 1px solid #dfe1e6;
  border-radius: 0 0 5px 5px;
  padding: 15px;
  color: black;

  ${({ width }) => `
    width: ${width}px;
  `}
`;

const useDropdownWidth = () => {
  const [width, setWidth] = useState<number>();

  const modifiers: Partial<Modifier<any>>[] = [
    {
      name: 'grabWidth',
      enabled: true,
      phase: 'main',
      fn({ state }: { state: State }) {
        setWidth(state.elements.reference.getBoundingClientRect().width);
      },
    },
  ];
  return {
    width,
    modifiers,
  };
};

export const AutoComplete: FC<AutoCompleteProps> = memo(
  ({ register, name }) => {
    const [text, setText] = useState<string>('');
    const [value] = useDebounce(text, 500);
    const { width, modifiers } = useDropdownWidth();

    useEffect(() => {
      if (!value) {
        return;
      }
      console.log(value);
    }, [value]);

    return (
      <Manager>
        <Reference>
          {({ ref }) => (
            <InputContainer ref={ref}>
              <Input name={name} register={register} onChangeText={setText} />
            </InputContainer>
          )}
        </Reference>
        <Popper placement="bottom" modifiers={modifiers}>
          {({ ref, style, placement, arrowProps }) => {
            if (!value) {
              return null;
            }
            return (
              <DropdownContainer
                width={width}
                ref={ref}
                style={style}
                data-placement={placement}
              >
                Popper elementw
              </DropdownContainer>
            );
          }}
        </Popper>
      </Manager>
      //   <TetherComponent attachment="middle left">
      //     {/* <Input register={register} /> */}
      //     {/* <div>dqwd</div> */}
      //     <button>Toggle Tethered Content</button>
      //     <p>The tethered component</p>
      //   </TetherComponent>
    );
  }
);
