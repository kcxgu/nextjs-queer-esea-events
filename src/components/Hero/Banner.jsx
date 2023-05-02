import { FaBell, FaCalendarCheck } from "react-icons/fa";
import { useRouter } from "next/router";

const Banner = ({ setNotificationDropdown }) => {
    const router = useRouter();

    const scrollToView = () => {
        document.getElementById('events').scrollIntoView({
            behavior: 'smooth'
        })
    }

    const handleOpenNotification = () => {
        setNotificationDropdown(true);
    }

    return (
        <div className="background">
            <div id="homeOptions" className="max-w-7xl md:w-4/5 mx-auto py-14 lg:py-20">
                <div className="mx-auto flex flex-col xl:flex-row justify-between items-start lg:items-center">
                    <h1 className="text-center md:text-left text-3xl md:text-5xl xl:text-6xl text-black font-semibold tracking-wide leading-normal md:leading-normal lg:leading-normal xl:leading-snug lg:tracking-wider lg:mr-20 px-6 md:px-0">Hey you, check out queer East and Southeast Asian events in your city!</h1>
                    <img
                        src="/banner.svg"
                        className="mx-auto md:hidden xl:block w-4/5 xl:w-1/3 py-10 xl:py-0"
                    />
                </div>
                <div className="xl:w-2/3 flex md:flex-row items-start md:py-8 px-10 md:px-0">
                    <div className="flex flex-col xl:flex-row justify-between gap-8 py-6">
                        <div className="xl:w-1/2 md:pl-1 md:pr-14 tracking-wide lg:tracking-wider leading-normal text-gray-700">
                            <div className="flex flex-row items-center gap-4 mb-2 text-orange-500  text-xl lg:text-2xl cursor-pointer hover:font-medium"
                                onClick={scrollToView}
                            >
                                <FaCalendarCheck />
                                <h2>See events in the UK</h2>
                            </div>
                            <p className="text-lg lg:text-xl">We hope to expand the platform to serve queer Asians everywhere soon</p>
                        </div>
                        <div className="md:pl-1 md:pr-14 lg:text-xl tracking-wide lg:tracking-wider leading-normal text-gray-700">
                            <div className="flex flex-row items-center gap-4 mb-2 text-violet-600 text-xl lg:text-2xl cursor-pointer hover:font-medium"
                                onClick={handleOpenNotification}
                            >
                                <FaBell />
                                <h2>Get notified</h2>
                            </div>
                            <p className="text-lg lg:text-xl">Get notified when there's a new event!</p>
                        </div>
                    </div>
                    <img
                        src="/banner.svg"
                        className="hidden md:block xl:hidden md:w-1/3 mx-auto py-10 lg:py-4"
                    />
                </div>
            </div>
        </div>
    )
}

export default Banner