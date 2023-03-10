import React, { useEffect, useState } from 'react';
import ServicesCard from './ServicesCard';

const Services = () => {
    const [services, setServices] = useState([]);
    useEffect( () => {
        fetch('https://genius-car-server-mk-saifullah.vercel.app/services')
        .then(res => res.json())
        .then(data => setServices(data))
    }, [])
    return (
        <div>
            <div className='text-center'>
                <p className='text-2xl font-semibold text-orange-600'>Services</p>
                <h2 className='text-5xl font-bold my-4'>Our Service Area</h2>
                <p className='text-gray-400'>The majority have suffered alteration in some form, by injected humour, or randomised  <br/>words which don't look even slightly believable. </p>
            </div>
            <div className=' m-5 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {/* <div> */}
                {
                    services.map(service => <ServicesCard
                        key={service._id}
                        service={service}
                    ></ServicesCard>)
                }
            </div>
        </div>
    );
};

export default Services;