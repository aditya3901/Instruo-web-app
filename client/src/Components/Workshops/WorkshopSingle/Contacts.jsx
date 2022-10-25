import React from "react";

const Contacts = ({ contacts }) => {
  return (
    <>
      <h2 className="mb-8 text-5xl font-bold ">Contact</h2>
      <div className="flex flex-col lg:flex-row justify-around">
        {contacts.map((contact, idx) => (
          <div key={idx}>
            <h4 className="text-xl">{contact.name}</h4>
            <p className="pl-1">
              Phone: <a href={`tel: ${contact.phone}`}>+{contact.phone}</a>
              <br />
              Email: <a href={`mailto: ${contact.email}`}>{contact.email}</a>
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Contacts;
