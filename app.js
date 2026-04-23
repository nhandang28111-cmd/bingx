// ===== LOADER =====
window.addEventListener("load", () => {
  const loader = document.getElementById("siteLoader");
  if (loader) {
    setTimeout(() => {
      loader.classList.add("hide");
    }, 600);
  }

  initReveal();
});

// ===== MOBILE MENU =====
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
    });
  });
}

// ===== TABS =====
const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");

function openTab(tabId) {
  tabButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === tabId);
  });

  tabPanels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === tabId);
  });

  // re-run reveal inside opened tab
  setTimeout(initReveal, 50);
}

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    openTab(btn.dataset.tab);
  });
});

// ===== COPY CODE =====
const copyBtn = document.getElementById("copyBtn");
const inviteCode = document.getElementById("inviteCode");
const toast = document.getElementById("toast");

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}

async function copyCode() {
  const code = inviteCode ? inviteCode.textContent.trim() : "2KA3TU";

  try {
    await navigator.clipboard.writeText(code);
    showToast(`Đã copy mã ${code}`);
  } catch (err) {
    const textArea = document.createElement("textarea");
    textArea.value = code;
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand("copy");
      showToast(`Đã copy mã ${code}`);
    } catch (fallbackError) {
      showToast("Không copy được, hãy copy thủ công");
    }

    document.body.removeChild(textArea);
  }
}

if (copyBtn) {
  copyBtn.addEventListener("click", copyCode);
}

// ===== FAQ =====
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  if (!question || !answer) return;

  question.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");

    faqItems.forEach((otherItem) => {
      otherItem.classList.remove("open");
      const otherAnswer = otherItem.querySelector(".faq-answer");
      if (otherAnswer) {
        otherAnswer.style.maxHeight = null;
      }
    });

    if (!isOpen) {
      item.classList.add("open");
      answer.style.maxHeight = `${answer.scrollHeight}px`;
    }
  });
});

// ===== REVEAL LIKE AOS =====
function initReveal() {
  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealElements.forEach((el) => {
    if (!el.classList.contains("show")) {
      observer.observe(el);
    }
  });
}