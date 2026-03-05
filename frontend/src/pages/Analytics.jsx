import { Bar } from "react-chartjs-2";

export default function Analytics() {

  const data = {
    labels: ["Completed", "Pending", "Archived"],
    datasets: [{
      label: "Notes Statistics",
      data: [12, 5, 3]
    }]
  };

  return (
    <div className="p-10">
      <Bar data={data}/>
    </div>
  );
}