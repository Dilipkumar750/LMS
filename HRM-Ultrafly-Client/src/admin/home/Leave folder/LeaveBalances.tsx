import React from "react";
import { Card, Row, Col } from "antd";
import EChartsReact from "echarts-for-react";
import * as echarts from "echarts";

interface LeaveData {
  value: number;
  name: string;
  color: string;
}

const LeaveOverviewChart: React.FC = () => {
  const chartData: LeaveData[] = [
    { value: 30, name: "Total Leaves", color: "#52c41a" },
    { value: 20, name: "Approved Leaves", color: "#1890ff" },
    { value: 5, name: "Rejected Leaves", color: "#faad14" },
    { value: 75, name: "% Of Present", color: "#f5222d" },
  ];

  const options: echarts.EChartsOption = {
    title: {
      text: "Leave Overview",
      subtext: `Total: ${chartData[0].value} | Present: ${chartData[3].value}%`,
      left: "center",
      top: "40%",
      textStyle: {
        fontSize: 10,
        fontWeight: "bold",
      },
      subtextStyle: {
        fontSize: 10,
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
        name: "Leave Statistics",
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
    <div style={{ marginLeft: 15, paddingBottom: 5 }}>
   
      <Row gutter={[15, 15]}>
        {chartData.map((leave, index) => (
          <Col span={6} key={index}>
            <Card
              style={{
                textAlign: "center",
                border: `1px solid ${leave.color}`,
              }}
              title={leave.name}
              headStyle={{ color: leave.color }}
            >
              <h1 style={{ fontSize: "2rem", color: leave.color }}>
                {leave.value}
              </h1>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default LeaveOverviewChart;