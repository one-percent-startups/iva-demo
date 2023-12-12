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

function changeName() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("name");
  filter = input.value.toUpperCase();
  table = document.getElementById("peoplestable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
          } else {
              tr[i].style.display = "none";
          }
      }
  }
}


function objectName() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("objectname");
  filter = input.value.toUpperCase();
  table = document.getElementById("peoplestable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
          } else {
              tr[i].style.display = "none";
          }
      }
  }
}