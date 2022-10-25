import { React, useState, useEffect } from "react";
import Register from "./Register";
import EventDetails from "./EventDetails";
import HeroSection from "../../Shared/HeroSection";
import axios from "axios";
import { Sugar } from "react-preloaders";

const EventSingle = ({ eventId }) => {
  const [event, getEvent] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/events/${eventId}`, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        getEvent(res.data.data.event);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {!loading && (
        <div>
          <HeroSection
            title={event.title}
            desc={event.subtitle}
            breadParams={[
              {
                title: "Instruo",
                url: "/",
              },
              {
                title: "Events",
                url: "/events",
              },
              {
                title: event.title,
                url: "",
              },
            ]}
          />
          <EventDetails {...event} />
          <Register />
        </div>
      )}
      <Sugar
        customLoading={loading}
        time={1800}
        animation="slide-down"
        background="#2A303C"
        color="#6419E6"
      />
    </>
  );
};

export default EventSingle;
