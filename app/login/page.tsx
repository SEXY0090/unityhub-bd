 "use client";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
export default function Login(){const [email,setEmail]=useState("");const [password,setPassword]=useState("");const [msg,setMsg]=useState("");const [busy,setBusy]=useState(false);const router=useRouter();
 async function submit(e:React.FormEvent){e.preventDefault();setBusy(true);setMsg("");try{const {error}=await createClient().auth.signInWithPassword({email,password});if(error)throw error;router.push("/dashboard");router.refresh();}catch(err){setMsg(err instanceof Error?err.message:"Login failed.");}finally{setBusy(false);}}
 return <div className="container"><div style={{paddingTop:24}}><Link className="brand" href="/"><span className="brandmark">U</span>UnityHub BD</Link></div><form className="panel" onSubmit={submit}><span className="eyebrow">WELCOME BACK</span><h1 style={{fontSize:30}}>Log in</h1><p className="muted small">Continue building your developer identity.</p><div className="field"><label>Email</label><input type="email" required value={email} onChange={e=>setEmail(e.target.value)}/></div><div className="field"><label>Password</label><input type="password" required value={password} onChange={e=>setPassword(e.target.value)}/></div><button className="btn" disabled={busy} style={{width:"100%"}}>{busy?"Signing in…":"Log in ↗"}</button>{msg&&<p className="small">{msg}</p>}<p className="small muted">New here? <Link href="/register" style={{color:"#635bff",fontWeight:700}}>Create an account</Link></p></form></div>;
}
