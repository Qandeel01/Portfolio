const toggler = document.querySelector(".toggler");
const navbar = document.getElementById("navbar");
const body = document.body;

if(localStorage.getItem("dark-mode") === "true") {
    body.classList.add("dark-body");
    navbar.classList.add("dark");
}

if('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
})

toggler.addEventListener('click', function(e) {
    body.classList.toggle("dark-body");
    navbar.classList.toggle("dark");
    localStorage.setItem("dark-mode", body.classList.contains("dark-body"));
})

const menuBtn = document.querySelector(".menu-btn");
const ul = document.querySelector("#navbar ul");

menuBtn.addEventListener('click', () => {
    ul.classList.toggle("active");
})

ul.addEventListener('click', () => {
    ul.classList.remove("active");
})

// Section fade aniamtion
const sections = document.querySelectorAll(".section");

function revealSections() {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.2;
        if(sectionTop < screenPos) {
            section.classList.add("visible");
        }
    })
}
window.addEventListener("scroll", revealSections);
revealSections();

// SKILL BAR ANIMATION
const skillsSection = document.getElementById("skills");
const skillLevels = document.querySelectorAll(".skill-level");

//Store original widths
skillLevels.forEach(level => {
    const width = level.style.width;
    level.setAttribute("data-width", width);
    level.style.width = "0";
});

function animateSkills() {
    const sectionPos = skillsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.2;
    if(sectionPos < screenPos) {
        skillLevels.forEach(level => {
            level.style.width = level.getAttribute("data-width");
        });
        window.removeEventListener("scroll", animateSkills);
    }
}

window.addEventListener("scroll", animateSkills);
animateSkills();

const form = document.querySelector(".contact-form");
const formStatus = document.getElementById("form-status");

form.addEventListener("submit", async(e) => {
    e.preventDefault();

    const data = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: data,
            headers: {
                "Accept": "application/json"
            }
        })

        if(response.ok) {
            formStatus.textContent = "Thanks! Your message has been sent";
            form.reset();
        } else {
            formStatus.textContent = "Oops! Something went wrong. Try again.";
        }
    } catch (error) {
        formStatus.textContent = "Network error. Please try later.";
    }
})