import React from "react";
import FaqSingle from "./FaqSingle";

const Faq = ({ faq }) => {
  return (
    <div className="mt-20">
      <h2 className="mt-4 mb-4 text-5xl font-extrabold md:text-6xl">FAQs</h2>
      <div className="mt-10 mb-20 flex flex-col">
        {faq.map((faqItem, idx) => (
          <FaqSingle key={idx} {...faqItem} />
        ))}
      </div>
    </div>
  );
};

export default Faq;
