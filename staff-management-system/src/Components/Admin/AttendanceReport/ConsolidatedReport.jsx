import { useEffect, useState } from "react";

const ConsolidatedReport = ({ nurses }) => {
  const [filterDate, setFilterDate] = useState("");
  const [consolidatedData, setConsolidatedData] = useState(null);

  useEffect(() => {
    setConsolidatedData(processConsolidatedData(nurses, filterDate));
  }, [nurses, filterDate]);

  const processConsolidatedData = (nurses, dateFilter) => {
    let totalRequests = 0;
    let acceptedRequests = 0;
    let rejectedRequests = 0;
    let totalShifts = 0;
    const monthlyHours = {};
    const nurseWorkStats = {};

    nurses.forEach((nurse) => {
      // Initialize nurse stats
      nurseWorkStats[nurse._id] = {
        name: `${nurse.firstName || "Unknown"} ${nurse.lastName || ""}`.trim(),
        shifts: 0,
        hours: 0,
      };

      // Process work schedule
      if (nurse.workSchedule) {
        nurse.workSchedule.forEach((ws) => {
          if (!dateFilter || ws.date.includes(dateFilter)) {
            totalRequests++;
            if (ws.status === "accepted") acceptedRequests++;
            if (ws.status === "rejected") rejectedRequests++;
          }
        });
      }

      // Process working hours
      if (nurse.workingHours) {
        nurse.workingHours.forEach((wh) => {
          if (!dateFilter || wh.date.includes(dateFilter)) {
            totalShifts++;
            nurseWorkStats[nurse._id].shifts++;

            const date = new Date(wh.date);
            const monthYear = `${date.getFullYear()}-${String(
              date.getMonth() + 1
            ).padStart(2, "0")}`;
            const from = new Date(wh.from);
            const to = new Date(wh.to);
            const hours = (to - from) / (1000 * 60 * 60);

            monthlyHours[monthYear] = (monthlyHours[monthYear] || 0) + hours;
            nurseWorkStats[nurse._id].hours += hours;
          }
        });
      }
    });

    const monthlyHoursData = Object.entries(monthlyHours).map(
      ([month, hours]) => ({
        month,
        hours: Math.round(hours * 100) / 100,
      })
    );

    // Find most worked person
    const mostWorkedPerson = Object.entries(nurseWorkStats).reduce(
      (max, [id, stats]) =>
        stats.shifts > max.shifts ? { id, ...stats } : max,
      { shifts: 0, hours: 0, name: "" }
    );

    const requestStatusData = [
      { name: "Accepted", value: acceptedRequests, color: "#22c55e" },
      { name: "Rejected", value: rejectedRequests, color: "#ef4444" },
      {
        name: "Pending",
        value: totalRequests - acceptedRequests - rejectedRequests,
        color: "#f59e0b",
      },
    ];

    return {
      totalRequests,
      acceptedRequests,
      rejectedRequests,
      totalShifts,
      monthlyHoursData,
      mostWorkedPerson,
      requestStatusData,
      totalHours: Object.values(monthlyHours).reduce(
        (sum, hours) => sum + hours,
        0
      ),
    };
  };

  if (!consolidatedData) return <div>Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-6 h-6 text-green-600" />
        <h2 className="text-2xl font-bold text-gray-800">
          Consolidated Report
        </h2>
      </div>

      {/* Date Filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Date (Optional)
        </label>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {filterDate && (
          <button
            onClick={() => setFilterDate("")}
            className="ml-3 px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Clear Filter
          </button>
        )}
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Total Shifts</p>
              <p className="text-2xl font-bold text-gray-800">
                {consolidatedData.totalShifts}
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
                {Math.round(consolidatedData.totalHours)}
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
                {consolidatedData.totalRequests}
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
                {consolidatedData.totalRequests > 0
                  ? Math.round(
                      (consolidatedData.acceptedRequests /
                        consolidatedData.totalRequests) *
                        100
                    )
                  : 0}
                %
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Most Worked Person Highlight */}
      {consolidatedData.mostWorkedPerson.shifts > 0 && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg border border-yellow-200">
          <div className="flex items-center gap-4">
            <Award className="w-12 h-12 text-yellow-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Most Active Nurse
              </h3>
              <p className="text-xl font-bold text-yellow-700">
                {consolidatedData.mostWorkedPerson.name}
              </p>
              <p className="text-gray-600">
                {consolidatedData.mostWorkedPerson.shifts} shifts •{" "}
                {Math.round(consolidatedData.mostWorkedPerson.hours)} hours
              </p>
            </div>
          </div>
        </div>
      )}

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
                data={consolidatedData.requestStatusData}
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
                {consolidatedData.requestStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Hours Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Monthly Hours Served</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={consolidatedData.monthlyHoursData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
