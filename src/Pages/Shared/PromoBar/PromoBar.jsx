import React, { useContext } from 'react';
import location from '../../../assets/icons/location.png';
import email from '../../../assets/icons/email.png';
import telephone from '../../../assets/icons/phone-call.png';
import logo from '../../../assets/logo/subidha-logo.png';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../../App';

const PromoBar = () => {
    const {theme} = useContext(ThemeContext);
    return (
        <section className="xl:max-w-screen-xl mx-auto flex justify-between items-center flex-col gap-10  xl:flex-row my-10 px-4">
            <Link to="/" className="flex items-center gap-2 cursor-pointer">
                <img className="h-16" src={logo} alt="" />
                <h2 className="bg-gradient-to-r from-[#10e2ee] to-[#04ffa3] bg-clip-text text-transparent text-5xl font-extrabold">SUBIDHA</h2>
            </Link>
            <div className="flex flex-col md:flex-row gap-10 md:gap-20">
                <div className={`flex md:block flex-col ${theme === "light" && "text-stone-600" } items-center`}>
                    <img className="w-[30px]" src={location} alt="" />
                    <h6 className="text-lg text-start font-semibold">ADDRESS</h6>
                    <small className="font-semibold">House of ABL, 404/56,<br />
                        Ashulia DOHS, Dhaka</small>
                </div>
                <div className={`flex md:block flex-col ${theme === "light" && "text-stone-600" } items-center`}>
                    <img className="w-[30px]" src={email} alt="" />
                    <h6 className="font-semibold text-lg text-start">MAIL CONTACT</h6>
                    <small className="font-semibold">subidha@gmail.com <br />
                        support@gmail.com</small>
                </div>
                <div className="flex md:block flex-col items-center">
                    <img className="w-[30px]" src={telephone} alt="" />
                    <h3 className="bg-gradient-to-r from-[#10e2ee] to-[#04ffa3] bg-clip-text text-transparent text-3xl font-extrabold">1234 5678 90</h3>
                    <button className="bg-gradient-to-r from-[#10e2ee] to-[#04ffa3] hover:to-slate-500 hover:from-slate-700 px-10 py-2 text-white active:scale-95 font-semibold">Get a Quote</button>
                </div>
            </div>
        </section>
    );
};

export default PromoBar;

// 