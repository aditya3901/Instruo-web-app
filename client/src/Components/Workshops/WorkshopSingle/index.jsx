import { React, useState, useEffect } from "react";
import Register from "./Register";
import WorkshopDetails from "./WorkshopDetails";
import HeroSection from "../../Shared/HeroSection";
import axios from "axios";
import { Sugar } from "react-preloaders";

const WorkshopSingle = ({ workshopId }) => {
  const [workshop, getWorkshop] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/workshops/${workshopId}`, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        getWorkshop(res.data.data.workshop);
        setLoading(false);
      });
  }, []);
  return (
    <>
      {!loading && (
        <div>
          <HeroSection
            title={workshop.title}
            desc={workshop.subtitle}
            breadParams={[
              {
                title: "Instruo",
                url: "/",
              },
              {
                title: "Workshop",
                url: "/workshops",
              },
              {
                title: workshop.title,
                url: "",
              },
            ]}
          />
          <WorkshopDetails {...workshop} />
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

export default WorkshopSingle;
