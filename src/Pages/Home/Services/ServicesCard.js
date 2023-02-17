import React from "react";
import { SlArrowRight } from "react-icons/sl";

const ServicesCard = ({service}) => {
    const {title, price, img} = service
  return (
    <div className="card card-compact w-86 bg-base-100 shadow-xl">
      <figure>
        <img
          src={img}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
      
        <div className="card-actions justify-end text-2xl font-semibold text-orange-600">
        <p className="">Price: $ {price}</p>
        <SlArrowRight></SlArrowRight>
          
        </div>
      </div>
    </div>
  );
};

export default ServicesCard;
