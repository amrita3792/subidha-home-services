import { useContext } from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

const DisplayError = () => {
  const error = useRouteError();
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogOut = () => {
    logout()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="h-screen">
      <div className="flex flex-col items-center justify-center h-full">
        <img
          className="w-96"
          src="https://i.ibb.co/fdq1KHD/free-something-went-wrong-illustration-ujbiu-ezgif-com-crop.png"
          alt=""
        />
        <p className="text-red-500 text-5xl font-semibold">
          {error.status || error.message}
        </p>
        <h4 className="text-xl">
          Please{" "}
          <button className="text-blue-600 underline" onClick={handleLogOut}>
            Sign Out
          </button>{" "}
          and log back in
        </h4>
      </div>
    </div>
  );
};

export default DisplayError;
