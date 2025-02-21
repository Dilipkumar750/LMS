import React from "react";
import { Card, Row, Col } from "antd";


const LeaveBalances: React.FC = () => {
  const leaveData = [
    { type: "Earned Leave", count: 24, color: "#52c41a" },
    { type: "Casual Leave", count: 24, color: "#1890ff" },
    { type: "Sick Leave", count: 24, color: "#faad14" },
    { type: "Leave Without Pay", count: 24, color: "#f5222d" },
  ];

  return (
    <Row gutter={[15, 15]}>
      {leaveData.map((leave, index) => (
        <Col span={6} key={index}>
          <Card
            style={{
              textAlign: "center",
              border: `1px solid ${leave.color}`,
            }}
            title={leave.type}
            headStyle={{ color: leave.color }}
          >
            <h1 style={{ fontSize: "2rem", color: leave.color }}>
              {leave.count}
            </h1>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default LeaveBalances;
