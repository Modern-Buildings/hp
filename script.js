const languageButton = document.querySelector(".language-toggle");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");
const translatable = document.querySelectorAll("[data-ar][data-en]");

function setLanguage(language) {
  const isArabic = language === "ar";
  document.documentElement.lang = language;
  document.documentElement.dir = isArabic ? "rtl" : "ltr";
  translatable.forEach((element) => {
    element.innerHTML = element.dataset[language];
  });
  document.querySelectorAll("[data-alt-ar][data-alt-en]").forEach((image) => {
    image.alt = image.dataset[language === "ar" ? "altAr" : "altEn"];
  });
  languageButton.innerHTML = isArabic ? 'EN <span>↗</span>' : 'عربي <span>↗</span>';
  languageButton.setAttribute("aria-label", isArabic ? "Switch to English" : "التبديل إلى العربية");
  try { localStorage.setItem("white-language", language); } catch (_) {}
}

languageButton.addEventListener("click", () => {
  setLanguage(document.documentElement.lang === "ar" ? "en" : "ar");
});

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
let savedLanguage = "ar";
try { savedLanguage = localStorage.getItem("white-language") || "ar"; } catch (_) {}
setLanguage(savedLanguage);
