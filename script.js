// Mark that JS is running (the reveal effect only applies when it is,
// so content is never hidden for anyone with scripts disabled).
document.documentElement.classList.add("js");

// Keep the footer year current.
document.getElementById("year").textContent = new Date().getFullYear();

// Gently fade sections and entries in as they enter the viewport.
const revealed = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (items) => {
      for (const item of items) {
        if (item.isIntersecting) {
          item.target.classList.add("is-visible");
          io.unobserve(item.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
  );
  revealed.forEach((el) => io.observe(el));
} else {
  revealed.forEach((el) => el.classList.add("is-visible"));
}

// Highlight the nav link for the section currently in view.
const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function updateNav() {
  const fromTop = window.scrollY + 140;
  let current = null;
  for (const section of sections) {
    if (section.offsetTop <= fromTop) current = section;
  }
  for (const link of navLinks) {
    link.classList.toggle(
      "active",
      current !== null && link.getAttribute("href") === "#" + current.id
    );
  }
}
document.addEventListener("scroll", updateNav, { passive: true });
updateNav();
