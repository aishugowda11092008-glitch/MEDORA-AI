
import { useEffect, useState } from "react";
import {
  Activity,
  HeartPulse,
  LayoutDashboard,
  FileText,
  MapPin,
  Bell,
  Search,
  Menu,
  X,
  ShieldCheck,
  Brain,
  CalendarDays,
  Clock,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  ArrowUpRight,
  Home,
  Hospital
} from "lucide-react";

import { checkBackend } from "./api";
import MednexusForm from "./MednexusForm";
import ScanwiseUpload from "./ScanwiseUpload";
import "./App.css";

type Page =
  | "Overview"
  | "MEDNEXUS AI"
  | "SCANWISE AI"
  | "RURALCARE 360"
  | "My Health"
  | "Appointments";

const navigation: { label: Page; icon: typeof Home }[] = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "MEDNEXUS AI", icon: Brain },
  { label: "SCANWISE AI", icon: FileText },
  { label: "RURALCARE 360", icon: MapPin },
  { label: "My Health", icon: HeartPulse },
  { label: "Appointments", icon: CalendarDays }
];

function App() {
  const [active, setActive] = useState<Page>("Overview");
  const [backendOnline, setBackendOnline] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let mounted = true;

    const check = async () => {
      const result = await checkBackend();
      if (mounted) setBackendOnline(Boolean(result));
    };

    check();

    const interval = window.setInterval(check, 10000);

    return () => {
      mounted = false;
      window.clearInterval(interval);
    };
  }, []);

  const choosePage = (page: Page) => {
    setActive(page);
    setSidebarOpen(false);
  };

  const pageDescriptions: Record<Page, string> = {
    "Overview": "Your personal healthcare workspace",
    "MEDNEXUS AI": "Organize health information for professional review",
    "SCANWISE AI": "Upload and organize your medical reports",
    "RURALCARE 360": "Explore healthcare access and support",
    "My Health": "Your health information workspace",
    "Appointments": "Manage your care and appointment information"
  };

  return (
    <div className="app-shell">

      {sidebarOpen && (
        <button
          className="mobile-overlay"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>

        <div className="brand">
          <div className="brand-symbol">
            <HeartPulse size={25} />
          </div>

          <div>
            <strong>MEDORA AI</strong>
            <span>Healthcare intelligence</span>
          </div>

          <button
            className="mobile-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="sidebar-label">WORKSPACE</div>

        <nav className="navigation">
          {navigation.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={`nav-item ${active === label ? "active" : ""}`}
              onClick={() => choosePage(label)}
            >
              <Icon size={19} />
              <span>{label}</span>
              {active === label && <span className="active-dot" />}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">

          <div className="privacy-card">
            <ShieldCheck size={22} />
            <strong>Your health, your control.</strong>
            <p>
              Privacy-conscious healthcare information management.
            </p>
          </div>

          <div className="profile">
            <div className="avatar">P</div>
            <div>
              <strong>Patient Portal</strong>
              <span>Demo account</span>
            </div>
          </div>

        </div>
      </aside>

      <main className="main-area">

        <header className="topbar">

          <div className="topbar-left">

            <button
              className="icon-button menu-toggle"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={21} />
            </button>

            <div className="breadcrumb">
              <span>Workspace</span>
              <ChevronRight size={15} />
              <strong>{active}</strong>
            </div>

          </div>

          <div className="topbar-actions">

            <div className={`connection ${backendOnline ? "online" : "offline"}`}>
              <span className="status-dot" />
              {backendOnline ? "Backend Online" : "Backend Offline"}
            </div>

            <label className="search-box">
              <Search size={17} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search healthcare..."
              />
            </label>

            <button className="icon-button" aria-label="Notifications">
              <Bell size={19} />
            </button>

            <div className="avatar top-avatar">P</div>

          </div>
        </header>

        <div className="page-content">

          {active === "Overview" && (
            <>

              <section className="welcome-banner">

                <div className="welcome-copy">

                  <span className="eyebrow">
                    <Activity size={15} />
                    YOUR HEALTHCARE COMPANION
                  </span>

                  <h1>Welcome to MEDORA AI.</h1>

                  <p>
                    One connected platform for health intelligence
                    and accessible care.
                  </p>

                  <button
                    className="primary-button"
                    onClick={() => choosePage("MEDNEXUS AI")}
                  >
                    Explore health assessment
                    <ArrowUpRight size={17} />
                  </button>

                </div>

                <div className="welcome-art">
                  <div className="art-circle">
                    <HeartPulse size={76} />
                  </div>

                  <span className="art-pill pill-one">
                    <ShieldCheck size={17} />
                    Privacy first
                  </span>

                  <span className="art-pill pill-two">
                    <Activity size={17} />
                    Connected care
                  </span>
                </div>

              </section>

              <div className="section-heading">
                <div>
                  <span className="eyebrow">YOUR WORKSPACE</span>
                  <h2>Healthcare ecosystem</h2>
                  <p>Access your healthcare tools in one place.</p>
                </div>
              </div>

              <section className="module-grid">

                <button
                  className="module-card"
                  onClick={() => choosePage("MEDNEXUS AI")}
                >
                  <div className="module-icon purple">
                    <Brain size={25} />
                  </div>

                  <span className="module-tag">HEALTH INFORMATION</span>
                  <h3>MEDNEXUS AI</h3>

                  <p>
                    Submit health information and organize symptoms
                    for professional review.
                  </p>

                  <span className="module-link">
                    Open module <ArrowUpRight size={16} />
                  </span>
                </button>

                <button
                  className="module-card"
                  onClick={() => choosePage("SCANWISE AI")}
                >
                  <div className="module-icon blue">
                    <FileText size={25} />
                  </div>

                  <span className="module-tag">REPORT MANAGEMENT</span>
                  <h3>SCANWISE AI</h3>

                  <p>
                    Upload medical PDFs and extract their selectable text.
                  </p>

                  <span className="module-link">
                    Open module <ArrowUpRight size={16} />
                  </span>
                </button>

                <button
                  className="module-card"
                  onClick={() => choosePage("RURALCARE 360")}
                >
                  <div className="module-icon green">
                    <Hospital size={25} />
                  </div>

                  <span className="module-tag">CARE ACCESS</span>
                  <h3>RURALCARE 360</h3>

                  <p>
                    Explore healthcare access, facility information
                    and care coordination.
                  </p>

                  <span className="module-link">
                    Open module <ArrowUpRight size={16} />
                  </span>
                </button>

              </section>

              <section className="lower-grid">

                <div className="panel">

                  <div className="panel-heading">
                    <div>
                      <h3>Platform overview</h3>
                      <p>Your connected healthcare tools</p>
                    </div>
                    <Activity size={21} />
                  </div>

                  <div className="overview-row">
                    <span className="overview-icon purple">
                      <Brain size={19} />
                    </span>
                    <div>
                      <strong>Health information intake</strong>
                      <small>MEDNEXUS AI</small>
                    </div>
                    <CheckCircle2 className="row-check" size={19} />
                  </div>

                  <div className="overview-row">
                    <span className="overview-icon blue">
                      <FileText size={19} />
                    </span>
                    <div>
                      <strong>Medical PDF extraction</strong>
                      <small>SCANWISE AI</small>
                    </div>
                    <CheckCircle2 className="row-check" size={19} />
                  </div>

                  <div className="overview-row">
                    <span className="overview-icon green">
                      <MapPin size={19} />
                    </span>
                    <div>
                      <strong>Healthcare access</strong>
                      <small>RURALCARE 360</small>
                    </div>
                    <Clock className="row-pending" size={19} />
                  </div>

                </div>

                <div className="panel assurance-panel">

                  <div className="assurance-icon">
                    <ShieldCheck size={27} />
                  </div>

                  <h3>Your information matters.</h3>

                  <p>
                    MEDORA AI is a healthcare information prototype.
                    Your information should be shared only with
                    appropriate consent and handled securely.
                  </p>

                  <div className="notice-line">
                    <AlertCircle size={17} />
                    Not a replacement for professional medical advice.
                  </div>

                </div>

              </section>

            </>
          )}

          {active !== "Overview" && (

            <section className="workspace-page">

              <div className="page-title">
                <span className="eyebrow">MEDORA AI ECOSYSTEM</span>
                <h1>{active}</h1>
                <p>{pageDescriptions[active]}</p>
              </div>

              {active === "MEDNEXUS AI" && (
                <div className="workspace-panel">

                  <div className="workspace-panel-heading">
                    <div className="module-icon purple">
                      <Brain size={25} />
                    </div>

                    <div>
                      <h2>Health information assessment</h2>
                      <p>Share information for professional review.</p>
                    </div>
                  </div>

                  <MednexusForm />

                </div>
              )}

              {active === "SCANWISE AI" && (
                <div className="workspace-panel">

                  <div className="workspace-panel-heading">
                    <div className="module-icon blue">
                      <FileText size={25} />
                    </div>

                    <div>
                      <h2>Medical report organizer</h2>
                      <p>Upload a PDF to extract selectable text.</p>
                    </div>
                  </div>

                  <ScanwiseUpload />

                </div>
              )}

              {active === "RURALCARE 360" && (
                <div className="workspace-panel">

                  <div className="workspace-panel-heading">
                    <div className="module-icon green">
                      <MapPin size={25} />
                    </div>

                    <div>
                      <h2>Healthcare access</h2>
                      <p>Care discovery and coordination workspace.</p>
                    </div>
                  </div>

                  <div className="feature-placeholder">
                    <Hospital size={35} />
                    <h3>Healthcare facility directory</h3>

                    <p>
                      Facility search, verified contact details and care
                      coordination are planned for this module.
                      Live facility data is not connected yet.
                    </p>

                    <div className="notice-line">
                      <AlertCircle size={17} />
                      No live facility availability is currently provided.
                    </div>
                  </div>

                </div>
              )}

              {active === "My Health" && (
                <div className="workspace-panel">

                  <div className="feature-placeholder">
                    <HeartPulse size={35} />
                    <h2>My Health</h2>

                    <p>
                      Your personal health timeline will appear here
                      when secure patient records are connected.
                    </p>

                    <div className="notice-line">
                      <ShieldCheck size={17} />
                      No patient records are stored in this demo dashboard.
                    </div>
                  </div>

                </div>
              )}

              {active === "Appointments" && (
                <div className="workspace-panel">

                  <div className="feature-placeholder">
                    <CalendarDays size={35} />
                    <h2>Appointments</h2>

                    <p>
                      Appointment scheduling and reminders will be
                      available when calendar and care-provider
                      services are connected.
                    </p>

                    <div className="notice-line">
                      <Clock size={17} />
                      Appointment booking is not connected yet.
                    </div>
                  </div>

                </div>
              )}

            </section>

          )}

          <footer className="footer">
            <span>© 2026 MEDORA AI · Healthcare information prototype</span>
            <span>
              <ShieldCheck size={14} />
              Privacy-conscious design
            </span>
          </footer>

        </div>
      </main>
    </div>
  );
}

export default App;
