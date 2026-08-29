import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe, AlertTriangle } from "lucide-react";
import { useI18n } from "../i18n";

const links = [
  { key: "home", to: "/" },
  { key: "healthAssistant", to: "/assistant" },
  { key: "findCare", to: "/find-care" },
  { key: "doctors", to: "/doctors" },
  // { key: "specializations", to: "/specializations" }, // removed undefined route
  { key: "appointments", to: "/appointments" },
  { key: "myHealth", to: "/my-health" },
  { key: "reminders", to: "/reminders" },
  { key: "emergency", to: "/emergency" },
  { key: "professionalHelp", to: "/professional-help" },
  { key: "dashboard", to: "/dashboard" },
];

const Navbar: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const { language, setLanguage, t } = useI18n();
  const location = useLocation();

  const cycleLanguage = () => {
    const next = language === "en" ? "te" : language === "te" ? "hi" : "en";
    setLanguage(next);
  };

  const linkClass = (path: string) =>
    `text-sm hover:text-lavender-light transition ${location.pathname === path ? "font-bold underline" : ""}`;

  return (
    <nav className="bg-purple-deep text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          Nexora Health
        </Link>

        <div className="hidden md:flex items-center gap-4">
          {links.map((link) => (
            <Link key={link.to} to={link.to} className={linkClass(link.to)}>
              {t(link.key)}
            </Link>
          ))}

          <button
            type="button"
            aria-label="Change language"
            className="p-2 rounded hover:bg-purple-700"
            onClick={cycleLanguage}
          >
            <Globe size={20} />
          </button>

          <a
            href="tel:112"
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg text-sm font-medium"
          >
            <AlertTriangle size={18} />
            {t("emergency")}
          </a>
        </div>

        <button
          type="button"
          aria-label="Open menu"
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

        {open && (
          <div className="md:hidden px-4 pb-4 space-y-2">
            {links.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className="block py-2">
                {t(link.key)}
              </Link>
            ))}

            <a href="tel:112" className="flex items-center gap-2 bg-red-600 px-3 py-2 rounded-lg">
              <AlertTriangle size={18} />
              {t("emergency")}
            </a>
          </div>
        )}
    </nav>
  );
};

export default Navbar;
