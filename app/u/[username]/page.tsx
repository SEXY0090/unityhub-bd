import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getVerification } from "@/lib/verification";
export const revalidate=0;
export default async function PublicPortfolio({params}:{params:Promise<{username:string}>}){const {username}=await params;if(!/^[a-zA-Z0-9_-]{3,30}$/.test(username))notFound();const supabase=await createClient();const {data:p}=await supabase.from("profiles").select("*").ilike("username",username).single();if(!p)notFound();const verified=await getVerification(p.username);
 return <div className="container" style={{padding:"28px 0 70px"}}><header className="nav"><Link className="brand" href="/"><span className="brandmark">U</span>UnityHub BD</Link><Link className="btn secondary" href="/register">Create your portfolio</Link></header>
 <div style={{marginTop:42}} className="profile-top"><div className="avatar">{p.full_name?.[0]?.toUpperCase()||"U"}</div><div style={{flex:1}}><div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}><h1 style={{margin:0,fontSize:30}}>{p.full_name}</h1>{verified&&<span className="pill">✓ Verified developer</span>}</div><p className="muted">@{p.username} · {p.developer_id||"UnityHub BD Developer"}</p><p style={{marginBottom:0}}>{p.role||"Developer"}{p.location?` · ${p.location}`:""}</p></div></div>
 {p.bio&&<section className="section" style={{paddingBottom:20}}><h2>About</h2><p className="muted" style={{lineHeight:1.8,maxWidth:800}}>{p.bio}</p></section>}
 <section className="section" style={{paddingTop:20}}><h2>Skills & expertise</h2><div style={{display:"flex",gap:9,flexWrap:"wrap",marginTop:18}}>{(p.skills||[]).map((s:string)=><span key={s} className="eyebrow">{s}</span>)}</div></section>
 <section className="section" style={{paddingTop:10}}><h2>Connect</h2><div style={{display:"flex",gap:12,flexWrap:"wrap",marginTop:16}}>{p.website&&<a className="btn secondary" href={p.website} target="_blank" rel="noreferrer">Website ↗</a>}{p.github&&<a className="btn secondary" href={p.github} target="_blank" rel="noreferrer">GitHub ↗</a>}{p.linkedin&&<a className="btn secondary" href={p.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>}</div></section>
 <footer className="footer">Public developer portfolio · UnityHub BD</footer></div>;
}
