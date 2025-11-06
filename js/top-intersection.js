export function setupTopIntersection(threshold = 40) {
  const elements = document.querySelectorAll(".is-top");

  function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    elements.forEach((element) => {
      if (scrollTop <= threshold) {
        element.classList.add("top");
      } else {
        element.classList.remove("top");
      }
    });
  }

  window.addEventListener("scroll", handleScroll);

  // Call initially to set correct state
  handleScroll();
}
