'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
    { name: 'Home', href: '/chat' },
    { name: 'People', href: '/chat/people' },
    { name: 'News', href: '/chat/news' },
    { name: 'Activity', href: '/chat/activity' },
    { name: 'Profile', href: '/chat/user-profile' },
]

export default function NavLinks() {
    const pathname = usePathname();

    return(
        <>
            {links.map(link => {
                return(
                    <Link 
                        key={link.name} 
                        href={link.href}
                        className={clsx(
                            'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-2 hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-6 md:px-3',
                            {
                                'bg-sky-100 text-blue-600': pathname === link.href,
                            },
                        )}>
                            <p className="hidden md:block">{link.name}</p>
                    </Link>
                )
            })}
        </>
    )
}