import Link from "next/link"

const Footer = () => {
    return (
        <div className="bg-gray-700 text-gray-100 tracking-wide lg:tracking-wider">
            <div className="max-w-7xl mx-auto border-t py-10 lg:py-12 px-6 md:px-10 lg:px-14">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between md:pb-2">
                    <p className="md:text-lg">🌈 Initiative by <a href="https://baqc-esea.tilda.ws/" target="_blank" className="rounded hover:bg-white hover:text-gray-700 hover:px-2 hover:ml-1">BAQC ESEA</a></p>
                    <Link href="/community/support-us">
                        💚 <span className="md:text-lg rounded hover:bg-white hover:text-gray-700 hover:px-2 hover:ml-1">Support Us</span>
                    </Link>
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <p className="md:text-lg">❤️ Designed and Coded by <a href="http://kcxgu.github.io/" target="_blank" className="rounded hover:bg-white hover:text-gray-700 hover:px-2 hover:ml-1">Kaycee Gu</a></p>
                    <p className="md:text-lg md:pb-2">💛 Open Source: <a href="https://github.com/kcxgu/nextjs-queer-esea-events" target="_blank" className="rounded hover:bg-white hover:text-gray-700 hover:px-2 hover:ml-1">GitHub</a></p>
                </div>
            </div>
            <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm pb-8 text-gray-400 md:px-10 lg:px-0">
                <Link href="/" className="hover:text-gray-200 cursor-pointer">
                    ©HeyQueerAsians, a BAQC ESEA initiative
                </Link>

                <Link href="/community/guidelines" className="hover:text-gray-200 cursor-pointer pt-2 md:pt-0">
                    Our Guidelines
                </Link>

                <Link href="/legal/privacy" className="hover:text-gray-200 cursor-pointer pt-2 md:pt-0">
                    Privacy and Cookies
                </Link>

                <a href="https://forms.gle/iGrrnA5tLXuEHjFR7" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 cursor-pointer pt-2 md:pt-0">
                    Contact Us
                </a>
            </div>
        </div>
    )
}

export default Footer