import React from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";

import Navbar from "./Components/Shared/Navbar";
import Footer from "./Components/Shared/Footer";
import Sponsors from "./Components/Sponsors/Sponsors";
import Home from "./Components/Home";
import Events from "./Components/Events";
import SignUp from "./Components/AuthPage/SignUp";
import LogIn from "./Components/AuthPage/LogIn";
import ContactUs from "./Components/ContactUs";
import EventSingle from "./Components/Events/EventSingle";
import Workshops from "./Components/Workshops";
import WorkshopSingle from "./Components/Workshops/WorkshopSingle";
import Profile from "./Components/Profile";

const App = () => {
  const GetEventById = () => {
    const { eventId } = useParams();
    return <EventSingle eventId={eventId} />;
  };
  const GetWorkshopById = () => {
    const { workshopId } = useParams();
    return <WorkshopSingle workshopId={workshopId} />;
  };
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:eventId" element={<GetEventById />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/workshops/:workshopId" element={<GetWorkshopById />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
