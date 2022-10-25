import React from "react";
import SponsorCard from "./SponsorCard";

const SponsorSection = ({ title, bg }) => {
  return (
    <div
      className={`hero bg-base-${bg} text-base-content mx-auto min-h-screen max-w-full`}
    >
      <div className="hero-content px-4 md:px-2 text-center flex flex-col">
        <div>
          <h2 className="mt-16 mb-2 text-5xl font-extrabold md:text-6xl">
            {title}
          </h2>
          <div className="p-6 not-prose grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 my-10 gap-6">
            <SponsorCard />
            <SponsorCard />
            <SponsorCard />
            <SponsorCard />
            <SponsorCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorSection;
