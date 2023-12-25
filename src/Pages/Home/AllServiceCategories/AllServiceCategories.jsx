import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import widget from "../../../assets/icons/widget.png";
import { ThemeContext } from "../../../App";

const AllServiceCategories = () => {
  const {theme} = useContext(ThemeContext);
  const { data: allServiceCategories = [], isLoading } = useQuery({
    queryKey: ["allServiceCategory"],
    queryFn: () =>
      fetch("http://localhost:5000/allServiceCategories").then((res) =>
        res.json()
      ),
  });

  if(isLoading) {
    return <div className="xl:max-w-screen-xl mx-auto -mt-[63px] relative z-50">
      <div className="skeleton h-32"></div>
    </div>
  }
  
  console.log(allServiceCategories);

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

  allServiceCategories.push({
    id: "658853432456dsdfde3d98449a637",
    serviceName: "All Services",
    icon: widget,
  })

  console.log(allServiceCategories.length);

  return (
    <div className={`xl:max-w-screen-xl mx-auto -mt-[75px] ${theme === "light"? "bg-white" : "bg-[#1D232A]"} rounded-xl relative z-50 shadow-lg multicarousel mb-20`}>
      <Carousel
        swipeable={true}
        draggable={false}
        responsive={responsive}
        // autoPlay={true}
        // infinit={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="all 1s"
        transitionDuration={1000}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        itemClass="carousel-item-padding-40-px"
        // renderArrowsWhenDisabled={true}
        // showDots={true}
      >
        {allServiceCategories.map((serviceCategory) => (
          <div className="px-3" key={serviceCategory._id}>
            <div className="flex flex-col items-center  rounded-xl p-6 cursor-pointer">
              <img className="w-11" src={serviceCategory.icon} alt="" />
              <h4 className="font-semibold mt-2">
                {serviceCategory.serviceName}
              </h4>
              {
                serviceCategory?.totalService && <p>
                <small className="font-semibold">{serviceCategory?.totalService} Services</small>
              </p>
              }
            </div>
          </div>
        ))}
       
      </Carousel>
    </div>
  );
};

export default AllServiceCategories;
