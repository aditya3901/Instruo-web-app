import React from "react";
import { OrbitControls } from "@react-three/drei";
import { Link } from "react-router-dom";
import { Canvas } from "react-three-fiber";

import logo from "../../assets/logo.svg";
import HeroAnim from "../Anims/HeroAnim";

const Hero = () => {
  return (
    <div
      className="hero min-h-screen -mt-[5rem] "
      // style={{
      // 	backgroundImage: `url("https://images.pexels.com/photos/599982/pexels-photo-599982.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1")`,
      // }}
    >
      <div className="hero-overlay">
        <Canvas>
          <HeroAnim />
          <OrbitControls enableZoom={false} enabled={false} />
        </Canvas>
      </div>

      <div className="hero-content text-center pointer-events-none">
        <div className="max-w-md text-white bg-slate-50 backdrop-blur-sm bg-opacity-10 p-5 rounded-lg">
          <img
            src={logo}
            className="max-w-sm mx-auto"
            width="25%"
            height="25%"
          />
          <h1 className="mb-5 text-5xl font-bold">Instruo 2k22</h1>
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <div className="grid grid-flow-col gap-5 text-center auto-cols-max justify-center m-5">
            <div className="flex flex-col">
              <span className="countdown font-mono text-5xl">
                <span style={{ "--value": 15 }}></span>
              </span>
              days
            </div>
            <div className="flex flex-col">
              <span className="countdown font-mono text-5xl">
                <span style={{ "--value": 10 }}></span>
              </span>
              hours
            </div>
            <div className="flex flex-col">
              <span className="countdown font-mono text-5xl">
                <span style={{ "--value": 24 }}></span>
              </span>
              min
            </div>
            <div className="flex flex-col">
              <span className="countdown font-mono text-5xl">
                <span style={{ "--value": 35 }}></span>
              </span>
              sec
            </div>
          </div>
          <Link to="/events">
            <button className="btn btn-primary pointer-events-auto">
              View Events
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
