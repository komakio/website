import { Link } from 'gatsby';
import React, { FC, useState } from 'react';
import { PageContext, useLanguage } from '@components/page-context';
import { Language } from '@utils/language';
import { Button } from '@components/button';
import { Manager, Reference, Popper } from 'react-popper';
import styled from 'styled-components';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import FeatherIcon from 'feather-icons-react';
import { usePopper } from 'react-popper';
import { colors } from '@utils/colors';
import { useDebounce } from 'use-debounce/lib';

interface HeaderLinkProps {
  element: PageContext['topMenus'][number];
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

export const HeaderLink: FC<HeaderLinkProps> = ({ element }) => {
  const language = useLanguage();
  const link =
    element.menu_link?._meta.url ||
    Language.getLanguageLink(language, element.menu_link?._meta.uid);
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

  if (element.children) {
    return (
      <>
        <Container
          ref={setReferenceElement}
          onMouseOver={() => setIsDropdownOpen(true)}
          onMouseOut={() => setIsDropdownOpen(false)}
        >
          <a href="#" style={linkStyles}>
            {element.title}
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
            {element.children.map(child => {
              return (
                <div className="item" key={child.dropdown_item_title}>
                  <Link
                    to={Language.getLanguageLink(
                      language,
                      child.dropdown_item_link._meta.uid
                    )}
                  >
                    {child.dropdown_item_title}
                  </Link>
                </div>
              );
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
      </>
    );
  }

  const renderElem = () => {
    if (element.button) {
      return (
        <Button href={link} theme="white" size="medium" style={linkStyles}>
          {element.title}
        </Button>
      );
    }

    return (
      <Link to={link} style={linkStyles}>
        {element.title}
      </Link>
    );
  };

  return <Container>{renderElem()}</Container>;
};
