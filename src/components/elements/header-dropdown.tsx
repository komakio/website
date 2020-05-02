import React, { useState } from 'react';
import styled from 'styled-components';
import { Components } from '../../templates/components';
import SbEditable from 'storyblok-react';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import FeatherIcon from 'feather-icons-react';
import { usePopper } from 'react-popper';
import { colors } from '@utils/colors';
import { useDebounce } from 'use-debounce/lib';
import {
  StoryblokComponent,
  StoryblokSubElement,
} from '@models/storyblok-component';

interface HeaderDropdownProps {
  title: string;
  items: StoryblokSubElement[];
}

const DropdownContainer = styled.div`
  padding: 10px 20px;
  border-radius: 4px;
  background: ${colors.green100};

  .item {
    padding: 10px 0;
  }
`;

const Container = styled.div`
  height: 65px;
  width: auto;
  line-height: 65px;
`;

export const HeaderDropdown: StoryblokComponent<HeaderDropdownProps> = ({
  blok,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>();

  const linkStyles = { margin: '0 12px' };

  const [referenceElement, setReferenceElement] = React.useState(null);
  const [popperElement, setPopperElement] = React.useState(null);
  // const [arrowElement, setArrowElement] = React.useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom',
    strategy: 'absolute',
    // modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
  });

  const [dropdownOpenDebounced] = useDebounce(isDropdownOpen, 100);

  return (
    <SbEditable content={blok}>
      <Container
        ref={setReferenceElement}
        onMouseOver={() => setIsDropdownOpen(true)}
        onMouseOut={() => setIsDropdownOpen(false)}
      >
        <a href="#" style={linkStyles}>
          {blok.title}
          <FeatherIcon
            icon="chevron-down"
            size={20}
            color="white"
            style={{ position: 'relative', top: 5 }}
          />
        </a>
      </Container>

      {dropdownOpenDebounced && (
        <DropdownContainer
          ref={setPopperElement}
          style={styles.popper}
          onMouseOver={() => setIsDropdownOpen(true)}
          onMouseOut={() => setIsDropdownOpen(false)}
          {...attributes.popper}
        >
          {blok.items.map(item => {
            return React.createElement(Components(item.component), {
              key: item._uid,
              blok: item,
            });
          })}
          {/* <div
            ref={setArrowElement}
            // style={{
            //   ...styles.arrow,
            //   background: 'green',
            //   width: 15,
            //   height: 15,
            // }}
          /> */}
        </DropdownContainer>
      )}
    </SbEditable>
  );
};
