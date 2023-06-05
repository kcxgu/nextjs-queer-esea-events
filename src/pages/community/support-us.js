import { TbCoffee } from "react-icons/tb";
import Link from "next/link"
import Head from "next/head";

const SupportUs = () => {

    const goToSkills = (e) => {
        e.preventDefault();
        const el = document.getElementById("skills")
        el?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    const goToDonation = (e) => {
        e.preventDefault();
        const el = document.getElementById("donation")
        el?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    const goToShare = (e) => {
        e.preventDefault();
        const el = document.getElementById("share")
        el?.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    return (
        <>
            <Head>
                <title>Support Us - Hey Queer Asians</title>
                <meta
                    name="description"
                    content="Support us to keep Hey Queer Asians going."
                    key="desc"
                />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Hey Queer Asians" />
                <meta property="og:site_name" content="Hey Queer Asians" />
                <meta property="og:description" content="Support us to keep Hey Queer Asians going." />
                <meta property="og:image" content="/SupportUs.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="www.heyqueerasians.com" />
                <meta property="twitter:title" content="Support us to keep Hey Queer Asians going." />
                <meta property="twitter:description" content="Support us to keep Hey Queer Asians going." />
                <meta name="twitter:image" content="/SupportUs.png" />
                <meta name="img_src" content="/SupportUs.png" />
            </Head>
            <div className="max-w-6xl w-full mx-auto px-8 py-10 tracking-wide leading-relaxed flex flex-col gap-2 text-gray-900 md:text-lg">
                <h1 className="text-4xl md:text-5xl py-4 md:pt-6 md:pb-8 lg:pt-10 lg:pb-12 text-gray-800">Support Us</h1>
                <div className="flex flex-col gap-4 md:gap-6 md:w-3/4 text-lg md:text-xl lg:text-2xl tracking-wide">
                    <p className="leading-normal"><span className="font-semibold">Hey Queer Asians</span> is one of our first initiatives at <Link href="https://baqc-esea.tilda.ws" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-2 hover:text-medium">BAQC ESEA</Link> and, my oh my, has it been a dream come true. We cannot be more proud of this platform.</p>
                    <p>If you are looking to support us. Here are some ways we can think of:</p>

                    <div className="flex flex-row justify-between flex-wrap mr-10 md:mr-0 md:grid md:grid-cols-4 gap-y-6 md:gap-x-10 md:justify-items-center md:place-items-center py-6">
                        <p className="bg-black text-white py-1.5 px-5 md:py-2.5 md:px-6 lg:py-3 lg:px-8 rounded-lg cursor-pointer hover:opacity-60"
                            onClick={goToSkills}
                        >
                            Skills
                        </p>

                        <p className="bg-black text-white py-1.5 px-5 md:py-2.5 md:px-6 lg:py-3 lg:px-8 rounded-lg cursor-pointer hover:opacity-60"
                            onClick={goToDonation}
                        >
                            Donation
                        </p>


                        <p className="bg-violet-500 text-white py-1.5 px-5 md:py-2.5 md:px-6 lg:py-3 lg:px-8 rounded-lg cursor-pointer hover:opacity-60"
                            onClick={goToShare}
                        >
                            Share
                        </p>
                    </div>

                    <p>You can get in touch with us <Link href="https://forms.gle/iGrrnA5tLXuEHjFR7" target="_blank" rel="noopener noreferrer" className="text-violet-600 underline underline-offset-2 decoration-violet-500 hover:opacity-80 cursor-pointer">here</Link>.</p>

                    <div id="skills" className="flex flex-col gap-4 md:gap-6 border-t py-8 lg:py-12 mt-6 lg:text-xl">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-wide py-2">Skills</h2>
                        <p className="leading-normal">Are you a <strong>UX/UI designer</strong>, looking at this platform thinking it could be improved? Let's chat! We like to keep things simple, clean, minimalist but other than that, the more creative and innovative the better!</p>
                        <p className="leading-normal">Are you an <strong>experienced developer</strong>? We want this platform to be open source and would love to have someone with experience in managing open source projects to lead on this!</p>
                        <p className="leading-normal">Once the open source is ready, we would welcome <strong>any developer</strong> to contribute! We are using: NextJS (JavaScript) and MongoDB.</p>
                    </div>

                    <div id="donation" className="flex flex-col gap-4 md:gap-6 border-t py-8 lg:py-12 my-6 tracking-wide text-black lg:text-xl">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-wide py-2">Donation</h2>
                        <div className="w-fit bg-yellow-400 rounded-xl p-4 w-48 lg:w-60 my-2">
                            <Link href="https://www.buymeacoffee.com/baqcesea" target="_blank" rel="noopener noreferrer">
                                <img
                                    src="https://downloads.intercomcdn.com/i/o/234105/0d29fbdf17e257cdfc2ba1ba/7103925065c5e9bd6ac7ac9efd453fd7.png"
                                />
                            </Link>
                        </div>
                        <p>The most effective way is to buy <strong>Kaycee</strong> some coffee.</p>
                        <p className="text-black">She's the founder of BAQC ESEA and the person who came up with this initiative<span className="text-gray-600">... and the person who designed and coded the platform</span><span className="text-gray-400">... and now maintaining and promoting the platform</span>.</p>
                        <div className="flex flex-row gap-2 lg:gap-3 items-center">
                            <p className="text-black"><span className="text-gray-400">She's got some big dreams, </span><span className="text-gray-600">keep her productive</span> with <Link href="https://www.buymeacoffee.com/baqcesea" className="underline underline-offset-4 decoration-2 hover:opacity-60" target="_blank" rel="noopener noreferrer">some coffee!</Link></p>
                            <TbCoffee className="lg:text-2xl" />
                        </div>
                        <p>Read more about BAQC ESEA's mission <Link href="https://baqc-esea.tilda.ws" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-2 hover:opacity-60">here</Link>.</p>
                    </div>

                    <div id="share" className="flex flex-col gap-4 md:gap-6 border-t py-8 lg:py-12 my-6 tracking-wide lg:text-xl">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-wide py-2">Share</h2>
                        <p>If you like what we and our partners are doing, share wherever, whenever you can!</p>
                        <p>Come to the events being held and bring a friend. <strong>Presence gives us the biggest confidence ✌️</strong>.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SupportUs