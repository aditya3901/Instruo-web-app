import React from "react";

const FaqSingle = ({ question, answer }) => {
  return (
    <div
      tabIndex={0}
      className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box my-2"
    >
      <input type="checkbox" className="peer" />
      <div className="collapse-title text-lg font-medium peer-checked:bg-base-200 peer-checked:text-secondary-content">
        {question}
      </div>
      <div className="collapse-content peer-checked:bg-base-200 peer-checked:text-base-content">
        <p>{answer}</p>
      </div>
    </div>
  );
};

export default FaqSingle;
