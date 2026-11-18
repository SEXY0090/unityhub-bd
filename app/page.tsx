import Link from "next/link";
import Header from "@/components/Header";
const features = [
  ["✦","Personal developer identity","A clean public profile with a unique username and developer ID that represents your work."],
  ["▣","Portfolio showcase","Present projects, skills, experience and links in one professional public page."],
  ["✓","GitHub-backed verification","A trusted verification registry controls who receives the official UnityHub BD badge."],
  ["⌘","Your own dashboard","Create and update your profile after signing in. Your portfolio stays yours."],
  ["◎","Public profile URL","Share a memorable profile link with recruiters, clients and collaborators."],
  ["♧","Built to grow","A scalable foundation for a developer community, with admin-managed verification."]
];
export default function Home() {
  return <><Header/><main>
    <section className="hero"><div className="container">
      <span className="eyebrow">✦ THE DEVELOPER IDENTITY PLATFORM</span>
      <h1>Your work deserves<br/>a <span className="gradient">strong identity.</span></h1>
      <p className="lead">UnityHub BD helps developers build a professional public portfolio, showcase real work and earn trusted verification — all in one place.</p>
      <div className="hero-actions"><Link className="btn" href="/register">Create your portfolio ↗</Link><Link className="btn secondary" href="/login">Explore your dashboard</Link></div>
      <div className="metrics"><div className="metric"><strong>01</strong><span>Your unique developer identity</span></div><div className="metric"><strong>100%</strong><span>Public portfolio ownership</span></div><div className="metric"><strong>✓</strong><span>Registry-based verification</span></div></div>
    </div></section>
    <section className="section" id="features"><div className="container"><div className="section-head"><span className="eyebrow">WHY UNITYHUB BD</span><h2>More than a portfolio.<br/><span className="gradient">A professional identity.</span></h2><p>Everything you need to introduce your skills, share your work and build trust with the people who matter.</p></div>
      <div className="cards">{features.map(([icon,title,desc])=><article className="feature" key={title}><div className="feature-icon">{icon}</div><h3>{title}</h3><p>{desc}</p></article>)}</div>
    </div></section>
    <section className="section" id="how" style={{paddingTop:10}}><div className="container"><div className="section-head"><span className="eyebrow">SIMPLE PROCESS</span><h2>From sign-up to standout.</h2><p>Create an account, build your profile, then share your public portfolio link anywhere.</p></div><div className="cards">
      {["Create an account","Build your portfolio","Share your identity"].map((t,i)=><div className="feature" key={t}><div className="feature-icon">0{i+1}</div><h3>{t}</h3><p>{["Register with your email and choose a unique username.","Add your bio, skills, projects and professional links.","Your public profile is ready to share with the world."][i]}</p></div>)}
    </div></div></section>
    <section className="section" id="verification"><div className="container"><div className="cta"><div><span className="eyebrow">TRUSTED BY DESIGN</span><h2 style={{fontSize:32,margin:"18px 0 8px"}}>Verification means something.</h2><p>UnityHub BD checks a private-to-the-platform trusted GitHub registry. Users cannot award themselves a verified badge. Only an approved registry record can activate it.</p></div><Link className="btn" href="/register">Get your identity ↗</Link></div></div></section>
  </main><footer className="footer"><div className="container" style={{display:"flex",justifyContent:"space-between",gap:15,flexWrap:"wrap"}}><span>© {new Date().getFullYear()} UnityHub BD. Built for developers.</span><span>Professional identity. Real work. Trusted verification.</span></div></footer></>;
}
