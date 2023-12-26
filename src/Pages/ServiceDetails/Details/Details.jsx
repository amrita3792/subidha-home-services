import React from "react";

const Details = ({ details }) => {
  console.log(details);
  return (
    <div className="mt-8">
      <h2 className="text-3xl font-semibold">Details</h2>

      {details?.map((item, idx) => (
        <div className="mt-7" key={idx}>
          <h2 className="text-xl font-bold">{item.title}</h2>
          <p className="font-semibold mt-1">{item.description}</p>
          <ul className="ps-10" style={{ listStyleType: "disc" }}>
            {item?.details?.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Details;
