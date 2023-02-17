import React from "react";
import person from '../../../assets/images/about_us/person.jpg';
import parts from '../../../assets/images/about_us/parts.jpg';

const About = () => {
  return (
    <div className="hero my-20">
      <div className="hero-content flex-col lg:flex-row">
       <div className=" relative w-1/2">
       <img
          src={person}
          alt=""
          className="w-3/4 max-w-sm rounded-lg shadow-2xl"
        />
        <img
          src={parts}
          alt=""
          className="absolute w-3/5 right-5 top-1/2 border-8 max-w-sm rounded-lg shadow-2xl"
        />
       </div>
        <div className="w-1/2">
            <h3 className=" my-5 font-bold text-orange-700">About Us</h3>
          <h1 className="text-5xl font-bold">We are qualified <br/>
          & of experience <br/>
          in this field</h1>
          <p className="py-2 text-gray-400">
          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised 
          words which don't look even slightly believable. 
          </p>
          <p className="py-1 mb-5 text-gray-400">
          the majority have suffered alteration in some form, by injected humour, or randomised 
          words which don't look even slightly believable. 
          </p>
          <button className="btn btn-error">Get More Info</button>
        </div>
      </div>
    </div>
  );
};

export default About;
