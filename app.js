/*
  CONFIGURAÇÃO: coloque aqui a URL e a chave pública (anon/publishable) do seu projeto Supabase.
  Nunca coloque a chave service_role no navegador.
*/
const SUPABASE_URL = "";
const SUPABASE_ANON_KEY = "";
const $ = (id) => document.getElementById(id);
const demo = {
  site_name:"nosso canto", headline:"gente que é casa.", subtitle:"um cantinho nosso na internet.",
  footer_text:"feito entre amigos ♡", background_url:"",
  music_url:"",
  profiles:[
    {name:"amigo 01",handle:"@discord",avatar:"",discord_url:"https://discord.com/users/"},
    {name:"amigo 02",handle:"@discord",avatar:"",discord_url:"https://discord.com/users/"},
    {name:"amigo 03",handle:"@discord",avatar:"",discord_url:"https://discord.com/users/"},
    {name:"amigo 04",handle:"@discord",avatar:"",discord_url:"https://discord.com/users/"}
  ]
};
let supabase = null, config = {...demo};
if (SUPABASE_URL && SUPABASE_ANON_KEY && window.supabase) supabase = window.supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY);
function escapeHTML(v=""){return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function avatarFallback(name){return "data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect width="120" height="120" fill="#292c32"/><text x="60" y="73" font-size="48" text-anchor="middle" fill="#c8ff68" font-family="Arial">${(name||"?").trim().charAt(0).toUpperCase()}</text></svg>`)}
function render(){
  $("siteName").textContent=config.site_name||demo.site_name;$("headline").textContent=config.headline||demo.headline;
  $("subtitle").textContent=config.subtitle||"";$("footerText").textContent=config.footer_text||"";
  const v=$("bgVideo"); if(config.background_url){v.src=config.background_url;v.style.display="block"}else{v.removeAttribute("src");v.style.display="none"}
  const m=$("bgMusic");if(config.music_url && m.src!==config.music_url)m.src=config.music_url;
  $("profiles").innerHTML=(config.profiles||[]).map((p,i)=>`<a class="profile" style="--i:${i}" href="${escapeHTML(p.discord_url||"#")}" target="_blank" rel="noopener noreferrer"><span class="avatar-wrap"><img class="avatar" src="${escapeHTML(p.avatar||avatarFallback(p.name))}" onerror="this.onerror=null;this.src=avatarFallback('${escapeHTML(p.name||"?").replace(/'/g,"&#39;")}')" alt=""></span><span class="name">${escapeHTML(p.name)}</span><span class="handle">${escapeHTML(p.handle||"amigo")}</span><span class="discord"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.7 5.3A18.3 18.3 0 0 0 15.2 4l-.6 1.2a16.8 16.8 0 0 0-5.2 0L8.8 4a18.3 18.3 0 0 0-4.5 1.3C1.5 9.5.7 13.6 1.1 17.7a18.4 18.4 0 0 0 5.5 2.8l1.2-2a11.8 11.8 0 0 1-1.9-.9l.5-.4a13 13 0 0 0 11.2 0l.5.4a11.8 11.8 0 0 1-1.9.9l1.2 2a18.4 18.4 0 0 0 5.5-2.8c.5-4.8-.8-8.9-3.2-12.4ZM8.7 14.7c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm6.6 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z"/></svg> Discord</span></a>`).join("");
}
async function loadConfig(){
 if(!supabase){render();$("views").textContent=String(Number(localStorage.getItem("friendPageViews")||0)+1);localStorage.setItem("friendPageViews", $("views").textContent);return}
 try{const {data,error}=await supabase.from("site_settings").select("config").eq("id",1).single();if(!error&&data?.config)config={...demo,...data.config};render();
 const {error:countErr}=await supabase.rpc("increment_page_views");if(!countErr){const {data:counts}=await supabase.from("page_stats").select("views").eq("id",1).single();if(counts)$("views").textContent=counts.views.toLocaleString("pt-BR")}else $("views").textContent="—";
 }catch(e){render();$("views").textContent="—"}
}
$("soundBtn").addEventListener("click",async()=>{const m=$("bgMusic");if(!config.music_url){toast("A música ainda não foi configurada.");return}try{if(m.paused){await m.play();$("soundBtn").textContent="♫";$("soundBtn").title="Pausar música"}else{m.pause();$("soundBtn").textContent="♪";$("soundBtn").title="Tocar música"}}catch(e){toast("Não foi possível tocar esse arquivo. Tente outro link.")}});
function toast(s){$("toast").textContent=s;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),2600)}
loadConfig();
