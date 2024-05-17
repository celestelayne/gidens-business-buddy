import Navbar from "@/components/Navbar";

export default function About() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <Navbar />
            <div className="w-full min-h-screen relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:px-24 xl:py-32">
                <p>About Page</p>
            </div>
        </main>
    )
}