 "use client";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
export default function Register() {
 const [name,setName]=useState(""); const [username,setUsername]=useState(""); const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [msg,setMsg]=useState(""); const [busy,setBusy]=useState(false);
 async function submit(e:React.FormEvent){e.preventDefault();setBusy(true);setMsg("");
  try { const supabase=createClient(); const {data,error}=await supabase.auth.signUp({email,password,options:{data:{full_name:name,username:username.toLowerCase()}}}); if(error)throw error;
   setMsg("Account created. Check your email to confirm your account, then log in.");
  }catch(err){setMsg(err instanceof Error?err.message:"Registration failed. Check your Supabase setup.");}finally{setBusy(false);}
 }
 return <div className="container"><div style={{paddingTop:24}}><Link className="brand" href="/"><span className="brandmark">U</span>UnityHub BD</Link></div><form className="panel" onSubmit={submit}><span className="eyebrow">START YOUR JOURNEY</span><h1 style={{fontSize:30,letterSpacing:-1}}>Create your account</h1><p className="muted small">Build a public identity that showcases your work.</p>
 <div className="field"><label>Full name</label><input required value={name} onChange={e=>setName(e.target.value)} placeholder="Your name"/></div>
 <div className="field"><label>Username</label><input required minLength={3} pattern="[A-Za-z0-9_-]+" value={username} onChange={e=>setUsername(e.target.value)} placeholder="yourname"/><span className="muted small">Your public URL: /u/{username||"username"}</span></div>
 <div className="field"><label>Email</label><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></div>
 <div className="field"><label>Password (minimum 8 characters)</label><input required minLength={8} type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Create a password"/></div>
 <button className="btn" disabled={busy} style={{width:"100%"}}>{busy?"Creating account…":"Create account ↗"}</button>{msg&&<p className="small" role="status">{msg}</p>}<p className="small muted">Already registered? <Link href="/login" style={{color:"#635bff",fontWeight:700}}>Log in</Link></p></form></div>;
}
