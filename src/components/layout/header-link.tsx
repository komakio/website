import { Link } from 'gatsby';
import React, { FC } from 'react';

interface HeaderLinkProps {
  link: string;
  title: string;
}
export const HeaderLink: FC<HeaderLinkProps> = ({ title, link }) => {
  return (
    <Link to={link} style={{ margin: '0 5px' }}>
      {title}
    </Link>
  );
};
