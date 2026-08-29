import React from "react";
import { Link } from "react-router-dom";
import {
  MessageCircle,
  MapPin,
  Stethoscope,
  CalendarDays,
  Bell,
  FileHeart,
  PhoneCall,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

interface ActionCardProps {
  icon: React.ReactNode;
  label: string;
  to: string;
}

const ActionCard: React.FC<ActionCardProps> = ({ icon, label, to }) => (
  <Link to={to} className="flex items-center p-4 bg-white rounded shadow hover:shadow-md transition cursor-pointer">
    {icon}
    <span className="ml-3 font-medium text-purple-deep">{label}</span>
  </Link>
);

const HomePage: React.FC = () => {
  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="text-center mb-12 bg-lavender-light rounded-lg p-6">
        <h1 className="text-4xl font-bold text-purple-deep mb-4">
          Healthcare assistance, within everyone's reach.
        </h1>
        <p className="text-lg text-purple-deep mb-6 max-w-2xl mx-auto">
          Find the right care, book appointments, and manage basic health tasks – all in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/assistant" className="flex items-center gap-2 px-6 py-3 bg-purple-deep text-white rounded hover:bg-purple-800 transition">
            Talk to Nexora <ArrowRight size={16} />
          </Link>
          <Link to="/find-care" className="flex items-center gap-2 px-6 py-3 bg-white text-purple-deep border border-purple-deep rounded hover:bg-purple-100 transition">
            Find Healthcare <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <ActionCard icon={<MessageCircle size={24} />} label="Health Assistant" to="/assistant" />
        <ActionCard icon={<MapPin size={24} />} label="Find Care" to="/find-care" />
        <ActionCard icon={<Stethoscope size={24} />} label="Find a Doctor" to="/doctors" />
        <ActionCard icon={<CalendarDays size={24} />} label="Book Appointment" to="/appointments" />
        <ActionCard icon={<Bell size={24} />} label="Medicine Reminders" to="/reminders" />
        <ActionCard icon={<FileHeart size={24} />} label="My Health" to="/my-health" />
        <ActionCard icon={<PhoneCall size={24} />} label="Emergency" to="/emergency" />
        <ActionCard icon={<ShieldCheck size={24} />} label="Safety Center" to="/dashboard" />
      </section>

      {/* Disclaimer */}
      <footer className="text-center text-sm text-purple-deep">
        Nexora Health is a non‑diagnostic healthcare assistance platform. It does not replace professional medical advice or diagnosis.
      </footer>
    </div>
  );
};

export default HomePage;
