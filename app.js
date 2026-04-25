window.addEventListener("load", () => {
  const loader = document.getElementById("siteLoader");
  if (loader) setTimeout(() => loader.classList.add("hide"), 450);
  initReveal();
});

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => mobileMenu.classList.toggle("open"));
  mobileMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => mobileMenu.classList.remove("open")));
}

document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const wrap = btn.closest(".main-panel, .xm-tabs-section, .tab-section, body");
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
    const panel = document.getElementById(btn.dataset.tab);
    if (panel) panel.classList.add("active");
    setTimeout(initReveal, 50);
  });
});

const copyBtn = document.getElementById("copyBtn");
const inviteCode = document.getElementById("inviteCode");
const toast = document.getElementById("toast");
function showToast(msg){
  if(!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(()=>toast.classList.remove("show"),1800);
}
if(copyBtn){
  copyBtn.addEventListener("click", async ()=>{
    const code = inviteCode ? inviteCode.textContent.trim() : "";
    try{ await navigator.clipboard.writeText(code); showToast("Đã copy mã " + code); }
    catch(e){ showToast("Hãy copy thủ công: " + code); }
  });
}

document.querySelectorAll(".faq-item").forEach(item => {
  const q = item.querySelector(".faq-question");
  const ans = item.querySelector(".faq-answer");
  if(!q || !ans) return;
  q.addEventListener("click", () => {
    const open = item.classList.contains("open");
    document.querySelectorAll(".faq-item").forEach(i => {
      i.classList.remove("open");
      const a = i.querySelector(".faq-answer");
      if(a) a.style.maxHeight = null;
    });
    if(!open){
      item.classList.add("open");
      ans.style.maxHeight = ans.scrollHeight + "px";
    }
  });
});

function initReveal(){
  const els = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:.12, rootMargin:"0px 0px -30px 0px"});
  els.forEach(el => !el.classList.contains("show") && observer.observe(el));
}
