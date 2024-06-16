import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ThemeContext } from "../../../App";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

const AllServiceCategories = () => {
  const { theme } = useContext(ThemeContext);
  // const navigate = useNavigate();

  const {
    data: allServiceCategories = [],
    isLoading,
    // refetch,
    error,
  } = useQuery({
    queryKey: ["allServices"],
    queryFn: () => fetchServiceCategoriesData(),
  });

  const fetchServiceCategoriesData = async () => {
    const response = await fetch("https://subidha-home-services-server3792.glitch.me/allServiceCategories", {
      // headers: {
      //   authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      // },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  };

  if (isLoading) {
    return (
      <div className="xl:max-w-screen-xl mx-auto lg:-mt-[63px] relative z-50">
        <div className="skeleton h-32"></div>
      </div>
    );
  }

  if (error) {
    toast.error("There was an error fetching services data.", {
      
      autoClose: false,
      theme: "colored",
    });
    return;
  }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      slidesToSlide: 6, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <div
      className={`xl:max-w-screen-xl mx-auto lg:-mt-[75px] ${
        theme === "light" ? "bg-white border" : "bg-[#1D232A]"
      }  rounded-xl relative z-50 shadow-lg multicarousel`}
    >
      <Carousel
        swipeable={true}
        draggable={false}
        responsive={responsive}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="all 1s"
        transitionDuration={1000}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        itemClass="carousel-item-padding-40-px"
      >
        {allServiceCategories.map((serviceCategory) => (
          <div className="px-3" key={serviceCategory._id}>
            <div
              className="flex flex-col items-center  rounded-xl p-6"
            >
              <img className="w-11" src={serviceCategory.icon} alt="" />
              <h4 className="font-semibold mt-2">
                {serviceCategory.serviceName}
              </h4>
              {serviceCategory?.totalService && (
                <p>
                  <small className="font-semibold">
                    {serviceCategory?.totalService} Services
                  </small>
                </p>
              )}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default AllServiceCategories;
