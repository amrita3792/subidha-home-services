import { useQuery } from "@tanstack/react-query";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const AllServiceCategories = () => {
  const { data: allServiceCategories = [], isLoading } = useQuery({
    queryKey: ["allServiceCategory"],
    queryFn: () =>
      fetch("http://localhost:5000/allServiceCategories").then((res) =>
        res.json()
      ),
  });

  console.log(allServiceCategories);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      slidesToSlide: 3, // optional, default to 1.
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
    <div className="xl:max-w-screen-xl mx-auto -mt-16 bg-white rounded-xl relative z-50 shadow-sm">
      <Carousel
        swipeable={false}
        draggable={false}
        responsive={responsive}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="all 1s"
        transitionDuration={5000}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        itemClass="carousel-item-padding-40-px"
      >
        {allServiceCategories.map((serviceCategory) => (
          <div className="px-3" key={serviceCategory._id}>
            <div
              className="flex flex-col items-center  rounded-xl p-6 "
            >
              <img className="w-11" src={serviceCategory.icon} alt="" />
              <h4 className="font-semibold">{serviceCategory.serviceName}</h4>
              <p>
                <small>{serviceCategory.totalService} Services</small>
              </p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default AllServiceCategories;
