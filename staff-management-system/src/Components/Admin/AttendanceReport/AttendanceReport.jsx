import React, { useState, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { ChevronDown, Crown } from "lucide-react";
import {
  format,
  getMonth,
  getYear,
  getDaysInMonth,
  getDate,
  differenceInHours,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
} from "date-fns";

// --- MOCK DATA ---
// In a real app, you would fetch this data from an API.
const staffData = [
  {
    _id: "staff001",
    firstName: "Priya",
    lastName: "Sharma",
    workSchedule: [
      {
        date: "2025-07-24",
        from: "2025-07-24T12:30:00",
        to: "2025-07-24T18:30:00",
        status: "accepted",
      },
      {
        date: "2025-08-06",
        from: "2025-08-06T12:54:00",
        to: "2025-08-06T20:57:00",
        status: "accepted",
      },
      {
        date: "2025-08-07",
        from: "2025-08-07T10:30:00",
        to: "2025-08-07T18:30:00",
        status: "accepted",
      },
      {
        date: "2025-08-08",
        from: "2025-08-08T18:00:00",
        to: "2025-08-08T22:00:00",
        status: "accepted",
      },
      {
        date: "2025-08-13",
        from: "2025-08-13T17:39:00",
        to: "2025-08-13T21:39:00",
        status: "accepted",
      },
      {
        date: "2025-08-29",
        from: "2025-08-29T10:00:00",
        to: "2025-08-29T12:00:00",
        status: "rejected",
      },
      {
        date: "2025-08-29",
        from: "2025-08-29T14:00:00",
        to: "2025-08-29T19:00:00",
        status: "accepted",
      },
    ],
  },
  {
    _id: "staff002",
    firstName: "Anjali",
    lastName: "Singh",
    workSchedule: [
      {
        date: "2025-08-08",
        from: "2025-08-08T09:00:00",
        to: "2025-08-08T17:00:00",
        status: "accepted",
      },
      {
        date: "2025-08-10",
        from: "2025-08-10T10:00:00",
        to: "2025-08-10T18:00:00",
        status: "accepted",
      },
      {
        date: "2025-08-12",
        from: "2025-08-12T08:00:00",
        to: "2025-08-12T16:00:00",
        status: "accepted",
      },
      {
        date: "2025-09-01",
        from: "2025-09-01T09:00:00",
        to: "2025-09-01T17:00:00",
        status: "accepted",
      },
    ],
  },
  {
    _id: "staff003",
    firstName: "Mohan",
    lastName: "Kumar",
    workSchedule: [
      {
        date: "2025-08-06",
        from: "2025-08-06T23:06:00",
        to: "2025-08-07T07:06:00",
        status: "requested",
      },
      {
        date: "2025-07-21",
        from: "2025-07-21T13:30:00",
        to: "2025-07-21T21:30:00",
        status: "cancelled",
      },
    ],
  },
];

// --- HELPER FUNCTIONS ---
const calculateHours = (from, to) => {
  if (!from || !to) return 0;
  return differenceInHours(new Date(to), new Date(from));
};

const years = Array.from({ length: 5 }, (_, i) => getYear(new Date()) - 2 + i);
const months = Array.from({ length: 12 }, (_, i) => ({
  value: i,
  name: format(new Date(0, i), "MMMM"),
}));

// --- SUB-COMPONENTS ---

// 1. Shift Status Pie Chart
const ShiftStatusChart = ({ data }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6">
    <h3 className="text-xl font-bold text-gray-800 mb-4">
      Shift Requests Status
    </h3>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          paddingAngle={5}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

// 2. Individual Nurse's Monthly Work Chart
const MonthlyWorkChart = ({ data }) => (
  <div className="mt-4">
    {data.length > 0 ? (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip
            formatter={(value, name) => [
              `${value} ${name === "days" ? "days" : "hours"}`,
              name,
            ]}
          />
          <Legend />
          <Bar dataKey="days" fill="#8884d8" name="Working Days" />
          <Bar dataKey="hours" fill="#82ca9d" name="Working Hours" />
        </BarChart>
      </ResponsiveContainer>
    ) : (
      <p className="text-center text-gray-500 py-10">
        No accepted shifts to display for this nurse.
      </p>
    )}
  </div>
);

// 3. Consolidated Daily Report Grid
const ConsolidatedDailyReport = ({ nurses, dates, month, year }) => {
  const getColor = (hours) => {
    if (hours === 0) return "bg-gray-100";
    if (hours > 0 && hours <= 4) return "bg-green-200";
    if (hours > 4 && hours <= 8) return "bg-green-400 font-semibold";
    return "bg-green-600 text-white font-bold";
  };

  return (
    <div className="w-full overflow-x-auto mt-4">
      <table className="min-w-full divide-y divide-gray-200 border">
        <thead className="bg-gray-50">
          <tr>
            <th className="sticky left-0 bg-gray-50 z-10 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nurse
            </th>
            {dates.map((day) => (
              <th
                key={day}
                className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {nurses.map((nurse) => (
            <tr key={nurse._id}>
              <td className="sticky left-0 bg-white z-10 px-3 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                {nurse.firstName} {nurse.lastName}
              </td>
              {nurse.dailyHours.map((hours, index) => (
                <td
                  key={index}
                  className={`px-2 py-3 text-center text-xs ${getColor(hours)}`}
                  title={hours > 0 ? `${hours.toFixed(1)} hrs` : "No work"}
                >
                  {hours > 0 ? hours.toFixed(1) : "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// --- MAIN ATTENDANCE REPORT COMPONENT ---

const AttendanceReport = () => {
  const today = new Date();
  const [selectedNurseId, setSelectedNurseId] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  // --- DATA PROCESSING using useMemo for performance ---

  // 1. Shift Status breakdown data
  const shiftStatusData = useMemo(() => {
    const counts = staffData
      .flatMap((s) => s.workSchedule)
      .reduce((acc, shift) => {
        acc[shift.status] = (acc[shift.status] || 0) + 1;
        return acc;
      }, {});

    const COLORS = {
      accepted: "#22c55e",
      rejected: "#ef4444",
      requested: "#facc15",
      cancelled: "#6b7280",
    };
    return Object.keys(counts).map((status) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      value: counts[status],
      color: COLORS[status] || "#a8a29e",
    }));
  }, []);

  // 2. Data for individual nurse's monthly chart
  const individualMonthlyData = useMemo(() => {
    if (selectedNurseId === "all") return [];
    const nurse = staffData.find((s) => s._id === selectedNurseId);
    if (!nurse) return [];

    const monthlyMetrics = {};
    nurse.workSchedule
      .filter((s) => s.status === "accepted")
      .forEach((shift) => {
        const monthName = format(new Date(shift.date), "MMM yyyy");
        if (!monthlyMetrics[monthName]) {
          monthlyMetrics[monthName] = { days: new Set(), hours: 0 };
        }
        monthlyMetrics[monthName].days.add(shift.date);
        monthlyMetrics[monthName].hours += calculateHours(shift.from, shift.to);
      });

    return Object.keys(monthlyMetrics).map((month) => ({
      month,
      days: monthlyMetrics[month].days.size,
      hours: parseFloat(monthlyMetrics[month].hours.toFixed(2)),
    }));
  }, [selectedNurseId]);

  // 3. Data for consolidated daily grid
  const consolidatedDailyData = useMemo(() => {
    const daysInMonth = getDaysInMonth(new Date(selectedYear, selectedMonth));
    const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const nurses = staffData.map((nurse) => {
      const dailyHours = new Array(daysInMonth).fill(0);
      nurse.workSchedule
        .filter(
          (s) =>
            s.status === "accepted" &&
            getMonth(new Date(s.date)) === selectedMonth &&
            getYear(new Date(s.date)) === selectedYear
        )
        .forEach((shift) => {
          const day = getDate(new Date(shift.date));
          dailyHours[day - 1] += calculateHours(shift.from, shift.to);
        });
      return { ...nurse, dailyHours };
    });

    return { nurses, dates };
  }, [selectedMonth, selectedYear]);

  // 4. Find the most active nurse for the current month
  const mostActiveNurse = useMemo(() => {
    const currentMonthInterval = {
      start: startOfMonth(today),
      end: endOfMonth(today),
    };
    const hoursByNurse = staffData.map((nurse) => {
      const monthlyHours = nurse.workSchedule
        .filter(
          (s) =>
            s.status === "accepted" &&
            isWithinInterval(new Date(s.date), currentMonthInterval)
        )
        .reduce(
          (total, shift) => total + calculateHours(shift.from, shift.to),
          0
        );
      return {
        name: `${nurse.firstName} ${nurse.lastName}`,
        hours: monthlyHours,
      };
    });

    if (hoursByNurse.length === 0) return null;
    const topPerformer = hoursByNurse.reduce((max, nurse) =>
      nurse.hours > max.hours ? nurse : max
    );
    return topPerformer.hours > 0 ? topPerformer : null;
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Admin Attendance Report
        </h1>

        {/* Top Row: Overall stats and Top Performer */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <ShiftStatusChart data={shiftStatusData} />
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-center items-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Most Active This Month
            </h3>
            {mostActiveNurse ? (
              <>
                <Crown className="w-16 h-16 text-amber-400" />
                <p className="text-lg font-semibold text-gray-700 mt-4">
                  {mostActiveNurse.name}
                </p>
                <p className="text-3xl font-bold text-indigo-600 mt-2">
                  {mostActiveNurse.hours.toFixed(1)}{" "}
                  <span className="text-lg font-medium text-gray-500">
                    hours
                  </span>
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  in {format(today, "MMMM yyyy")}
                </p>
              </>
            ) : (
              <p className="text-center text-gray-500">
                No work recorded this month.
              </p>
            )}
          </div>
        </div>

        {/* Individual Report Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
            <h3 className="text-xl font-bold text-gray-800">
              Individual Monthly Report
            </h3>
            <div className="relative">
              <select
                value={selectedNurseId}
                onChange={(e) => setSelectedNurseId(e.target.value)}
                className="appearance-none block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Nurses</option>
                {staffData.map((nurse) => (
                  <option key={nurse._id} value={nurse._id}>
                    {nurse.firstName} {nurse.lastName}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
          {selectedNurseId !== "all" && (
            <MonthlyWorkChart data={individualMonthlyData} />
          )}
        </div>

        {/* Consolidated Report Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
            <h3 className="text-xl font-bold text-gray-800">
              Consolidated Daily Report
            </h3>
            <div className="flex gap-2">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                className="border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {months.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.name}
                  </option>
                ))}
              </select>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <ConsolidatedDailyReport
            {...consolidatedDailyData}
            month={selectedMonth}
            year={selectedYear}
          />
        </div>
      </div>
    </div>
  );
};

export default AttendanceReport;
