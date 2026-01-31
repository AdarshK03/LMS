import { useRef, useState, useEffect } from "react";
import {Search} from "lucide-react";

/* ---------------- ROOT ---------------- */
export default function AdminPage() {
  const [active, setActive] = useState(0);
  const labels = [
    "Books Management",
    "Students",
    "Issued / Reserved",
    "Fees",
    "Wishlist",
    "Settings",
  ];
  const refs = useRef([]);

  useEffect(() => {
    const el = document.getElementById("scrollArea");
    const onScroll = () => {
      const top = el.scrollTop;
      let cur = 0;
      refs.current.forEach((r, i) => {
        if (top >= r.offsetTop - 80) cur = i;
      });
      setActive(cur);
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="h-screen flex bg-slate-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white p-4">
        <h1 className="text-xl font-bold mb-6">📘 SmartLibrary AI</h1>
        <nav className="space-y-2 text-sm">
          {labels.map((l, i) => (
              <Item
                key={i}
                label={l}
                active={i === active}
                onClick={() =>
                  refs.current[i].scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
                }
              />
            ))}
        </nav>
      </aside>

      {/* CONTENT */}
      <div
        id="scrollArea"
        className="flex-1 h-screen overflow-y-scroll snap-y snap-mandatory"
      >
        <section ref={(el) => (refs.current[0] = el)} className="h-screen snap-start p-6">
          <BooksPage />
        </section>
        <section ref={(el) => (refs.current[1] = el)} className="h-screen snap-start p-6">
          <StudentsPage />
        </section>
        <section ref={(el) => (refs.current[2] = el)} className="h-screen snap-start p-6">
          <IssuedPage />
        </section>
        <section ref={(el) => (refs.current[3] = el)} className="h-screen snap-start p-6">
          <FeesPage />
        </section>
        <section ref={(el) => (refs.current[4] = el)} className="h-screen snap-start p-6">
          <WishlistPage />
        </section>
        <section ref={(el) => (refs.current[5] = el)} className="h-screen snap-start p-6">
          <SettingsPage />
        </section>
      </div>
    </div>
  );
}

/* ---------------- SIDEBAR ITEM ---------------- */
function Item({ label, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`px-3 py-2 rounded-lg cursor-pointer transition ${
        active ? "bg-blue-600" : "hover:bg-slate-800"
      }`}
    >
      {label}
    </div>
  );
}


/* ---------------- DATA ---------------- */
const BOOKS = [
  { id: "B-101", title: "Clean Code", author: "Robert C. Martin", cat: "CS", status: "Available" },
  { id: "B-102", title: "1984", author: "George Orwell", cat: "Fiction", status: "Issued" },
  { id: "B-103", title: "Sapiens", author: "Yuval Noah Harari", cat: "History", status: "Reserved" },
];

const STUDENTS = [
  { name: "Aiony Haust", roll: "CS101", year: "2nd", status: "Active" },
  { name: "Jimmy Fermin", roll: "CS102", year: "3rd", status: "Inactive" },
];

const ISSUED = [
  { stu: "Aiony Haust", book: "1984", due: "24 Jan", fine: "₹0", status: "Issued" },
  { stu: "Jimmy Fermin", book: "Clean Code", due: "12 Jan", fine: "₹50", status: "Overdue" },
];

const FEES = [
  { stu: "Jimmy Fermin", amt: "₹50", reason: "Late Return", status: "Pending" },
  { stu: "Aiony Haust", amt: "₹0", reason: "—", status: "Paid" },
];

const WISHLIST = [
  { stu: "Wade Warren", book: "Atomic Habits", status: "Pending" },
  { stu: "Robert Fox", book: "Deep Work", status: "Approved" },
];

/* ---------------- PAGES ---------------- */
function BooksPage() {
  return (
  <div> 
    <div className="flex justify-end mb-8">
     <Search
        size={18}
        className=" text-slate-400 pointer-events-none"
     />
      <input 
      
      placeholder="search library or users..."
      className=" mx-4 px-4 py-2 rounded-lg bg-gray-300 text-black placeholder-black"></input>
      <button>
        admin user
      </button>
    </div>   
    <Card title="📚 Books Management"
    action={
      <div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + Add New Book
        </button>

        <button className="bg-white text-black px-4 py-2 rounded-lg mx-4">
          Export
        </button>

        <button className="bg-white text-black px-4 py-2 rounded-lg">
          Filter
        </button>
      </div>  
      }
      >
      <GridStats />
      <Table headers={["ID","Title","Author","Category","Status"]}>
        {BOOKS.map((b) => (
          <tr key={b.id} className="border-t">
            <td>{b.id}</td><td>{b.title}</td><td>{b.author}</td><td>{b.cat}</td>
            <td><Badge s={b.status} /></td>
          </tr>
        ))}
      </Table>
    </Card>
   </div> 
  );
}

function StudentsPage() {
  return (
    <Card title="🎓 Students">
      <Table headers={["Name","Roll","Year","Status"]}>
        {STUDENTS.map((s,i)=>(
          <tr key={i} className="border-t">
            <td>{s.name}</td><td>{s.roll}</td><td>{s.year}</td>
            <td><Badge s={s.status} /></td>
          </tr>
        ))}
      </Table>
    </Card>
  );
}

function IssuedPage() {
  return (
    <Card title="🔁 Issued / Reserved">
      <Table headers={["Student","Book","Due","Fine","Status"]}>
        {ISSUED.map((i,idx)=>(
          <tr key={idx} className="border-t">
            <td>{i.stu}</td><td>{i.book}</td><td>{i.due}</td><td>{i.fine}</td>
            <td><Badge s={i.status} /></td>
          </tr>
        ))}
      </Table>
    </Card>
  );
}

function FeesPage() {
  return (
    <Card title="💰 Fees">
      <Table headers={["Student","Amount","Reason","Status"]}>
        {FEES.map((f,i)=>(
          <tr key={i} className="border-t">
            <td>{f.stu}</td><td>{f.amt}</td><td>{f.reason}</td>
            <td><Badge s={f.status} /></td>
          </tr>
        ))}
      </Table>
    </Card>
  );
}

function WishlistPage() {
  return (
    <Card title="⭐ Wishlist">
      <Table headers={["Student","Book","Status"]}>
        {WISHLIST.map((w,i)=>(
          <tr key={i} className="border-t">
            <td>{w.stu}</td><td>{w.book}</td><td><Badge s={w.status} /></td>
          </tr>
        ))}
      </Table>
    </Card>
  );
}

function SettingsPage() {
  return (
    <Card title="⚙️ Settings">
      <div className="grid grid-cols-2 gap-4">
        <input className="border p-2 rounded" placeholder="Library Name" />
        <input className="border p-2 rounded" placeholder="Fine per day" />
        <input className="border p-2 rounded" placeholder="Max books" />
        <button className="bg-blue-600 text-white rounded p-2">Save</button>
      </div>
    </Card>
  );
}

/* ---------------- UI ---------------- */
function Card({ title, action, children }) {
  return (
    <div className="bg-gray-300 rounded-xl shadow p-6 h-full">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        {action}
      </div>

      {/* BODY */}
      {children}
    </div>
  );
}


function Table({ headers, children }) {
  return (
    <table className="w-full text-sm">
      <thead className="bg-gray-50 text-gray-500">
        <tr>{headers.map(h=> <th key={h} className="p-2 text-left">{h}</th>)}</tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

function Badge({ s }) {
  const map = {
    Available: "bg-green-100 text-green-700",
    Issued: "bg-blue-100 text-blue-700",
    Reserved: "bg-yellow-100 text-yellow-700",
    Overdue: "bg-red-100 text-red-700",
    Active: "bg-green-100 text-green-700",
    Inactive: "bg-gray-200 text-gray-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Paid: "bg-green-100 text-green-700",
    Approved: "bg-green-100 text-green-700",
  };
  return <span className={`px-2 py-1 rounded-full text-xs ${map[s]}`}>{s}</span>;
}

function GridStats() {
  return (
    <div className="grid grid-cols-4 gap-4 mb-4">
      {["Total","Available","Issued","Reserved"].map((t,i)=>(
        <div key={i} className="bg-slate-100 p-4 rounded">
          <p className="text-sm">{t}</p>
          <h3 className="text-xl font-bold">{[12,6,4,2][i]}</h3>
        </div>
      ))}
    </div>
  );
}