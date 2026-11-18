import Link from "next/link";
export default function Header() {
  return <header className="container nav">
    <Link className="brand" href="/"><span className="brandmark">U</span>UnityHub <span style={{color:"#635bff",marginLeft:-8}}>BD</span></Link>
    <nav className="navlinks"><a href="/#features">Features</a><a href="/#how">How it works</a><a href="/#verification">Verification</a></nav>
    <div style={{display:"flex",gap:9}}><Link className="btn secondary" href="/login">Log in</Link><Link className="btn" href="/register">Get started ↗</Link></div>
  </header>;
}
