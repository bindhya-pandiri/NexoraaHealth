import React, { useState, useMemo, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { MapPin, Search, Stethoscope, Calendar, Bell, User, AlertTriangle, ShieldCheck, LayoutDashboard, Check, Edit, X, Phone } from "lucide-react";
import HomePage from "./pages/HomePage";
import HealthAssistantPage from "./pages/HealthAssistantPage";

/* ---------- Placeholder Feature Pages ---------- */
const FindCarePage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [useLocation, setUseLocation] = useState(false);

  const facilities = [
    { id: 1, name: "Apollo Hospital", type: "Hospital", location: "Mumbai, Maharashtra", distance: "5 km", phone: "022-12345678", open: true },
    { id: 2, name: "Fortis Health Center", type: "Health Center", location: "Bangalore, Karnataka", distance: "3 km", phone: "080-87654321", open: true },
    { id: 3, name: "AIIMS Clinic", type: "Clinic", location: "Delhi", distance: "2 km", phone: "011-23456789", open: false },
    { id: 4, name: "MedPlus Pharmacy", type: "Pharmacy", location: "Chennai, Tamil Nadu", distance: "1 km", phone: "044-11223344", open: true },
    { id: 5, name: "Manipal Hospital", type: "Hospital", location: "Pune, Maharashtra", distance: "4 km", phone: "020-99887766", open: true },
    { id: 6, name: "Sanjivani Health Center", type: "Health Center", location: "Hyderabad, Telangana", distance: "6 km", phone: "040-55667788", open: false },
    { id: 7, name: "Narayana Clinic", type: "Clinic", location: "Kochi, Kerala", distance: "3 km", phone: "0484-22334455", open: true },
    { id: 8, name: "Apollo Pharmacy", type: "Pharmacy", location: "Ahmedabad, Gujarat", distance: "2 km", phone: "079-66778899", open: true },
  ];

  const filtered = facilities.filter((f) => {
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase()) || f.location.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter ? f.type === typeFilter : true;
    return matchesSearch && matchesType;
  });

  const handleUseLocation = () => {
    // Demo placeholder: could set a default location filter
    setUseLocation(true);
    // Real implementation would use navigator.geolocation
  };

  return (
    <div className="p-4 bg-lavender-light min-h-screen text-purple-deep">
      <h1 className="text-2xl font-bold mb-4">Find Care</h1>
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or location..."
            className="w-full pl-8 pr-4 py-2 border rounded focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="border rounded px-3 py-2"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Hospital">Hospital</option>
          <option value="Health Center">Health Center</option>
          <option value="Clinic">Clinic</option>
          <option value="Pharmacy">Pharmacy</option>
        </select>
        <button
          className="flex items-center bg-purple-deep text-white px-3 py-2 rounded hover:bg-purple-800"
          onClick={handleUseLocation}
        >
          Use My Location
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((fac) => (
          <div key={fac.id} className="border rounded-lg p-4 shadow-sm bg-white flex flex-col">
            <div className="flex items-center mb-2">
              <MapPin className="w-5 h-5 mr-2 text-purple-deep" />
              <h2 className="text-lg font-semibold">{fac.name}</h2>
            </div>
            <p className="text-sm text-gray-600">{fac.type}</p>
            <p className="text-sm">{fac.location}</p>
            <p className="text-sm">Distance: {fac.distance}</p>
            <p className="text-sm">Phone: {fac.phone}</p>
            <p className={`text-sm font-medium ${fac.open ? "text-green-600" : "text-red-600"}`}>
              {fac.open ? "Open" : "Closed"}
            </p>
            <div className="mt-2 flex space-x-2">
              <button className="flex-1 bg-purple-deep text-white px-2 py-1 rounded hover:bg-purple-800 text-sm">
                View Details
              </button>
              <button className="flex-1 border border-purple-deep text-purple-deep px-2 py-1 rounded hover:bg-purple-100 text-sm">
                Contact
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-gray-500">No facilities match your criteria.</p>
        )}
      </div>
    </div>
  );
};

const AppointmentsPage: React.FC = () => {
  const location = useLocation();
  const passedDoctor = location.state?.doctor as Doctor | undefined;

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [appointments, setAppointments] = useState<any[]>(() => {
    const stored = localStorage.getItem("appointments");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error("Failed parsing appointments from localStorage", e);
      }
    }
    return [
      { id: 1, doctor: "Cardiology Doctor 1", facility: "Apollo Hospital, Mumbai", date: "2026-10-12", time: "10:00 AM", status: "Upcoming", patientName: "John Doe" },
      { id: 2, doctor: "Neurology Doctor 2", facility: "Fortis Health Center, Bangalore", date: "2026-09-20", time: "02:30 PM", status: "Upcoming", patientName: "John Doe" },
      { id: 3, doctor: "Pediatrics Doctor 3", facility: "AIIMS Clinic, Delhi", date: "2026-08-05", time: "09:00 AM", status: "Past", patientName: "John Doe" },
      { id: 4, doctor: "Orthopedics Doctor 4", facility: "MedPlus Pharmacy, Chennai", date: "2026-07-15", time: "11:00 AM", status: "Cancelled", patientName: "John Doe" },
      { id: 5, doctor: "Dermatology Doctor 5", facility: "Manipal Hospital, Pune", date: "2026-11-03", time: "04:00 PM", status: "Upcoming", patientName: "John Doe" },
    ];
  });

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [patientName, setPatientName] = useState("");

  useEffect(() => {
    if (passedDoctor) {
      setSelectedDoctorId(String(passedDoctor.id));
    }
  }, [passedDoctor]);

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctorId || !bookingDate || !bookingTime || !patientName) {
      return;
    }
    const doc = doctorData.find(d => String(d.id) === selectedDoctorId);
    if (!doc) return;

    const newAppt = {
      id: Date.now(),
      doctor: `${doc.name} (${doc.specialty})`,
      facility: "Nexora Health Clinic",
      date: bookingDate,
      time: bookingTime,
      status: "Upcoming" as const,
      patientName: patientName
    };

    setAppointments((prev) => [newAppt, ...prev]);

    // Reset form
    setBookingDate("");
    setBookingTime("");
    setPatientName("");
    setSelectedDoctorId("");
    // Clear navigation state
    window.history.replaceState({}, document.title);
  };

  const filtered = appointments.filter((a) => {
    const matchesSearch = a.doctor.toLowerCase().includes(search.toLowerCase()) || a.facility.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? a.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  const cancelAppointment = (id: number) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Cancelled" } : a))
    );
  };

  return (
    <div className="p-4 bg-lavender-light min-h-screen text-purple-deep">
      <h1 className="text-2xl font-bold mb-4">Appointments</h1>

      {/* Booking Form */}
      <div className="bg-white rounded-lg p-6 shadow-sm mb-6 max-w-2xl border border-purple-200">
        <h2 className="text-xl font-semibold mb-4 text-purple-deep font-bold">Book New Appointment</h2>
        <form onSubmit={handleBookAppointment} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-purple-deep mb-1 font-semibold">Doctor</label>
            <select
              value={selectedDoctorId}
              onChange={(e) => setSelectedDoctorId(e.target.value)}
              className="w-full border border-purple-300 rounded px-3 py-2 bg-white text-purple-deep focus:outline-none focus:ring-1 focus:ring-purple-deep"
              required
            >
              <option value="">Select a Doctor</option>
              {doctorData.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.name} - {doc.specialty} (Experience: {doc.experience}, Slot: {doc.slot})
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-purple-deep mb-1 font-semibold">Date</label>
              <input
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full border border-purple-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-deep"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-purple-deep mb-1 font-semibold">Time</label>
              <input
                type="time"
                value={bookingTime}
                onChange={(e) => setBookingTime(e.target.value)}
                className="w-full border border-purple-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-deep"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-purple-deep mb-1 font-semibold">Patient Name</label>
            <input
              type="text"
              placeholder="Enter patient name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full border border-purple-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-deep"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-deep text-white py-2 rounded font-medium hover:bg-purple-800 transition"
          >
            Confirm Booking
          </button>
        </form>
      </div>

      <h2 className="text-xl font-bold mb-4 text-purple-deep">My Appointments</h2>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by doctor or facility..."
            className="w-full pl-8 pr-4 py-2 border rounded focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="border rounded px-3 py-2"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Past">Past</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((appt) => (
          <div key={appt.id} className="border rounded-lg p-4 shadow-sm bg-white flex flex-col">
            <div className="flex items-center mb-2">
              <Calendar className="w-5 h-5 mr-2 text-purple-deep" />
              <h2 className="text-lg font-semibold">{appt.doctor}</h2>
            </div>
            {appt.patientName && (
              <p className="text-sm font-medium mb-1">Patient: {appt.patientName}</p>
            )}
            <p className="text-sm">{appt.facility}</p>
            <p className="text-sm">Date: {appt.date}</p>
            <p className="text-sm">Time: {appt.time}</p>
            <p className={`text-sm font-medium ${appt.status === "Upcoming" ? "text-green-600" : appt.status === "Cancelled" ? "text-red-600" : "text-gray-600"}`}>
              {appt.status}
            </p>
            {appt.status === "Upcoming" && (
              <button
                className="mt-2 self-start bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                onClick={() => cancelAppointment(appt.id)}
              >
                Cancel
              </button>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-gray-500">No appointments match your criteria.</p>
        )}
      </div>
    </div>
  );
};

const RemindersPage: React.FC = () => {
  // Reminder type
  type Reminder = {
    id: number;
    title: string;
    date: string;
    time: string;
    type: "Medicine" | "Appointment";
    completed: boolean;
  };

  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [form, setForm] = useState({ title: "", date: "", time: "", type: "Medicine" as const });
  const [editingId, setEditingId] = useState<number | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("reminders");
    if (stored) {
      setReminders(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage whenever reminders change
  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addOrUpdateReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.time) return;
    if (editingId !== null) {
      // Update existing
      setReminders((prev) =>
        prev.map((r) => (r.id === editingId ? { ...r, ...form } : r))
      );
      setEditingId(null);
    } else {
      const newReminder: Reminder = {
        id: Date.now(),
        title: form.title,
        date: form.date,
        time: form.time,
        type: form.type,
        completed: false,
      };
      setReminders((prev) => [...prev, newReminder]);
    }
    setForm({ title: "", date: "", time: "", type: "Medicine" });
  };

  const toggleComplete = (id: number) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r))
    );
  };

  const deleteReminder = (id: number) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  const editReminder = (reminder: Reminder) => {
    setForm({
      title: reminder.title,
      date: reminder.date,
      time: reminder.time,
      type: reminder.type,
    });
    setEditingId(reminder.id);
  };

  return (
    <div className="p-4 bg-lavender-light min-h-screen text-purple-deep">
      <h1 className="text-2xl font-bold mb-4">Reminders</h1>
      {/* Reminder Form */}
      <form onSubmit={addOrUpdateReminder} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-6 p-4 bg-white rounded shadow">
        <input
          name="title"
          placeholder="Reminder title"
          className="border rounded p-2"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          name="date"
          type="date"
          className="border rounded p-2"
          value={form.date}
          onChange={handleChange}
          required
        />
        <input
          name="time"
          type="time"
          className="border rounded p-2"
          value={form.time}
          onChange={handleChange}
          required
        />
        <select
          name="type"
          className="border rounded p-2"
          value={form.type}
          onChange={handleChange}
        >
          <option value="Medicine">Medicine</option>
          <option value="Appointment">Appointment</option>
        </select>
        <button
          type="submit"
          className="col-span-full bg-purple-deep text-white py-2 rounded hover:bg-purple-800"
        >
          {editingId !== null ? "Update Reminder" : "Add Reminder"}
        </button>
      </form>

      {/* Reminder Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reminders.map((r) => (
          <div
            key={r.id}
            className="border rounded-lg p-4 bg-white shadow-sm flex flex-col"
          >
            <div className="flex items-center mb-2">
              <AlertTriangle className="w-5 h-5 mr-2 text-purple-deep" />
              <h2 className="text-lg font-semibold">
                {r.title}
              </h2>
            </div>
            <p className="text-sm">{r.type}</p>
            <p className="text-sm">Date: {r.date}</p>
            <p className="text-sm">Time: {r.time}</p>
            <p className={`text-sm font-medium ${r.completed ? "text-green-600" : "text-gray-600"}`}>Status: {r.completed ? "Completed" : "Pending"}</p>
            <div className="mt-2 flex space-x-2">
              <button
                className="flex-1 flex items-center justify-center bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 text-sm"
                onClick={() => toggleComplete(r.id)}
                title={r.completed ? "Mark as pending" : "Mark as completed"}
              >
                <Check className="w-4 h-4 mr-1" />
                {r.completed ? "Pending" : "Done"}
              </button>
              <button
                className="flex-1 flex items-center justify-center border border-purple-deep text-purple-deep px-2 py-1 rounded hover:bg-purple-100 text-sm"
                onClick={() => editReminder(r)}
                title="Edit reminder"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </button>
              <button
                className="flex-1 flex items-center justify-center bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-sm"
                onClick={() => deleteReminder(r.id)}
                title="Delete reminder"
              >
                <X className="w-4 h-4 mr-1" />
                Delete
              </button>
            </div>
          </div>
        ))}
        {reminders.length === 0 && (
          <p className="col-span-full text-center text-gray-500">No reminders set.</p>
        )}
      </div>
    </div>
  );
};

const MyHealthPage: React.FC = () => {
  // Static patient profile (mock data)
  const profile = {
    name: "John Doe",
    age: 32,
    bloodGroup: "O+",
  };

  type HealthRecord = {
    id: number;
    name: string;
    type: string;
    date: string;
    fileName?: string;
  };

  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [form, setForm] = useState({ name: "", type: "Lab Report" as const, date: "", file: null as File | null });
  const [editingId, setEditingId] = useState<number | null>(null);

  // Load records from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("myHealthRecords");
    if (stored) setRecords(JSON.parse(stored));
  }, []);

  // Persist records to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("myHealthRecords", JSON.stringify(records));
  }, [records]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm((prev) => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const addOrUpdateRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.date) return;
    const fileName = form.file ? form.file.name : undefined;
    if (editingId !== null) {
      setRecords((prev) =>
        prev.map((r) => (r.id === editingId ? { ...r, name: form.name, type: form.type, date: form.date, fileName } : r))
      );
      setEditingId(null);
    } else {
      const newRec: HealthRecord = {
        id: Date.now(),
        name: form.name,
        type: form.type,
        date: form.date,
        fileName,
      };
      setRecords((prev) => [...prev, newRec]);
    }
    setForm({ name: "", type: "Lab Report", date: "", file: null });
  };

  const deleteRecord = (id: number) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

  const editRecord = (rec: HealthRecord) => {
    setForm({ name: rec.name, type: rec.type as any, date: rec.date, file: null });
    setEditingId(rec.id);
  };

  return (
    <div className="p-4 bg-lavender-light min-h-screen text-purple-deep">
      <h1 className="text-2xl font-bold mb-4">My Health</h1>
      {/* Patient Profile */}
      <section className="bg-white rounded-lg p-4 shadow mb-6 flex items-center">
        <User className="w-8 h-8 mr-3 text-purple-deep" />
        <div>
          <p className="font-semibold">{profile.name}</p>
          <p className="text-sm">Age: {profile.age}</p>
          <p className="text-sm">Blood Group: {profile.bloodGroup}</p>
        </div>
      </section>

      {/* Add / Edit Record Form */}
      <form onSubmit={addOrUpdateRecord} className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4 p-4 bg-white rounded shadow">
        <input
          name="name"
          placeholder="Record name"
          className="border rounded p-2"
          value={form.name}
          onChange={handleInputChange}
          required
        />
        <select name="type" className="border rounded p-2" value={form.type} onChange={handleInputChange}>
          <option value="Lab Report">Lab Report</option>
          <option value="Prescription">Prescription</option>
          <option value="Imaging">Imaging</option>
          <option value="Visit Note">Visit Note</option>
        </select>
        <input
          name="date"
          type="date"
          className="border rounded p-2"
          value={form.date}
          onChange={handleInputChange}
          required
        />
        <div className="flex items-center">
          <input type="file" onChange={handleFileChange} className="flex-1" />
        </div>
        <button type="submit" className="col-span-full bg-purple-deep text-white py-2 rounded hover:bg-purple-800">
          {editingId !== null ? "Update Record" : "Add Record"}
        </button>
      </form>

      {/* Records List */}
      <section className="bg-white rounded-lg p-4 shadow">
        <h2 className="text-xl font-semibold mb-3">Health Records</h2>
        {records.length === 0 ? (
          <p className="text-gray-500">No records added.</p>
        ) : (
          <ul className="space-y-2">
            {records
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((rec) => (
                <li key={rec.id} className="border-b pb-2 flex items-center justify-between">
                  <div>
                    <p className="font-medium">{rec.name}</p>
                    <p className="text-sm text-gray-600">
                      {rec.type} • {rec.date}{rec.fileName ? ` • ${rec.fileName}` : ""}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="flex items-center text-purple-deep hover:text-purple-800"
                      onClick={() => editRecord(rec)}
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      className="flex items-center text-red-600 hover:text-red-800"
                      onClick={() => deleteRecord(rec.id)}
                      title="Delete"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </section>
    </div>
  );
};

const EmergencyPage: React.FC = () => {
  // Load contacts from localStorage or initialize with mock data
  const [contacts, setContacts] = useState<Array<{ id: number; name: string; phone: string }>>([]);
  const [form, setForm] = useState({ name: "", phone: "" });

  useEffect(() => {
    const stored = localStorage.getItem("emergencyContacts");
    if (stored) {
      setContacts(JSON.parse(stored));
    } else {
      // Initial mock contacts
      setContacts([
        { id: 1, name: "Hospital Emergency", phone: "1800112" },
        { id: 2, name: "Police", phone: "100" },
        { id: 3, name: "Fire Brigade", phone: "101" },
      ]);
    }
  }, []);

  // Persist contacts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("emergencyContacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    const newContact = { id: Date.now(), name: form.name, phone: form.phone };
    setContacts((prev) => [...prev, newContact]);
    setForm({ name: "", phone: "" });
  };

  const deleteContact = (id: number) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="p-4 bg-lavender-light min-h-screen text-purple-deep">
      <h1 className="text-3xl font-bold mb-4 text-red-600">Emergency</h1>
      {/* Call 112 button */}
      <a
        href="tel:112"
        className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg text-xl font-semibold hover:bg-red-700 mb-6"
      >
        Call 112
      </a>
      <p className="mb-4 text-sm text-gray-700">
        <strong>Note:</strong> Use 112 only for genuine emergencies. Misuse can divert resources.
      </p>

      {/* Add new emergency contact */}
      <form onSubmit={addContact} className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-6 p-4 bg-white rounded shadow">
        <input
          name="name"
          placeholder="Contact name"
          className="border rounded p-2"
          value={form.name}
          onChange={handleInputChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone number"
          type="tel"
          className="border rounded p-2"
          value={form.phone}
          onChange={handleInputChange}
          required
        />
        <button type="submit" className="bg-purple-deep text-white py-2 rounded hover:bg-purple-800">
          Add Contact
        </button>
      </form>

      {/* Contacts list */}
      <section className="bg-white rounded-lg p-4 shadow">
        <h2 className="text-xl font-semibold mb-3">Emergency Contacts</h2>
        {contacts.length === 0 ? (
          <p className="text-gray-500">No contacts added.</p>
        ) : (
          <ul className="space-y-2">
            {contacts.map((c) => (
              <li key={c.id} className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                  <span className="font-medium mr-2">{c.name}</span>
                  <span className="text-sm text-gray-600">{c.phone}</span>
                </div>
                <div className="flex space-x-2">
                  <a href={`tel:${c.phone}`} className="flex items-center text-purple-deep hover:text-purple-800">
                    <Phone className="w-4 h-4 mr-1" />Call
                  </a>
                  <button
                    onClick={() => deleteContact(c.id)}
                    className="flex items-center text-red-600 hover:text-red-800"
                  >
                    <X className="w-4 h-4 mr-1" />Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

const ProfessionalHelpPage: React.FC = () => {
  // Define request type
  type Request = {
    id: number;
    name: string;
    contact: string;
    type: string;
    description: string;
    date: string;
    status: 'Pending' | 'In Review' | 'Resolved';
  };

  const requestTypes = [
    'General Health Guidance',
    'Doctor Support',
    'Appointment Support',
    'Health Record Support',
  ];

  const [requests, setRequests] = useState<Request[]>([]);
  const [form, setForm] = useState({
    name: '',
    contact: '',
    type: requestTypes[0],
    description: '',
  });

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('professionalHelpRequests');
    if (stored) setRequests(JSON.parse(stored));
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('professionalHelpRequests', JSON.stringify(requests));
  }, [requests]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const addRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.contact || !form.description) return;
    const newReq: Request = {
      id: Date.now(),
      name: form.name,
      contact: form.contact,
      type: form.type,
      description: form.description,
      date: new Date().toLocaleDateString(),
      status: 'Pending',
    };
    setRequests(prev => [...prev, newReq]);
    setForm({ name: '', contact: '', type: requestTypes[0], description: '' });
  };

  const updateStatus = (id: number, newStatus: Request['status']) => {
    setRequests(prev =>
      prev.map(r => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  const deleteRequest = (id: number) => {
    setRequests(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="p-4 bg-lavender-light min-h-screen text-purple-deep">
      <h1 className="text-2xl font-bold mb-2">Professional Help</h1>
      <p className="mb-4">
        Request support from a healthcare professional. This is a mock demo; it does not replace a doctor.
      </p>
      {/* Request Form */}
      <form onSubmit={addRequest} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-white rounded shadow">
        <input
          name="name"
          placeholder="Your name"
          className="border rounded p-2"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="contact"
          placeholder="Contact (email or phone)"
          className="border rounded p-2"
          value={form.contact}
          onChange={handleChange}
          required
        />
        <select
          name="type"
          className="border rounded p-2"
          value={form.type}
          onChange={handleChange}
        >
          {requestTypes.map(rt => (
            <option key={rt} value={rt}>
              {rt}
            </option>
          ))}
        </select>
        <textarea
          name="description"
          placeholder="Describe your request"
          className="border rounded p-2 md:col-span-2"
          rows={3}
          value={form.description}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-purple-deep text-white py-2 px-4 rounded hover:bg-purple-800 md:col-span-2"
        >
          Submit Request
        </button>
      </form>

      {/* Requests List */}
      <section className="bg-white rounded-lg p-4 shadow">
        <h2 className="text-xl font-semibold mb-3">Submitted Requests</h2>
        {requests.length === 0 ? (
          <p className="text-gray-500">No requests submitted yet.</p>
        ) : (
          <ul className="space-y-4">
            {requests.map(req => (
              <li
                key={req.id}
                className="border-b pb-2 flex flex-col md:flex-row md:items-center justify-between"
              >
                <div className="flex-1">
                  <p className="font-medium">{req.type}</p>
                  <p className="text-sm text-gray-600">
                    <strong>{req.name}</strong> ({req.contact}) – {req.date}
                  </p>
                  <p className="mt-1 text-gray-800">{req.description}</p>
                </div>
                <div className="mt-2 md:mt-0 md:ml-4 flex items-center space-x-2">
                  {/* Status badge */}
                  <span
                    className={`px-2 py-1 text-xs rounded ${{
                      Pending: 'bg-yellow-200 text-yellow-800',
                      'In Review': 'bg-blue-200 text-blue-800',
                      Resolved: 'bg-green-200 text-green-800',
                    }[req.status]}`}
                  >
                    {req.status}
                  </span>
                  {/* Status change */}
                  <select
                    value={req.status}
                    onChange={e =>
                      updateStatus(req.id, e.target.value as Request['status'])
                    }
                    className="border rounded p-1 text-sm"
                  >
                    <option>Pending</option>
                    <option>In Review</option>
                    <option>Resolved</option>
                  </select>
                  <button
                    onClick={() => deleteRequest(req.id)}
                    className="flex items-center text-red-600 hover:text-red-800"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Disclaimer */}
      <p className="mt-4 text-sm text-gray-700">
        <AlertTriangle className="inline w-4 h-4 mr-1 text-yellow-600" />
        This demo does not provide medical diagnosis and does not replace professional medical advice.
      </p>
    </div>
  );
};

const DashboardPage: React.FC = () => {
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [reminderCount, setReminderCount] = useState(0);
  const [recordCount, setRecordCount] = useState(0);
  const [emergencyContactCount, setEmergencyContactCount] = useState(0);

  useEffect(() => {
    const storedAppts = localStorage.getItem('appointments');
    if (storedAppts) {
      try {
        setAppointmentCount(JSON.parse(storedAppts).length);
      } catch (e) {
        setAppointmentCount(5);
      }
    } else {
      setAppointmentCount(5);
    }

    const storedReminders = localStorage.getItem('reminders');
    setReminderCount(storedReminders ? JSON.parse(storedReminders).length : 0);

    const storedRecords = localStorage.getItem('myHealthRecords');
    setRecordCount(storedRecords ? JSON.parse(storedRecords).length : 0);

    const storedContacts = localStorage.getItem('emergencyContacts');
    setEmergencyContactCount(storedContacts ? JSON.parse(storedContacts).length : 0);
  }, []);

  return (
    <div className="p-4 bg-lavender-light min-h-screen text-purple-deep">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex items-center p-4 bg-white rounded shadow">
          <Calendar className="w-8 h-8 mr-3 text-purple-deep" />
          <div>
            <p className="text-sm text-gray-600">Appointments</p>
            <p className="text-xl font-bold">{appointmentCount}</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-white rounded shadow">
          <Bell className="w-8 h-8 mr-3 text-purple-deep" />
          <div>
            <p className="text-sm text-gray-600">Reminders</p>
            <p className="text-xl font-bold">{reminderCount}</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-white rounded shadow">
          <User className="w-8 h-8 mr-3 text-purple-deep" />
          <div>
            <p className="text-sm text-gray-600">Health Records</p>
            <p className="text-xl font-bold">{recordCount}</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-white rounded shadow">
          <Phone className="w-8 h-8 mr-3 text-purple-deep" />
          <div>
            <p className="text-sm text-gray-600">Emergency Contacts</p>
            <p className="text-xl font-bold">{emergencyContactCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- Doctors Feature ---------- */
type Doctor = {
  id: number;
  name: string;
  specialty: string;
  qualification: string;
  experience: string;
  availability: string;
  slot: string;
};

const specialties = [
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "Dermatology",
  "Mental Wellness",
  "General Medicine",
  "Ophthalmology",
];

const generateDoctors = (): Doctor[] => {
  const doctors: Doctor[] = [];
  let id = 1;
  specialties.forEach((spec) => {
    for (let i = 1; i <= 7; i++) {
      doctors.push({
        id: id++,
        name: `${spec} Doctor ${i}`,
        specialty: spec,
        qualification: "MD",
        experience: `${3 + i} years`,
        availability: "Mon‑Fri 9am‑5pm",
        slot: `10:${i < 5 ? "0" + i : i} AM`,
      });
    }
  });
  return doctors;
};

const doctorData: Doctor[] = generateDoctors();

const DoctorCard: React.FC<{ doctor: Doctor }> = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition flex flex-col">
      <div className="flex items-center mb-2">
        <Stethoscope className="w-5 h-5 mr-2 text-purple-deep" />
        <h2 className="text-lg font-semibold">{doctor.name}</h2>
      </div>
      <p className="text-sm text-gray-600">{doctor.specialty}</p>
      <p className="text-sm">Qualification: {doctor.qualification}</p>
      <p className="text-sm">Experience: {doctor.experience}</p>
      <p className="text-sm">Availability: {doctor.availability}</p>
      <p className="text-sm mb-2">Slot: {doctor.slot}</p>
      <button 
        onClick={() => navigate("/appointments", { state: { doctor } })}
        className="mt-auto bg-purple-deep text-white px-3 py-1 rounded hover:bg-purple-800 self-start"
      >
        Book Appointment
      </button>
    </div>
  );
};

const DoctorsPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("");

  const filteredDoctors = useMemo(() => {
    return doctorData.filter((doc) => {
      const matchesName = doc.name.toLowerCase().includes(search.toLowerCase());
      const matchesSpec = filter ? doc.specialty === filter : true;
      return matchesName && matchesSpec;
    });
  }, [search, filter]);

  return (
    <div className="p-4 bg-lavender-light min-h-screen text-purple-deep">
      <h1 className="text-2xl font-bold mb-4">Doctors</h1>
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search doctor by name..."
            className="w-full pl-8 pr-4 py-2 border rounded focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="border rounded px-3 py-2"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All Specialties</option>
          {specialties.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDoctors.map((doc) => (
          <DoctorCard key={doc.id} doctor={doc} />
        ))}
      </div>
    </div>
  );
};

/* ---------- Main App ---------- */
const App: React.FC = () => (
  <BrowserRouter>
    <div className="min-h-screen flex flex-col bg-lavender-light text-purple-deep">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/assistant" element={<HealthAssistantPage />} />
          <Route path="/find-care" element={<FindCarePage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/reminders" element={<RemindersPage />} />
          <Route path="/my-health" element={<MyHealthPage />} />
          <Route path="/emergency" element={<EmergencyPage />} />
          <Route path="/professional-help" element={<ProfessionalHelpPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </main>
    </div>
  </BrowserRouter>
);

export default App;
