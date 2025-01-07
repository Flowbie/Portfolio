'use strict';

// Obfuscated email
const emailUser = "austindolanportfolio";
const emailDomain = "gmail.com";
const emailLink = document.getElementById("email-link");
emailLink.href = `mailto:${emailUser}@${emailDomain}`;
emailLink.textContent = `${emailUser}@${emailDomain}`;

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


// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

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

/* Filter Functionality for Blogs */

// // custom blogSelect variables
// const blogSelect = document.querySelector("[blog-select]");
// const blogSelectItems = document.querySelectorAll("[blog-select-item]");
// const blogSelectValue = document.querySelector("[blog-select-value]");
// const blogFilterBtn = document.querySelectorAll("[blog-filter-btn]");

// blogSelect.addEventListener("click", function () { elementToggleFunc(this); });
// // add event in all blogSelect items
// for (let i = 0; i < blogSelectItems.length; i++) {
//   blogSelectItems[i].addEventListener("click", function () {

//     const selectedValue = this.innerText.toLowerCase();
//     selectValue.innerText = this.innerText;
//     elementToggleFunc(blogSelect);
//     blogFilterFunc(selectedValue);

//   });
// }

// // blog variables
// const blogFilterItems = document.querySelectorAll("[data-blog-filter-item]");
// const blogDataDetails = document.querySelectorAll("[data-blog-details]");
// const blogDataImg = document.querySelectorAll("[data-blog-img]");
// const blogDataTitle = document.querySelectorAll("[data-blog-title]");
// const blogDataCategory = document.querySelectorAll("[data-blog-category]");

// const blogFilterFunc = function (selectedValue) {
//   // Reset expanded and active state for all blog items
//   blogItems.forEach(item => {
//     item.classList.remove('expanded');
//   });

//   for (let i = 0; i < blogFilterItems.length; i++) {
//     if (selectedValue === "blog") {
//       blogFilterItems[i].classList.add("active");
//       blogFilterItems[i].classList.remove("expanded");
//       blogFilterItems[i].classList.remove("hidden");
//       // blogDataDetails[i].classList.remove("visible");
//       // blogDataImg[i].classList.remove("hidden");
//       // blogDataTitle[i].classList.remove("hidden");
//       // blogDataCategory[i].classList.remove("hidden");
//     } else if (selectedValue === blogFilterItems[i].dataset.category) {
//       blogFilterItems[i].classList.add("active");
//       blogFilterItems[i].classList.remove("expanded");
//       // blogDataDetails[i].classList.remove("visible");
//       // blogDataImg[i].classList.remove("hidden");
//       // blogDataTitle[i].classList.remove("hidden");
//       // blogDataCategory[i].classList.remove("hidden");
//     } else {
//       blogFilterItems[i].classList.remove("active");
//     }
//   }
// };

// // Blog filter button functionality
// let lastClickedBlogBtn = blogFilterBtn[0];

// for (let i = 0; i < blogFilterBtn.length; i++) {
//   blogFilterBtn[i].addEventListener("click", function () {
//     let selectedValue = this.innerText.toLowerCase();
//     filterFunc(selectedValue, 'blog');

//     lastClickedBlogBtn.classList.remove("active");
//     this.classList.add("active");
//     lastClickedBlogBtn = this;
//   });
// }



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

// To DO: configure back-end email api
// formBtn.addEventListener("click", function (e) {
//   e.preventDefault();

//   const formData = new FormData(form);
//   const emailData = {
//     name: formData.get("name"),
//     email: formData.get("email"),
//     message: formData.get("message")
//   };

//   fetch("https://your-email-api-endpoint.com/send", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(emailData)
//   })
//   .then(response => response.json())
//   .then(data => {
//     if (data.success) {
//       alert("Email sent successfully!");
//       form.reset();
//       formBtn.setAttribute("disabled", "");
//     } else {
//       alert("Failed to send email. Please try again.");
//     }
//   })
//   .catch(error => {
//     console.error("Error:", error);
//     alert("An error occurred. Please try again.");
//   });
// });

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

// OLD BLOG FUNCTIONALITY
// const blogItems = document.querySelectorAll('.blog-post-item');
// const blogBackBtnContainer = document.querySelector('.blog-back-container');
// const blogBackBtn = document.querySelector('.blog-back-btn');

// // Expand/Collapse functionality for blog items
// document.addEventListener('DOMContentLoaded', function () {

//   blogItems.forEach(item => {
//     const blogPhoto = item.querySelector('.blog-banner-box');
//     const blogDetails = document.querySelector('.blog-details');
//     const blogItemTitle = document.querySelector('.blog-item-title');

//     const toggleDetails = () => {
//       blogItems.forEach(otherItem => {
//         const otherDetails = otherItem.querySelector('.blog-details');
//         const otherTitle = otherItem.querySelector('.blog-item-title');

//         if (otherItem === item) {
//           item.classList.add('expanded');
//           blogBackBtnContainer.classList.add('active');
//           blogBackBtn.classList.add('active');
//           blogDetails.classList.add('active');
//         } else {
//           // Hide other blog items
//           otherItem.classList.remove('expanded');
//           otherDetails.classList.remove('active'); // Hide other blog details
//           blogItemTitle.classList.add('hidden'); // Hide other titles
//         }
//       });
//     };

//     // Add event listeners for photo and title
//     [blogPhoto, blogItemTitle].forEach(element => {
//       element.addEventListener('click', function (e) {
//         e.preventDefault();
//         toggleDetails();
//       });
//     });
//   });
// });

// // Blog back button functionality
// blogBackBtn.addEventListener('click', function () {

//   blogItems.forEach(item => {
//     const blogDetails = item.querySelector('.blog-details');
//     const blogItemTitle = item.querySelector('.blog-item-title'); // Target the title inside this blog post

//     // Restore the default state of all blog items
//     item.classList.remove('expanded');
//     blogItemTitle.classList.remove('hidden');
//     blogDetails.classList.remove('active');
//     item.classList.add('active');
//   });
//   blogBackBtnContainer.classList.remove('active');
//   blogBackBtn.classList.remove('active');
// });

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
    const photo = item.querySelector('.project-img'); // Select the photo
    const title = item.querySelector('.project-title'); // Select the title
    const category = item.querySelector('.project-category'); // Select the category

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
          item.classList.add('expanded'); // Add expanded class to clicked item
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
    link.setAttribute('rel', 'noopener noreferrer'); // Improves security
  });
});


    // Add close button functionality
    // closeButton.addEventListener('click', function (e) {
    //   e.stopPropagation(); // Prevent triggering expand again

    //   // Reset all project items to their default state
    //   projectItems.forEach(otherItem => {
           //resetAllItems(); 
    //     otherItem.style.display = 'block'; // Restore visibility of all project-items
    //     otherItem.classList.add('active');
    //     const otherPhoto = otherItem.querySelector('.project-img');
    //     const otherDetails = otherItem.querySelector('.project-details');

    //     // Ensure project-img is visible and project-details are hidden
    //     if (otherPhoto) otherPhoto.style.display = 'block'; // Show the project-img
    //     if (otherDetails) otherDetails.style.display = 'none'; // Hide the project-details
    //   });
    // });

// // Old Gallery Functionality
// // Gallery functionality
// document.addEventListener('DOMContentLoaded', function () {
//   const galleries = document.querySelectorAll('.gallery-container'); // Select all gallery instances

//   galleries.forEach(gallery => {
//     const wrapper = gallery.querySelector('.gallery-wrapper');
//     const slides = gallery.querySelectorAll('.gallery-slide');
//     const prevButton = gallery.querySelector('.gallery-button.prev');
//     const nextButton = gallery.querySelector('.gallery-button.next');

//     let currentIndex = 0;

//     const updateGallery = () => {
//       const offset = -currentIndex * 100; // Calculate transform offset
//       wrapper.style.transform = `translateX(${offset}%)`; // Apply offset to wrapper
//     };

//     const showNextSlide = () => {
//       currentIndex = (currentIndex + 1) % slides.length; // Loop back to start
//       updateGallery();
//     };

//     const showPrevSlide = () => {
//       currentIndex = (currentIndex - 1 + slides.length) % slides.length; // Loop to end
//       updateGallery();
//     };

//     // Event listeners for buttons
//     nextButton.addEventListener('click', showNextSlide);
//     prevButton.addEventListener('click', showPrevSlide);

//     // Optional: Auto slide
//     // setInterval(showNextSlide, 5000); // Uncomment to enable auto-sliding
//   });
// });

// // Gallery modal functionality
// document.addEventListener('DOMContentLoaded', function () {
//   const galleries = document.querySelectorAll('.gallery-container'); // All galleries
//   const modal = document.getElementById('image-modal'); // Modal container
//   const modalImg = document.getElementById('modal-img'); // Modal image element
//   const closeModal = document.querySelector('.modal-close-btn'); // Close button
//   const prevButton = document.querySelector('.modal-button.prev'); // Modal prev button
//   const nextButton = document.querySelector('.modal-button.next'); // Modal next button
  
//   // Use img alt attributes as captions within the modal
//   const modalCaption = document.getElementById('modal-caption');
//   modalCaption.textContent = this.alt;

//   let currentGallerySlides = []; // Tracks slides in the active gallery
//   let currentIndex = 0; // Tracks the current image index

//   const openModal = (gallerySlides, index) => {
//     currentGallerySlides = gallerySlides;
//     currentIndex = index;

//     modalImg.src = gallerySlides[index].src; // Set modal image
//     modal.style.display = 'flex'; // Show modal
//   };

//   const closeModalHandler = () => {
//     modal.style.display = 'none'; // Hide modal
//   };

//   const showNextSlide = () => {
//     currentIndex = (currentIndex + 1) % currentGallerySlides.length; // Loop to start
//     modalImg.src = currentGallerySlides[currentIndex].src; // Update modal image
//   };

//   const showPrevSlide = () => {
//     currentIndex = (currentIndex - 1 + currentGallerySlides.length) % currentGallerySlides.length; // Loop to end
//     modalImg.src = currentGallerySlides[currentIndex].src; // Update modal image
//   };

//   // Close modal when clicking outside the image
//   modal.addEventListener('click', function (e) {
//     if (e.target === modal || e.target === closeModal) {
//       closeModalHandler();
//     }
//   });

//   // Add event listeners to modal buttons
//   prevButton.addEventListener('click', showPrevSlide);
//   nextButton.addEventListener('click', showNextSlide);

//   galleries.forEach(gallery => {
//     const slides = gallery.querySelectorAll('.gallery-slide img'); // Images in the gallery

//     slides.forEach((slide, index) => {
//       slide.addEventListener('click', function () {
//         openModal(slides, index); // Open modal with selected gallery and slide index
//       });
//     });
//   });

//   // Add keydown event listener for Escape, ArrowLeft, and ArrowRight
//   document.addEventListener('keydown', function (e) {
//     if (modal.style.display === 'flex') { // Only run if modal is open
//       if (e.key === 'Escape') {
//         closeModalHandler();
//       } else if (e.key === 'ArrowRight') {
//         showNextSlide();
//       } else if (e.key === 'ArrowLeft') {
//         showPrevSlide();
//       }
//     }
//   });
// });

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
