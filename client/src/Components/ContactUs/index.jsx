import React, { useState } from "react";

import HeroSection from "../Shared/HeroSection";
import ContactCard from "./ContactCard";

const ContactUs = () => {
  const [tabActive, setTabActive] = useState(2);
  return (
    <div>
      <HeroSection
        title={"Contact Us"}
        desc={
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione, ullam?"
        }
        breadParams={[
          {
            title: "Instruo",
            url: "/",
          },
          {
            title: "Contact Us",
            url: "",
          },
        ]}
      />
      <div className="tabs tabs-boxed flex justify-center">
        <a
          className={`tab ${tabActive === 1 ? "tab-active" : ""}`}
          onClick={() => setTabActive(1)}
        >
          Design Team
        </a>
        <a
          className={`tab ${tabActive === 2 ? "tab-active" : ""}`}
          onClick={() => setTabActive(2)}
        >
          Technical Team
        </a>
        <a
          className={`tab ${tabActive === 3 ? "tab-active" : ""}`}
          onClick={() => setTabActive(3)}
        >
          Management Team
        </a>
      </div>
      {tabActive === 1 && (
        <div className="flex flex-wrap gap-10 p-10 justify-center">
          <ContactCard />
          <ContactCard />
          <ContactCard />
        </div>
      )}
      {tabActive === 2 && (
        <div className="flex flex-wrap gap-10 p-10 justify-center">
          <ContactCard />
          <ContactCard />
          <ContactCard />
          <ContactCard />
        </div>
      )}
      {tabActive === 3 && (
        <div className="flex flex-wrap gap-10 p-10 justify-center">
          <ContactCard />
          <ContactCard />
          <ContactCard />
          <ContactCard />
          <ContactCard />
          <ContactCard />
        </div>
      )}
    </div>
  );
};

export default ContactUs;
