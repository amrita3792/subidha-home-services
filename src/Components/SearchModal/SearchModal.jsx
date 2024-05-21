import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchModal = ({ openSearchBar, setOpenSearchBar }) => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    const searchText = e.target.value;
    // console.log(searchText);

    if (searchText) {
      fetch(
        `https://subidha-home-services-server3792.glitch.me/find-services?searchText=${searchText}`
      )
        .then((res) => res.json())
        .then((data) => setServices(data));
    } else {
      setServices([]);
    }
  };

  const handleNavigate = (service) => {
    setOpenSearchBar(!openSearchBar);
    navigate(`/service-details/${service.categoryId}/${service.subCategoryId}`);
  };

  return (
    <label
      onClick={(e) => e.stopPropagation()}
      className={`absolute z-[500000] right-0 top-10 input input-bordered flex items-center gap-2 text-black w-[400px] ${
        openSearchBar ? "scale-100" : "scale-0"
      } transition `}
    >
      <input
        onChange={handleChangeInput}
        type="text"
        className="grow"
        placeholder="Search"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="w-4 h-4 opacity-70"
      >
        <path
          fillRule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clipRule="evenodd"
        />
      </svg>
      {services.length > 0 && (
        <div className="absolute left-0 top-14 text-black bg-white text-start p-5 rounded-xl w-full">
          {services.map((service, idx) => (
            <button
              onClick={() => handleNavigate(service)}
              className="btn hover:bg-[#2B3440] border-none hover:text-white "
              key={idx}
            >
              {service.serviceName}
            </button>
          ))}
        </div>
      )}
    </label>
  );
};

export default SearchModal;
