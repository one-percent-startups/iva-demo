let currentTab = "dashboard";
let mainContainer = document.getElementById("main");
let sections = mainContainer.querySelectorAll(":scope > div");

function changeTab(tab) {
  sections.forEach((div) => {
    if (div.id === tab) {
      div.classList.remove("hidden");
      div.classList.add("block");
    } else {
      div.classList.remove("block");
      div.classList.add("hidden");
    }
  });
}

changeTab(currentTab);