import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar.jsx";
import {
  User,
  Mail,
  MapPin,
  Phone, // NEW: Import Phone
  BookOpen,
  Clock,
  Calendar,
  ShieldCheck,
  Edit,
  GraduationCap
} from "lucide-react";

// ... existing code ...

<div className="flex items-center text-gray-600 text-sm">
  <div className="w-8 flex justify-center mr-2">
    <Mail className="w-4 h-4 text-gray-400" />
  </div>
  <span className="truncate">{user.email}</span>
</div>
{/* NEW: Mobile Number Display */ }
<div className="flex items-center text-gray-600 text-sm">
  <div className="w-8 flex justify-center mr-2">
    <Phone className="w-4 h-4 text-gray-400" />
  </div>
  <span className="truncate">{user.mobile || "No mobile number linked"}</span>
</div>

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Not authenticated");
        }

        const response = await fetch(
          `${import.meta.env.VITE_API_BASE}/api/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Not authenticated");
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError("Not authenticated");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-8 bg-white rounded-xl shadow-md">
            <ShieldCheck className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800">Access Denied</h2>
            <p className="text-gray-500 mt-2">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // 🔥 Gravatar URL
  const avatarUrl = `https://www.gravatar.com/avatar/${user.email ? user.email.trim().toLowerCase() : "default"
    }?d=identicon&s=200`;

  return (
    <div className="min-h-screen bg-gray-300 my-16">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Page Header */}
        <div className="mb-8 pl-1">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Student Portal</h1>
          <p className="text-gray-500 mt-1">Manage your library account and reservations</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ──────────────── LEFT COLUMN (Student ID Card) ──────────────── */}
          <div className="lg:col-span-4 space-y-6">

            {/* ID Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
              <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
              <div className="px-6 pb-6">
                <div className="relative -mt-12 mb-4">
                  <img
                    src={avatarUrl}
                    alt={user.name}
                    className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
                  />
                  <div className="absolute bottom-0 right-16 bg-green-500 w-5 h-5 rounded-full border-4 border-white"></div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                  <p className="text-blue-600 font-medium">Computer Science Dept.</p>
                </div>

                <div className="mt-6 space-y-3 pb-6 border-b border-gray-100">
                  <div className="flex items-center text-gray-600 text-sm">
                    <div className="w-8 flex justify-center mr-2">
                      <GraduationCap className="w-4 h-4 text-gray-400" />
                    </div>
                    <span>Student ID: <span className="font-mono font-semibold text-gray-900">{user.id?.toString().padStart(8, "0")}</span></span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <div className="w-8 flex justify-center mr-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                    </div>
                    <span className="truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <div className="w-8 flex justify-center mr-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                    </div>
                    <span>Library Campus A</span>
                  </div>
                </div>

                <button className="w-full mt-6 py-2 px-4 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors flex items-center justify-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Library Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 rounded-xl">
                  <p className="text-2xl font-bold text-blue-700">2</p>
                  <p className="text-xs text-blue-600 font-medium mt-1">Books Issued</p>
                </div>
                <div className="p-3 bg-indigo-50 rounded-xl">
                  <p className="text-2xl font-bold text-indigo-700">12</p>
                  <p className="text-xs text-indigo-600 font-medium mt-1">Books Read</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-xl">
                  <p className="text-2xl font-bold text-orange-700">₹65</p>
                  <p className="text-xs text-orange-600 font-medium mt-1">Late Fines</p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl">
                  <p className="text-2xl font-bold text-emerald-700">A</p>
                  <p className="text-xs text-emerald-600 font-medium mt-1">Grade</p>
                </div>
              </div>
            </div>

          </div>


          {/* ──────────────── RIGHT COLUMN (Academic Activity) ──────────────── */}
          <div className="lg:col-span-8 space-y-8">

            {/* CURRENTLY ISSUED */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Current Reads
                </h2>
                <span className="bg-blue-100 text-blue-700 text-xs px-2.5 py-0.5 rounded-full font-medium">2 Active</span>
              </div>

              <div className="grid gap-4">
                {/* Book Card 1 */}
                <div className="group bg-white rounded-xl p-5 border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row gap-5 items-start">
                  <div className="w-16 h-24 bg-gray-200 rounded-md flex-shrink-0 mx-auto sm:mx-0"></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">1984</h3>
                        <p className="text-sm text-gray-500">George Orwell</p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        On Time
                      </span>
                    </div>

                    <div className="mt-4 flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>Due: <span className="font-medium text-gray-900">22 Jan 2026</span></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>14 days left</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Book Card 2 */}
                <div className="group bg-white rounded-xl p-5 border border-gray-200 hover:border-red-300 hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row gap-5 items-start">
                  <div className="w-16 h-24 bg-gray-200 rounded-md flex-shrink-0 mx-auto sm:mx-0"></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-900 group-hover:text-red-700 transition-colors">The Great Gatsby</h3>
                        <p className="text-sm text-gray-500">F. Scott Fitzgerald</p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Overdue
                      </span>
                    </div>

                    <div className="mt-4 flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-red-400" />
                        <span className="text-red-600">Due: <span className="font-medium">04 Jan 2026</span></span>
                      </div>
                      <div className="flex items-center gap-1.5 text-red-600 font-medium">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Fine: ₹65</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* READING HISTORY table style */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-500" />
                Reading History
              </h2>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Issued</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">To Kill a Mockingbird</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Harper Lee</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">12 Dec 2025</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Returned</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Design Patterns</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Erich Gamma</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10 Nov 2025</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Returned</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
