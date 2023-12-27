import React from "react";
import CardOne from "../CardOne/CardOne";
import CardTwo from "../CardTwo/CardTwo";
import CardThree from "../CardThree/CardThree";
import CardFour from "../CardFour/CardFour";
import RevenueSalesChart from "../RevenueSalesChart/RevenueSalesChart";
import ProfitChart from "../ProfitChart/ProfitChart";

const Dashboard = () => {
  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 md:gap-x-7">
        <CardOne />
        <CardTwo />
        <CardThree />
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
