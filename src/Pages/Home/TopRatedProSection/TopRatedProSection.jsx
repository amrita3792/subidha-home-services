import { Link } from "react-router-dom";

const TopRatedProSection = () => {
  return (
    <div className="xl:max-w-screen-xl lg:max-w-screen-lg  mx-auto flex flex-col-reverse md:flex-row items-center gap-10 md:gap-10 lg:gap-36 my-20 px-4">
      <div className="md:basis-[50%] lg:basis-[40%]">
        <p className="font-semibold text-[#FF6600]">Subidha Home Service</p>
        <h2 className="text-4xl font-semibold my-3">
          Join the Elite: Become a Top-Rated Pro with Subidha
        </h2>
        <p className="my-4">
          Craft your success with Subidha: Where top-rated pros thrive. Join today
          for job opportunities without lead fees and flexible scheduling.
        </p>
        <Link to="/get-jobs">
          <button className="btn bg-[#FF6600] hover:bg-[#1D2736] text-white px-10 py-2 active:scale-95 border-none">
            Become a pro
          </button>
        </Link>
      </div>
      <div className="md:basis-[50%] lg:basis-[60%]">
        <img
          className="w-full rounded-xl"
          src="https://i.postimg.cc/pXkH5ZGw/builder-man-wearing-construction-uniform-standing-with-arms-crossed-with-confident-smile-isolated-or.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default TopRatedProSection;
