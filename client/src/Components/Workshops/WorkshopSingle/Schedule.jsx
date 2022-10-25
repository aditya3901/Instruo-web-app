import React from "react";

const Schedule = ({ schedule }) => {
  return (
    <>
      <h2 className="mb-8 text-5xl font-bold ">Schedule</h2>
      {schedule.map((round, idx) => (
        <p key={idx} className="text-xl">
          <span className="pr-2">
            {" "}
            <b>{round.title}: </b>
          </span>
          {`${round.date} | ${round.time} | ${round.duration} | ${round.venue}`}
        </p>
      ))}
    </>
  );
};

export default Schedule;
