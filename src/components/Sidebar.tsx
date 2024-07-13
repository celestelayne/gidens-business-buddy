'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from 'clsx'

export default function Sidebar() {

    // Holds the first half of links within the sidebar nav
    // NOTE: links are filler
    const linksTop = [
        { name: 'General', href: '/dashboard/general' },
        { name: 'People', href: '/dashboard/people' },
        { name: 'News', href: '/dashboard/news' },
    ]

    // Holds the second half of links within the sidebar nav
    // NOTE: links are filler
    const linksBottom = [
        { name: 'Activity', href: '/dashboard/activity' },
        { name: 'Account', href: '/dashboard/account' },
        { name: 'Profile', href: '/dashboard/profile' },
    ]

    // generateLinks() will map out the 'links' obj and create Link components for each indice
    // 'links' parameter indicates which links obj will be mapped ('linksTop', 'linksBottom') 
    function generateLinks(links: any) {
        const pathName = usePathname()
        return (
            <div>
                {links.map((link) => {
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            //the 'clsx' function is used to highlight current directory user is within
                            className={clsx("font-['Mona_Sans'] font-semibold text-bright-bluebell text-lg hover:text-white", {'text-white' : pathName === link.href})}
                        >
                            <p className="py-2">{link.name}</p>
                        </Link>
                    )
                })}
            </div>
        )

    }

    return (
        <div className="flex relative float-left w-1/5 min-w-48 min-h-screen h-full pt-16 bg-dark-blue bg-[#0C1021] border-[#313B5E] border-r-2">
            <div className="flex flex-col justify-between w-4/5 m-auto">
                <nav className="items-left pl-2">
                    {generateLinks(linksTop)}
                </nav>
                <hr className="w-full m-auto border-[#313B5E] border-1"></hr>
                <nav className="items-left pl-2">
                    {generateLinks(linksBottom)}
                </nav>
            </div>
        </div>
    )
}