const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm p-6">

        {/* ───────── Header ───────── */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <img
              src="AVATAR_URL_HERE"
              alt="User"
              className="w-14 h-14 rounded-full object-cover"
            />

            <div>
              <h1 className="text-xl font-semibold">John Doe</h1>
              <p className="text-sm text-gray-500">ID: 00000000</p>

              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700">
                  Active
                </span>
                <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
                  john.doe@library.com
                </span>
                <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
                  Student
                </span>
              </div>
            </div>
          </div>

          <button className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50">
            Edit Profile
          </button>
        </div>

        {/* ───────── Main Grid ───────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT: Issued Books */}
          <div className="lg:col-span-2">
            <h2 className="font-semibold text-lg mb-4">Issued Books</h2>

            <div className="space-y-4">

              {/* Book 1 */}
              <div className="flex justify-between items-center border rounded-lg p-4">
                <div>
                  <h3 className="font-medium">1984</h3>
                  <p className="text-sm text-gray-500">George Orwell</p>
                  <p className="text-xs text-gray-400">ID: 2222222</p>
                </div>

                <div className="text-sm text-gray-600 text-right">
                  <p>08/01/2026 → 22/01/2026</p>
                </div>

                <div className="w-16 h-20 rounded bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                  None
                </div>
              </div>

              {/* Book 2 */}
              <div className="flex justify-between items-center border rounded-lg p-4">
                <div>
                  <h3 className="font-medium">The Great Gatsby</h3>
                  <p className="text-sm text-gray-500">F. Scott Fitzgerald</p>
                  <p className="text-xs text-gray-400">ID: 1111111</p>
                </div>

                <div className="text-sm text-gray-600 text-right">
                  <p>28/12/2025 → <span className="text-red-500">04/01/2026</span></p>
                </div>

                <div className="w-16 h-20 rounded bg-red-500 text-white flex items-center justify-center text-sm font-semibold">
                  ₹65
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT: History + Contact */}
          <div className="space-y-6">

            {/* History */}
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                History <span className="text-xs text-gray-500">2 active</span>
              </h3>

              <div className="text-sm">
                <p className="font-medium">To Kill a Mockingbird</p>
                <p className="text-gray-500">Harper Lee</p>
                <p className="text-xs text-gray-400 mt-1">
                  Issued: 12/12/2025
                </p>
                <p className="text-xs text-gray-400">
                  Returned: 24/12/2025
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Contact</h3>
              <p className="text-sm text-gray-600">9876543210</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
