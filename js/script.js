document.querySelectorAll('a, img').forEach(el => {
    el.setAttribute('draggable', 'false');
  });

  
// prevent right-click context menu - to avoid downloading the PDF
document.addEventListener("contextmenu", (event) => event.preventDefault());