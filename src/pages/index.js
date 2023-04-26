import { useState, useEffect } from "react";
import Head from "next/head";
import EventsSchedule from "@/components/Events/Display/EventsSchedule";
import Hero from "@/components/Hero/Hero";
import axios from "axios";

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

  const [events, setEvents] = useState([]);
  const [selectedCity, setSelectedCity] = useState("London");
  const [selectedMonth, setSelectedMonth] = useState("Month");

  let selectedEvents = [];

  const getMonth = (date) => {
    return new Date(date).toLocaleString("default", { month: "long" })
  }

  const getEvents = async () => {
    try {
      const res = await axios.get("/api/events/events");
      setEvents(res.data);
    } catch (error) {
      console.log(error)
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
        <meta
          property="og:description"
          content="Share and Discover Queer Asian Events Near You!"
        />
        <meta property="og:image" content="/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="www.heyqueerasians.com" />
        <meta property="twitter:title" content="Share and Discover Queer Asian Events Near You!" />
        <meta
          property="twitter:description"
          content="Share and Discover Queer Asian Events Near You!"
        />
        <meta name="twitter:image" content="/logo.png" />
        <meta name="img_src" content="/logo.png" />
        <link rel="canonical" href="https://www.heyqueerasians.com/" key="canonical" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
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
        <EventsSchedule
          events={selectedEvents}
          setEvents={setEvents}
          selectedCity={selectedCity}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          selectedEvents={selectedEvents}
        />
      </div>
    </>
  )
}
