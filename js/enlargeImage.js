const modal = document.getElementById("pdfModal");
const viewer = document.getElementById("pdfViewer");
const caption = document.getElementById("caption");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".designs-projects-container img").forEach((img) => {
  img.addEventListener("click", () => {
    const pdfUrl = img.getAttribute("data-pdf");
    if (pdfUrl) {
      modal.style.display = "block";
      viewer.src = pdfUrl + "#toolbar=0&navpanes=0&scrollbar=0";
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

// prevent right-click context menu - to avoid downloading the PDF
document.addEventListener("contextmenu", (event) => event.preventDefault());
