import React, { useEffect } from 'react';
import Banner from '../Banner/Banner';
import AllServicesCategories from '../AllServiceCategories/AllServiceCategories';
import ServicesSection from '../OurServicesSection/ServicesSection';
import HomeServiceSection from '../HomeServiceSection/HomeServiceSection';
import HappinessGuarantee from '../HappinessGuarantee/HappinessGuarantee';
import TopRatedProSection from '../TopRatedProSection/TopRatedProSection';

const Home = () => {
    useEffect(() => {
        // Set the desired scroll position when the component is mounted
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        
      }, []); 
    return (
        <div>
            <Banner />
            <AllServicesCategories />
            <HomeServiceSection />
            <ServicesSection />
            <HappinessGuarantee />
            <TopRatedProSection />
        </div>
    );
};

export default Home;