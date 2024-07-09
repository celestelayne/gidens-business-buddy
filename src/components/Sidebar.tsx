import Link from "next/link"
import { usePathname } from "next/navigation"

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
                            className="font-['Open_Sans'] font-semibold"
                        >
                            <p className="hidden md:block">{link.name}</p>
                        </Link>
                    )
                })}
            </div>
        )

    }

    return (
        <div className="w-full pt-16 float-left bg-dark-blue bg-[#0C1021]">
            <nav className="flex flex-col items-center ">
                {generateLinks(linksTop)}
            </nav>
            <hr className="w-4/5"></hr>
            <nav className="flex flex-col items-center ">
                {generateLinks(linksBottom)}
            </nav>
        </div>
    )
}