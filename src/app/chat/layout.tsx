import SideNav from '@/app/ui/chat/sidenav';

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <main className="flex min-h-screen flex-col md:flex-row md:pt-32">
                <div className="w-1/6 flex-none md:p-12">
                    <SideNav />
                </div>
                <div className="flex-grow p-6 md:overflow-y-auto">{children}</div>
            </main>
        </>
    );
}