//
//
// ヘッダーのハンバーガー
//
//
function burger() {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".heder__nav--list");
  const navList = document.querySelectorAll(".heder__nav--list li");

  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");

    navList.forEach((link, index) => {
      link.style.animation = `navListFade 0.5s ease forwards ${
        index / 7 + 0.4
      }s`;
    });
    burger.classList.toggle("toggle");
  });
}

burger();