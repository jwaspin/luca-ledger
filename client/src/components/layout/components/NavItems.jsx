import NavItem from './NavItem';

import navItemList from '../navItems.json';

export default function NavItems() {
  return navItemList.map((navItem) => (
    <NavItem
      key={navItem.id}
      linkTo={navItem.linkTo}
      navText={navItem.navText}
    />
  ));
}
