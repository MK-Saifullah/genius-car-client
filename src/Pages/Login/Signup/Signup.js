import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { setAuthToken } from '../../../api/authToken';
import img from "../../../assets/images/login/login.svg";
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const Signup = () => {
    const {createUser} = useContext(AuthContext)
    const [error, setError] = useState("");

    const handleSignup = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password);

        createUser(email, password)
        .then(userCredential => {
            const user = userCredential.user;
            console.log(user)
            setAuthToken(user)
            form.reset()
        })
        .catch(error => {
            console.error(error)
            setError(error)
        })
    }
    return (
        <div className="hero w-full">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-left md:text-left">
            <img src={img} alt="" className="w-3/4"/>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-20">
            <h1 className="text-5xl font-bold text-center">Sign Up</h1>
            <form onSubmit={handleSignup} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  name="text"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Your email"
                  name="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Your password"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                  <input className="btn btn-primary" type="submit" name="" value="Sign Up"/>
                {/* <button className="btn btn-primary">Login</button> */}
              </div>
            </form>
            <p className="text-center">Already have an account? <Link to ="/login" className="text-orange-600 font-bold">Login</Link></p>
            <p className='text-center text-red-600 mt-5'>{error.message}</p>
          </div>
        </div>
      </div>
    );
};

export default Signup;