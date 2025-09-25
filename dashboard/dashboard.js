fetch("http://localhost:3000/analytics")
  .then(response => response.json())
  .then(data => {
    let report = document.getElementById("report");
    data.forEach(entry => {
      let item = document.createElement("li");
      item.textContent = `${entry.site}: ${Math.round(entry.duration / 60)} min`;
      report.appendChild(item);
    });
  });