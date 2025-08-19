'use strict';

// Obfuscated email
const emailUser = "austindolanportfolio";
const emailDomainDisplay = "";
const emailDomain = "gmail.com";
const emailLink = document.getElementById("email-link");
emailLink.href = `mailto:${emailUser}@${emailDomain}`;
emailLink.textContent = `${emailUser}${emailDomainDisplay}`;

// Obfuscated phone
const phoneNumber = "+1 (808) 724-7294";
const phoneLink = document.getElementById("phone-link");
phoneLink.href = `tel:${phoneNumber.replace(/\s|\(|\)|-/g, '')}`;
phoneLink.textContent = phoneNumber;

// Obfuscated Facebook link
const facebookUser = "austin.dolan.7";
const facebookBase = "https://www.facebook.com/";
const facebookLink = document.getElementById("facebook-link");
facebookLink.href = `${facebookBase}${facebookUser}`;
facebookLink.setAttribute("aria-label", "Visit my Facebook profile"); 

// Obfuscated Twitter link
const twitterUser = "haolehawaiian_";
const twitterBase = "https://www.twitter.com/";
const twitterLink = document.getElementById("twitter-link");
twitterLink.href = `${twitterBase}${twitterUser}`;
twitterLink.setAttribute("aria-label", "Visit my Twitter profile");

// Obfuscated Instagram link
const instagramUser = "ctrlalt_austin";
const instagramBase = "https://www.instagram.com/";
const instagramLink = document.getElementById("instagram-link");
instagramLink.href = `${instagramBase}${instagramUser}`;
instagramLink.setAttribute("aria-label", "Visit my Instagram profile");

// Obfuscated LinkedIn link
const linkedInUser = "austin-david-dolan";
const linkedInBase = "https://www.linkedin.com/in/";
const linkedInLink = document.getElementById("linkedin-link");
linkedInLink.href = `${linkedInBase}${linkedInUser}`;
linkedInLink.setAttribute("aria-label", "Visit my LinkedIn profile");


// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }


// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// Chevron toggle functionality for sidebar(up/down)
document.addEventListener('DOMContentLoaded', function () {
  const infoMoreButton = document.querySelector('.info_more-btn');
  const icon = infoMoreButton.querySelector('ion-icon');

  infoMoreButton.addEventListener('click', function () {
    // Toggle the icon's name attribute
    if (icon.getAttribute('name') === 'chevron-down') {
      icon.setAttribute('name', 'chevron-up');
    } else {
      icon.setAttribute('name', 'chevron-down');
    }
  });
});

// About Me Read More Functionality
document.addEventListener("DOMContentLoaded", function () {
  const readMoreButton = document.querySelector(".read-more-btn");
  const moreContent = document.querySelector(".about-more");

  readMoreButton.addEventListener("click", function () {
    if (moreContent.style.display === "none" || !moreContent.style.display) {
      moreContent.style.display = "inline";
      readMoreButton.textContent = "Read Less";
    } else {
      moreContent.style.display = "none";
      readMoreButton.textContent = "Read More";
    }
  });
});



// Reusable Modal Functions
const openModal = (type) => {
  const modalContainer = document.querySelector(`[data-modal-container="${type}"]`);
  const overlay = document.querySelector(`[data-overlay="${type}"]`);
  
  modalContainer.classList.add("active");
  overlay.classList.add("active");
};

const closeModal = (type) => {
  const modalContainer = document.querySelector(`[data-modal-container="${type}"]`);
  const overlay = document.querySelector(`[data-overlay="${type}"]`);

  modalContainer.classList.remove("active");
  overlay.classList.remove("active");
};

// Add Event Listeners for Each Modal Type
const addModalListeners = (type) => {
  const modalItems = document.querySelectorAll(`[data-${type}-item]`);
  const modalCloseBtn = document.querySelector(`[data-modal-close-btn="${type}"]`);
  const overlay = document.querySelector(`[data-overlay="${type}"]`);

  modalItems.forEach(item => {
    item.addEventListener("click", () => {
      const modalImg = document.querySelector(`[data-modal-img="${type}"]`);
      const modalTitle = document.querySelector(`[data-modal-title="${type}"]`);
      const modalText = document.querySelector(`[data-modal-text="${type}"]`);
      const modalDate = document.querySelector(`[data-modal-date="${type}"]`);

      modalImg.src = item.querySelector(`[data-${type}-avatar]`).src;
      modalImg.alt = item.querySelector(`[data-${type}-avatar]`).alt;
      modalTitle.innerHTML = item.querySelector(`[data-${type}-title]`).innerHTML;
      modalText.innerHTML = item.querySelector(`[data-${type}-text]`).innerHTML;
      modalDate.innerHTML = item.querySelector(`[data-${type}-date]`).innerHTML;

      openModal(type);
    });
  });

  modalCloseBtn.addEventListener("click", () => closeModal(type));
  overlay.addEventListener("click", () => closeModal(type));
};

// Initialize Modal Listeners for Testimonials and Apps
addModalListeners("testimonials");
addModalListeners("apps");

/* Filter Functionality for Projects */

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });
// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

// project variables
const dataDetails = document.querySelectorAll("[data-project-details]");
const dataImg = document.querySelectorAll("[data-project-img]");
const dataTitle = document.querySelectorAll("[data-project-title]");
const dataCategory = document.querySelectorAll("[data-project-category]");

const filterFunc = function (selectedValue) {

  // Reset expanded and active state for all project items
  projectItems.forEach(item => {
    item.classList.remove('expanded');
    item.classList.remove('active');
  });

  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
      dataDetails[i].classList.remove("visible");
      dataImg[i].classList.remove("hidden");
      dataTitle[i].classList.remove("hidden");
      dataCategory[i].classList.remove("hidden");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
      dataDetails[i].classList.remove("visible");
      dataImg[i].classList.remove("hidden");
      dataTitle[i].classList.remove("hidden");
      dataCategory[i].classList.remove("hidden");
    } else {
      filterItems[i].classList.remove("active");
    }

  }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue, 'project');

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// NEW BLOG FUNCTIONALITY
const blogItems = document.querySelectorAll('.blog-post-item');
const blogBackBtnContainer = document.querySelector('.blog-back-container');
const blogBackBtn = document.querySelector('.blog-back-btn');

// Expand/Collapse functionality for blog items
document.addEventListener('DOMContentLoaded', function () {

  blogItems.forEach(item => {
    const blogPhoto = item.querySelector('.blog-banner-box');
    const blogTitle = item.querySelector('.blog-item-title');
    const blogDetails = item.querySelector('.blog-details');

    const toggleDetails = () => {
      blogItems.forEach(otherItem => {

        if (otherItem === item) {
          item.classList.add('expanded');
          blogBackBtnContainer.classList.add('active');
          blogBackBtn.classList.add('active');
          blogTitle.classList.add('hidden');
          blogDetails.classList.remove('hidden');
        } else {
          // Hide other blog items
          otherItem.classList.remove('active');
        }
      });
    };

    // Add event listeners for photo and title
    [blogPhoto, blogTitle].forEach(element => {
      element.addEventListener('click', function (e) {
        e.preventDefault();
        toggleDetails();
      });
    });

  });
});

// Blog back button functionality
blogBackBtn.addEventListener('click', function () {
  blogItems.forEach(item => {
    const blogDetails = item.querySelector('.blog-details');
    const blogTitle = item.querySelector('.blog-item-title');
    item.classList.add('active');
    item.classList.remove('expanded');
    blogTitle.classList.remove('hidden');
    blogDetails.classList.add('hidden');
  });
  blogBackBtnContainer.classList.remove('active');
  blogBackBtn.classList.remove('active');
});


// Project Item Variables
const projectItems = document.querySelectorAll('.project-item');

// Expand/Collapse functionality for project items
document.addEventListener('DOMContentLoaded', function () {

  projectItems.forEach(item => {
    const photo = item.querySelector('.project-img'); 
    const title = item.querySelector('.project-title'); 
    const category = item.querySelector('.project-category'); 

    const toggleDetails = () => {
      projectItems.forEach(otherItem => {
        const otherPhoto = otherItem.querySelector('.project-img');
        const otherDetails = otherItem.querySelector('.project-details');
        
        if (otherItem === item) {
          // Toggle the clicked item's details
          otherItem.classList.remove('active');
          otherPhoto.classList.add('hidden');
          otherDetails.classList.add('visible');
          item.classList.add('active');
          title.classList.add('hidden');
          category.classList.add('hidden');
          item.classList.add('expanded'); 
        } else {
          // Reset all other items
          otherPhoto.classList.remove('hidden');
          otherDetails.classList.remove('visible');
          otherItem.classList.remove('active');
        }
      });
    };

    // Add event listeners for photo and title
    [photo].forEach(element => {
      element.addEventListener('click', function (e) {
        e.preventDefault();
        toggleDetails();
      });
    });
  });
});

// Blog Detail Links Open in New Tab
document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('.blog-details a');

  links.forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });
});

// New Gallery Functionality (with swipe functionality but messes up css)
document.addEventListener('DOMContentLoaded', function () {
  const galleries = document.querySelectorAll('.gallery-container'); // Select all gallery instances
  const modal = document.getElementById('image-modal'); // Modal container
  const modalImg = document.getElementById('modal-img'); // Modal image element
  const closeModal = document.querySelector('.modal-close-btn'); // Close button
  const prevButton = document.querySelector('.modal-button.prev'); // Modal prev button
  const nextButton = document.querySelector('.modal-button.next'); // Modal next button
  // const modalCaption = document.getElementById('modal-caption'); // Caption for modal image not working

  let currentGallerySlides = []; // Tracks slides in the active gallery
  let currentIndex = 0; // Tracks the current image index

  // Function to update slides (used for both modal and gallery)
  const updateSlide = (slides, index) => {
    modalImg.src = slides[index].src; // Update modal image
    // modalCaption.textContent = slides[index].alt || ''; // Update caption not working
  };

  // Open modal with selected gallery and slide
  const openModal = (gallerySlides, index) => {
    currentGallerySlides = gallerySlides;
    currentIndex = index;
    updateSlide(gallerySlides, index);
    modal.style.display = 'flex'; // Show modal
  };

  // Close modal
  const closeModalHandler = () => {
    modal.style.display = 'none'; // Hide modal
  };

  // Show next slide
  const showNextSlide = () => {
    currentIndex = (currentIndex + 1) % currentGallerySlides.length;
    updateSlide(currentGallerySlides, currentIndex);
  };

  // Show previous slide
  const showPrevSlide = () => {
    currentIndex = (currentIndex - 1 + currentGallerySlides.length) % currentGallerySlides.length;
    updateSlide(currentGallerySlides, currentIndex);
  };

  // Handle swipe gestures
  const addSwipeHandlers = (element, nextCallback, prevCallback) => {
    let touchStartX = 0;
    let touchEndX = 0;

    element.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    element.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchEndX < touchStartX) nextCallback();
      if (touchEndX > touchStartX) prevCallback();
    });
  };

  // Add swipe functionality to modal
  addSwipeHandlers(modal, showNextSlide, showPrevSlide);

  // Close modal when clicking outside the image
  modal.addEventListener('click', function (e) {
    if (e.target === modal || e.target === closeModal) {
      closeModalHandler();
    }
  });

  // Add event listeners to modal buttons
  prevButton.addEventListener('click', showPrevSlide);
  nextButton.addEventListener('click', showNextSlide);

  // Add keydown navigation for modal
  document.addEventListener('keydown', function (e) {
    if (modal.style.display === 'flex') { // Only run if modal is open
      if (e.key === 'Escape') closeModalHandler();
      if (e.key === 'ArrowRight') showNextSlide();
      if (e.key === 'ArrowLeft') showPrevSlide();
    }
  });

  // Initialize galleries
  galleries.forEach((gallery) => {
    const wrapper = gallery.querySelector('.gallery-wrapper');
    const slides = gallery.querySelectorAll('.gallery-slide img');
    const prevButton = gallery.querySelector('.gallery-button.prev');
    const nextButton = gallery.querySelector('.gallery-button.next');
    let currentIndex = 0;

    const updateGallery = () => {
      const offset = -currentIndex * 100;
      wrapper.style.transform = `translateX(${offset}%)`;
    };

    const showNextGallerySlide = () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateGallery();
    };

    const showPrevGallerySlide = () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateGallery();
    };

    // Add swipe functionality to gallery
    addSwipeHandlers(wrapper, showNextGallerySlide, showPrevGallerySlide);

    // Event listeners for gallery buttons
    nextButton.addEventListener('click', showNextGallerySlide);
    prevButton.addEventListener('click', showPrevGallerySlide);

    // Open modal on image click
    slides.forEach((slide, index) => {
      slide.addEventListener('click', () => openModal(slides, index));
    });
  });
});


// === Instagram Polaroid Loader ===
(() => {
  const frame     = document.querySelector('.polaroid-frame');
  if (!frame) { console.warn('[Polaroid] .polaroid-frame not found'); return; }

  const mediaWrap = frame.querySelector('.polaroid-media');
  let   prevBtn   = frame.querySelector('.polaroid-nav.prev');  // <-- let, not const
  let   nextBtn   = frame.querySelector('.polaroid-nav.next');  // <-- let, not const
  const captionEl = document.getElementById('polaroid-caption');

  const PROFILE_URL = (typeof instagramLink !== 'undefined' && instagramLink?.href)
    ? instagramLink.href : 'https://www.instagram.com/';

  const CANDIDATES = [
    new URL('assets/data/instagram.json', document.baseURI).toString(),
    `${location.origin}/assets/data/instagram.json`,
  ];

  function ensureNavButtons() {
    // (Re)select in case they already exist
    let prev = frame.querySelector('.polaroid-nav.prev');
    let next = frame.querySelector('.polaroid-nav.next');

    if (!prev || !next) {
      ['prev','next'].forEach(dir => {
        const b = document.createElement('button');
        b.className = `polaroid-nav ${dir}`;
        b.setAttribute('aria-label', dir === 'prev' ? 'Previous photo' : 'Next photo');
        b.textContent = dir === 'prev' ? '❮' : '❯';
        mediaWrap.appendChild(b);    // inside .polaroid-media so they overlay the image only
      });
      prev = frame.querySelector('.polaroid-nav.prev');
      next = frame.querySelector('.polaroid-nav.next');
    }
    // Update the outer refs for wireCarousel()
    prevBtn = prev;
    nextBtn = next;
  }

  function renderSlides(items) {
    mediaWrap.innerHTML = '';                       // clears any old slides (not the buttons we add later)
    (items || []).forEach((m, i) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'slide' + (i === 0 ? ' active' : '');
      if (m.type === 'video') {
        const v = document.createElement('video');
        v.src = m.url; v.controls = true; v.playsInline = true; v.preload = 'metadata';
        wrapper.appendChild(v);
      } else {
        const img = document.createElement('img');
        img.src = m.url; img.alt = m.alt || 'Instagram post'; img.loading = 'lazy';
        wrapper.appendChild(img);
      }
      mediaWrap.appendChild(wrapper);
    });
  }

  function wireCarousel() {
    let idx = 0;
    const slides = () => Array.from(mediaWrap.querySelectorAll('.slide'));
    const show = (n) => {
      const S = slides(); if (!S.length) return;
      idx = (n + S.length) % S.length;
      S.forEach((el, i) => el.classList.toggle('active', i === idx));
    };
  
    // stop the click from reaching mediaWrap
    prevBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      show(idx - 1);
    });
  
    nextBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      show(idx + 1);
    });
  }
  

  function normalize(json) {
    if (json && Array.isArray(json.media)) return json;
    if (json && Array.isArray(json.data) && json.data.length) {
      const item  = json.data[0];
      const toRes = (t,u,thumb) => ({ type: t === 'VIDEO' ? 'video' : 'image', url: u || thumb });
      const media = (item.media_type === 'CAROUSEL_ALBUM' && item.children?.data?.length)
        ? item.children.data.map(c => toRes(c.media_type, c.media_url, item.thumbnail_url))
        : [toRes(item.media_type, item.media_url, item.thumbnail_url)];
      return { caption: item.caption || '', permalink: item.permalink || '', media };
    }
    return null;
  }

  async function fetchFirst(paths) {
    let lastErr;
    for (const p of paths) {
      try {
        const res = await fetch(p + (p.includes('?') ? '&' : '?') + 't=' + Date.now(), { cache: 'no-store' });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return await res.json();
      } catch (e) { lastErr = e; }
    }
    throw lastErr || new Error('All paths failed');
  }

  async function start() {
    try {
      const raw  = await fetchFirst(CANDIDATES);
      const data = normalize(raw);
      if (!data || !data.media?.length) { frame.style.display = 'none'; return; }

      renderSlides(data.media);        // 1) draw slides
      ensureNavButtons();              // 2) then ensure buttons so they aren’t cleared
      wireCarousel();                  // 3) hook up events

      if (captionEl) captionEl.textContent = data.caption || '';
      mediaWrap.addEventListener('click', () =>
        window.open(data.permalink || PROFILE_URL, '_blank', 'noopener')
      );
    } catch (e) {
      console.warn('[Polaroid] error:', e);
      frame.style.display = 'none';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();

