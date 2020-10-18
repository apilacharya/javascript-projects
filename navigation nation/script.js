const menuBars = document.getElementById('menu-bars');
const overlay = document.getElementById('overlay');

function data(num) {
  return document.getElementById(`nav-${num}`);
}

const nav1 = data(1);
const nav2 = data(2);
const nav3 = data(3);
const nav4 = data(4);
const nav5 = data(5);
console.log(nav1)
const navItems = [nav1, nav2, nav3, nav4, nav5];
console.log(navItems)

//control navigation animations
function navAnimation(dir1, dir2) {
  navItems.forEach((nav, i) => {
    nav.classList.replace(`slide-${dir1}-${i + 1}`, `slide-${dir2}-${i + 1}`);
  });
}

function toggleNav() {
  //toggle: menu bars open/closed
  menuBars.classList.toggle('change');
  //toggle: menu active
  overlay.classList.toggle('overlay-active');
  if (overlay.classList.contains('overlay-active')) {
    //animate in-overlay
    overlay.classList.replace('overlay-slide-left', 'overlay-slide-right');
    //animate in nav items
    navAnimation('out', 'in');
  } else {
    overlay.classList.replace('overlay-slide-right', 'overlay-slide-left');

    //animate out nav items
    navAnimation('in', 'out');
  }
}

// event listeners
menuBars.addEventListener('click', toggleNav);
navItems.forEach((nav) => {
  nav.addEventListener('click', toggleNav);
});
