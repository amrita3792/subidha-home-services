import React, { useEffect } from 'react';
import Banner from '../Banner/Banner';
import AllServicesCategories from '../AllServiceCategories/AllServiceCategories';
import ServicesSection from '../ServicesSection/ServicesSection';

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
            <ServicesSection />
        </div>
    );
};

export default Home;