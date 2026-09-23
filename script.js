// ======================================================
// ANIMACIONES AL HACER SCROLL
// ======================================================

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }

    });

}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => {
    observer.observe(el);
});


// ======================================================
// MENÚ MOBILE
// ======================================================

const menu = document.querySelector(".menu-btn");
const links = document.querySelector(".nav-links");

menu?.addEventListener("click", () => {

    const open = links.classList.toggle("mobile-open");

    if (open) {

        links.style.display = "flex";
        links.style.position = "absolute";
        links.style.top = "72px";
        links.style.left = "0";
        links.style.right = "0";
        links.style.margin = "0";
        links.style.padding = "16px";
        links.style.flexDirection = "column";
        links.style.alignItems = "stretch";

        links.style.background =
            document.body.classList.contains("dark")
                ? "rgba(15, 23, 32, .98)"
                : "rgba(255, 255, 255, .97)";

        links.style.border =
            document.body.classList.contains("dark")
                ? "1px solid #26384a"
                : "1px solid #e8eaed";

        links.style.borderRadius = "14px";
        links.style.boxShadow =
            "0 14px 35px rgba(16,24,40,.20)";

    } else {

        links.removeAttribute("style");

    }

});


// ======================================================
// SCROLL SUAVE
// ======================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", e => {

        const target =
            document.querySelector(anchor.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        if (links?.classList.contains("mobile-open")) {

            links.classList.remove("mobile-open");
            links.removeAttribute("style");

        }

    });

});


// ======================================================
// MODO OSCURO / CLARO
// ======================================================

const themeBtn = document.querySelector(".theme-btn");

const savedTheme =
    localStorage.getItem("tandar-theme");


// Aplicar tema guardado

if (savedTheme === "dark") {
    document.body.classList.add("dark");
}


// ======================================================
// CAMBIAR ICONO DEL BOTÓN
// ======================================================

function updateThemeButton() {

    if (!themeBtn) return;

    const dark =
        document.body.classList.contains("dark");

    themeBtn.textContent =
        dark ? "☀" : "☾";

    themeBtn.setAttribute(
        "aria-label",
        dark
            ? "Activar modo claro"
            : "Activar modo oscuro"
    );

    themeBtn.title =
        dark
            ? "Modo claro"
            : "Modo oscuro";

}


// ======================================================
// CAMBIAR CAPTURAS SEGÚN EL TEMA
// ======================================================

function updateScreenshotTheme() {

    const dark =
        document.body.classList.contains("dark");

    document.querySelectorAll(
        "[data-dark][data-light]"
    ).forEach(img => {

        const newSrc =
            dark
                ? img.dataset.dark
                : img.dataset.light;

        if (newSrc && img.src !== newSrc) {

            img.src = newSrc;

        }

    });

}


// ======================================================
// ACTUALIZAR TODO AL CARGAR
// ======================================================

updateThemeButton();
updateScreenshotTheme();


// ======================================================
// BOTÓN DE CAMBIO DE TEMA
// ======================================================

themeBtn?.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const dark =
        document.body.classList.contains("dark");

    localStorage.setItem(
        "tandar-theme",
        dark ? "dark" : "light"
    );

    updateThemeButton();
    updateScreenshotTheme();

});


// ======================================================
// ACTUALIZAR EL MENÚ MOBILE SI CAMBIA EL TEMA
// ======================================================

function updateMobileMenuTheme() {

    if (!links?.classList.contains("mobile-open")) {
        return;
    }

    const dark =
        document.body.classList.contains("dark");

    links.style.background =
        dark
            ? "rgba(15, 23, 32, .98)"
            : "rgba(255, 255, 255, .97)";

    links.style.border =
        dark
            ? "1px solid #26384a"
            : "1px solid #e8eaed";

}

themeBtn?.addEventListener(
    "click",
    updateMobileMenuTheme
);
