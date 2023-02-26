import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext } from "react";
import { FaGithubAlt, FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { setAuthToken } from "../../../api/authToken";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";

const SocialLogin = () => {
  const { googleUser } = useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleSingIn = () => {
    googleUser(googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setAuthToken(user);

        // const currentUser = {
        //   email: user.email
        // };

        // // Get jwt token
        // fetch('https://genius-car-server-mk-saifullah.vercel.app/jwt', {
        //   method: 'POST',
        //   headers: {'content-type': 'application/json'},
        //   body: JSON.stringify(currentUser)
        // })
        // .then(res => res.json())
        // .then(data => {
        //   console.log(data)
        //   localStorage.setItem('genius-car-token', data.token)
        // })

        navigate(from, { replace: true });
      })
      .catch((err) => console.error(err));
  };

  const handleGithubSingIn = () => {
    alert("githubSingIn is under construction");
  };
  return (
    <div>
      <h2 className="text-center">
        <button
          onClick={handleGoogleSingIn}
          className="btn btn-outline btn-primary ml-2 mr-2"
        >
          <FaGoogle></FaGoogle>Google
        </button>
        <button
          onClick={handleGithubSingIn}
          className="btn btn-outline btn-primary"
        >
          <FaGithubAlt></FaGithubAlt>GitHub
        </button>
        {/* <Button onClick={handleGoogleSingIn} className='mb-2'  variant="outline-info"><FaGoogle></FaGoogle> Login with Google</Button> */}
        {/* <br></br> */}
        {/* <Button  variant="outline-info"><FaGithub></FaGithub> Login with Github</Button> */}
      </h2>
    </div>
  );
};

export default SocialLogin;
