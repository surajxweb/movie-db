import Image from 'next/image';
import React, { FC } from 'react';
import logo from '../resources/logo_yellow.png';
import Link from 'next/link';

const NavLinks: FC = () => (
  <div>
    <Image src={logo} alt="logo" height={60} width={106.66} />
    <ul>
      <Link href={'/'}>
        <li>Home 🏡</li>
      </Link>
      <Link href={'/search'}>
        <li>Search 🔍</li>
      </Link>
      <Link href={'/top100'}>
        <li>Top 💯</li>
      </Link>
    </ul>
  </div>
);

export default NavLinks;
