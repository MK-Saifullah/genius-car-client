import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import img from "../../../assets/images/login/login.svg";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
// import { SlControlPause } from "react-icons/sl";
import { GoogleAuthProvider } from "firebase/auth";
import {
  FaGoogle,
  FaGithub,
  FaFacebook,
  FaGithubAlt,
  FaTwitch,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

const Login = () => {
  const { loginUser, googleUser } = useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleSingIn = () => {
    googleUser(googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(from, {replace:true})
      })
      .catch((err) => console.error(err));
  };
  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    loginUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(from, {replace: true})
        form.reset();
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="hero w-full">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left md:text-left">
          <img src={img} alt="" className="w-3/4" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-20">
          <h1 className="text-5xl font-bold text-center">Login</h1>
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
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
                placeholder="password"
                className="input input-bordered"
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <input
                className="btn btn-primary"
                type="submit"
                name=""
                value="Login"
              />
              {/* <button className="btn btn-primary">Login</button> */}
            </div>
          </form>
          <p className="text-center mb-5">
            New in a Genius Car{" "}
            <Link to="/signup" className="text-orange-600 font-bold">
              Signup
            </Link>
          </p>

          <h2 className="text-center">
            Sign In with
            <button
              onClick={handleGoogleSingIn}
              className="btn btn-outline btn-primary ml-2 mr-2"
            >
              <FaGoogle></FaGoogle>Google
            </button>
            <button
              onClick={handleGoogleSingIn}
              className="btn btn-outline btn-primary"
            >
              <FaGithubAlt></FaGithubAlt>GitHub
            </button>
            {/* <Button onClick={handleGoogleSingIn} className='mb-2'  variant="outline-info"><FaGoogle></FaGoogle> Login with Google</Button> */}
            {/* <br></br> */}
            {/* <Button  variant="outline-info"><FaGithub></FaGithub> Login with Github</Button> */}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
