// const modal = document.getElementById("pdfModal");
// const viewer = document.getElementById("pdfViewer");
// const caption = document.getElementById("caption");
// const closeBtn = document.querySelector(".close");

// document.querySelectorAll(".designs-projects-container img").forEach((img) => {
//   img.addEventListener("click", () => {
//     const pdfUrl = img.getAttribute("data-pdf");
//     if (pdfUrl) {
//       modal.style.display = "block";
//       viewer.src = pdfUrl + "#toolbar=0&navpanes=0&scrollbar=0&zoom=50";
//       caption.innerHTML = img.alt + "<br><br><small>Tip: You can zoom in/out (ctrl + scroll for desktop)</small>";
//     }
//   });
// });

// closeBtn.onclick = () => {
//   modal.style.display = "none";
//   viewer.src = ""; // clear iframe
// };

// modal.onclick = (e) => {
//   if (e.target === modal) {
//     modal.style.display = "none";
//     viewer.src = "";
//   }
// };

// // for web design
//   // Open modal when "View Design" is clicked
//   document.querySelectorAll(".web-card .button1").forEach(button => {
//     button.addEventListener("click", function (e) {
//       e.preventDefault();
//       const pdf = this.closest(".web-card").querySelector("img").dataset.pdf;
//       const imgAlt = this.closest(".web-card").querySelector("img").alt;
//       if (pdf) {
//         modal.style.display = "block";
//         viewer.src = pdf + "#toolbar=0&navpanes=0&scrollbar=0&zoom=40";
//       caption.innerHTML = imgAlt + "<br><br><small>Tip: You can zoom in/out (ctrl + scroll for desktop)</small>";
//       }
//     });
//   });

// //

const modal = document.getElementById("pdfModal");
const canvas = document.getElementById("pdfCanvas");
const ctx = canvas.getContext("2d");
const caption = document.getElementById("caption");
const closeBtn = document.querySelector(".close");

const prevBtn = document.getElementById("prevPage");
const nextBtn = document.getElementById("nextPage");
const currentPageElem = document.getElementById("currentPage");
const totalPagesElem = document.getElementById("totalPages");
const zoomLevelElem = document.getElementById("zoomLevel");

let pdfDoc = null;
let currentPage = 1;
let totalPages = 0;
let currentPdfUrl = "";
let scale = 0.5;
const zoomStep = 0.2;

function renderPage(pageNum) {
  pdfDoc.getPage(pageNum).then((page) => {
    const viewport = page.getViewport({ scale });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    page.render({ canvasContext: ctx, viewport: viewport }).promise.then(() => {
      currentPageElem.textContent = pageNum;
      totalPagesElem.textContent = totalPages;
      zoomLevelElem.textContent = Math.round(scale * 100) + "%";

      prevBtn.style.display = pageNum === 1 ? "none" : "inline-block";
      nextBtn.style.display =
        pageNum === pdfDoc.numPages ? "none" : "inline-block";
    });
  });
}

function loadPDF(pdfUrl) {
  currentPdfUrl = pdfUrl;
  pdfjsLib.getDocument(pdfUrl).promise.then((pdf) => {
    pdfDoc = pdf;
    totalPages = pdf.numPages;
    currentPage = 1;
    // scale = 1.2; // Reset zoom
    renderPage(currentPage);
  });
}

// Prev/Next navigation
prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage(currentPage);
  }
});

nextBtn.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    renderPage(currentPage);
  }
});

// Scroll zoom (Ctrl + wheel)
canvas.addEventListener("wheel", (e) => {
  if (e.ctrlKey) {
    e.preventDefault();
    const delta = e.deltaY;
    if (delta < 0 && scale < 2.0) {
      scale += zoomStep; // zoom in
    } else if (delta > 0 && scale > 0.4) {
      scale -= zoomStep; // zoom out
    }
    scale = Math.min(Math.max(scale, 0.4), 2.0); // enforce limits
    renderPage(currentPage);
  }
});



// Open from designs image
document.querySelectorAll(".designs-projects-container img").forEach((img) => {
  img.addEventListener("click", () => {
    const pdfUrl = img.getAttribute("data-pdf");
    const alt = img.alt;
    if (pdfUrl) {
      modal.style.display = "block";
      caption.innerHTML =
        "<strong>" + alt + "</strong><br><br><small>Use Prev/Next and Ctrl+Scroll to zoom</small>";
      loadPDF(pdfUrl);
    }
  });
});

// Open from "View Design" button
document.querySelectorAll(".web-card .button1").forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    const img = this.closest(".web-card").querySelector("img");
    const pdfUrl = img.dataset.pdf;
    const alt = img.alt;
    if (pdfUrl) {
      modal.style.display = "block";
      if (window.innerWidth > 768) {
        caption.innerHTML =
          alt + "<br><br><small>Ctrl+Scroll to zoom</small>";
      } else {
        caption.innerHTML = alt;
      }
      loadPDF(pdfUrl);
    }
  });
});

// Close modal
closeBtn.onclick = () => {
  modal.style.display = "none";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pdfDoc = null;
};

modal.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pdfDoc = null;
  }
};
