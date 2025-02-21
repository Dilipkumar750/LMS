
import React from "react";
import EChartsReact from "echarts-for-react";
import { Card } from "antd";
import * as echarts from "echarts";

interface LeaveData {
  value: number;
  name: string;
}

const LeaveOverviewChart: React.FC = () => {
  const chartData: LeaveData[] = [
    { value: 15, name: "Earned Leaves" },
    { value: 20, name: "Leave without Pay" },
    { value: 50, name: "Casual Leaves" },
    { value: 15, name: "Sick Leaves" },
  ];

  const options: echarts.EChartsOption = {
    title: {
      text: "Total Leaves",
      subtext: "30",
      left: "center",
      top: "40%",
      textStyle: {
        fontSize: 16,
        fontWeight: "bold",
      },
      subtextStyle: {
        fontSize: 20,
        color: "#333",
      },
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: "left",
      data: chartData.map((item) => item.name),
    },
    series: [
      {
        name: "Leave Type",
        type: "pie",
        radius: ["50%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "16",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: chartData,
        animation: true,
      },
    ],
  };

  return (
    <div style={{marginLeft:15, paddingBottom:5 }}>
    <Card title="Leave Overview Chart" bordered={false} style={{ marginBottom: 40 }}>
      <EChartsReact option={options}
      
       style={{ height: 260 , paddingLeft:5 , marginBottom:0}} />
    </Card>
    </div>
  );
};

export default LeaveOverviewChart;
