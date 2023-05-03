import React, { useEffect, useState } from "react";
import TopNav from "../Navigations/TopNav";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import {
  useDailyStatsQuery,
  useSubscriberStatsQuery,
} from "../../Api/DashboardApi";
import EmailCard from "./EmailCard";

Chart.register(CategoryScale);

const Dashboard = () => {
  const options = {
    title: {
      display: true,
      text: "Email Statistics",
      fontSize: 20,
    },
  };
  const { data: dailyStats, userStates } = useDailyStatsQuery();
  const { data: subscribers, subscriberStates } = useSubscriberStatsQuery();

  const formatDailyStats = (data) => {
    return {
      labels: data.map((item) => item.date),
      datasets: [
        {
          label: "Emails Sent",
          data: data.map((item) => item.sent),
          borderColor: "blue",
          fill: false,
        },
        {
          label: "Emails Failed",
          data: data.map((item) => item.failed),
          borderColor: "red",
          fill: false,
        },
        {
          label: "Emails Opened",
          data: data.map((item) => item.opened),
          borderColor: "green",
          fill: false,
        },
      ],
    };
  };

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (dailyStats) {
      setChartData(formatDailyStats(dailyStats));
    }
  }, [dailyStats]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <TopNav />
      <section className="max-w-5xl mx-auto">
        <p className="text-2xl font-bold mt-6 mb-4">Email Stats</p>
        <div className="mb-10 bg-white rounded-lg h-96">
          {chartData && <Line data={chartData} options={options} />}
        </div>
        <div>
          <p className="text-2xl font-bold">Users</p>
          <div>
            {subscribers &&
              subscribers.map((subscriber) => (
                <EmailCard key={subscriber.email} subscriber={subscriber} />
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
