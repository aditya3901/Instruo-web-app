import React from "react";
import Faq from "./Faq";

const Rules = ({ rules }) => {
  return (
    <>
      <h2 className="mb-8 text-5xl font-bold ">Rules</h2>
      <ol>
        {rules.map((rule, idx) => (
          <li key={idx}>{rule}</li>
        ))}
      </ol>
    </>
  );
};

export default Rules;
