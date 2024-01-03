import React, { useContext } from "react";
import Chart from "react-apexcharts";
import { ThemeContext } from "../../../../App";

const RevenueSalesChart = () => {
  const { theme } = useContext(ThemeContext);
  const options = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#3C50E0", "#80CAEE"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      foreColor: theme === "dark" && '#A6ADBB',
      height: 335,
      type: "area",
      dropShadow: {
        enabled: true,
        color: "#623CEA14",
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },

      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: "straight",
    },
    // labels: {
    //   show: false,
    //   position: "top",
    // },
    grid: {
      borderColor: theme === "dark" ? "#323D4A" : "#DCDCDC",
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: "#fff",
      strokeColors: ["#3056D3", "#80CAEE"],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: "category",
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      tickAmount: 10,
      title: {
        style: {
          fontSize: "0px",
        },
      },
      min: 0,
      max: 100,
    },
  };

  const series = [
    {
      name: "series-1",
      data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
    },
    {
      name: "series-2",
      data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
    },
  ];
  return (
    <div
      className={`basis-4/6 p-7 shadow-md border rounded-lg ${
        theme === "dark" ? "bg-[#24303F] border-slate-700" : "bg-white"
      }`}
    >
      <div className="flex gap-10">
        <div className="flex items-start gap-3">
          <span className="block border-2 w-fit border-indigo-400 rounded-full p-1">
            <span className="h-3 w-3 bg-indigo-400 rounded-full block"></span>
          </span>
          <div>
            <p className="text-indigo-400 font-semibold">Total Revenue</p>
            <p className="text-xs font-bold">12.04.2022 - 12.05.2022</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="block border-2 w-fit border-sky-300 rounded-full p-1">
            <span className="h-3 w-3 bg-sky-300 rounded-full block"></span>
          </span>
          <div>
            <p className="text-sky-300 font-semibold">Total Sales</p>
            <p className="text-xs font-bold">12.04.2022 - 12.05.2022</p>
          </div>
        </div>
      </div>

      <div>
        <Chart height={350} options={options} series={series} type="area" />
      </div>
    </div>
  );
};

export default RevenueSalesChart;
