function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
locomotiveAnimation();

function navbarAnimation() {

  gsap.from("#nav", {
    y: -60,
    opacity: 0,
    delay: 0.1,
    duration: 0.5,
    stagger: 0.7,
  });

  gsap.to("#nav-part1 svg", {
    y: "-100%",  
    scrollTrigger: {
      trigger: "#page1",
      scroller: "#main",
      start: "top top",  
      end: "top -10%",  
      scrub: true,
    },
  });

  gsap.to("#nav-part2 #links", {
    y: "-100%",  
    opacity: 0,  
    scrollTrigger: {
      trigger: "#page1",
      scroller: "#main",
      start: "top top",
      end: "top -10%",
      scrub: true,
    },
  });
}
navbarAnimation();

function videoconAnimation() {
  var videocon = document.querySelector("#video-container");
  var playbtn = document.querySelector("#play");
  videocon.addEventListener("mouseenter", function () {
    gsap.to(playbtn, {
      scale: 1,
      opacity: 1,
    });
  });
  videocon.addEventListener("mouseleave", function () {
    gsap.to(playbtn, {
      scale: 0,
      opacity: 0,
    });
  });
  document.addEventListener("mousemove", function (dets) {
    gsap.to(playbtn, {
      left: dets.x - 70,
      top: dets.y - 80,
    });
  });
}
videoconAnimation();

function loadinganimation() {
  gsap.from("#page1 h1", {
    y: 100,
    opacity: 0,
    delay: 0.5,
    duration: 0.9,
    stagger: 0.3,
  });
  gsap.from("#page1 #video-container", {
    scale: 0.9,
    opacity: 0,
    delay: 1.3,
    duration: 0.5,
  });
}
loadinganimation();

function cursorAnimation() {
  document.addEventListener("mousemove", function (dets) {
    gsap.to("#cursor", {
      left: dets.x,
      top: dets.y,
    });
  });
  document.querySelectorAll(".child").forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
      gsap.to("#cursor", {
        transform: "translate(-50%,-50%) scale(1)",
      });
    });
    elem.addEventListener("mouseleave", function () {
      gsap.to("#cursor", {
        transform: "translate(-50%,-50%) scale(0)",
      });
    });
  });
}
cursorAnimation();

function page2anim(){
  const children = document.querySelectorAll("#page3 .child");


children.forEach(child => {
  gsap.fromTo(
    child,
    { opacity: 0 }, 
    { 
      opacity: 1, 
      ease: "expo.inOut", 
      scrollTrigger: {
        trigger: child, 
        scroller: "#main",
        start: "top 80%",  
        end: "top 10%",  
        scrub: true, 
        once: true, 
      },
    }
  );
});

}
page2anim();

function playnewvideo(){
  let video = document.querySelector('#video-container');
video.addEventListener("click", function(){
  video.innerHTML = `<div id="video-container">
                <div id="play">PLAY</div>
                <video autoplay controls src="video2.mp4"></video>
            </div>`
})
}
playnewvideo();



const elementHoverAnimations = () => {
  const eles = document.querySelectorAll('.elem .dets');

  eles.forEach((elem) => {
      const submenu = elem.querySelector('#sub-menu'); // Select submenu inside .dets

      // Expand element and show submenu on hover
      elem.addEventListener('mouseenter', () => {
          gsap.to(elem, {
              height: '250px',
              y: 70,
              borderRadius: '30px',
              duration: 0.2,
          });

          // Make submenu visible and fade in
          gsap.set(submenu, { visibility: 'visible', pointerEvents: 'auto' });
          gsap.to(submenu, {
              opacity: 1,
              duration: 0.2,
              ease: 'power1.out',
          });
      });

      // Shrink element and hide submenu instantly on mouse leave
      elem.addEventListener('mouseleave', () => {
          gsap.to(elem, {
              height: '60px',
              y: 0,
              duration: 0.2,
          });

          // Instantly hide submenu (no flicker)
          gsap.set(submenu, { opacity: 0, visibility: 'hidden', pointerEvents: 'none' });
      });
  });
};

elementHoverAnimations();