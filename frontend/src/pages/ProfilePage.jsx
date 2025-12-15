import React from "react";

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">
          User Profile
        </h2>

        <div className="flex items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-blue-500 text-white flex items-center justify-center text-3xl font-bold">
            U
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold">User Name</h3>
            <p className="text-gray-600">user@email.com</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Issued Books</h3>
          <ul className="space-y-2">
            <li className="border p-3 rounded">📘 Data Structures</li>
            <li className="border p-3 rounded">📗 Software Engineering</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;