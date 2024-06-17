import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NumberVerificatonModal from "../NumberVerificationModal/NumberVerificationModal";
import { AuthContext } from "../../contexts/AuthProvider";
import { toast } from "react-toastify";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import newMessage from "../../assets/images/new-messages.png";
import { getDate, getTime } from "../../utilities/date";
import { getUserToken } from "../../utilities/getToken";
import useToken from "../../hooks/useToken";

const Signup = () => {
  const { googleSignIn, createUser, logout } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [error, setError] = useState(null);
  const [isReceive, setIsReceive] = useState(false);
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [uid, setUid] = useState("");
  const [token] = useToken(uid);

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, navigate, from, location, uid]);

  const handleChangeModalState = () => setShowModal(!showModal);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await googleSignIn();
      const user = result.user;
      const userMetadata = formatUserMetadata(user);
      const currentUser = formatCurrentUser(user, userMetadata);

      await fetch("https://subidha-home-services-server3792.glitch.me/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentUser),
      });

      setUid(currentUser.uid);
    } catch (error) {
      toast.error(error.message, { theme: "colored" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    if (emailError || passwordError) {
      setLoading(false);
      return;
    }

    try {
      const result = await createUser(email, password);
      const user = result.user;
      const userMetadata = formatUserMetadata(user);
      const currentUser = formatCurrentUser(user, userMetadata);

      await fetch("https://subidha-home-services-server3792.glitch.me/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentUser),
      });

      getUserToken(currentUser.uid);
      await updateName(user, name);
      await emailVerify(user);
      setEmail(user.email);
      form.reset();
      logout();
    } catch (error) {
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        setError("The email address is already in use.");
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const formatUserMetadata = (user) => {
    const { createdAt, lastLoginAt, lastSignInTime, creationTime } =
      user.metadata;
    const creationDate = getDate(creationTime);
    const lastSignInDate = getDate(lastSignInTime);
    const formattedCreationTime = `${creationDate} | ${getTime(createdAt)}`;
    const formattedLastSignInTime = `${lastSignInDate} | ${getTime(
      lastLoginAt
    )}`;
    return { formattedCreationTime, formattedLastSignInTime };
  };

  const formatCurrentUser = (user, metadata) => ({
    uid: user.uid,
    userName: user.displayName,
    email: user.email,
    phone: user.phoneNumber,
    photoURL: user.photoURL || "https://i.ibb.co/M1qvZxP/user.png",
    signupDate: metadata.formattedCreationTime,
    lastLogin: metadata.formattedLastSignInTime,
    status: user.emailVerified || user.phoneNumber ? "Active" : "Pending",
  });

  const emailVerify = (currentUser) =>
    sendEmailVerification(currentUser).then(() => setIsReceive(true));

  const updateName = (currentUser, name) =>
    updateProfile(currentUser, { displayName: name }).catch(console.error);

  const handleOnBlur = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmailError(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)
          ? null
          : "Invalid email address. Please enter a valid email address."
      );
    } else if (name === "password") {
      setPasswordError(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+{};:'",.<>?/\\[\]^_`|~])[A-Za-z\d!@#$%^&*()-_=+{};:'",.<>?/\\[\]^_`|~]{6,}$/.test(
          value
        )
          ? null
          : "Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
      );
    }
  };

  return (
    <div>
      {isReceive ? (
        <div className="mx-auto flex flex-col items-center text-center my-16">
          <img className="w-72" src={newMessage} alt="" />
          <h2 className="text-2xl font-semibold mb-3">
            Please verify your email
          </h2>
          <p className="my-2 text-xl font-semibold">
            We have sent a verification link to{" "}
            <span className="text-blue-500">({email})</span>.
          </p>
          <p className="text-sm font-semibold mb-4">
            Click on the link to complete the verification process. <br />
            You might need to check your spam folder.
          </p>
          <Link to="/login" className="btn btn-outline">
            Go to login screen
          </Link>
        </div>
      ) : (
        <div className="max-w-[400px] mx-auto my-12 px-3">
          <h2 className="text-3xl text-center mb-6 font-semibold">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control my-5">
              <input
                name="name"
                type="text"
                placeholder="Name"
                className="input input-bordered w-full h-11"
                required
              />
            </div>
            <div className="form-control mt-5">
              <input
                onBlur={handleOnBlur}
                name="email"
                type="email"
                placeholder="Email"
                className="input input-bordered w-full h-11"
                required
              />
              {emailError && (
                <div className="alert text-red-500 text-sm font-bold p-2">
                  {emailError}
                </div>
              )}
            </div>
            <div className="form-control mt-5">
              <input
                onBlur={handleOnBlur}
                name="password"
                type="password"
                placeholder="Password"
                className="input input-bordered w-full h-11"
                required
              />
              {passwordError && (
                <div className="alert text-red-500 text-sm font-bold p-2">
                  {passwordError}
                </div>
              )}
            </div>
            <button
              className="btn text-white bg-[#FF6600] hover:bg-[#1D2736] w-full mt-8"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          {error && (
            <div className="alert text-red-500 text-sm font-bold p-2">
              {error}
            </div>
          )}
          <p className="font-semibold mt-3 text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-[#FF6600] hover:underline">
              Log In
            </Link>
          </p>
          <div className="divider font-semibold">OR</div>
          <button
            onClick={handleChangeModalState}
            className="text-white bg-[#24292F] btn hover:bg-[#24292F]/90 font-medium rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2 w-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
              />
            </svg>
            Sign in with Phone Number
          </button>
          <button
            onClick={handleGoogleSignIn}
            className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 btn focus:outline-none font-medium rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2 w-full"
          >
            <svg
              className="w-4 h-4 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 19"
            >
              <path
                fillRule="evenodd"
                d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                clipRule="evenodd"
              />
            </svg>
            Sign in with Google
          </button>
          <button className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 btn focus:outline-none font-medium rounded-lg text-lg px-5 py-2.5 text-center items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2 w-full flex justify-center">
            <svg
              className="w-4 h-4 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 8 19"
            >
              <path
                fillRule="evenodd"
                d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                clipRule="evenodd"
              />
            </svg>
            Sign in with Facebook
          </button>
          {showModal && (
            <NumberVerificatonModal
              handleChangeModalState={handleChangeModalState}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Signup;
