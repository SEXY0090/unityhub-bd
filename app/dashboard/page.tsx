import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getVerification } from "@/lib/verification";
export default async function Dashboard(){const supabase=await createClient();const {data:{user}}=await supabase.auth.getUser();if(!user)redirect("/login");
 const {data:profile}=await supabase.from("profiles").select("*").eq("id",user.id).single();if(!profile)redirect("/register");
 const verification=await getVerification(profile.username);
 return <div className="container" style={{padding:"35px 0"}}><header className="nav"><Link className="brand" href="/"><span className="brandmark">U</span>UnityHub BD</Link><form action="/auth/signout" method="post"><button className="btn secondary">Sign out</button></form></header>
 <div style={{margin:"45px 0 25px"}}><span className="eyebrow">YOUR WORKSPACE</span><h1 style={{fontSize:36,letterSpacing:-1}}>Welcome, {profile.full_name}</h1><p className="muted">Manage your public developer identity.</p></div>
 <div className="profile-top"><div className="avatar">{profile.full_name?.[0]?.toUpperCase()||"U"}</div><div style={{flex:1}}><h2 style={{margin:"0 0 7px"}}>{profile.full_name}</h2><p className="muted" style={{margin:0}}>@{profile.username} · {profile.developer_id||"Developer ID pending"}</p><div style={{marginTop:12}}>{verification?<span className="pill">✓ UnityHub Verified</span>:<span className="small muted">Verification not active</span>}</div></div><Link className="btn" href="/dashboard/edit">Edit profile</Link></div>
 <div className="cards" style={{marginTop:20}}><div className="feature"><h3>Public portfolio</h3><p className="small muted">Your public profile is available at:</p><Link href={`/u/${profile.username}`} style={{color:"#635bff",fontWeight:700}}>/u/{profile.username} ↗</Link></div><div className="feature"><h3>Verification status</h3><p>{verification?"Your profile is listed in the trusted registry.":"Your account is not currently listed in the trusted GitHub registry."}</p></div><div className="feature"><h3>Developer identity</h3><p>{profile.developer_id||"Your Developer ID will be assigned by the platform administrator."}</p></div></div>
 </div>;
}
