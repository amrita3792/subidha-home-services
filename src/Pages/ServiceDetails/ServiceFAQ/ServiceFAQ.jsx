import React, { useState } from "react";

const ServiceFAQ = ({ faq }) => {
  const [index,setIndex] = useState(0);

  const handleInputChange = (idx) => {
    setIndex(idx);
  };

  return (
    <div className="mt-8">
      <h2 name="faq" className="text-2xl font-semibold">FAQ</h2>
      {faq.map((item, idx) => (
        <div key={idx} className="collapse collapse-plus bg-base-200">
          <input onChange={() => handleInputChange(idx)} type="radio" name="my-accordion-3" checked={index === idx ? true : false} />
          <div className="collapse-title font-semibold">
            {item.question}
          </div>
          <div className="collapse-content">
            <p className="text-sm">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceFAQ;
