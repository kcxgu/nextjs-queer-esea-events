import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "@/atoms/userAtom";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import EventsSchedule from "@/components/Events/Display/EventsSchedule";
import Hero from "@/components/Hero/Hero";
import Skeleton from "@/components/Loader/Skeleton";

export default function Home() {
  const structuredData1 = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "url": "https://www.heyqueerasians.com/",
    "name": "HeyQueerAsians",
    "brand": "HeyQueerAsians",
  }

  const structuredData2 = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "HeyQueerAsians",
    "url": "https://www.heyqueerasians.com/"
  }

  const [userStateValue, setUserStateValue] = useRecoilState(userState);
  const [events, setEvents] = useState([]);
  const [selectedCity, setSelectedCity] = useState("London");
  const [selectedMonth, setSelectedMonth] = useState("Month");
  const [eventsLoading, setEventsLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  let selectedEvents = [];

  const getMonth = (date) => {
    return new Date(date).toLocaleString("default", { month: "long" })
  }

  const getEvents = async () => {
    setEventsLoading(true);
    try {
      const res = await axios.get("/api/events/events");
      setEvents(res.data);
      setEventsLoading(false);
    } catch (error) {
      console.log(error)
      setServerError(true)
      setEventsLoading(false);
    }
  }

  const getEventsByCity = () => {
    events.forEach(item => {
      if (selectedCity.toLocaleLowerCase() === item.location.city.toLocaleLowerCase() && selectedEvents.filter(event => event._id === item._id).length === 0) selectedEvents.push(item);
      if (selectedCity === item.format && selectedEvents.filter(event => event._id === item._id).length === 0) selectedEvents.push(item);
    })
  }

  events.forEach(item => {
    if ((selectedMonth === "Month" || selectedMonth === "Any")) {
      if (selectedCity.toLocaleLowerCase() === item.location.city.toLocaleLowerCase() && selectedEvents.filter(event => event._id === item._ed).length === 0) selectedEvents.push(item);
      if (selectedCity === item.format && selectedEvents.filter(event => event._id === item._id).length === 0) selectedEvents.push(item);
    }
  })

  events.forEach(item => {
    if (getMonth(item.eventDate) === selectedMonth) {
      if (selectedCity.toLocaleLowerCase() === item.location.city.toLocaleLowerCase() && selectedEvents.filter(event => event._id === item._id).length === 0) selectedEvents.push(item)
      if (selectedCity === item.format && selectedEvents.filter(event => event._id === item._id).length === 0) selectedEvents.push(item);
    }
  })

  useEffect(() => {
    setSelectedMonth("Month");
    getEventsByCity();
  }, [selectedCity])

  useEffect(() => {
    getEvents();
  }, [])

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");

    if (loggedUser) {
      setUserStateValue(JSON.parse(loggedUser))
    }

  }, [])

  return (
    <>
      <Head>
        <title>Hey Queer Asians</title>
        <meta
          name="description"
          content="Share and Discover Queer Asian Events Near You!"
          key="desc"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Hey Queer Asians" />
        <meta property="og:site_name" content="Hey Queer Asians" />
        <meta property="og:description" content="Share and Discover Queer Asian Events Near You!" />
        <meta property="og:image" content="/HeyQueerAsians.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="www.heyqueerasians.com" />
        <meta property="twitter:title" content="Share and Discover Queer Asian Events Near You!" />
        <meta property="twitter:description" content="Share and Discover Queer Asian Events Near You!" />
        <meta name="twitter:image" content="/HeyQueerAsians.png" />
        <meta name="img_src" content="/HeyQueerAsians.png" />
        <link rel="canonical" href="https://www.heyqueerasians.com/" key="canonical" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#603cba" />
        <meta name="theme-color" content="#ffffff" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData1) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData2) }} />
      </Head>
      <div>
        <Hero
          events={events}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />

        {eventsLoading ? (
          <Skeleton />
        ) : (
          <>
            {serverError ? (
              <div className="max-w-7xl mx-auto pb-24 md:pb-40 lg:pb-48">
                <div className="w-full max-w-4xl lg:max-w-5xl px-6 md:px-16 pt-4 pb-6 md:pt-8 md:pb-10 tracking-wide">
                  <h2 className="font-medium text-lg md:text-xl lg:text-2xl">Error fetching events</h2>
                  <p className="text-lg pt-6 lg:text-xl">Please <Link href="https://forms.gle/iGrrnA5tLXuEHjFR7" target="_blank" rel="noopener noreferrer" className="text-violet-600 underline underline-offset-2 decoration-violet-500 hover:opacity-80 cursor-pointer">contact us</Link>.</p>
                </div>
              </div>
            ) : (
              <EventsSchedule
                events={selectedEvents}
                setEvents={setEvents}
                selectedCity={selectedCity}
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
                selectedEvents={selectedEvents}
              />
            )}
          </>
        )}
      </div>
    </>
  )
}
