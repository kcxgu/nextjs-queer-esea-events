import { useState, useEffect } from "react";
import EventsSchedule from "@/components/Events/Display/EventsSchedule";
import Hero from "@/components/Hero/Hero";
import axios from "axios";

export default function Home() {
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
      if (selectedCity === item.location.city && selectedEvents.filter(event => event._id === item._id).length === 0) selectedEvents.push(item);
    })
  }

  events.forEach(item => {
    if ((selectedMonth === "Month" || selectedMonth === "Any") && selectedCity === item.location.city && selectedEvents.filter(event => event._id === item._ed).length === 0) selectedEvents.push(item);
  })

  events.forEach(item => {
    if (getMonth(item.eventDate) === selectedMonth && selectedCity === item.location.city && selectedEvents.filter(event => event._id === item._id).length === 0) selectedEvents.push(item);
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
      <Hero
        events={events}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />
      <EventsSchedule
        events={selectedEvents}
        selectedCity={selectedCity}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedEvents={selectedEvents}
      />
    </>
  )
}
