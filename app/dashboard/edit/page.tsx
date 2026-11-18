 "use client";
import Link from "next/link";
import { useEffect,useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
export default function EditProfile(){const [profile,setProfile]=useState<any>(null);const [msg,setMsg]=useState("");const [busy,setBusy]=useState(false);const router=useRouter();
 useEffect(()=>{(async()=>{const s=createClient();const {data:{user}}=await s.auth.getUser();if(!user){router.push("/login");return;}const {data}=await s.from("profiles").select("*").eq("id",user.id).single();setProfile(data);})();},[router]);
 function change(k:string,v:string){setProfile((p:any)=>({...p,[k]:v}));}
 async function save(e:React.FormEvent){e.preventDefault();setBusy(true);setMsg("");const s=createClient();const {data:{user}}=await s.auth.getUser();if(!user)return;const {error}=await s.from("profiles").update({full_name:profile.full_name,bio:profile.bio,skills:profile.skills_text.split(",").map((x:string)=>x.trim()).filter(Boolean),website:profile.website,github:profile.github,linkedin:profile.linkedin,location:profile.location,role:profile.role}).eq("id",user.id);setMsg(error?error.message:"Profile saved successfully.");setBusy(false);}
 if(!profile)return <div className="container" style={{padding:60}}>Loading your profile…</div>;
 return <div className="container"><div style={{padding:"28px 0"}}><Link href="/dashboard" className="muted">← Dashboard</Link></div><form className="panel" style={{maxWidth:680,margin:"20px auto"}} onSubmit={save}><span className="eyebrow">PROFILE EDITOR</span><h1 style={{fontSize:30}}>Edit your portfolio</h1>
 {([["full_name","Full name"],["role","Professional title"],["location","Location"],["website","Website URL"],["github","GitHub URL"],["linkedin","LinkedIn URL"]] as string[][]).map(([k,l])=><div className="field" key={k}><label>{l}</label><input value={profile[k]||""} onChange={e=>change(k,e.target.value)}/></div>)}
 <div className="field"><label>About you</label><textarea rows={5} value={profile.bio||""} onChange={e=>change("bio",e.target.value)}/></div><div className="field"><label>Skills (comma separated)</label><input value={profile.skills_text??(profile.skills||[]).join(", ")} onChange={e=>setProfile((p:any)=>({...p,skills_text:e.target.value}))} placeholder="React, UI Design, Python"/></div>
 <button className="btn" disabled={busy}>{busy?"Saving…":"Save changes"}</button>{msg&&<p className="small">{msg}</p>}</form></div>;
}
