import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { Calendar, User, Users, TrendingUp, Clock, Award } from "lucide-react";
import axios from "axios";

// Individual Nurse Report Component
const IndividualNurseReport = ({ nurses }) => {
  const [selectedNurseId, setSelectedNurseId] = useState("");
  const [nurseData, setNurseData] = useState(null);

  useEffect(() => {
    if (selectedNurseId) {
      const nurse = nurses.find((n) => n._id === selectedNurseId);
      if (nurse) {
        setNurseData(processIndividualNurseData(nurse));
      }
    }
  }, [selectedNurseId, nurses]);

  const processIndividualNurseData = (nurse) => {
    // Calculate request statistics
    const totalRequests = nurse.workSchedule ? nurse.workSchedule.length : 0;
    const acceptedRequests = nurse.workSchedule
      ? nurse.workSchedule.filter((ws) => ws.status === "accepted").length
      : 0;
    const rejectedRequests = nurse.workSchedule
      ? nurse.workSchedule.filter((ws) => ws.status === "rejected").length
      : 0;
    const pendingRequests = nurse.workSchedule
      ? nurse.workSchedule.filter((ws) => ws.status === "requested").length
      : 0;

    // Calculate hours served month-wise from workingHours
    const monthlyHours = {};
    if (nurse.workingHours) {
      nurse.workingHours.forEach((wh) => {
        const date = new Date(wh.date);
        const monthYear = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}`;
        const from = new Date(wh.from);
        const to = new Date(wh.to);
        const hours = (to - from) / (1000 * 60 * 60);

        monthlyHours[monthYear] = (monthlyHours[monthYear] || 0) + hours;
      });
    }

    const monthlyHoursData = Object.entries(monthlyHours).map(
      ([month, hours]) => ({
        month,
        hours: Math.round(hours * 100) / 100,
      })
    );

    // Calculate total days worked
    const totalDaysWorked = nurse.workingHours ? nurse.workingHours.length : 0;

    const requestStatusData = [
      { name: "Accepted", value: acceptedRequests, color: "#22c55e" },
      { name: "Rejected", value: rejectedRequests, color: "#ef4444" },
      { name: "Pending", value: pendingRequests, color: "#f59e0b" },
    ];

    return {
      nurse,
      totalRequests,
      acceptedRequests,
      rejectedRequests,
      pendingRequests,
      monthlyHoursData,
      totalDaysWorked,
      requestStatusData,
      totalHoursWorked: Object.values(monthlyHours).reduce(
        (sum, hours) => sum + hours,
        0
      ),
    };
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <User className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">
          Individual Nurse Report
        </h2>
      </div>

      {/* Nurse Selection */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Nurse
        </label>
        <select
          value={selectedNurseId}
          onChange={(e) => setSelectedNurseId(e.target.value)}
          className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Select a Nurse --</option>
          {nurses.map((nurse) => (
            <option key={nurse._id} value={nurse._id}>
              {nurse.firstName || "Unknown"} {nurse.lastName || ""}
            </option>
          ))}
        </select>
      </div>

      {nurseData && (
        <div className="space-y-6">
          {/* Nurse Info Card */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {nurseData.nurse.firstName || "Unknown"}{" "}
                  {nurseData.nurse.lastName || ""}
                </h3>
                <p className="text-gray-600">ID: {nurseData.nurse._id}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      nurseData.nurse.availableStatus
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {nurseData.nurse.availableStatus
                      ? "Available"
                      : "Unavailable"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Total Days Worked</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {nurseData.totalDaysWorked}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Total Hours</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {Math.round(nurseData.totalHoursWorked)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Total Requests</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {nurseData.totalRequests}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-yellow-600" />
                <div>
                  <p className="text-sm text-gray-600">Acceptance Rate</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {nurseData.totalRequests > 0
                      ? Math.round(
                          (nurseData.acceptedRequests /
                            nurseData.totalRequests) *
                            100
                        )
                      : 0}
                    %
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Request Status Pie Chart */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">
                Request Status Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={nurseData.requestStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {nurseData.requestStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Monthly Hours Line Chart */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">
                Monthly Hours Worked
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={nurseData.monthlyHoursData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="hours"
                    stroke="#3b82f6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
