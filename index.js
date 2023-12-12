
window.addEventListener("load", function () {
  let options = {
    chart: {
      height: "100%",
      maxWidth: "100%",
      type: "area",
      fontFamily: "Inter, sans-serif",
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: "#1C64F2",
        gradientToColors: ["#1C64F2"],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 6,
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: 0,
      },
    },
    series: [
      {
        name: "Daily visitor",
        data: [32, 60, 30, 21, 44, 53],
        color: "#1A56DB",
      },
    ],
    xaxis: {
      categories: [
        "01 February",
        "02 February",
        "03 February",
        "04 February",
        "05 February",
        "06 February",
        "07 February",
      ],
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  };

  let options1 = {
    ...options,
    series: [
      {
        name: "Daily visitors",
        data: [32, 60, 30, 21, 44, 53],
        color: "#F04438",
      },
    ],
  };
  let options2 = {
    ...options,
    series: [
      {
        name: "Visit duration",
        data: [53, 44, 33, 21, 45, 53],
        color: "#1A56DB",
      },
    ],
  };
  if (
    document.getElementById("area-chart") &&
    typeof ApexCharts !== "undefined"
  ) {
    const chart = new ApexCharts(
      document.getElementById("area-chart"),
      options
    );
    chart.render();
  }
  if (
    document.getElementById("area-chart1") &&
    typeof ApexCharts !== "undefined"
  ) {
    const chart = new ApexCharts(
      document.getElementById("area-chart1"),
      options1
    );
    chart.render();
  }
  if (
    document.getElementById("area-chart2") &&
    typeof ApexCharts !== "undefined"
  ) {
    const chart = new ApexCharts(
      document.getElementById("area-chart2"),
      options2
    );
    chart.render();
  }
});

let currentTab = "dashboard";
let mainContainer = document.getElementById("main");
let sections = mainContainer.querySelectorAll(":scope > div");
let navContainer = document.getElementById('navigation-items')
let navItems = navContainer.querySelectorAll(":scope > li")
// let dashboardLocation = document.getElementById("dashboard-location");
// let locationLocation = document.getElementById("location-location");
// let peopleLocation = document.getElementById("people-location");
// let objectLocation = document.getElementById("object-location");

let dashboardTable = document.getElementById("dashboard-table");
let lcoationTable = document.getElementById("location-table")
let peopleTable = document.getElementById('people-table')
let objectTable = document.getElementById('object-table')

// let locations = [];
// let alertFilter = {
//   startDate: "",
//   endDate: "",
//   location: "",
// };

// function getLocationsFromLogs(logs) {
//   let locations = [];
//   logs.forEach((l) => {
//     if (!locations.includes(l.Location)) {
//       locations.push(l.Location);
//       let option = document.createElement("option");
//       option.value = l.Location;
//       option.textContent = l.Location;
//       // dashboardLocation.appendChild(option.cloneNode(true));
//       // locationLocation.appendChild(option.cloneNode(true));
//       // peopleLocation.appendChild(option.cloneNode(true));
//       // objectLocation.appendChild(option);
//     }
//   });
// }
function makeDataForDashboard() {
  let logs = Logs;
  let locDate = {};
  logs.forEach((l) => {
    let objectName = `${l.Location}:${l.Date}`
    if (!(objectName in locDate)) {
      locDate[objectName] = {
        footfall: 1,
        avgDwellTime: l["Dwell Time"],
      };
    } else {
      let footfall = locDate[objectName]["footfall"];
      let avgDwellTime = locDate[objectName]["avgDwellTime"];
      ++footfall
      avgDwellTime = avgDwellTime + l["Dwell Time"];
      locDate[objectName] = { footfall, avgDwellTime };
    }
  });
  Object.keys(locDate).forEach((key) => {
    let avg = locDate[key]['avgDwellTime']
    let total = locDate[key]['footfall']
    locDate[key]['avgDwellTime'] = avg / total;
  })

  Object.keys(locDate).sort((a, b) => a.localeCompare(b)).forEach((key) => {
    let row = document.createElement('tr')
    let location = key.split(':')[0]
    let date = key.split(':')[1]
    let locationData = document.createElement('td')
    let classes = ['whitespace-nowrap', 'px-3', 'py-4', 'text-sm', 'text-gray-500']
    locationData.classList.add('whitespace-nowrap', 'py-4', 'pl-4', 'pr-3', 'text-sm', 'font-medium', 'text-gray-900', 'sm:pl-0')
    locationData.textContent = location
    row.appendChild(locationData)
    let dateData = document.createElement('td')
    dateData.classList.add(classes)
    dateData.textContent = date
    row.appendChild(dateData)
    let footfall = document.createElement('td')
    footfall.classList.add(classes)
    footfall.textContent = locDate[key]['footfall']
    row.appendChild(footfall)
    let dwellTime = document.createElement('td')
    dwellTime.classList.add(classes)
    dwellTime.textContent = locDate[key]['avgDwellTime'].toFixed(2)
    row.appendChild(dwellTime)
    dashboardTable.appendChild(row)
  })
}
function locationData() {
  let logs = Logs.sort((a, b) => a.Date.localeCompare(b.Date));
  logs.forEach((l) => {
    let row = document.createElement('tr')
    let detectedId = document.createElement('td')
    let classes = ['whitespace-nowrap', 'px-3', 'py-4', 'text-sm', 'text-gray-500']
    detectedId.classList.add('whitespace-nowrap', 'py-4', 'pl-4', 'pr-3', 'text-sm', 'font-medium', 'text-gray-900', 'sm:pl-0')
    detectedId.textContent = l["Detected Names"]
    row.appendChild(detectedId)
    let dwellTime = document.createElement('td')
    dwellTime.classList.add(classes)
    dwellTime.textContent = l["Dwell Time"]
    row.appendChild(dwellTime)
    let location = document.createElement('td')
    location.classList.add(classes)
    location.textContent = l.Location
    row.appendChild(location)
    let date = document.createElement('td')
    date.classList.add(classes)
    date.textContent = l.Date
    row.appendChild(date)
    lcoationTable.appendChild(row)
  })
}
function peopleData() {
  let logs = Logs.filter((l) => l["Detection Type"] === 'Person');
  let peopleLoc = {}
  logs.forEach((l) => {
    let objectName = `${l['Detected Names']}:${l.Location}:${l.Date}`
    if (!(objectName in peopleLoc)) {
      peopleLoc[objectName] = {
        name: l["Detected Names"],
        location: l.Location,
        count: 1,
        dwellTime: l["Dwell Time"]
      }
    } else {
      let count = peopleLoc[objectName]['count']
      let dwellTime = peopleLoc[objectName]['dwellTime']
      ++count;
      dwellTime += l["Dwell Time"]
      peopleLoc[objectName]['count'] = count
    }
  })
  Object.keys(peopleLoc).sort((a, b) => a.localeCompare(b)).forEach((key) => {
    let split = key.split(':')
    let name = split[0]
    let location = split[1]
    let date = split[2]
    let row = document.createElement('tr')
    let detectedId = document.createElement('td')
    let classes = ['whitespace-nowrap', 'px-3', 'py-4', 'text-sm', 'text-gray-500']
    detectedId.classList.add('whitespace-nowrap', 'py-4', 'pl-4', 'pr-3', 'text-sm', 'font-medium', 'text-gray-900', 'sm:pl-0')
    detectedId.textContent = name
    row.appendChild(detectedId)
    let dwellTime = document.createElement('td')
    dwellTime.classList.add(classes)
    dwellTime.textContent = peopleLoc[key]["dwellTime"]
    row.appendChild(dwellTime)
    let count = document.createElement('td')
    count.classList.add(classes)
    count.textContent = peopleLoc[key]["count"]
    row.appendChild(count)
    let locationData = document.createElement('td')
    locationData.classList.add(classes)
    locationData.textContent = location
    row.appendChild(locationData)
    let dateData = document.createElement('td')
    dateData.classList.add(classes)
    dateData.textContent = date
    row.appendChild(dateData)
    peopleTable.appendChild(row)
  })
}
function objectData() {
  let logs = Logs.filter((l) => l["Detection Type"] !== 'Person');
  let peopleLoc = {}
  logs.forEach((l) => {
    let objectName = `${l['Detection Type']}:${l.Location}:${l.Date}`
    if (!(objectName in peopleLoc)) {
      peopleLoc[objectName] = {
        name: l["Detection Names"],
        location: l.Location,
        count: 1,
        dwellTime: l["Dwell Time"]
      }
    } else {
      let count = peopleLoc[objectName]['count']
      let dwellTime = peopleLoc[objectName]['dwellTime']
      ++count;
      dwellTime += l["Dwell Time"]
      peopleLoc[objectName]['count'] = count
    }
  })
  Object.keys(peopleLoc).sort((a, b) => a.localeCompare(b)).forEach((key) => {
    let split = key.split(':')
    let name = split[0]
    let location = split[1]
    let date = split[2]
    let row = document.createElement('tr')
    let detectedId = document.createElement('td')
    let classes = ['whitespace-nowrap', 'px-3', 'py-4', 'text-sm', 'text-gray-500']
    detectedId.classList.add('whitespace-nowrap', 'py-4', 'pl-4', 'pr-3', 'text-sm', 'font-medium', 'text-gray-900', 'sm:pl-0')
    detectedId.textContent = name
    row.appendChild(detectedId)
    let dwellTime = document.createElement('td')
    dwellTime.classList.add(classes)
    dwellTime.textContent = peopleLoc[key]["dwellTime"]
    row.appendChild(dwellTime)
    let count = document.createElement('td')
    count.classList.add(classes)
    count.textContent = peopleLoc[key]["count"]
    row.appendChild(count)
    let locationData = document.createElement('td')
    locationData.classList.add(classes)
    locationData.textContent = location
    row.appendChild(locationData)
    let dateData = document.createElement('td')
    dateData.classList.add(classes)
    dateData.textContent = date
    row.appendChild(dateData)
    objectTable.appendChild(row)
  })
}
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
  navItems.forEach((li) => {
    let span = li.querySelector("span")
    if (li.id === `${tab}-list`) {
      span.classList.remove("text-indigo-200", 'hover:text-white', "hover:bg-indigo-700")
      span.classList.add("bg-indigo-700", "text-white")
    } else {
      span.classList.add("text-indigo-200", 'hover:text-white', "hover:bg-indigo-700")
      span.classList.remove("bg-indigo-700", "text-white")
    }
  })
}
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
  table = document.getElementById("objectstable");
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
function getAlerts(alerts) {
  let alertTable = document.getElementById("alert-table");
  alertTable.innerHTML = "";
  alerts.forEach((a, idx) => {
    // if (!locations.includes(a.location)) {
    //   locations.push(a.location);
    //   let option = document.createElement("option");
    //   option.value = a.location;
    //   option.textContent = a.location;
    //   alertLocation.append(option);
    // }
    let classes = [
      "whitespace-nowrap",
      "px-3",
      "py-4",
      "text-sm",
      "text-gray-500",
    ];
    let row = document.createElement("tr");
    let idtd = document.createElement("td");
    idtd.classList.add(classes);
    idtd.textContent = idx + 1;
    row.appendChild(idtd);
    let location = document.createElement("td");
    location.classList.add(
      "whitespace-nowrap",
      "py-4",
      "pl-4",
      "pr-3",
      "text-sm",
      "font-medium",
      "text-gray-900",
      "sm:pl-0"
    );
    location.textContent = a.location;
    row.appendChild(location);
    let smoke = document.createElement("td");
    smoke.classList.add(classes, "capitalize");
    smoke.textContent = a["event type"];
    row.appendChild(smoke);
    let time = document.createElement("td");
    time.classList.add(classes);
    time.textContent = `${a.date}, ${a.time}`;
    row.appendChild(time);
    alertTable.appendChild(row);
  });
}
// function filterAlerts(filter) {
//   if (filter.startDate || filter.endDate || filter.location) {
//     let alerts = Alerts;
//     if (!!filter.location && filter.location !== "Filter by location")
//       alerts = Alerts.filter((a) => a.location === filter.location);
//     if (filter.startDate)
//       alerts = alerts.filter(
//         (a) => new Date(a.date) >= new Date(filter.startDate)
//       );
//     if (filter.endDate)
//       alerts = alerts.filter(
//         (a) => new Date(filter.endDate) >= new Date(a.date)
//       );
//     getAlerts(alerts);
//   } else getAlerts(Alerts);
// }
// function filterAlertsByLocation(location) {
//   alertFilter["location"] = location;
//   filterAlerts(alertFilter);
// }
// function filterAlertsByStartDate(startDate) {
//   alertFilter["startDate"] = startDate;
//   filterAlerts(alertFilter);
// }
// function filterAlertsByEndDate(endDate) {
//   alertFilter["endDate"] = endDate;
//   filterAlerts(alertFilter);
// }

makeDataForDashboard();
locationData()
peopleData()
objectData()
// getLocationsFromLogs(Logs);
changeTab(currentTab);

// let alertLocation = document.getElementById("alert-location");
// alertLocation.addEventListener("change", (e) =>
//   filterAlertsByLocation(e.target.value)
// );
// let alertStart = document.getElementById("start-alerts");
// alertStart.addEventListener("change", (e) =>
//   filterAlertsByStartDate(e.target.value)
// );
// let alertEnd = document.getElementById("end-alerts");
// alertEnd.addEventListener("change", (e) =>
//   filterAlertsByEndDate(e.target.value)
// );
getAlerts(Alerts);
