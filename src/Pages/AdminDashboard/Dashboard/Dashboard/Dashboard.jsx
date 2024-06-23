import React, { useEffect, useState } from "react";
import CardOne from "../CardOne/CardOne";
import CardTwo from "../CardTwo/CardTwo";
import CardThree from "../CardThree/CardThree";
import CardFour from "../CardFour/CardFour";
import RevenueSalesChart from "../RevenueSalesChart/RevenueSalesChart";
import ProfitChart from "../ProfitChart/ProfitChart";
import axios from "axios";

const Dashboard = () => {
  const [statistics, setStatistics] = useState({
    users: 0,
    providers: 0,
    reviews: 0,
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get("https://subidha-home-services-server3792.glitch.me/api/statistics");
        setStatistics(response.data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchStatistics();
  }, []);

  console.log(statistics);
  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 md:gap-x-7">
        <CardOne users={statistics.users} />
        <CardTwo providers={statistics.providers} />
        <CardThree users={statistics.users} />
        <CardFour />
      </div>
      <div className="flex flex-col xl:flex-row gap-8 my-10">
        <RevenueSalesChart />
        <ProfitChart />
      </div>
    </div>
  );
};

export default Dashboard;
