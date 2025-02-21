import React, { useState } from "react";
import { Calendar, Badge } from "antd";
import dayjs, { Dayjs } from "dayjs";
import "antd/dist/reset.css"; // Ant Design default styling

interface LeaveData {
  date: string;
  description: string;
}

const LeaveCalendar: React.FC = () => {
  const [leaves, setLeaves] = useState<LeaveData[]>([]);

  const getListData = (value: Dayjs): { type: "default" | "error" | "success" | "processing" | "warning"; content: string }[] => {
    const leave = leaves.find((leave) => leave.date === value.format("YYYY-MM-DD"));
    return leave ? [{ type: "error", content: leave.description }] : [];
  };

  const dateCellRender = (value: Dayjs): React.ReactNode => {
    const listData = getListData(value);
    const isSaturday = value.day() === 6;
    const isSunday = value.day() === 0;

    return (
      <div
        className={`p-2 rounded ${
          isSaturday ? "bg-red-100 text-red-600" : isSunday ? "bg-blue-100 text-blue-600" : ""
        }`}
      >
        <div className="font-bold">
          {isSaturday || isSunday ? value.format("dddd, MMMM D") : ""}
        </div>
        <ul className="list-none m-0 p-0">
          {listData.map((item, index) => (
            <li key={index} className="py-1">
              <Badge status={item.type} text={item.content} />
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex justify-center items-center">
      <div className="rounded-2xl bg-white shadow-lg p-6 max-w-6xl w-full">
        <h1 className="text-2xl font-semibold mb-4 text-center text-gray-700">
          My Custom Calendar
        </h1>
        <Calendar dateCellRender={dateCellRender} className="rounded-xl shadow-sm border-0" />
      </div>
    </div>
  );
};

export default LeaveCalendar;