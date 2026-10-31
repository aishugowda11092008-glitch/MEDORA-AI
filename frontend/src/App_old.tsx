
import { useState, useEffect } from "react";
import {
  Activity, HeartPulse, LayoutDashboard, FileText,
  MapPin, Users, Bell, Search, Menu, X,
  ArrowUpRight, ShieldCheck, Brain, Upload,
  CalendarDays, Stethoscope, Clock, ChevronRight,
  AlertCircle, CheckCircle2
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area,
  XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";
import "./App.css";
import { checkBackend, getModules } from "./api";
import MednexusForm from "./MednexusForm";
import ScanwiseUpload from "./ScanwiseUpload";
const chartData = [
  { day: "Mon", value: 65 },
  { day: "Tue", value: 72 },
  { day: "Wed", value: 68 },
  { day: "Thu", value: 82 },
  { day: "Fri", value: 76 },
  { day: "Sat", value: 88 },
  { day: "Sun", value: 91 }
];

const modules = [
  {
    id: "mednexus",
    title: "MEDNEXUS AI",
    subtitle: "Health risk assessment",
    description: "Explore health indicators and receive preliminary prevention guidance.",
    icon: Brain,
    color: "purple"
  },
  {
    id: "scanwise",
    title: "SCANWISE AI",
    subtitle: "Medical report intelligence",
    description: "Upload medical reports and organize extracted health information.",
    icon: FileText,
    color: "blue"
  },
  {
    id: "ruralcare",
    title: "RURALCARE 360",
    subtitle: "Healthcare accessibility",
    description: "Explore healthcare access, facilities and care coordination.",
    icon: MapPin,
    color: "green"
  }
];

function App() {
  const [active, setActive] = useState("Overview");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [reportName, setReportName] = useState("");
  const [backendStatus, setBackendStatus] = useState<
    "checking" | "connected" | "offline"
  >("checking");
  const [backendModules, setBackendModules] = useState<
    { id: string; name: string }[]
  >([]);

  useEffect(() => {
    let activeRequest = true;

    async function connectBackend() {
      const health = await checkBackend();

      if (!activeRequest) return;

      if (health?.status === "healthy") {
        const result = await getModules();

        if (!activeRequest) return;

        if (result && Array.isArray(result.modules)) {
          setBackendModules(result.modules);
          setBackendStatus("connected");
        } else {
          setBackendStatus("offline");
        }
      } else {
        setBackendStatus("offline");
      }
    }

    connectBackend();

    return () => {
      activeRequest = false;
    };
  }, []);

  const navigation = [
    { name: "Overview", icon: LayoutDashboard },
    { name: "MEDNEXUS AI", icon: Brain },
    { name: "SCANWISE AI", icon: FileText },
    { name: "RURALCARE 360", icon: MapPin },
    { name: "My Health", icon: HeartPulse },
    { name: "Appointments", icon: CalendarDays }
  ];

  const selectedModule = modules.find(
    (module) => module.title === active
  );

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileMenu ? "mobile-open" : ""}`}>
        <div className="brand">
          <div className="brand-icon"><HeartPulse size={25} /></div>
          <div>
            <h2>MEDORA<span> AI</span></h2>
            <small>Healthcare intelligence</small>
          </div>
          <button className="close-menu" onClick={() => setMobileMenu(false)}>
            <X />
          </button>
        </div>

        <div className="side-label">WORKSPACE</div>
        <nav>
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                className={`nav-item ${active === item.name ? "active" : ""}`}
                onClick={() => {
                  setActive(item.name);
                  setMobileMenu(false);
                }}
              >
                <Icon size={19} />
                <span>{item.name}</span>
                {active === item.name && <span className="nav-dot" />}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="privacy-card">
            <ShieldCheck size={22} />
            <strong>Your health, your control.</strong>
            <p>Privacy-conscious healthcare information management.</p>
          </div>
          <div className="profile">
            <div className="avatar">P</div>
            <div>
              <strong>Patient Portal</strong>
              <small>Demo account</small>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="top-left">
            <button className="menu-button" onClick={() => setMobileMenu(true)}>
              <Menu />
            </button>
            <div>
              <span className="breadcrumb">Workspace / </span>
              <strong>{active}</strong>
            </div>
          </div>
          <div className="top-actions">
            <div className={`backend-status ${backendStatus}`}>
              <span className="status-dot" />
              {backendStatus === "checking"
                ? "Connecting..."
                : backendStatus === "connected"
                ? "Backend Connected"
                : "Backend Offline"}
            </div>
            <div className="search-box">
              <Search size={17} />
              <input placeholder="Search healthcare..." />
            </div>
            <button className="icon-button" aria-label="Notifications">
              <Bell size={19} />
              <i />
            </button>
            <div className="top-avatar">P</div>
          </div>
        </header>

        <div className="content">
          {active === "Overview" ? (
            <>
              <section className="welcome-row">
                <div>
                  <div className="eyebrow">YOUR HEALTHCARE COMPANION</div>
                  <h1>Welcome to <span>MEDORA AI.</span></h1>
                  <p>One connected platform for health intelligence and accessible care.</p>
                </div>
                <div className="date-chip"><CalendarDays size={16} /> Your health workspace</div>
              </section>

              <section className="hero-card">
                <div className="hero-content">
                  <span className="hero-tag"><Activity size={14} /> CONNECTED HEALTHCARE ECOSYSTEM</span>
                  <h2>Better health decisions<br />start with better information.</h2>
                  <p>Understand your health information, organize medical reports and explore care options in one place.</p>
                  <button className="hero-button" onClick={() => setActive("MEDNEXUS AI")}>
                    Explore health assessment <ArrowUpRight size={17} />
                  </button>
                </div>
                <div className="hero-art">
                  <div className="orbit orbit-one" />
                  <div className="orbit orbit-two" />
                  <div className="hero-heart"><HeartPulse size={76} /></div>
                  <div className="floating-icon float-one"><Activity /></div>
                  <div className="floating-icon float-two"><ShieldCheck /></div>
                  <div className="floating-icon float-three"><Brain /></div>
                </div>
              </section>

              <section className="section-heading">
                <div>
                  <h2>Your healthcare modules</h2>
                  <p>Three intelligent services. One connected experience.</p>
                </div>
                <span className="section-count">
                  {backendStatus === "connected"
                    ? `${backendModules.length} MODULES · LIVE`
                    : "03 MODULES · DEMO"}
                </span>
              </section>

              <section className="module-grid">
                {modules.map((module) => {
                  const Icon = module.icon;
                  return (
                    <button
                      className="module-card"
                      key={module.id}
                      onClick={() => setActive(module.title)}
                    >
                      <div className={`module-icon ${module.color}`}><Icon size={24} /></div>
                      <div className="module-arrow"><ArrowUpRight size={18} /></div>
                      <h3>{module.title}</h3>
                      <span className="module-subtitle">{module.subtitle}</span>
                      <p>{module.description}</p>
                      <div className="module-link">Explore module <ChevronRight size={16} /></div>
                    </button>
                  );
                })}
              </section>

              <section className="lower-grid">
                <div className="panel health-panel">
                  <div className="panel-heading">
                    <div>
                      <h3>Health activity overview</h3>
                      <p>Illustrative demo data â€” not actual patient measurements</p>
                    </div>
                    <span className="demo-tag">SAMPLE DATA</span>
                  </div>
                  <div className="chart-wrap">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#25a98d" stopOpacity={0.25} />
                            <stop offset="100%" stopColor="#25a98d" stopOpacity={0.01} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#edf0f4" />
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#929cab", fontSize: 12 }} />
                        <YAxis hide />
                        <Tooltip />
                        <Area type="monotone" dataKey="value" stroke="#20a58b" strokeWidth={3} fill="url(#healthGradient)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="panel activity-panel">
                  <div className="panel-heading">
                    <div>
                      <h3>Quick actions</h3>
                      <p>Start with a healthcare task</p>
                    </div>
                  </div>
                  <button className="quick-action" onClick={() => setActive("SCANWISE AI")}>
                    <div className="quick-icon blue"><Upload /></div>
                    <div><strong>Upload a medical report</strong><small>Organize your report information</small></div>
                    <ChevronRight />
                  </button>
                  <button className="quick-action" onClick={() => setActive("RURALCARE 360")}>
                    <div className="quick-icon green"><MapPin /></div>
                    <div><strong>Explore healthcare access</strong><small>Find care and facilities</small></div>
                    <ChevronRight />
                  </button>
                  <button className="quick-action" onClick={() => setActive("Appointments")}>
                    <div className="quick-icon purple"><CalendarDays /></div>
                    <div><strong>View appointments</strong><small>Manage your care schedule</small></div>
                    <ChevronRight />
                  </button>
                </div>
              </section>

              <div className="disclaimer">
                <AlertCircle size={17} />
                <p><strong>Important:</strong> MEDORA AI is a prototype for healthcare information support. It does not diagnose conditions or replace qualified medical professionals. Seek professional care for medical concerns.</p>
              </div>
            </>
          ) : selectedModule ? (
            <section className="module-detail">
              <div className={`module-icon large ${selectedModule.color}`}>
                <selectedModule.icon size={32} />
              </div>
              <div className="eyebrow">MEDORA AI ECOSYSTEM</div>
              <h1>{selectedModule.title}</h1>
              <h3>{selectedModule.subtitle}</h3>
              <p>{selectedModule.description}</p>

              {active === "SCANWISE AI" && (<ScanwiseUpload />)}

              {active === "MEDNEXUS AI" && (<MednexusForm />)}

              {active === "RURALCARE 360" && (
                <div className="upload-panel">
                  <MapPin size={30} />
                  <h3>Healthcare access</h3>
                  <p>Discover care facilities, referrals and access support.</p>
                  <div className="notice"><AlertCircle size={17} /> Facility search and live availability will be connected in a later step.</div>
                </div>
              )}
            </section>
          ) : (
            <section className="module-detail">
              <div className="module-icon large blue"><Stethoscope size={32} /></div>
              <div className="eyebrow">PATIENT WORKSPACE</div>
              <h1>{active}</h1>
              <h3>Coming soon</h3>
              <p>This section will be connected to the MEDORA AI patient and care coordination system.</p>
              <div className="upload-panel">
                <Clock size={30} />
                <h3>Feature under development</h3>
                <p>We're building this section as part of the integrated healthcare platform.</p>
              </div>
            </section>
          )}

          <footer className="footer">
            <span>Â© 2026 MEDORA AI Â· Healthcare intelligence ecosystem</span>
            <span><ShieldCheck size={14} /> Privacy-conscious design</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;


