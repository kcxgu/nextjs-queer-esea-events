import Head from "next/head"

const guidelines = () => {
    return (
        <div className="bg-white">
            <Head>
                <title>Hey Queer Asians | Our Guidelines</title>
            </Head>
            <div className="max-w-5xl w-full mx-auto px-8 py-10 tracking-wide leading-relaxed flex flex-col gap-2 text-gray-900">
                <h1 className="text-3xl md:text-4xl py-4 md:pt-6 md:pb-8 lg:pt-10 lg:pb-12 text-gray-900">Guiding principles</h1>
                <div className="flex flex-col gap-4 md:gap-6">
                    <div className="md:grid md:grid-cols-3 text-lg text-gray-800 flex flex-col gap-4 md:gap-6">
                        <p className="text-xl font-medium md:font-semibold md:border-r md:border-gray-600">Adding an event</p>
                        <div className="md:col-span-2 flex flex-col gap-2 md:gap-4 lg:gap-6 tracking-wider md:px-4 text-gray-600 md:text-xl">
                            <p>We welcome anyone who is organising or hosting a queer ESEA event to share their event on this platform.</p>
                            <p>You must be a registered user to add an event. However, anyone can choose to be notified of new events added to the platform.</p>
                            <p>We operate on a foundation of trust between us and our users. That means events are published without moderation.</p>
                            <p>There is zero tolerance of hate, discrimination, defamation, and/or obscenity. That means, amongst other things, don't lie, bully, blackmail, make threats or do anything illegal.</p>
                        </div>
                    </div>

                    <div className="md:grid md:grid-cols-3 text-lg leading-relaxed text-gray-800 flex flex-col gap-4 md:gap-6">
                        <p className="text-xl font-medium md:font-semibold md:min-w-42 md:border-r md:border-gray-600">Flagging an event</p>
                        <div className="md:col-span-2 flex flex-col gap-2 md:gap-4 lg:gap-6 tracking-wider md:px-4 text-gray-600 md:text-xl">
                            <p>Anyone can flag an event and we appreciate anyone who flags a genuinely problematic event. You're our personal superhero, protecting members of our community.</p>
                            <p>We will review and investigate each flagged event as soon as we can to see if they are in violation of our guidelines. If so, we will remove the event immediately and take any other action as appropriate or necessary.</p>
                        </div>
                    </div>
                    <div className="md:grid md:grid-cols-3 text-lg text-gray-800 flex flex-col gap-4 md:gap-6">
                        <p className="text-xl font-medium md:font-semibold md:min-w-42 md:border-r md:border-gray-600">The final say</p>
                        <div className="md:col-span-2 flex flex-col gap-2 md:gap-4 lg:gap-6 tracking-wider leading-loose md:px-4 text-gray-600 md:text-xl">
                            <p>These guidelines are just some guiding principles. Please understand that we have the final say with regard to the interpretation and application of these guidelines, and we can update them at any time.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default guidelines