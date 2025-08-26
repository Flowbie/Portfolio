'use strict';

// Obfuscated email
const emailUser = "austindolanportfolio";
const emailDomainDisplay = "";
const emailDomain = "gmail.com";
const emailLink = document.getElementById("email-link");
if (emailLink) {
  emailLink.href = `mailto:${emailUser}@${emailDomain}`;
  emailLink.textContent = `${emailUser}${emailDomainDisplay}`;
}

// Obfuscated phone
const phoneNumber = "+1 (808) 724-7294";
const phoneLink = document.getElementById("phone-link");
if (phoneLink) {
  phoneLink.href = `tel:${phoneNumber.replace(/\s|\(|\)|-/g, '')}`;
  phoneLink.textContent = phoneNumber;
}

// Obfuscated Facebook link
const facebookUser = "austin.dolan.7";
const facebookBase = "https://www.facebook.com/";
const facebookLink = document.getElementById("facebook-link");
if (facebookLink) {
  facebookLink.href = `${facebookBase}${facebookUser}`;
  facebookLink.setAttribute("aria-label", "Visit my Facebook profile"); 
}

// Obfuscated Twitter link
const twitterUser = "haolehawaiian_";
const twitterBase = "https://www.twitter.com/";
const twitterLink = document.getElementById("twitter-link");
if (twitterLink) {
  twitterLink.href = `${twitterBase}${twitterUser}`;
  twitterLink.setAttribute("aria-label", "Visit my Twitter profile");
}

// Obfuscated Instagram link
const instagramUser = "ctrlalt_austin";
const instagramBase = "https://www.instagram.com/";
const instagramLink = document.getElementById("instagram-link");
if (instagramLink) {
  instagramLink.href = `${instagramBase}${instagramUser}`;
  instagramLink.setAttribute("aria-label", "Visit my Instagram profile");
}

// Obfuscated LinkedIn link
const linkedInUser = "austin-david-dolan";
const linkedInBase = "https://www.linkedin.com/in/";
const linkedInLink = document.getElementById("linkedin-link");
if (linkedInLink) {
  linkedInLink.href = `${linkedInBase}${linkedInUser}`;
  linkedInLink.setAttribute("aria-label", "Visit my LinkedIn profile");
}


// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }


// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}

// Chevron toggle functionality for sidebar(up/down)
document.addEventListener('DOMContentLoaded', function () {
  const infoMoreButton = document.querySelector('.info_more-btn');
  if (infoMoreButton) {
    const icon = infoMoreButton.querySelector('ion-icon');
    infoMoreButton.addEventListener('click', function () {
      if (!icon) return;
      // Toggle the icon's name attribute
      if (icon.getAttribute('name') === 'chevron-down') {
        icon.setAttribute('name', 'chevron-up');
      } else {
        icon.setAttribute('name', 'chevron-down');
      }
    });
  }
});

// About Me Read More Functionality
document.addEventListener("DOMContentLoaded", function () {
  const readMoreButton = document.querySelector(".read-more-btn");
  const moreContent = document.querySelector(".about-more");
  if (readMoreButton && moreContent) {
    readMoreButton.addEventListener("click", function () {
      if (moreContent.style.display === "none" || !moreContent.style.display) {
        moreContent.style.display = "inline";
        readMoreButton.textContent = "Read Less";
      } else {
        moreContent.style.display = "none";
        readMoreButton.textContent = "Read More";
      }
    });
  }
});

// Avatar click -> navigate home
document.addEventListener('DOMContentLoaded', function () {
  const avatarBox = document.querySelector('.avatar-box');
  if (avatarBox) {
    try { avatarBox.style.cursor = 'pointer'; } catch {}
    avatarBox.addEventListener('click', function () {
      try { location.href = '/index.html'; } catch { location.href = '/'; }
    });
  }
});

// Copy-to-clipboard buttons for code blocks
document.addEventListener('DOMContentLoaded', function () {
  const pres = document.querySelectorAll('pre');
  if (!pres.length) return;

  // Ensure Font Awesome is available for copy icon
  (function ensureFontAwesome() {
    const existing = document.querySelector('link[data-fa]');
    if (existing) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
    link.setAttribute('data-fa', '1');
    document.head.appendChild(link);
  })();

  pres.forEach(pre => {
    // Skip if already enhanced
    if (pre.dataset.copyEnhanced === '1') return;
    pre.dataset.copyEnhanced = '1';

    // Create button
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'code-copy-btn';
    btn.setAttribute('aria-label', 'Copy code');
    btn.innerHTML = '<i class="fas fa-copy" aria-hidden="true"></i>';

    // Position the button inside the pre
    pre.style.position = pre.style.position || 'relative';
    pre.appendChild(btn);

    // Determine text to copy (prefer innerText to preserve formatting)
    const getCodeText = () => {
      const code = pre.querySelector('code');
      return (code ? code.innerText : pre.innerText) || '';
    };

    btn.addEventListener('click', async () => {
      const text = getCodeText();
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          const ta = document.createElement('textarea');
          ta.value = text; ta.style.position = 'fixed'; ta.style.left = '-9999px';
          document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
        }
        const icon = btn.querySelector('i');
        const oldCls = icon ? icon.className : '';
        if (icon) icon.className = 'fas fa-check';
        btn.setAttribute('aria-label', 'Copied');
        setTimeout(() => {
          if (icon) icon.className = oldCls || 'fas fa-copy';
          btn.setAttribute('aria-label', 'Copy code');
        }, 1200);
      } catch (e) {
        const icon = btn.querySelector('i');
        if (icon) icon.className = 'fas fa-exclamation-triangle';
        btn.setAttribute('aria-label', 'Copy failed');
        setTimeout(() => {
          if (icon) icon.className = 'fas fa-copy';
          btn.setAttribute('aria-label', 'Copy code');
        }, 1500);
      }
    });
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

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", () => closeModal(type));
  if (overlay) overlay.addEventListener("click", () => closeModal(type));
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

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
  // add event in all select items
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  }
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
if (filterBtn && filterBtn.length) {
  let lastClickedBtn = filterBtn[0];
  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
      const selectedValue = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      filterFunc(selectedValue, 'project');
      if (lastClickedBtn) lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  }
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
if (form && formInputs && formInputs.length && formBtn) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

const hasIndexPages = document.querySelector('[data-page="about"]') != null;
if (hasIndexPages) {
  // add event to all nav link (SPA behavior)
  for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener("click", function () {
      for (let j = 0; j < pages.length; j++) {
        if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
          pages[j].classList.add("active");
          if (navigationLinks[j]) navigationLinks[j].classList.add("active");
          window.scrollTo(0, 0);
        } else {
          pages[j].classList.remove("active");
          if (navigationLinks[j]) navigationLinks[j].classList.remove("active");
        }
      }
      const pageName = this.innerHTML.toLowerCase();
      try { history.replaceState({}, '', `#${pageName}`); } catch {}
    });
  }
} else if (navigationLinks && navigationLinks.length) {
  // Standalone pages: navigate to index anchors
  const sectionHrefBase = location.pathname.includes('/blog/') ? '../../index.html#' : './index.html#';
  const map = { about: 'about', resume: 'resume', portfolio: 'portfolio', blog: 'blog', contact: 'contact' };
  navigationLinks.forEach(btn => {
    const key = (btn.textContent || btn.innerText || '').trim().toLowerCase();
    const section = map[key];
    if (!section) return;
    btn.addEventListener('click', function () {
      location.href = sectionHrefBase + section;
    });
  });
  // Mark Blog as active in standalone blog pages
  navigationLinks.forEach(btn => {
    const isBlog = (btn.textContent || btn.innerText || '').trim().toLowerCase() === 'blog';
    btn.classList.toggle('active', isBlog);
  });
}

// Activate tab based on hash on load
document.addEventListener('DOMContentLoaded', () => {
  if (hasIndexPages) {
    const hash = (location.hash || '').replace('#','');
    if (hash) activatePage(hash);
  }
});

// Helper to activate a page programmatically
function activatePage(pageName) {
  if (!pages || !navigationLinks) return;
  for (let i = 0; i < pages.length; i++) {
    const isMatch = pages[i].dataset.page === pageName;
    pages[i].classList.toggle('active', isMatch);
    if (navigationLinks[i]) navigationLinks[i].classList.toggle('active', isMatch);
  }
  window.scrollTo(0, 0);
}

// NEW BLOG FUNCTIONALITY
const blogItems = document.querySelectorAll('.blog-post-item');
const blogBackBtnContainer = document.querySelector('.blog-back-container');
const blogBackBtn = document.querySelector('.blog-back-btn');
const blogListEl = document.querySelector('[data-blog-list]');
let blogPostsManifest = null;
const blogPrefetchCache = new Map(); // slug -> { htmlText, parsedLi }

// === Head metadata helpers (for SPA view) ===
const originalHead = {
  title: document.title,
  description: (document.querySelector('meta[name="description"]') || {}).getAttribute?.('content') || '',
  canonicalHref: (document.querySelector('link[rel="canonical"]') || {}).getAttribute?.('href') || ''
};

function upsertMeta(selector, attrs) {
  let el = document.querySelector(selector);
  if (!el) {
    const tag = selector.startsWith('meta[') ? 'meta' : selector.startsWith('link[') ? 'link' : 'meta';
    el = document.createElement(tag);
    const attrPairs = selector.replace(/^[^[]+\[|]$/g, '').split('][');
    attrPairs.forEach(pair => {
      const [k, v] = pair.replace(/[\[\]"]+/g, '').split('=');
      if (k && v) el.setAttribute(k, v);
    });
    document.head.appendChild(el);
  }
  Object.entries(attrs || {}).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
}

function setHeadForPost(post) {
  if (!post) return;
  const url = `/blog/${post.slug}/`;
  const image = post.banner;
  document.title = post.title;
  upsertMeta('meta[name="description"]', { content: post.description || '' });
  upsertMeta('link[rel="canonical"]', { rel: 'canonical', href: url });
  // Open Graph
  upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'article' });
  upsertMeta('meta[property="og:title"]', { property: 'og:title', content: post.title });
  upsertMeta('meta[property="og:description"]', { property: 'og:description', content: post.description || '' });
  upsertMeta('meta[property="og:image"]', { property: 'og:image', content: image });
  upsertMeta('meta[property="og:url"]', { property: 'og:url', content: url });
  // Twitter
  upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
  upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: post.title });
  upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: post.description || '' });
  upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image });
  // JSON-LD (client-side only; bots will use standalone page)
  let ld = document.getElementById('post-json-ld');
  if (!ld) { ld = document.createElement('script'); ld.type = 'application/ld+json'; ld.id = 'post-json-ld'; document.head.appendChild(ld); }
  ld.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.dateISO || '',
    dateModified: post.dateISO || '',
    author: { '@type': 'Person', name: 'Austin Dolan' },
    image,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url }
  });
}

function resetHeadToIndex() {
  document.title = originalHead.title || document.title;
  if (originalHead.description) upsertMeta('meta[name="description"]', { content: originalHead.description });
  if (originalHead.canonicalHref) upsertMeta('link[rel="canonical"]', { rel: 'canonical', href: originalHead.canonicalHref });
  // Clear OG/Twitter to avoid stale content
  ['og:type','og:title','og:description','og:image','og:url'].forEach(p => {
    const el = document.querySelector(`meta[property="${p}"]`);
    if (el) el.parentNode.removeChild(el);
  });
  ['twitter:card','twitter:title','twitter:description','twitter:image'].forEach(n => {
    const el = document.querySelector(`meta[name="${n}"]`);
    if (el) el.parentNode.removeChild(el);
  });
  const ld = document.getElementById('post-json-ld');
  if (ld) ld.parentNode.removeChild(ld);
}

// === Analytics helpers (no-op unless gtag exists) ===
function trackPageView(path) {
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_location: location.origin + path,
        page_path: path,
        page_title: document.title
      });
    }
  } catch {}
}

function trackEvent(name, params) {
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, params || {});
    }
  } catch {}
}

function getSlugFromPath(pathname) {
  const match = pathname.match(/(?:^|\/)blog\/([^/]+)\/?$/);
  return match ? match[1] : null;
}

async function fetchManifest() {
  if (blogPostsManifest) return blogPostsManifest;
  const manifestUrl = '/assets/data/posts.json';
  const res = await fetch(manifestUrl, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load posts manifest');
  blogPostsManifest = await res.json();
  return blogPostsManifest;
}

function renderIndex(posts) {
  if (!blogListEl) return;
  blogListEl.innerHTML = '';
  (posts || []).forEach(post => {
    const li = document.createElement('li');
    li.className = 'blog-post-item active';
    li.innerHTML = `
      <a href="blog/${post.slug}/" data-slug="${post.slug}" class="blog-card-link" style="display:block">
        <figure class="blog-banner-box">
          <img src="${post.banner}" alt="${post.title}" loading="lazy">
        </figure>
        <div class="blog-content">
          <div class="blog-meta">
            <p class="blog-category">${post.category || ''}</p>
            <span class="dot"></span>
            <time datetime="${post.dateISO || ''}">${post.dateText || ''}</time>
          </div>
          <h3 class="h3 blog-item-title">${post.title}</h3>
        </div>
      </a>
    `;
    blogListEl.appendChild(li);
  });
  if (blogBackBtnContainer && blogBackBtn) {
    blogBackBtnContainer.classList.remove('active');
    blogBackBtn.classList.remove('active');
  }
}

async function loadPost(slug) {
  if (!blogListEl || !slug) return;
  const postUrl = `/blog/${slug}/index.html`;
  let html;
  // Use prefetched cache if present
  const cached = blogPrefetchCache.get(slug);
  if (cached && cached.htmlText) {
    html = cached.htmlText;
  } else {
    const res = await fetch(postUrl, { cache: 'no-store' });
    if (!res.ok) { console.warn('Post fetch failed', slug); return; }
    html = await res.text();
    blogPrefetchCache.set(slug, { htmlText: html, parsedLi: null });
  }
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const li = doc.querySelector('.blog-post-item');
  if (!li) return;
  activatePage('blog');
  blogListEl.innerHTML = '';
  blogListEl.appendChild(li);
  if (blogBackBtnContainer && blogBackBtn) {
    blogBackBtnContainer.classList.add('active');
    blogBackBtn.classList.add('active');
  }
  // Ensure links in injected content open in new tabs
  const links = blogListEl.querySelectorAll('.blog-details a');
  links.forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });
  // Set head metadata based on manifest
  try {
    const posts = await fetchManifest();
    const post = posts.find(p => p.slug === slug);
    if (post) setHeadForPost(post);
  } catch {}
  trackPageView(`/blog/${slug}/`);
}

async function route() {
  try {
    const slug = getSlugFromPath(location.pathname);
    const posts = await fetchManifest();
    if (slug) {
      await loadPost(slug);
    } else {
      renderIndex(posts);
      resetHeadToIndex();
      trackPageView('/blog/');
    }
  } catch (e) {
    console.warn('[Blog] route error', e);
  }
}

if (blogListEl) {
  document.addEventListener('DOMContentLoaded', () => {
    // Backward-compat: support legacy hash/query formats
    try {
      const hash = (location.hash || '').replace(/^#\/?/, '');
      const legacyMatch = hash.match(/^blog\/([^/?#]+)\/?$/);
      const params = new URLSearchParams(location.search);
      const qpSlug = params.get('post');
      const slug = legacyMatch ? legacyMatch[1] : qpSlug;
      if (slug) {
        history.replaceState({}, '', `/blog/${slug}/`);
      }
    } catch {}

    route();
    window.addEventListener('popstate', route);
    // Prefetch on hover/focus/touchstart
    const prefetch = (slug) => {
      if (!slug || blogPrefetchCache.has(slug)) return;
      const url = `/blog/${slug}/index.html`;
      blogPrefetchCache.set(slug, { htmlText: null, parsedLi: null });
      fetch(url, { cache: 'no-store' }).then(r => r.ok ? r.text() : '').then(txt => {
        if (txt) blogPrefetchCache.set(slug, { htmlText: txt, parsedLi: null });
      }).catch(() => {});
    };
    const hoverEvents = ['mouseenter','focusin','touchstart'];
    hoverEvents.forEach(evt => {
      blogListEl.addEventListener(evt, (e) => {
        const a = e.target.closest('a.blog-card-link[data-slug]');
        if (!a) return;
        const slug = a.getAttribute('data-slug');
        prefetch(slug);
      }, { passive: true });
    });

    // Click delegation for cards -> hard navigation to standalone page
    blogListEl.addEventListener('click', (e) => {
      const a = e.target.closest('a.blog-card-link[data-slug]');
      if (!a) return;
      const slug = a.getAttribute('data-slug');
      if (!slug) return;
      // Ensure href points to the standalone page and let browser navigate
      a.setAttribute('href', `/blog/${slug}/`);
    });
  }, { once: true });
}

// Expand/Collapse functionality for blog items
if (!blogListEl) {
  document.addEventListener('DOMContentLoaded', function () {
    blogItems.forEach(item => {
      const blogPhoto = item.querySelector('.blog-banner-box');
      const blogTitle = item.querySelector('.blog-item-title');
      const blogDetails = item.querySelector('.blog-details');

      const toggleDetails = () => {
        blogItems.forEach(otherItem => {
          if (otherItem === item) {
            item.classList.add('expanded');
            if (blogBackBtnContainer && blogBackBtn) {
              blogBackBtnContainer.classList.add('active');
              blogBackBtn.classList.add('active');
            }
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
}

// Blog back button functionality
if (blogBackBtn) {
  blogBackBtn.addEventListener('click', function (e) {
    // Allow anchors with href to handle navigation; no JS override needed
  });
}


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

// Reusable swipe helper
function addSwipeHandlers(element, onNext, onPrev) {
  let startX = 0;

  element.addEventListener('touchstart', (e) => {
    startX = e.changedTouches[0].screenX;
  }, { passive: true });

  element.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].screenX;
    if (endX < startX - 20) onNext(); // swipe left -> next
    if (endX > startX + 20) onPrev(); // swipe right -> prev
  }, { passive: true });
}


// New Gallery Functionality (with swipe functionality but messes up css)
document.addEventListener('DOMContentLoaded', function () {
  const galleries = document.querySelectorAll('.gallery-container'); // Select all gallery instances
  const modal = document.getElementById('image-modal'); // Modal container
  const modalImg = document.getElementById('modal-img'); // Modal image element
  const closeModal = document.querySelector('.modal-close-btn'); // Close button
  const prevButton = document.querySelector('.modal-button.prev'); // Modal prev button
  const nextButton = document.querySelector('.modal-button.next'); // Modal next button
  if (!galleries.length || !modal || !modalImg || !prevButton || !nextButton) { return; }
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

    const next = () => show(idx + 1);
    const prev = () => show(idx - 1);

    let hideTimer = null;
    const flashNav = (ms = 800) => {
      frame.classList.add('nav-visible');
      if (hideTimer) clearTimeout(hideTimer);
      hideTimer = setTimeout(() => frame.classList.remove('nav-visible'), ms);
    };
  
    // ensure nav buttons exist (your ensureNavButtons or static HTML)
    // and make them NOT trigger the permalink click
    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prev(); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); next(); });

    // mediaWrap.addEventListener('touchstart', () => flashNav(1000), { passive: true });
    // 🔹 Add swipe using the shared helper
    addSwipeHandlers(mediaWrap, next, prev);
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

