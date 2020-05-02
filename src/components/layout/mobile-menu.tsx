import { Link } from 'gatsby';
import React, { FC, useState } from 'react';
import styled, { css } from 'styled-components';
import { colors } from '@utils/colors';
import { Language } from '@utils/language';
import { useLanguage } from '@components/page-context';
import { Button } from '@components/button';

export const menuWidth = 200;

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
  open: boolean;
  onClose: () => void;
}

export const MobileMenu: FC<MobileMenuProps> = ({ open, onClose }) => {
  const language = useLanguage();

  const topMenus = [];

  return (
    <>
      {open && <Overlay onClick={onClose} />}
      <StyledMenu open={open}>
        <h1>
          <Link to={language === Language.defaultLang ? '/' : `/${language}`}>
            Komak
          </Link>
        </h1>

        {topMenus?.map(element => {
          const link = Language.getLanguageLink(
            language,
            element.menu_link?._meta.uid
          );

          const renderElement = () => {
            if (element.button) {
              return (
                <Button href={link} theme="white" size="medium">
                  {element.title}
                </Button>
              );
            }

            if (element.children) {
              return element.children.map((child, index) => (
                <div
                  style={{
                    marginBottom:
                      index !== element.children.length - 1 ? 30 : 0,
                  }}
                  key={child.dropdown_item_title}
                >
                  <Link
                    to={Language.getLanguageLink(
                      language,
                      child.dropdown_item_link._meta.uid
                    )}
                  >
                    {child.dropdown_item_title}
                  </Link>
                </div>
              ));
            }

            return <Link to={link}>{element.title}</Link>;
          };

          return <NavItem key={element.title}>{renderElement()}</NavItem>;
        })}
      </StyledMenu>
    </>
  );
};
