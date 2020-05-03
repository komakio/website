import { Link } from 'gatsby';
import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { colors } from '@utils/colors';
import { Language } from '@utils/language';
import { useLanguage } from '@components/page-context';
import { Button } from '@components/button';

export const menuWidth = 300;

const StyledMenu = styled.section<{ open: boolean }>`
  position: fixed;
  right: -${menuWidth}px;
  top: 0;
  bottom: 0;
  width: ${menuWidth}px;
  background: ${colors.green200};
  text-align: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  ${({ open }) =>
    open &&
    css`
      transform: translateX(-${menuWidth}px);
    `}
`;
const Overlay = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
`;

const NavItem = styled.div`
  padding: 15px;
`;

interface MobileMenuProps {
  elements: any[];
  open: boolean;
  onClose: () => void;
}

export const MobileMenu: FC<MobileMenuProps> = ({
  open,
  onClose,
  elements,
}) => {
  const language = useLanguage();

  return (
    <>
      {open && <Overlay onClick={onClose} />}
      <StyledMenu open={open}>
        <h1>
          <Link to={language === 'default' ? '/' : `/${language}`}>Komak</Link>
        </h1>

        {elements?.map(element => {
          const renderElement = () => {
            if (element.isButton) {
              return (
                <Button
                  href={element.link?.cached_url}
                  theme="white"
                  size="medium"
                >
                  {element.title}
                </Button>
              );
            }

            if (element.items) {
              return element.items.map((item, index) => (
                <div
                  style={{
                    marginBottom: index !== element.items.length - 1 ? 30 : 0,
                  }}
                  key={item.title}
                >
                  <Link to={item.link?.cached_url}>{item.title}</Link>
                </div>
              ));
            }

            return <Link to={element.link?.cached_url}>{element.title}</Link>;
          };

          return <NavItem key={element.title}>{renderElement()}</NavItem>;
        })}
      </StyledMenu>
    </>
  );
};
