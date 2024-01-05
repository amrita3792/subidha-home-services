import React from "react";
import serviceMan from "../../../assets/images/service-man.png";
import { Link } from "react-router-dom";

const GetJobs = () => {
  return (
    <div className="max-w-screen-xl mx-auto my-10 px-5">
      <div>
        <h2 className="text-3xl font-semibold mb-2">About Us</h2>
        <p>
          At Subidha, we believe in simplifying the way individuals access
          essential home services and empowering skilled professionals to thrive
          in their businesses. As a leading home service platform, our mission
          is to bridge the gap between service providers and customers, creating
          a seamless and trustworthy ecosystem.
        </p>
        <h3 className="font-semibold text-xl mt-4 mb-1">Why Choose Subidha</h3>
        <ul className="list-disc px-10">
          <li>
            <span className="font-semibold">Community-Centric Approach:</span>{" "}
            We foster a sense of community where service providers can showcase
            their expertise and customers can easily connect with reliable
            professionals.
          </li>
          <li>
            Reliability and Trust: Subidha is committed to delivering reliable
            and trustworthy services. Our platform is designed to provide
            customers with peace of mind and service providers with a steady
            stream of opportunities.
          </li>
        </ul>
        <div className="float-right overflow-hidden">
          <img src={serviceMan} alt="" />
        </div>
        <h3 className="text-xl font-semibold mt-4 mb-1">Our Values</h3>
        <ul className="list-disc px-10">
          <li>
            <span className="font-semibold">Excellence:</span> We are dedicated
            to maintaining the highest standards of service quality and
            professionalism.
          </li>
          <li>
            <span className="font-semibold">Transparency:</span>
            Reliability and Trust: Subidha is committed to delivering reliable
            and trustworthy services. Our platform is designed to provide
            customers with peace of mind and service providers with a steady
            stream of opportunities.
          </li>
          <li>
            <span className="font-semibold">Innovation:</span>
            We embrace technological advancements to continuously enhance the
            user experience and streamline service delivery.
          </li>
        </ul>
        <h3 className="text-xl font-semibold mt-4 mb-1">Responsibilities</h3>
        <p>
          As a Home Service Provider with Subidha, you play a crucial role in
          delivering exceptional services to our diverse customer base. Your
          skills and expertise contribute to the growth of our community, and we
          provide you with the tools and support needed to thrive in your
          profession.
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-1">About the Role</h3>
        <ul className="list-disc px-10">
          <li>
            <span className="font-semibold">Prompt Service Response:</span>{" "}
            Respond promptly to service requests within your designated service
            areas, ensuring timely communication with customers.
          </li>
          <li>
            <span className="font-semibold">Quality Service Delivery:</span>
            Provide accurate estimates, deliver services with the highest
            quality, and adhere to Subidha's service standards.
          </li>
          <li>
            <span className="font-semibold">Customer Engagement: </span>
            Communicate effectively with customers to understand their needs,
            provide solutions, and maintain positive relationships.
          </li>
          <li>
            <span className="font-semibold">Independent Work:</span>
            Work independently, managing your schedule effectively to meet the
            demands of our dynamic platform.
          </li>
        </ul>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-center mb-4 gap-3">
          <input type="checkbox" className="checkbox checkbox-md" />
          <span className="font-semibold text-sm">
            I have read and agred to the <Link className="text-[#FF6600]">Terms and Conditions</Link>
          </span>
        </div>
        <button className="btn btn-neutral block mx-auto">Apply Now</button>
      </div>
    </div>
  );
};

export default GetJobs;
