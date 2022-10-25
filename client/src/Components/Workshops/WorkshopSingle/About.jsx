import React from "react";

const About = ({ desc }) => {
  return (
    <>
      <h2 className="mb-8 text-5xl font-bold text-center">About</h2>
      <p className="mx-auto mb-5 w-full max-w-2xl text-center">{desc}</p>
    </>
  );
};

export default About;
