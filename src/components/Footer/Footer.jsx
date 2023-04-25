import Link from "next/link"

const Footer = () => {
    return (
        <div className="bg-gray-700 text-gray-100 tracking-wide lg:tracking-wider">
            <div className="max-w-7xl mx-auto border-t py-10 lg:py-12 px-6">
                <p className="md:text-lg md:pb-2">🌈 Initiative by <Link href="https://baqc-esea.tilda.ws/" target="_blank" className="rounded hover:bg-white hover:text-gray-700 hover:px-2">BAQC ESEA</Link></p>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <p className="md:text-lg">❤️ Designed and Coded by <Link href="http://kcxgu.github.io/" target="_blank" className="rounded hover:bg-white hover:text-gray-700 hover:px-2">Kaycee Gu</Link></p>
                    <p className="md:text-lg md:pb-2">💛 Open Source: <Link href="https://github.com/kcxgu/nextjs-queer-esea-events" target="_blank" className="rounded hover:bg-white hover:text-gray-700 hover:px-2">GitHub</Link></p>
                </div>
            </div>
            <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm pb-8 text-gray-400">
                <Link href="/">
                    <p className="hover:text-gray-200 cursor-pointer">©HeyQueerAsians, a BAQC ESEA initiative</p>
                </Link>
                <Link href="/community/guidelines">
                    <p className="hover:text-gray-200 cursor-pointer pt-2 md:pt-0">Our Guidelines</p>
                </Link>
                <Link href="/legal/privacy">
                    <p className="hover:text-gray-200 cursor-pointer pt-2 md:pt-0">Privacy and Cookies</p>
                </Link>
            </div>
        </div>
    )
}

export default Footer