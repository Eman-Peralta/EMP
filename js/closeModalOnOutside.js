document.addEventListener("click", function(event) {
  const modal = document.querySelector(".certificates-container");
  const popover = document.getElementById("certificates");

  if (!modal.contains(event.target) && popover.matches(":popover-open")) {
    popover.hidePopover();
  }
});
