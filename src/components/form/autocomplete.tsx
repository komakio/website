import React, { memo, FC, useEffect, useState, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { colors } from '@utils/colors';
import { Input } from './input';
import { Manager, Reference, Popper } from 'react-popper';
import { useDebounce } from 'use-debounce';
import { State, Modifier } from '@popperjs/core';
import { FieldError } from 'react-hook-form';
import { LocationApi, GeolocationResult } from '@api/location';
import { useOnClickOutside } from '@utils/click-outside';

interface AutoCompleteProps {
  register: any;
  name: string;
  error?: FieldError;
  onChooseLocation: (result: GeolocationResult) => void;
  loadingLabel: string;
  noResultsLabel: string;
}

const InputContainer = styled.div`
  width: 100%;
`;

const DropdownContainer = styled.div<{ width: number }>`
  background: ${colors.green100};
  border: 2px solid ${colors.green100};
  /* border-radius: 0 0 5px 5px; */
  border-radius: 5px;
  padding: 10px 15px;
  /* margin-top: 5px; */
  color: white;

  ${({ width }) => css`
    width: ${width}px;
  `}
`;

const LocationResult = styled.div<{ last: boolean }>`
  padding: 5px 0;
  min-height: 40px;
  cursor: pointer;
  display: table;
  width: 100%;

  ${({ last }) =>
    !last &&
    css`
      border-bottom: 1px solid white;
    `}

  div {
    display: table-cell;
    vertical-align: middle;
  }
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
  ({
    register,
    name,
    error,
    onChooseLocation,
    loadingLabel,
    noResultsLabel,
  }) => {
    const [text, setText] = useState<string>('');
    const { width, modifiers } = useDropdownWidth();
    const [loading, setLoading] = useState<boolean>(false);
    const [results, setResults] = useState<GeolocationResult[]>();
    const [open, setOpen] = useState<boolean>();

    const nodeRef = useOnClickOutside(() => setOpen(false));

    const chooseResult = useCallback(
      (result: GeolocationResult) => () => {
        setOpen(false);
        onChooseLocation(result);
      },
      [onChooseLocation]
    );

    const [value] = useDebounce(text, 500);
    useEffect(() => {
      setLoading(false);
      if (!value) {
        setOpen(false);
        return;
      }

      setOpen(true);

      const call = async () => {
        setLoading(true);
        setResults(null);
        try {
          const results = await LocationApi.autocomplete(value);
          setResults(results);
          setLoading(false);
        } catch {
          setLoading(false);
        }
      };
      call();
    }, [value]);

    return (
      <Manager>
        <Reference>
          {({ ref }) => (
            <InputContainer ref={ref}>
              <Input
                name={name}
                error={error}
                register={register}
                onChangeText={setText}
                autoComplete="off"
              />
            </InputContainer>
          )}
        </Reference>
        <Popper placement="bottom" modifiers={modifiers}>
          {({ ref, style, placement }) => {
            if (!open) {
              return null;
            }
            return (
              <DropdownContainer
                width={width}
                ref={ref}
                style={style}
                data-placement={placement}
              >
                <div ref={nodeRef}>
                  {loading && loadingLabel}
                  {results?.length
                    ? results.map((result, index) => {
                        return (
                          <LocationResult
                            last={index === results.length - 1}
                            key={result.label}
                            onClick={chooseResult(result)}
                          >
                            <div>{result.label}</div>
                          </LocationResult>
                        );
                      })
                    : !loading
                    ? noResultsLabel
                    : ''}
                </div>
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
