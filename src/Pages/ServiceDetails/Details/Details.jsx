import React from "react";

const Details = ({ details }) => {
  console.log(details);
  return (
    <div className="mt-8">
      <h2 name="details"  className="text-3xl font-semibold">Details</h2>

      {details?.map((item, idx) => (
        <div className="mt-3" key={idx}>
          <h2 className="font-bold text-xl">{item.title}</h2>
          <p className="font-semibold mt-1 mb-3">{item.description}</p>
          <ul className="ps-10" style={{ listStyleType: "disc" }}>
            {item?.details?.map((item, idx) => (
              <li className="text-base" key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Details;
