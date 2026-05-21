export const loadGSAP = () => {
  return new Promise((resolve) => {
    if (window.gsap && window.ScrollTrigger) {
      resolve();
      return;
    }
    const gsapScript = document.createElement("script");
    gsapScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
    gsapScript.onload = () => {
      const stScript = document.createElement("script");
      stScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js";
      stScript.onload = () => {
        window.gsap.registerPlugin(window.ScrollTrigger);
        resolve();
      };
      document.head.appendChild(stScript);
    };
    document.head.appendChild(gsapScript);
  });
};

export const loadFonts = () => {
  if (document.getElementById("trilha-fonts")) return;
  const link = document.createElement("link");
  link.id = "trilha-fonts";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap";
  document.head.appendChild(link);
};
