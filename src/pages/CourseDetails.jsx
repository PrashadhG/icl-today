import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMockCourseById } from '../utils/api';
import toast from 'react-hot-toast';
import InquiryModal from '../components/InquiryModal';
import './CourseDetails.css';
import { FaPhoneAlt } from "react-icons/fa";
import CourseFAQs from '../components/CourseFAQs';
import codeImg from "../assets/wincup2.png";
import {
    Trophy, Code2, IndianRupee, Sparkles, ArrowRight,
    CheckCircle, Users, Award, TrendingUp, Zap,
    BookOpen, Clock, BarChart2, Star, Play,
    ChevronDown, ChevronUp, Briefcase, Globe, Shield
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   BRAND TOKENS
═══════════════════════════════════════════════════════════ */
const B = {
    grad: "linear-gradient(90deg,#1e3a8a 0%,#0ea5e9 100%)",
    grad135: "linear-gradient(135deg,#1e3a8a 0%,#0ea5e9 100%)",
    dark: "#0c1a3a",
    mid: "#1e3a8a",
    light: "#0ea5e9",
    bg: "#f0f6ff",
    white: "#ffffff",
    text: "#0f172a",
    muted: "#64748b",
    border: "#dbeafe",
};

/* ═══════════════════════════════════════════════════════════
   ANIMATED COUNTER
═══════════════════════════════════════════════════════════ */
function Counter({ target, suffix = "" }) {
    const [count, setCount] = useState(0);
    const started = useRef(false);
    useEffect(() => {
        if (started.current) return;
        started.current = true;
        let v = 0;
        const step = Math.ceil(target / 60);
        const t = setInterval(() => {
            v += step;
            if (v >= target) { setCount(target); clearInterval(t); }
            else setCount(v);
        }, 20);
        return () => clearInterval(t);
    }, [target]);
    return <>{count.toLocaleString()}{suffix}</>;
}

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════ */
const CourseDetails = ({ user }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [showInquiryModal, setShowInquiryModal] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setIsLoading(true);
                const data = await getMockCourseById(id);
                setCourse(data);
                if (user?.courses) setIsEnrolled(user.courses.includes(id));
                setIsLoading(false);
            } catch (e) {
                toast.error('Failed to load course details.');
                setIsLoading(false);
            }
        };
        fetchCourse();
    }, [id, user]);

    const handleEnrollment = () => setShowInquiryModal(true);
    const handleEnrollmentSuccess = (inquiry) => {
        toast.success(`Successfully enrolled in ${inquiry.courseName}!`);
        setIsEnrolled(true);
    };

    if (isLoading) return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', fontFamily: 'Outfit,sans-serif', color: B.mid }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ width: 48, height: 48, border: `3px solid ${B.border}`, borderTopColor: B.light, borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px' }} />
                <p>Loading...</p>
            </div>
        </div>
    );

    if (!course) return (
        <div style={{ textAlign: 'center', padding: 60, fontFamily: 'Outfit,sans-serif', color: B.muted }}>
            Course not found
        </div>
    );

    /* ── derived data ── */
    const roles = course.benefits
        ? course.benefits
            .filter(b => b.toLowerCase().includes("career opportunities"))
            .flatMap(b => b.replace(/career opportunities:/i, "").split(",").map(r => r.trim()))
        : ["Full Stack Developer", "Web Developer", "Frontend Engineer"];

    const features = [
        { icon: Code2, title: "Real-World Projects", desc: "Build production-grade apps shipped to real environments — not toy tutorials." },
        { icon: Users, title: "1-on-1 Mentorship", desc: "Weekly sessions with senior engineers who've shipped at scale." },
        { icon: IndianRupee, title: "Performance Stipend", desc: "Top performers earn performance-based stipends + pre-placement offers." },
        { icon: Award, title: "Dual Certificate", desc: "Industry-recognized internship + course completion credential." },
        { icon: TrendingUp, title: "Direct Placements", desc: "Referrals to 50+ hiring partners actively looking for your role." },
        { icon: Zap, title: "Live Sprint Reviews", desc: "Ship weekly, get reviewed by industry leads, build your portfolio." },
    ];

    const faqs = [
        { q: "Who is this internship for?", a: "Anyone with basic programming knowledge who wants real industry exposure. Freshers, students, and career switchers all qualify." },
        { q: "Is the stipend guaranteed?", a: "Stipend is performance-based — top 20% of each cohort earn it. Everyone receives the internship certificate." },
        { q: "How long is the internship?", a: `It runs alongside the ${course.duration} course. You work on live projects from week 2 onwards.` },
        { q: "Will I get a placement?", a: "We have a 95% placement rate. Our career team actively connects you with 50+ hiring partners after completion." },
    ];

    return (
        <>
            {/* ═══════════════════════════════════════════
            GLOBAL STYLES
        ═══════════════════════════════════════════ */}
            <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Lora:ital,wght@1,500&display=swap');

            .cd-root { font-family:'Outfit',sans-serif; color:${B.text}; }
            @keyframes spin    { to { transform:rotate(360deg); } }
            @keyframes fadeUp  { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
            @keyframes float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
            @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }

            .cd-fadeup { animation:fadeUp .65s ease both; }

            /* ── Hero ── */
            .cd-hero {
                background:linear-gradient(135deg,#0c1a3a 0%,#1e3a8a 55%,#0369a1 100%);
                position:relative; overflow:hidden;
            }
            .cd-hero::before {
                content:''; position:absolute; inset:0;
                background:radial-gradient(ellipse 80% 60% at 70% 50%,rgba(14,165,233,.18),transparent);
                pointer-events:none;
            }
            .cd-hero-grid {
                max-width:1240px; margin:0 auto;
                display:grid; grid-template-columns:1fr 380px;
                gap:48px; align-items:center;
                padding:72px 48px 60px;
            }
            @media(max-width:920px){
                .cd-hero-grid { grid-template-columns:1fr; padding:48px 24px 40px; }
                .cd-hero-right { display:none !important; }
                .intern-two-col { grid-template-columns:1fr !important; }
                .stats-row { grid-template-columns:repeat(2,1fr) !important; }
                .feat-grid { grid-template-columns:1fr !important; }
            }

            /* ── Sticky card ── */
            .cd-sticky-card {
                background:white; border-radius:20px;
                box-shadow:0 24px 80px rgba(0,0,0,.18);
                overflow:hidden; position:sticky; top:90px;
            }

            /* ── Tab ── */
            .cd-tab {
                padding:12px 26px; border:none; background:transparent;
                font-family:'Outfit',sans-serif; font-size:14px; font-weight:600;
                color:${B.muted}; cursor:pointer;
                border-bottom:2px solid transparent; transition:all .2s;
                display:inline-flex; align-items:center; gap:7px;
            }
            .cd-tab.active { color:${B.mid}; border-bottom-color:${B.light}; }
            .cd-tab:hover  { color:${B.mid}; }

            /* ── Enroll buttons ── */
            .enroll-btn {
                background:${B.grad}; color:white; font-weight:700;
                border-radius:14px; padding:14px 28px; border:none; cursor:pointer;
                display:inline-flex; align-items:center; gap:8px;
                font-size:15px; font-family:'Outfit',sans-serif;
                box-shadow:0 4px 24px rgba(14,165,233,.35);
                transition:all .25s; width:100%; justify-content:center;
            }
            .enroll-btn:hover { transform:translateY(-2px); box-shadow:0 10px 36px rgba(14,165,233,.45); }
            .enroll-btn-outline {
                background:white; color:${B.mid}; font-weight:700;
                border-radius:14px; padding:13px 28px;
                border:2px solid rgba(255,255,255,.4); cursor:pointer;
                display:inline-flex; align-items:center; gap:8px;
                font-size:15px; font-family:'Outfit',sans-serif;
                box-shadow:0 4px 20px rgba(0,0,0,.12); transition:all .25s;
            }
            .enroll-btn-outline:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(0,0,0,.18); }

            /* ── Gradient text ── */
            .grad-text {
                background:${B.grad};
                -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
            }

            /* ── Feature card ── */
            .feat-card {
                background:white; border-radius:18px;
                border:1.5px solid ${B.border}; padding:24px;
                transition:all .3s; cursor:default; position:relative; overflow:hidden;
            }
            .feat-card::before {
                content:''; position:absolute; top:0; left:0; right:0; height:3px;
                background:${B.grad}; transform:scaleX(0); transform-origin:left; transition:transform .3s;
            }
            .feat-card:hover { transform:translateY(-5px); box-shadow:0 20px 60px rgba(14,165,233,.14); border-color:${B.light}; }
            .feat-card:hover::before { transform:scaleX(1); }

            /* ── Timeline ── */
            .tl-dot {
                width:40px; height:40px; border-radius:50%; flex-shrink:0;
                background:${B.grad}; display:flex; align-items:center; justify-content:center;
                color:white; font-weight:800; font-size:13px;
                box-shadow:0 4px 14px rgba(14,165,233,.3);
            }
            .tl-line { width:2px; height:30px; background:${B.border}; margin:4px 0 4px 19px; }

            /* ── Stat card ── */
            .stat-card {
                background:white; border:1.5px solid ${B.border}; border-radius:20px;
                padding:28px 20px; text-align:center;
                box-shadow:0 4px 20px rgba(14,165,233,.07);
                position:relative; overflow:hidden; transition:box-shadow .2s;
            }
            .stat-card:hover { box-shadow:0 10px 36px rgba(14,165,233,.15); }
            .stat-card::after {
                content:''; position:absolute; bottom:0; left:0; right:0;
                height:3px; background:${B.grad};
            }

            /* ── Role tag ── */
            .role-tag {
                background:rgba(255,255,255,.12); color:white;
                border:1px solid rgba(255,255,255,.22); border-radius:999px;
                padding:6px 16px; font-size:.8rem; font-weight:600;
                transition:all .2s; display:inline-block; cursor:default;
            }
            .role-tag:hover { background:white; color:${B.mid}; transform:translateY(-2px); }

            /* ── FAQ ── */
            .faq-item { border:1.5px solid ${B.border}; border-radius:14px; overflow:hidden; background:white; transition:box-shadow .2s; }
            .faq-item:hover { box-shadow:0 8px 30px rgba(14,165,233,.1); }
            .faq-q {
                width:100%; background:none; border:none; cursor:pointer;
                display:flex; align-items:center; justify-content:space-between;
                padding:18px 22px; font-family:'Outfit',sans-serif;
                font-size:15px; font-weight:600; color:${B.text}; text-align:left;
            }
            .faq-a { padding:0 22px 18px; font-size:14px; color:${B.muted}; line-height:1.7; }

            /* ── Misc ── */
            .inc-item { display:flex; align-items:center; gap:10px; padding:9px 0; border-bottom:1px solid #f1f5f9; font-size:14px; color:#334155; }
            .inc-item:last-child { border:none; }
            .cd-section { max-width:1240px; margin:0 auto; padding:0 48px; }
            @media(max-width:768px){ .cd-section{ padding:0 20px; } }
        `}</style>

            <div className="cd-root">

                {/* ══════════════════════════════════════
                1. HERO
            ══════════════════════════════════════ */}
                <section className="cd-hero">
                    <div style={{ position: 'absolute', top: -100, left: -100, width: 400, height: 400, borderRadius: '50%', border: '1px solid rgba(255,255,255,.05)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', bottom: -80, right: '8%', width: 320, height: 320, borderRadius: '50%', border: '1px solid rgba(255,255,255,.07)', pointerEvents: 'none' }} />

                    <div className="cd-hero-grid">
                        {/* Left */}
                        <div className="cd-fadeup">
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.18)', borderRadius: 999, padding: '6px 16px', marginBottom: 22 }}>
                                <Sparkles style={{ width: 14, height: 14, color: '#7dd3fc' }} />
                                <span style={{ color: '#bae6fd', fontSize: 13, fontWeight: 600 }}>{course.category || 'Professional Course'}</span>
                            </div>

                            <h1 style={{ fontSize: 'clamp(2rem,4vw,3.1rem)', fontWeight: 900, color: 'white', lineHeight: 1.12, marginBottom: 14 }}>
                                {course.title}
                            </h1>
                            <p style={{ color: 'rgba(186,230,253,.85)', fontSize: 16, marginBottom: 28, maxWidth: 520, lineHeight: 1.6 }}>
                                {course.subtitle} — learn by building, get mentored, get placed.
                            </p>

                            {/* meta row */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 32 }}>
                                {[
                                    { icon: Star, label: `${course.rating || 4.8} Rating` },
                                    { icon: Users, label: `${(course.enrollmentCount || 0).toLocaleString()}+ Students` },
                                    { icon: BarChart2, label: course.level },
                                    { icon: Clock, label: course.duration },
                                ].map(({ icon: Icon, label }, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.15)', borderRadius: 999, padding: '6px 14px', color: 'white', fontSize: 13, fontWeight: 500 }}>
                                        <Icon style={{ width: 13, height: 13, color: '#7dd3fc' }} /> {label}
                                    </div>
                                ))}
                            </div>

                            {course.title === "Cybersecurity Essentials" && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'white', marginBottom: 20, fontSize: 14 }}>
                                    <FaPhoneAlt style={{ color: '#7dd3fc' }} />
                                    <span style={{ fontWeight: 600 }}>For Tech queries:</span>
                                    <a href="tel:+919731523979" style={{ color: '#7dd3fc', fontWeight: 700 }}>+91 97315 23979</a>
                                </div>
                            )}

                            {/* <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                <img src="https://i.graphicmama.com/uploads/2017/12/5a2658fe73cef-clark-executive.png" alt={course.instructor}
                                    style={{ width: 42, height: 42, borderRadius: '50%', border: '2px solid rgba(255,255,255,.3)', objectFit: 'cover' }} />
                                <div>
                                    <div style={{ fontSize: 11, color: 'rgba(186,230,253,.7)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Created by</div>
                                    <div style={{ fontSize: 14, color: 'white', fontWeight: 700 }}>{course.instructor}</div>
                                </div>
                            </div> */}
                        </div>

                        {/* Right — sticky card */}
                        <div className="cd-hero-right">
                            <div className="cd-sticky-card">
                                <img src={course.image} alt={course.title} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
                                <div style={{ padding: 24 }}>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 18 }}>
                                        <span className="grad-text" style={{ fontSize: '2rem', fontWeight: 900 }}>₹{course.price}</span>
                                        <span style={{ fontSize: 13, color: B.muted }}>(GST inclusive)</span>
                                        {course.originalPrice && <span style={{ fontSize: 14, color: '#94a3b8', textDecoration: 'line-through' }}>₹{course.originalPrice}</span>}
                                    </div>

                                    {isEnrolled ? (
                                        <button className="enroll-btn" disabled style={{ opacity: .7 }}>
                                            <CheckCircle style={{ width: 16, height: 16 }} /> Already Enrolled
                                        </button>
                                    ) : (
                                        <button className="enroll-btn" onClick={handleEnrollment}>
                                            Enroll Now <ArrowRight style={{ width: 16, height: 16 }} />
                                        </button>
                                    )}

                                    <div style={{ marginTop: 20 }}>
                                        <p style={{ fontSize: 11, fontWeight: 700, color: B.muted, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>This course includes</p>
                                        {[
                                            { icon: Play, label: 'Live & Recorded Sessions' },
                                            // { icon:Globe,   label:'Full lifetime access' },
                                            { icon: Shield, label: 'Mobile & Desktop access' },
                                            { icon: Award, label: 'Certificate of completion' },
                                        ].map(({ icon: Icon, label }, i) => (
                                            <div key={i} className="inc-item">
                                                <Icon style={{ width: 15, height: 15, color: B.light, flexShrink: 0 }} />
                                                {label}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════
                2. WHAT YOU'LL LEARN
            ══════════════════════════════════════ */}
                <section style={{ background: '#f8faff', padding: '64px 0' }}>
                    <div className="cd-section">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                            <div style={{ width: 4, height: 30, background: B.grad, borderRadius: 4 }} />
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: B.text }}>What You'll Learn</h2>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 12 }}>
                            {course.topics.slice(0, 8).map((t, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, background: 'white', border: `1.5px solid ${B.border}`, borderRadius: 14, padding: '14px 18px', fontSize: 14, fontWeight: 500, color: B.text }}>
                                    <CheckCircle style={{ width: 16, height: 16, color: B.light, marginTop: 1, flexShrink: 0 }} />
                                    {t}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════
                3. TABS
            ══════════════════════════════════════ */}
                <section style={{ background: 'white', padding: '60px 0' }}>
                    <div className="cd-section">
                        <div style={{ borderBottom: `2px solid ${B.border}`, display: 'flex', marginBottom: 36 }}>
                            {['overview', 'curriculum'].map(tab => (
                                <button key={tab} className={`cd-tab ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
                                    {tab === 'overview'
                                        ? <><BookOpen style={{ width: 14, height: 14 }} />Overview</>
                                        : <><BarChart2 style={{ width: 14, height: 14 }} />Curriculum</>}
                                </button>
                            ))}
                        </div>

                        {activeTab === 'overview' && (
                            <div style={{ width: '100%' }}>

                                {/* ── Description + quick-stats side by side ── */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 28, marginBottom: 40, alignItems: 'start' }}>

                                    {/* Left — description */}
                                    <div style={{ background: 'white', border: `1.5px solid ${B.border}`, borderRadius: 20, padding: '32px 36px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                                            <div style={{ width: 4, height: 22, background: B.grad, borderRadius: 4 }} />
                                            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: B.text }}>Course Description</h3>
                                        </div>
                                        <div style={{ color: B.muted, lineHeight: 1.9, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: course.description }} />
                                    </div>

                                    {/* Right — quick info card */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                        {[
                                            { icon: Clock, label: 'Duration', value: course.duration },
                                            { icon: BarChart2, label: 'Level', value: course.level },
                                            { icon: Star, label: 'Rating', value: `${course.rating || 4.8} / 5` },
                                            { icon: Users, label: 'Students', value: `${(course.enrollmentCount || 0).toLocaleString()}+` },
                                            // { icon:Globe,     label:'Access',     value:'Lifetime' },
                                            { icon: Award, label: 'Certificate', value: 'Included' },
                                        ].map(({ icon: Icon, label, value }, i) => (
                                            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white', border: `1.5px solid ${B.border}`, borderRadius: 14, padding: '13px 18px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                    <div style={{ width: 32, height: 32, borderRadius: 9, background: B.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                        <Icon style={{ width: 15, height: 15, color: B.light }} />
                                                    </div>
                                                    <span style={{ fontSize: 13, fontWeight: 600, color: B.muted }}>{label}</span>
                                                </div>
                                                <span style={{ fontSize: 13, fontWeight: 700, color: B.text }}>{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* ── Benefits — full width grid ── */}
                                {course.benefits?.length > 0 && (
                                    <div style={{ background: `linear-gradient(135deg,#f0f7ff,#e0f2fe)`, border: `1.5px solid ${B.border}`, borderRadius: 22, padding: '36px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                                            <div style={{ width: 4, height: 22, background: B.grad, borderRadius: 4 }} />
                                            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: B.text }}>Course Benefits</h3>
                                            <div style={{ marginLeft: 'auto', background: B.grad, borderRadius: 999, padding: '4px 12px' }}>
                                                <span style={{ color: 'white', fontSize: 12, fontWeight: 700 }}>{course.benefits.length} Benefits</span>
                                            </div>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 12 }}>
                                            {course.benefits.map((b, i) => (
                                                <div key={i} style={{
                                                    display: 'flex', gap: 12, alignItems: 'flex-start',
                                                    background: 'white', borderRadius: 14,
                                                    padding: '14px 18px',
                                                    border: `1.5px solid ${B.border}`,
                                                    boxShadow: '0 2px 12px rgba(14,165,233,.06)',
                                                    transition: 'all .2s',
                                                }}
                                                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(14,165,233,.13)'; e.currentTarget.style.borderColor = B.light; }}
                                                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(14,165,233,.06)'; e.currentTarget.style.borderColor = B.border; }}
                                                >
                                                    <div style={{ width: 28, height: 28, borderRadius: 8, background: B.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                                                        <CheckCircle style={{ width: 14, height: 14, color: 'white' }} />
                                                    </div>
                                                    <span style={{ fontSize: 14, color: B.text, fontWeight: 500, lineHeight: 1.5 }}>{b}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'curriculum' && (
                            <div style={{ width: '100%' }}>
                                {course.curriculum?.length > 0 ? (
                                    <>
                                        {/* ── Stats strip ── */}
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
                                            {[
                                                { icon: BookOpen, label: 'Sections', val: course.curriculum.length },
                                                { icon: Play, label: 'Total Lessons', val: course.curriculum.reduce((a, s) => a + s.lessons.length, 0) },
                                                { icon: Clock, label: 'Duration', val: course.duration },
                                                { icon: BarChart2, label: 'Level', val: course.level },
                                            ].map(({ icon: Icon, label, val }, i) => (
                                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, background: B.bg, border: `1.5px solid ${B.border}`, borderRadius: 12, padding: '10px 18px', flex: '1 1 auto', minWidth: 160 }}>
                                                    <div style={{ width: 34, height: 34, borderRadius: 10, background: B.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                        <Icon style={{ width: 16, height: 16, color: 'white' }} />
                                                    </div>
                                                    <div>
                                                        <div style={{ fontSize: 16, fontWeight: 800, color: B.text, lineHeight: 1 }}>{val}</div>
                                                        <div style={{ fontSize: 11, color: B.muted, fontWeight: 600, marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* ── Full-width accordion list ── */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: `1.5px solid ${B.border}`, borderRadius: 20, overflow: 'hidden', background: 'white' }}>
                                            {course.curriculum.map((sec, si) => (
                                                <div key={si} style={{ borderBottom: si < course.curriculum.length - 1 ? `1px solid ${B.border}` : 'none' }}>

                                                    {/* Section row */}
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 0, background: si % 2 === 0 ? 'white' : B.bg }}>

                                                        {/* Left accent stripe with number */}
                                                        <div style={{ width: 64, minHeight: 56, background: B.grad, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0, gap: 2 }}>
                                                            <span style={{ color: 'rgba(255,255,255,.6)', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>SEC</span>
                                                            <span style={{ color: 'white', fontSize: 18, fontWeight: 900, lineHeight: 1 }}>{String(si + 1).padStart(2, '0')}</span>
                                                        </div>

                                                        {/* Section title + meta */}
                                                        <div style={{ flex: 1, padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                                                            <h4 style={{ fontWeight: 700, fontSize: 15, color: B.text, margin: 0 }}>{sec.title}</h4>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'white', border: `1px solid ${B.border}`, borderRadius: 999, padding: '4px 12px' }}>
                                                                    <Play style={{ width: 11, height: 11, color: B.light }} />
                                                                    <span style={{ fontSize: 12, fontWeight: 600, color: B.muted }}>{sec.lessons.length} lesson{sec.lessons.length !== 1 ? 's' : ''}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Lessons — indented under section */}
                                                    {sec.lessons.map((l, li) => (
                                                        <div key={li} style={{ display: 'flex', alignItems: 'center', background: si % 2 === 0 ? '#fafcff' : '#f5f9ff', borderTop: `1px dashed ${B.border}` }}>
                                                            {/* indent line */}
                                                            <div style={{ width: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', alignSelf: 'stretch', flexShrink: 0, position: 'relative' }}>
                                                                <div style={{ width: 2, height: '100%', background: `linear-gradient(180deg,${B.light}40,transparent)`, position: 'absolute' }} />
                                                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: B.light, zIndex: 1, opacity: .5 }} />
                                                            </div>

                                                            {/* lesson content */}
                                                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 24px 11px 0', gap: 12 }}>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                                    <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'white', border: `1.5px solid ${B.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                                        <Play style={{ width: 10, height: 10, color: B.light, marginLeft: 1 }} />
                                                                    </div>
                                                                    <span style={{ fontSize: 13.5, color: B.text, fontWeight: 500 }}>{l.title}</span>
                                                                </div>
                                                                <span style={{ fontSize: 12, color: B.muted, fontWeight: 600, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
                                                                    <Clock style={{ width: 11, height: 11 }} />{l.duration}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <div style={{ textAlign: 'center', padding: 64, color: B.muted, background: B.bg, borderRadius: 20, border: `1.5px solid ${B.border}` }}>
                                        <div style={{ width: 64, height: 64, borderRadius: 20, background: B.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                                            <BookOpen style={{ width: 28, height: 28, color: 'white' }} />
                                        </div>
                                        <p style={{ fontWeight: 700, color: B.text, fontSize: 16, marginBottom: 6 }}>Curriculum Coming Soon</p>
                                        <p style={{ fontSize: 14 }}>You will be notified with complete details regarding the start of your program.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </section>

                {/* ══════════════════════════════════════
                4. INTERNSHIP LANDING SECTION
            ══════════════════════════════════════ */}
                <section style={{ background: '#eef4ff', padding: '88px 0' }}>
                    <div className="cd-section">

                        {/* ── 4a. Hero Banner ── */}
                        <div style={{ background: 'linear-gradient(135deg,#0c1a3a 0%,#1e3a8a 50%,#075985 100%)', borderRadius: 28, overflow: 'hidden', position: 'relative', marginBottom: 52 }}>
                            {/* dot grid */}
                            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,.05) 1px,transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
                            {/* radial glow */}
                            <div style={{ position: 'absolute', top: 0, right: 0, width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle,rgba(14,165,233,.18),transparent 70%)', transform: 'translate(20%,-20%)', pointerEvents: 'none' }} />

                            <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center', padding: '60px 64px' }}>
                                <div>
                                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.18)', borderRadius: 999, padding: '6px 16px', marginBottom: 20 }}>
                                        <Briefcase style={{ width: 13, height: 13, color: '#7dd3fc' }} />
                                        <span style={{ color: '#bae6fd', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Internship Program</span>
                                    </div>

                                    <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.9rem)', fontWeight: 900, color: 'white', lineHeight: 1.18, marginBottom: 16 }}>
                                        Your Career Starts Here —<br />
                                        <em style={{ fontFamily: 'Lora,serif', fontWeight: 500, fontStyle: 'italic', color: '#7dd3fc' }}>Not After the Course.</em>
                                    </h2>

                                    <p style={{ color: 'rgba(186,230,253,.85)', fontSize: 15, maxWidth: 500, lineHeight: 1.7, marginBottom: 32 }}>
                                        Every student gets our structured internship track — real projects,
                                        real mentors, real opportunities from Day 1.
                                    </p>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                                        <button className="enroll-btn-outline" onClick={handleEnrollment}>
                                            Enroll Now — ₹{course.price} <ArrowRight style={{ width: 16, height: 16 }} />
                                        </button>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            {['#0ea5e9', '#1e3a8a', '#0284c7', '#0369a1'].map((c, i) => (
                                                <div key={i} style={{ width: 32, height: 32, borderRadius: '50%', background: c, border: '2px solid rgba(255,255,255,.25)', marginLeft: i ? -10 : 0 }} />
                                            ))}
                                            <span style={{ color: 'rgba(186,230,253,.75)', fontSize: 13, marginLeft: 10 }}>
                                                +{(course.enrollmentCount || 0).toLocaleString()} enrolled
                                            </span>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 20 }}>
                                        {["GST Inclusive", "Certificate Included"].map(t => (
                                            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(186,230,253,.78)', fontSize: 13 }}>
                                                <CheckCircle style={{ width: 14, height: 14, color: '#7dd3fc' }} /> {t}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* floating image */}
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img
                                        src={codeImg}
                                        alt="Internship Program"
                                        style={{
                                            maxHeight: 260,
                                            objectFit: 'contain',
                                            borderRadius: '16px',   // curve border
                                            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,.35))',
                                            animation: 'float 4s ease-in-out infinite'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* ── 4b. Stats Row ── */}
                        <div className="stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 52 }}>
                            {[
                                { value: course.enrollmentCount || 2180, suffix: '+', label: 'Students Trained', icon: Users },
                                { value: 95, suffix: '%', label: 'Placement Rate', icon: TrendingUp },
                                { value: 50, suffix: '+', label: 'Hiring Partners', icon: Briefcase },
                                { value: 48, suffix: '★', label: 'Avg Rating', icon: Star },
                            ].map(({ value, suffix, label, icon: Icon }, i) => (
                                <div key={i} className="stat-card">
                                    <Icon style={{ width: 20, height: 20, color: B.light, margin: '0 auto 10px', display: 'block' }} />
                                    <span className="grad-text" style={{ fontSize: '2rem', fontWeight: 900, display: 'block', marginBottom: 4 }}>
                                        <Counter target={value} suffix={suffix} />
                                    </span>
                                    <span style={{ fontSize: 11, fontWeight: 700, color: B.muted, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{label}</span>
                                </div>
                            ))}
                        </div>

                        {/* ── 4c. What You Get — 6 cards ── */}
                        <div style={{ marginBottom: 52 }}>
                            <div style={{ textAlign: 'center', marginBottom: 40 }}>
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#dbeafe', borderRadius: 999, padding: '6px 16px', marginBottom: 14 }}>
                                    <Sparkles style={{ width: 13, height: 13, color: B.mid }} />
                                    <span style={{ color: B.mid, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Program Benefits</span>
                                </div>
                                <h2 style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 800, color: B.text }}>
                                    Everything You Need to <span className="grad-text">Get Hired</span>
                                </h2>
                            </div>
                            <div className="feat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
                                {features.map((f, i) => (
                                    <div key={i} className="feat-card">
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                                            <div style={{ width: 48, height: 48, borderRadius: 14, background: B.grad135, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 6px 18px rgba(14,165,233,.22)' }}>
                                                <f.icon style={{ width: 22, height: 22, color: 'white' }} />
                                            </div>
                                            <div>
                                                <h3 style={{ fontWeight: 700, fontSize: 15, color: B.text, marginBottom: 6 }}>{f.title}</h3>
                                                <p style={{ fontSize: 13, color: B.muted, lineHeight: 1.6 }}>{f.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── 4d. Timeline + Career Roles ── */}
                        <div className="intern-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 52 }}>

                            {/* Timeline */}
                            <div style={{ background: 'white', borderRadius: 22, border: `1.5px solid ${B.border}`, padding: '36px 36px 32px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
                                    <div style={{ width: 4, height: 24, background: B.grad, borderRadius: 4 }} />
                                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: B.text }}>Your Internship Journey</h3>
                                </div>
                                 {[
      {
        step: "01",
        title: "Enroll & Onboard",
        desc: "Access the full curriculum and internship project dashboard instantly."
      },
      {
        step: "02",
        title: "Learn & Build",
        desc: "Complete modules and build real-world projects with mentor guidance."
      },
      {
        step: "03",
        title: "Mentor Reviews",
        desc: "Weekly mentor sessions to review progress and improve your project."
      },
      {
        step: "04",
        title: "Project Demo & Placement",
        desc: "Present your project and get referred to hiring partners."
      }
    ].map((item, i, arr) => (
                                    <div key={i}>
                                        <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                                            <div className="tl-dot">{item.step}</div>
                                            <div style={{ paddingTop: 6 }}>
                                                <p style={{ fontWeight: 700, fontSize: 14, color: B.text, marginBottom: 3 }}>{item.title}</p>
                                                <p style={{ fontSize: 13, color: B.muted, lineHeight: 1.6 }}>{item.desc}</p>
                                            </div>
                                        </div>
                                        {i < arr.length - 1 && <div className="tl-line" />}
                                    </div>
                                ))}
                            </div>

                            {/* Career Roles */}
                            <div style={{ background: B.grad135, borderRadius: 22, padding: '36px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', top: 0, right: 0, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,255,255,.08),transparent)', transform: 'translate(30%,-30%)', pointerEvents: 'none' }} />

                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.2)', borderRadius: 999, padding: '6px 14px', marginBottom: 20, alignSelf: 'flex-start' }}>
                                    <Trophy style={{ width: 13, height: 13, color: '#fde68a' }} />
                                    <span style={{ color: 'white', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Career Paths</span>
                                </div>

                                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', marginBottom: 8, lineHeight: 1.2 }}>
                                    Roles You'll Be<br />Qualified For
                                </h3>
                                <p style={{ color: 'rgba(186,230,253,.8)', fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>
                                    Our hiring partners actively look for graduates of this program.
                                </p>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 'auto' }}>
                                    {roles.map((r, i) => (
                                        <span key={i} className="role-tag">{r}</span>
                                    ))}
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 28 }}>
                                    {[{ val: '95%', label: 'Placement Rate' }, { val: '50+', label: 'Hiring Partners' }].map(({ val, label }, i) => (
                                        <div key={i} style={{ background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.15)', borderRadius: 14, padding: '14px 16px', textAlign: 'center' }}>
                                            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'white' }}>{val}</div>
                                            <div style={{ fontSize: 11, color: 'rgba(186,230,253,.7)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ── 4e. FAQ ── */}
                        <div style={{ marginBottom: 52 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                                <div style={{ width: 4, height: 26, background: B.grad, borderRadius: 4 }} />
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: B.text }}>Frequently Asked Questions</h3>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {faqs.map((f, i) => (
                                    <div key={i} className="faq-item">
                                        <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                            {f.q}
                                            {openFaq === i
                                                ? <ChevronUp style={{ width: 18, height: 18, color: B.light, flexShrink: 0 }} />
                                                : <ChevronDown style={{ width: 18, height: 18, color: B.muted, flexShrink: 0 }} />}
                                        </button>
                                        {openFaq === i && <div className="faq-a">{f.a}</div>}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── 4f. Final CTA Strip ── */}
                        <div style={{ background: B.grad, borderRadius: 24, padding: '48px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
                            <div>
                                <p style={{ color: 'rgba(186,230,253,.8)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                                    Limited Seats — Next Batch Starting Soon
                                </p>
                                <h3 style={{ color: 'white', fontSize: 'clamp(1.3rem,2.5vw,1.9rem)', fontWeight: 900, lineHeight: 1.2 }}>
                                    Ready to Launch Your Career?
                                </h3>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
                                <button className="enroll-btn-outline" onClick={handleEnrollment}>
                                    Enroll Now — ₹{course.price} <ArrowRight style={{ width: 16, height: 16 }} />
                                </button>
                                <span style={{ color: 'rgba(186,230,253,.65)', fontSize: 12 }}>
                                    Join {(course.enrollmentCount || 0).toLocaleString()}+ students already enrolled
                                </span>
                            </div>
                        </div>

                    </div>
                </section>

                {/* ══════════════════════════════════════
                5. COURSE FAQs
            ══════════════════════════════════════ */}
                {/* <section style={{ background: 'white', padding: '60px 0' }}>
                    <div className="cd-section">
                        <CourseFAQs />
                    </div>
                </section> */}

            </div>

            {showInquiryModal && course && (
                <InquiryModal
                    isOpen={showInquiryModal}
                    onClose={() => setShowInquiryModal(false)}
                    course={course}
                    onEnrollmentSuccess={handleEnrollmentSuccess}
                />
            )}
        </>
    );
};

export default CourseDetails;