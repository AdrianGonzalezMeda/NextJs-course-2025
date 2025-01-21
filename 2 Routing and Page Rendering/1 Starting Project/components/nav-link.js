'use client'; // Its better to split components into smallers one if you need to convert to a client component

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLink = ({href, children}) => {
    const path = usePathname();

    return (
        <Link href={href} className={path.startsWith(href) ? 'active' : undefined}>{children}</Link>
    )
}

export default NavLink
