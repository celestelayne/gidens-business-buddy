export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <main className="flex min-h-screen flex-col md:flex-row md:pt-32">
                {/* need to fix the paddng and margin on this bc its scrolling */}
                <div className="flex-grow md:p-12 md:overflow-y-auto">{children}</div>
            </main>
        </>
    );
}