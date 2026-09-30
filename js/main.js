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


(() => {
  const topButton = document.getElementById('pageTopButton');

  const updateTopButton = () => {
    if (topButton) {
      topButton.classList.toggle('is-visible', window.scrollY > 480);
    }
  };

  if (topButton) {
    topButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    window.addEventListener('scroll', updateTopButton, { passive: true });
    updateTopButton();
  }

  const videoPanel = document.getElementById('examVideoPanel');
  const videoToggle = document.getElementById('examVideoToggle');
  const videoContent = document.getElementById('examVideoContent');
  const videoToggleLabel = videoToggle?.querySelector('.exam-video-toggle__label');
  const videoStorageKey = 'zenshopast-exam-video-expanded';

  if (videoPanel && videoToggle && videoContent) {
    const getSavedVideoState = () => {
      try {
        const saved = window.localStorage.getItem(videoStorageKey);
        if (saved === 'true') return true;
        if (saved === 'false') return false;
      } catch (error) {
        // localStorage が利用できない環境では画面幅だけで初期状態を決める。
      }
      return !window.matchMedia('(max-width: 768px)').matches;
    };

    const applyVideoState = (expanded, save = false) => {
      videoPanel.classList.toggle('is-collapsed', !expanded);
      videoToggle.setAttribute('aria-expanded', String(expanded));
      videoContent.setAttribute('aria-hidden', String(!expanded));
      if (videoToggleLabel) {
        videoToggleLabel.textContent = expanded ? '動画を隠す' : '動画を表示';
      }

      if (save) {
        try {
          window.localStorage.setItem(videoStorageKey, String(expanded));
        } catch (error) {
          // 保存できない場合でも切り替え自体はそのまま利用できる。
        }
      }
    };

    applyVideoState(getSavedVideoState());
    videoToggle.addEventListener('click', () => {
      const expanded = videoToggle.getAttribute('aria-expanded') === 'true';
      applyVideoState(!expanded, true);
    });
  }

  const tocLinks = Array.from(document.querySelectorAll('.exam-desktop-toc a[href^="#"]'));
  const tocTargets = tocLinks
    .map((link) => ({
      link,
      target: document.querySelector(link.getAttribute('href'))
    }))
    .filter((item) => item.target);
  let tocUpdatePending = false;

  const updateCurrentTocItem = () => {
    if (!tocTargets.length) {
      return;
    }

    let currentItem = tocTargets[0];
    const headerOffset = 180;

    tocTargets.forEach((item) => {
      if (item.target.getBoundingClientRect().top <= headerOffset) {
        currentItem = item;
      }
    });

    tocTargets.forEach((item) => {
      const isCurrent = item === currentItem;
      item.link.classList.toggle('is-current', isCurrent);
      if (isCurrent) {
        item.link.setAttribute('aria-current', 'location');
      } else {
        item.link.removeAttribute('aria-current');
      }
    });
    tocUpdatePending = false;
  };

  const requestTocUpdate = () => {
    if (!tocUpdatePending) {
      tocUpdatePending = true;
      window.requestAnimationFrame(updateCurrentTocItem);
    }
  };

  window.addEventListener('scroll', requestTocUpdate, { passive: true });
  window.addEventListener('resize', requestTocUpdate);
  updateCurrentTocItem();

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
  } else {
    document.querySelectorAll('.reveal').forEach((element) => element.classList.add('active'));
  }
})();