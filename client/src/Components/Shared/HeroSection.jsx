import React from "react";
import { Link } from "react-router-dom";
import WindMap from "../Anims/WindMap";

const HeroSection = ({ title, desc, bgImage, breadParams }) => {
  return (
    <div className="h-[40vh] -mt-[5rem] hero bg-black">
      <WindMap />
      <div className="text-center mt-auto z-30 px-4">
        <h1 className="mt-auto mb-2 text-5xl font-bold text-white">{title}</h1>
        <p className="mb-5 text-secondary-content max-w-xl">{desc}</p>
        <div className="text-sm text-neutral-content breadcrumbs flex justify-center mb-5">
          <ul>
            {breadParams.map((bp, i) => (
              <li key={i}>
                <Link to={bp.url}>{bp.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
