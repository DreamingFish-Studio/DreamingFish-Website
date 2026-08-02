const header = document.querySelector("[data-header]");
const reveals = document.querySelectorAll(".reveal");
const statusLabel = document.querySelector("[data-status-label]");

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 20);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 },
);

reveals.forEach((element) => revealObserver.observe(element));

async function hydrateServerStatus() {
  const endpoint = window.DREAMINGFISH_STATUS_ENDPOINT;

  if (!endpoint || !statusLabel) {
    return;
  }

  try {
    const response = await fetch(endpoint, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Status request failed: ${response.status}`);
    }

    const status = await response.json();
    const online = Boolean(status.online);
    const players = Number(status.players?.online ?? status.playersOnline ?? 0);

    statusLabel.textContent = online
      ? `服务器在线 · ${players} 位玩家`
      : "服务器维护中";
  } catch {
    statusLabel.textContent = "社区长期开放";
  }
}

hydrateServerStatus();
