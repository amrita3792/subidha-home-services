import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../App";
import washingMachine from '../../../assets/icons/washing-machine.png';
import shaver from '../../../assets/icons/shaver.png';
import christmas from '../../../assets/icons/christmas.png';

const ServicesSection = () => {
  const { theme } = useContext(ThemeContext);

  const services = [
    {
      id: 1,
      title: "Appliance Rx: Quick & Reliable Repairs",
      description:
        "Swift, reliable fixes for household appliances. Get them back in shape hassle-free.",
      icon: washingMachine
    },
    {
      id: 2,
      title: "Gentlemen's Den: Premier Men's Grooming",
      description:
        "Tailored grooming for the modern man. Leave feeling refreshed and refined.",
      icon: shaver,
    },
    {
      id: 3,
      title: "Crystal Care: Superior Home Cleaning",
      description:
        "Meticulous cleaning for a pristine living space. Experience unparalleled cleanliness.",
      icon: christmas,
    },
  ];

  return (
    <div className="xl:max-w-screen-xl lg:max-w-screen-lg  mx-auto flex items-center flex-col lg:flex-row gap-10 px-4 my-20">
      <div className="basis-[55%] flex flex-col items-start gap-5">
        <p className="font-semibold text-[#ff6600]">Subidha Home Service</p>
        <h2 className="text-4xl font-semibold">Our Services</h2>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et.
        </p>
        <Link to="/all-services">
          <button className="btn bg-[#FF6600] hover:bg-[#1D2736] text-white px-10 py-2 active:scale-95 border-none">
            All Services
          </button>
        </Link>
      </div>
      <div className="grow flex flex-col gap-6">
        {services.map((service) => (
          <div
            className={`flex flex-col md:flex-row items-center text-center md:text-start gap-6 shadow-2xl rounded-3xl p-8 border ${
              theme === "dark" && "border-slate-600"
            }`}
            key={service.id}
          >
            <img className="h-16" src={service.icon} alt="" />
            <div>
              <h3 className="text-xl font-semibold my-2">{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;
