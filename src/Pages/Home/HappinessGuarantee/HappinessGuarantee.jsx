import { Link } from "react-router-dom";
import happlyFamily from "../../../assets/images/smiling-parents-holding-baby.jpg";
import HappinessGuarantedLogo from "../../../assets/logo/happiness-guaranted-logo.png";

const HappinessGuarantee = () => {
  return (
    <div className="bg-[#345DA7] relative px-4">
      <div className="xl:max-w-screen-xl relative z-[1000] mx-auto text-white flex py-36">
        <div className="lg:basis-[50%]">
          <img className="h-44" src={HappinessGuarantedLogo} alt="" />
          <h2 className="text-4xl font-semibold mt-3 mb-5">
            Your Happiness, <br /> Guaranteed
          </h2>
          <p className="mb-2">
            Your happiness is our goal. If you’re not happy, we’ll work to make
            it right. Our friendly customer service agents are available 24
            hours a day, 7 days a week. The Handy Happiness Guarantee only
            applies when you book and pay for a service directly through the
            Subidha platform.
          </p>
          <Link className="underline" to="">
            Learn More.
          </Link>
        </div>
      </div>
      <img
        className="absolute right-0 top-0 h-full  lg:block"
        src={happlyFamily}
        alt=""
      />
      <div className="bg-black h-full w-full absolute top-0 left-0 opacity-50 block lg:hidden"></div>
    </div>
  );
};

export default HappinessGuarantee;
