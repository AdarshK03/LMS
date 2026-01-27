import React from "react";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex bg-[#f4f2ff]">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gradient-to-b from-purple-700 to-purple-600 text-white flex flex-col justify-between">
        <div>
          <div className="px-6 py-6 text-xl font-bold">📚 Library Pro</div>

          <nav className="px-4 space-y-2">
            {[
              "Dashboard",
              "Students",
              "Books Available",
              "Book Issued/Return",
              "Fees Pending",
              "Wishlist",
              "Settings",
            ].map((item, i) => (
              <button
                key={i}
                className={`w-full text-left px-4 py-2 rounded-lg transition ${
                  item === "Dashboard"
                    ? "bg-white text-purple-700 font-semibold"
                    : "hover:bg-purple-500/40"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Upgrade Card */}
          <div className="mx-4 mt-8 bg-white text-purple-700 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">🚀</div>
            <p className="text-sm font-semibold mb-2">Want to upgrade</p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm">
              Upgrade now
            </button>
          </div>
        </div>

        {/* User */}
        <div className="px-4 py-4 border-t border-purple-400 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white text-purple-700 flex items-center justify-center font-bold">
            V
          </div>
          <div className="text-sm">
            <p className="font-semibold">Vanshika Pandey</p>
            <p className="text-xs opacity-80">HR Manager</p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 space-y-6">
        {/* TOP BAR */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <input
              type="date"
              className="px-3 py-2 rounded-lg border text-sm"
            />
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 rounded-lg border w-64"
            />
          </div>

          <div className="w-10 h-10 rounded-full bg-gray-300" />
        </div>

        {/* WELCOME */}
        <div>
          <h1 className="text-xl font-bold">Welcome Saiba Sen 👋</h1>
          <p className="text-sm text-gray-500">
            A new book can added to your library.
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { title: "Total Students", value: "2,589", color: "green" },
            { title: "Books available", value: "22,589", color: "green" },
            { title: "Book Issued", value: "15", color: "red" },
            { title: "Book due for Return", value: "250", color: "green" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-4 shadow-sm"
            >
              <p className="text-sm text-gray-500">{stat.title}</p>
              <h2 className="text-2xl font-bold">{stat.value}</h2>
              <p
                className={`text-xs mt-1 ${
                  stat.color === "green"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {stat.color === "green" ? "+2.5%" : "-2.5%"}
              </p>
            </div>
          ))}
        </div>

        {/* TABLE SECTION */}
        <div className="grid grid-cols-3 gap-6">
          {/* FEES PENDING */}
          <div className="col-span-2 bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between mb-3">
              <h3 className="font-semibold">Fees Pending</h3>
              <button className="text-purple-600 text-sm">View All</button>
            </div>

            <table className="w-full text-sm">
              <thead className="text-gray-400 text-left">
                <tr>
                  <th>Student</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Aiony Haust", "$31.48"],
                  ["Jimmy Fermin", "$50.18"],
                ].map((row, i) => (
                  <tr key={i} className="border-t">
                    <td className="py-2">{row[0]}</td>
                    <td>May 25, 2023</td>
                    <td>{row[1]}</td>
                    <td>
                      <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">
                        Pending
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* STUDENT PROFILE */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between mb-3">
              <h3 className="font-semibold">Student Profile</h3>
              <button className="text-purple-600 text-sm">View All</button>
            </div>

            <ul className="space-y-3 text-sm">
              {[
                "Wade Warren",
                "Robert Fox",
              ].map((name, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{name}</p>
                    <p className="text-xs text-gray-400">2nd Year Btech</p>
                  </div>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                    Approved
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* BOOK ISSUED */}
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-3 bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between mb-3">
              <h3 className="font-semibold">Book Issued / Returned</h3>
              <button className="text-purple-600 text-sm">View All</button>
            </div>

            <table className="w-full text-sm">
              <thead className="text-gray-400 text-left">
                <tr>
                  <th>Student</th>
                  <th>Book</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Floyd Miles", "The Journey Within", "Paid"],
                  ["Robert Fox", "Hidden Secrets", "Pending"],
                ].map((row, i) => (
                  <tr key={i} className="border-t">
                    <td className="py-2">{row[0]}</td>
                    <td>{row[1]}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          row[2] === "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {row[2]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* WISHLIST */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold mb-3">Wishlist</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <p className="font-medium">Don’t Make Me Think</p>
                <p className="text-xs text-gray-400">Steve Krug</p>
              </li>
              <li>
                <p className="font-medium">Rich Dad Poor Dad</p>
                <p className="text-xs text-gray-400">Robert Kiyosaki</p>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
