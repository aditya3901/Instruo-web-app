import { React, useState, useEffect } from "react";
import WorkshopCard from "./WorkshopCard";
import HeroSection from "../Shared/HeroSection";
import { Sugar } from "react-preloaders";
import axios from "axios";

const Workshops = () => {
  const [workshops, getWorkshops] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/workshops ", {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        getWorkshops(res.data.workshops);
        setLoading(false);
      });
  }, []);
  return (
    <>
      {!loading && (
        <div>
          <HeroSection
            title={"Workshops"}
            desc={
              "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione, ullam?"
            }
            breadParams={[
              {
                title: "Instruo",
                url: "/",
              },
              {
                title: "Workshops",
                url: "",
              },
            ]}
          />
          <div className="p-10 mt-32 mb-32 flex flex-wrap gap-10 justify-center">
            {workshops.map((workshop, i) => (
              <WorkshopCard key={i} {...workshop} />
            ))}
          </div>
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

export default Workshops;
