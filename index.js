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

  /**
   * Add event listeners to elements
   */
  const init = () => {
    qsa('.skills-category').forEach(div => 
      div.addEventListener('click', fullyDisplaySection)
    );
    qs('#display-options').addEventListener('click', selectView);

    // set up smooth scorlling
    setUpSmoothScroll('about-anchor', 'about');
    setUpSmoothScroll('skills-anchor', 'skills');
    setUpSmoothScroll('projects-anchor', 'projects');
    setUpSmoothScroll('contact-anchor', 'contact');
  }

  const setUpSmoothScroll = (anchorId, targetId) => {
    id(anchorId).addEventListener('click', () => {
      id(targetId).scrollIntoView({behavior: 'smooth'})
    });
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