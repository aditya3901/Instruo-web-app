import React from "react";
import HostsCard from "./HostsCard";

const Hosts = ({ speakers }) => {
  return (
    <div className="my-16">
      <h2 className="mb-8 text-5xl font-bold">Speakers</h2>
      <div className="pt-10 flex flex-wrap gap-10 justify-center">
        {speakers.map((speaker, idx) => (
          <HostsCard key={idx} {...speaker} />
        ))}
      </div>
    </div>
  );
};

export default Hosts;
