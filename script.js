// js/main.js

// Declare AOS variable
const AOS = window.AOS

// Initialize AOS
AOS.init({
  duration: 900,
  once: true,
  offset: 80,
  easing: "ease-out-cubic",
})

// Theme Toggle
const themeToggle = document.getElementById("theme-toggle")
const htmlElement = document.documentElement
const themeIcon = themeToggle.querySelector("i")

themeToggle.addEventListener("click", () => {
  if (htmlElement.getAttribute("data-bs-theme") === "light") {
    htmlElement.setAttribute("data-bs-theme", "dark")
    themeIcon.classList.remove("bi-moon-fill")
    themeIcon.classList.add("bi-sun-fill")
  } else {
    htmlElement.setAttribute("data-bs-theme", "light")
    themeIcon.classList.remove("bi-sun-fill")
    themeIcon.classList.add("bi-moon-fill")
  }
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    if (targetId === "#") return

    const targetElement = document.querySelector(targetId)
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      })
    }
  })
})

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.classList.add("navbar-scrolled")
  } else {
    navbar.classList.remove("navbar-scrolled")
  }
})

// Back to top button
const backToTopButton = document.querySelector(".back-to-top")

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add("show")
  } else {
    backToTopButton.classList.remove("show")
  }
})

backToTopButton.addEventListener("click", (e) => {
  e.preventDefault()
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})
;(function typingEffect() {
  const el = document.querySelector("#home h2")
  if (!el) return
  const roles = ["Full Stack Developer", "Frontend Enthusiast", "UI/UX Oriented"]
  let r = 0,
    i = 0,
    deleting = false

  function tick() {
    const curr = roles[r]
    if (!deleting) {
      el.textContent = curr.slice(0, i + 1)
      i++
      if (i === curr.length) {
        deleting = true
        setTimeout(tick, 1200)
        return
      }
    } else {
      el.textContent = curr.slice(0, i - 1)
      i--
      if (i === 0) {
        deleting = false
        r = (r + 1) % roles.length
      }
    }
    setTimeout(tick, deleting ? 40 : 70)
  }
  tick()
})()
;(function heroParallax() {
  const imgWrap = document.querySelector(".hero-img-container")
  if (!imgWrap) return
  imgWrap.addEventListener("mousemove", (e) => {
    const rect = imgWrap.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    const img = imgWrap.querySelector(".hero-img")
    if (img) {
      img.style.transform = `translate(${x * 8}px, ${y * 8}px) scale(1.01)`
    }
  })
  imgWrap.addEventListener("mouseleave", () => {
    const img = imgWrap.querySelector(".hero-img")
    if (img) img.style.transform = "translate(0,0) scale(1)"
  })
})()
;(function scrollProgress() {
  const bar = document.getElementById("scroll-progress")
  if (!bar) return
  const onScroll = () => {
    const scrollTop = window.scrollY
    const docH = document.documentElement.scrollHeight - window.innerHeight
    const progress = docH > 0 ? (scrollTop / docH) * 100 : 0
    bar.style.width = progress + "%"
  }
  window.addEventListener("scroll", onScroll, { passive: true })
  onScroll()
})()
;(function skillsStagger() {
  const badges = document.querySelectorAll("#skills .reveal-skill")
  if (!badges.length) return

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          badges.forEach((b, idx) => {
            setTimeout(() => b.classList.add("show"), idx * 50)
          })
          io.disconnect()
        }
      })
    },
    { threshold: 0.25 },
  )

  io.observe(document.querySelector("#skills"))
})()
;(function timelineAnimate() {
  const items = document.querySelectorAll(".timeline-item")
  if (!items.length) return

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = Number.parseInt(entry.target.getAttribute("data-delay") || "0", 10)
          setTimeout(() => {
            entry.target.querySelector(".timeline-content")?.classList.add("show")
            entry.target.classList.add("visible")
          }, delay)
        }
      })
    },
    { threshold: 0.2 },
  )

  items.forEach((i) => {
    const content = i.querySelector(".timeline-content")
    if (content) {
      content.style.opacity = "0"
      content.style.transform = "translateY(8px)"
      content.style.transition = "opacity .4s ease, transform .4s ease"
    }
    io.observe(i)
  })

  // apply show class via CSS inline for smoothness
  const style = document.createElement("style")
  style.textContent = `
    .timeline-item.visible .timeline-content {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `
  document.head.appendChild(style)
})()

// Tidak perlu JS tambahan, namun kita jaga fokus saat modal terbuka untuk aksesibilitas.
;(function modalFocusAid() {
  const modals = document.querySelectorAll(".modal")
  modals.forEach((m) => {
    m.addEventListener("shown.bs.modal", () => {
      const focusable = m.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
      if (focusable) focusable.focus()
    })
  })
})()
;(function cardTiltGlow() {
  const cards = document.querySelectorAll(".portfolio-card")
  if (!cards.length) return

  const style = document.createElement("style")
  style.textContent = `
    .portfolio-card { transform-style: preserve-3d; transition: transform .18s ease, box-shadow .18s ease; }
    .portfolio-card:hover { box-shadow: 0 12px 40px rgba(0,0,0,.15); }
    .portfolio-card .glare {
      position: absolute; inset: 0; pointer-events: none; border-radius: inherit;
      background: radial-gradient(600px circle at 50% 50%, rgba(255,255,255,.18), transparent 40%);
      opacity: 0; transition: opacity .18s ease;
    }
    .portfolio-card:hover .glare { opacity: 1; }
  `
  document.head.appendChild(style)

  cards.forEach((card) => {
    card.style.position = "relative"
    const glare = document.createElement("div")
    glare.className = "glare"
    card.appendChild(glare)

    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      const rx = (-y * 10).toFixed(2)
      const ry = (x * 10).toFixed(2)
      card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale(1.01)`
      glare.style.background = `radial-gradient(500px circle at ${((x + 0.5) * 100).toFixed(0)}% ${((y + 0.5) * 100).toFixed(0)}%, rgba(255,255,255,.20), transparent 40%)`
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0) rotateY(0) scale(1)"
    })
  })
})()
;(function buttonRipple() {
  const style = document.createElement("style")
  style.textContent = `
    .btn { position: relative; overflow: hidden; }
    .ripple {
      position: absolute; border-radius: 50%; transform: translate(-50%, -50%);
      pointer-events: none; background: currentColor; opacity: .15; animation: ripple .6s ease-out;
    }
    @keyframes ripple {
      from { width: 0; height: 0; opacity: .35; }
      to   { width: 280px; height: 280px; opacity: 0; }
    }
  `
  document.head.appendChild(style)

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn")
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const circle = document.createElement("span")
    circle.className = "ripple"
    circle.style.left = `${e.clientX - rect.left}px`
    circle.style.top = `${e.clientY - rect.top}px`
    btn.appendChild(circle)
    setTimeout(() => circle.remove(), 650)
  })
})()
;(function cursorGlow() {
  const style = document.createElement("style")
  style.textContent = `
    .cursor-glow {
      position: fixed; width: 18px; height: 18px; border-radius: 50%;
      background: radial-gradient(circle, rgba(59,130,246,.45), rgba(59,130,246,0));
      pointer-events: none; mix-blend-mode: screen; z-index: 9999; transform: translate(-50%,-50%);
    }
    @media (pointer: coarse) { .cursor-glow { display: none; } }
  `
  document.head.appendChild(style)

  const glow = document.createElement("div")
  glow.className = "cursor-glow"
  glow.setAttribute("aria-hidden", "true")
  document.body.appendChild(glow)

  let x = window.innerWidth / 2,
    y = window.innerHeight / 2,
    tx = x,
    ty = y

  window.addEventListener(
    "mousemove",
    (e) => {
      tx = e.clientX
      ty = e.clientY
    },
    { passive: true },
  )

  function animate() {
    x += (tx - x) * 0.15
    y += (ty - y) * 0.15
    glow.style.left = x + "px"
    glow.style.top = y + "px"
    requestAnimationFrame(animate)
  }
  animate()
})()
// Declare emailjs variable
const emailjs = window.emailjs

// Initialize EmailJS
;(() => {
  emailjs.init("TmJ7sPL6T-MlKetfH") // Replace with your Public Key
})()

// Handle form submission
const contactForm = document.getElementById("contactForm")
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const params = {
      name: document.getElementById("nameInput").value,
      email: document.getElementById("emailInput").value,
      telp: document.getElementById("telpInput").value,
      subject: document.getElementById("subjectInput").value,
      message: document.getElementById("messageInput").value,
    }

    emailjs.send("service_56uw811", "template_gumc96h", params).then(
      () => {
        alert("✅ Message sent successfully!")
        contactForm.reset()
      },
      (error) => {
        alert("❌ Failed to send message: " + JSON.stringify(error))
      },
    )
  })
}
