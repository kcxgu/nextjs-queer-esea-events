import Head from "next/head";
import Link from "next/link";

const Privacy = () => {
    return (
        <>
            <Head>
                <title>Hey Queer Asians | Privacy and Cookies</title>
            </Head>
            <div className="max-w-5xl w-full mx-auto px-8 py-10 tracking-wide leading-relaxed flex flex-col gap-2 text-gray-900">
                <h1 className="text-3xl py-1 my-4">Privacy and Cookies</h1>
                <div id="privacy">
                    <div className="md:text-justify">
                        <h2 className="text-3xl py-2 md:py-4">Privacy</h2>
                        <div className="text-lg md:text-xl leading-relaxed flex flex-col gap-4 text-gray-600 tracking-wider">
                            <p>Last updated: 25 April 2023</p>
                            <p>We value your privacy. With this policy, we set out your privacy rights and how we collect, use, disclose, transfer and store your personal data.</p>
                        </div>
                        <div className="text-lg md:text-xl leading-relaxed flex flex-col gap-4 text-gray-600 py-4 tracking-wider">
                            <h3 className="font-medium text-gray-900">Terms we use in this policy</h3>
                            <p>When we say “Hey Queer Asians”, “we”, “our”, or “us”, we mean this platform, which is a BAQC ESEA intiative. BAQC ESEA is a not-for-profit entity responsible for processing your personal data.</p>
                            <p>When we say “our website” or “our platform”, we mean this particular platform.</p>
                        </div>
                        <div className="text-lg md:text-xl leading-relaxed flex flex-col gap-4 text-gray-600 py-4 tracking-wider">
                            <h3 className="font-medium text-gray-900">Third-party websites</h3>
                            <p>Our platform contains links to other websites, but that doesn't mean we endorse those websites.</p>
                            <p>We encourage you to review the privacy policies for these third-party websites because their procedures for collecting, handling and processing personal data might be different to ours.</p>
                        </div>
                        <div className="text-lg md:text-xl leading-relaxed flex flex-col gap-4 text-gray-600 py-4 tracking-wider">
                            <h3 className="text-xl font-semibold text-gray-900">Collecting and using your personal data</h3>
                            <p>Personal data is any information that relates to an identifiable individual.</p>
                            <p>We collect certain personal data when you log in / sign up to this platform, submit an event, choose to be notified of events and report an event. Personally identifiable information may include, but is not limited to:</p>
                            <ul className="list-disc list-inside flex flex-col gap-4 px-6">
                                <li>
                                    <span className="font-medium text-gray-800">Contact information: </span>Predominantly your email address and/or any other contact details you may provide us from time to time, for example, your name, website URL, social media links, etc. If you registered to post an event, the details of any contact information we may have collected will be available in you dashboard area.
                                </li>
                                <li>
                                    <span className="font-medium text-gray-800">Information about events: </span>The information you enter when you submit an event for display on our platform.
                                </li>
                                <li>
                                    <span className="font-medium text-gray-800">Communication information: </span>Any communication data we receive from you, such as, feedback, help requests, queries via email, and any metadata associated with those communications, such as time and date.
                                </li>
                            </ul>
                            <p>We ask you not to share any sensitive personal documents or personal data with us, such as information revealing ethnic origin, religious beliefs, or health information, of yourself or others.</p>
                            <p>Upon request, we are happy to remove information provided to us for you.</p>
                        </div>
                        <div className="text-lg md:text-xl leading-relaxed flex flex-col gap-4 text-gray-600 py-4 tracking-wider">
                            <h3 className="font-medium text-gray-900">How long do we store your personal data?</h3>
                            <p>We only keep your data for as long as we need it, or are required to for legal reasons.</p>
                            <p className="leading-relaxed">Personal data you provide is kept for as long as you have an account with us, or as needed to provide you with our services. If you choose to delete your user account, we will delete your personal data immediately unless required otherwise by law or compelling legitimate interests. Reasons we might retain some data for longer periods of time include (but are not limited to) security, fraud and platform abuse prevention, complying with legal or regulatory requirements, and defending our legitimate business interests.</p>
                            <p className="leading-relaxed">Event details will be deleted as soon as it is older than the current date or deleted by the organiser.</p>
                        </div>
                        <div className="text-lg md:text-xl leading-relaxed flex flex-col gap-4 text-gray-600 py-4 tracking-wider">
                            <h3 className="font-medium text-gray-900">Children's information</h3>
                            <p>Our platform is not directed to children under the age of 16, and we do not knowingly collect personal data from such children. If you become aware that a child under the age of 16 has provided us with their personal data, please <Link href="https://forms.gle/iGrrnA5tLXuEHjFR7" target="_blank" rel="noopener noreferrer" className="text-violet-600 underline underline-offset-2 decoration-violet-500 hover:opacity-80 cursor-pointer">contact us</Link>.</p>
                        </div>
                        <div className="text-lg md:text-xl leading-relaxed flex flex-col gap-4 text-gray-600 py-4 tracking-wider">
                            <h3 className="font-medium text-gray-900">Changes to this policy</h3>
                            <p>We may change this policy from time to time. Laws, regulations, and industry standards evolve, which may make those changes necessary, or we may make changes to our services or business. We will post the changes to this page and encourage you to review our Privacy Policy to stay informed.</p>
                            <p>If we make changes that materially alter your privacy rights, we will provide additional notice, such as via email or through our platform. Your continued use of our platform or services after we publish or send a notice about the changes to the policy will mean that you accept and agree to the updated policy.</p>
                        </div>
                        <div className="text-lg md:text-xl leading-relaxed flex flex-col gap-4 text-gray-600 py-4 tracking-wider">
                            <h3 className="font-medium text-gray-900">Contact us</h3>
                            <p>We aim to make this information as clear and transparent as possible. But if you still have questions about how we process your personal data, or would like to exercise your rights under our policy, please <Link href="https://forms.gle/iGrrnA5tLXuEHjFR7" target="_blank" rel="noopener noreferrer" className="text-violet-600 underline underline-offset-2 decoration-violet-500 hover:opacity-80 cursor-pointer">contact us</Link>.</p>
                        </div>
                    </div>
                </div>
                <div id="cookies" className="pb-4 tracking-wider">
                    <h2 className="text-2xl py-2 md:text-3xl md:py-4">🍪 Cookies</h2>
                    <p className="leading-loose text-gray-600 tracking-wider text-lg md:text-xl">This site uses cookies - small text files that are placed on your machine to help the site provide a better user experience. As a rule, cookies will make your browsing experience better. However, you may prefer to disable cookies on this site and on others. The most effective way to do this is to disable cookies in your browser. However, please note that by disabling cookies, certain features of this website may not function properly.</p>
                </div>
            </div>
        </>
    )
}

export default Privacy