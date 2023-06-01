function countUp(element) {
    const endValue = parseInt(element.getAttribute('data-count'));
    let currentValue = 0;
    const increment = Math.ceil(endValue / 100); // adjust the increment value to make the animation smoother or faster
    
    const intervalId = setInterval(() => {
      if (currentValue >= endValue) {
        element.innerText = endValue.toLocaleString(); // format the final value with comma separators
        clearInterval(intervalId);
      } else {
        currentValue += increment;
        element.innerText = currentValue.toLocaleString();
      }
    }, 10); // adjust the interval value to make the animation smoother or faster
  }
  
 /*  const counterValues = document.querySelectorAll('.counter-value');
  counterValues.forEach(countUp); */

  let prevScrollPos = window.scrollY;

function onScroll() {
  const currentScrollPos = window.scrollY;
  
  if (currentScrollPos < prevScrollPos) {
    // Scroll up
    const counterValues = document.querySelectorAll('.counter-value');
    counterValues.forEach(countUp);
  } else {
    // Scroll down
    const counterValues = document.querySelectorAll('.counter-value');
    /* counterValues.forEach(element => {
      element.innerText = 0; */
      counterValues.forEach(countUp);
  
  }
  
  prevScrollPos = currentScrollPos;
}

window.addEventListener('scroll', onScroll);




//animation image 1
const img11 = document.querySelector('.image1');
const img = img11.querySelector('.img1');

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function animateImage() {
  if (isElementInViewport(img11)) {
    img.style.animation = 'none';
    img.offsetHeight; /* Trigger reflow */
    img.style.animation = null;
  } else {
    img.style.animation = 'slide-up 1s forwards';
  }
}

window.addEventListener('scroll', animateImage);
// animation of image2

const image2 = document.querySelector('.image2');
const img22 = image2.querySelector('.img2');

function isElementInViewport2(el) {
  const rect2 = el.getBoundingClientRect();
  return (
    rect2.top >= 0 &&
    rect2.left >= 0 &&
    rect2.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect2.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function animateImage2() {
  if (isElementInViewport2(image2)) {
    img22.style.animation = 'none';
    img22.offsetHeight; 
    img22.style.animation = null;
  } else {
    img22.style.animation = 'slide-up2 1s forwards';
  }
}

window.addEventListener('scroll', animateImage2);
//read more button 1

const button = document.querySelector('.readMore1');
const div = document.querySelector('.myDiv1');

button.addEventListener('click', () => {
    if (div.style.display === 'none') {
      div.style.display = 'block';
    } else {
      div.style.display = 'none';
    }
  });

// read more button2
  const button2 = document.querySelector('.readMore2');
  const div2 = document.querySelector('.myDiv2');

  button2.addEventListener('click', () => {
      if (div2.style.display === 'none') {
        div2.style.display = 'block';
      } else {
        div2.style.display = 'none';
      }
    }); 
//clients
const clients = document.querySelectorAll('.client');
const arrows = document.querySelectorAll('.arrow-left, .arrow-right');

let activeClient = 0;

function showClient() {
  clients.forEach(client => {
    client.classList.remove('active');
  });
  clients[activeClient].classList.add('active');
}

showClient();

function changeClient(direction) {
  if (direction === 'left') {
    activeClient--;
    if (activeClient < 0) {
      activeClient = clients.length - 1;
    }
  } else if (direction === 'right') {
    activeClient++;
    if (activeClient > clients.length - 1) {
      activeClient = 0;
    }
  }
  showClient();
}

arrows.forEach(arrow => {
  arrow.addEventListener('click', () => {
    if (arrow.classList.contains('arrow-left')) {
      changeClient('left');
    } else if (arrow.classList.contains('arrow-right')) {
      changeClient('right');
    }
  });
});