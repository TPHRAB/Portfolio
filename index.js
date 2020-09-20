(() => {

  /**
   * Get element by id
   */
  const id = (id) => {
    return document.getElementById(id);
  }

  /**
   * Get element by selector
   */
  const qs = (selector) => {
    return document.querySelector(selector);
  }

  /**
   * Get all elements by selector
   */
  const qsa = (selector) => {
    return document.querySelectorAll(selector);
  }

  let offsets = new Map();
  let currentActive = null;

  /**
   * Add event listeners to elements
   */
  const init = () => {
    qsa('.skills-category').forEach(div => 
      div.addEventListener('click', fullyDisplaySection)
    );
    qsa('#display-options span').forEach(span =>
      span.addEventListener('click', selectView));

    // set up smooth scorlling
    // Insert into offsets from bottom to top for easy comparision
    setUpSmoothScroll('contact-anchor', 'contact');
    setUpSmoothScroll('projects-anchor', 'projects');
    setUpSmoothScroll('skills-anchor', 'skills');
    setUpSmoothScroll('about-anchor', 'about');

    // highlight seciton in navbar when the user reaches a section
    window.addEventListener('scroll', detectNewSection);
  }

  const setUpSmoothScroll = (anchorId, targetId) => {
    let anchor = id(anchorId);
    let target = id(targetId);
    anchor.addEventListener('click', () => {
      target.scrollIntoView({behavior: 'smooth'})
    });
    offsets.set(target.offsetTop, anchor);
  }

  const detectNewSection = () => {
    let currentPosition = document.documentElement.scrollTop;

    // find matched section
    let match = null;
    for (let distance of offsets.keys()) {
      if (currentPosition >= distance) {
        match = offsets.get(distance);
        break;
      }
    }
    
    if (match && currentActive !== match) {
      if (currentActive) {
          currentActive.classList.remove('active');
          currentActive = null;
      }
      match.classList.add('active');
      currentActive = match;
    } else if (!match && currentActive) {
      currentActive.classList.remove('active');
      currentActive = null;
    }
  }

  /**
   * Display the selected .skills-category (class)
   * @param {event} event 
   */
  const fullyDisplaySection = (event) => {
    let div = event.currentTarget;
    let dummy = div.querySelector('.dummy');

    // add content
    let height = 0;
    let increment = 1;
    let id = setInterval(() => {
      height += increment;
      increment++;
      if (height >= 100) {
        clearInterval(id);
        dummy.style.height = '100px';
        div.classList.remove('selectable');
        dummy.remove();
        div.querySelector('.hidden').classList.remove('hidden');
      } else {
        dummy.style.height = height + 'px';
      }
    }, 5);
  }

  const selectView = (event) => {
    let lastActive = qs('.active');
    if (lastActive !== event.target) {
      if (lastActive)
        lastActive.classList.remove('active')
      let highlight = id('highlight');
      highlight.style.width = event.target.offsetWidth + 'px';
      highlight.style.left = event.target.offsetLeft + 'px';
      event.target.classList.add('active')
    }
  }

  window.addEventListener('load', init);
})();