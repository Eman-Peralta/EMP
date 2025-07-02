const modal = document.getElementById("pdfModal");
const viewer = document.getElementById("pdfViewer");
const caption = document.getElementById("caption");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".designs-projects-container img").forEach((img) => {
  img.addEventListener("click", () => {
    const pdfUrl = img.getAttribute("data-pdf");
    if (pdfUrl) {
      modal.style.display = "block";
      viewer.src = pdfUrl + "#toolbar=0&navpanes=0&scrollbar=0&zoom=50";
      caption.innerHTML = img.alt + "<br><br><small>Tip: You can zoom in/out (ctrl + scroll for desktop)</small>";
    }
  });
});

closeBtn.onclick = () => {
  modal.style.display = "none";
  viewer.src = ""; // clear iframe
};

modal.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    viewer.src = "";
  }
};

// for web design
  // Open modal when "View Design" is clicked
  document.querySelectorAll(".web-card .button1").forEach(button => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const pdf = this.closest(".web-card").querySelector("img").dataset.pdf;
      const imgAlt = this.closest(".web-card").querySelector("img").alt;
      if (pdf) {
        modal.style.display = "block";
        viewer.src = pdf + "#toolbar=0&navpanes=0&scrollbar=0&zoom=40";
      caption.innerHTML = imgAlt + "<br><br><small>Tip: You can zoom in/out (ctrl + scroll for desktop)</small>";
      }
    });
  });



