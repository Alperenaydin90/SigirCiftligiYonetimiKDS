document.addEventListener("DOMContentLoaded", () => {
  const sidebarItems = document.querySelectorAll(".sidebar ul li");
  const content = document.querySelector(".content");

  sidebarItems.forEach((item) => {
    item.addEventListener("click", () => {
      const category = item.getAttribute("data-category");

      const allCategories = document.querySelectorAll(".kategori-form");
      allCategories.forEach((cat) => (cat.style.display = "none"));

      const selectedCategory = document.getElementById(category);
      if (selectedCategory) {
        selectedCategory.style.display = "block";
      }

      if (category === "kategori2") {
        fetch("kategori2.php")
          .then((response) => response.text())
          .then((data) => {
            document.getElementById("kategori2").innerHTML = data;
          })
          .catch((error) => console.error("Veri çekme hatası:", error));
      }
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const sidebarItems = document.querySelectorAll(".sidebar ul li");
  const content = document.querySelector(".content");

  sidebarItems.forEach((item) => {
    item.addEventListener("click", () => {
      const category = item.getAttribute("data-category");

      const allCategories = document.querySelectorAll(".kategori-form");
      allCategories.forEach((cat) => (cat.style.display = "none"));

      const selectedCategory = document.getElementById(category);
      if (selectedCategory) {
        selectedCategory.style.display = "block";

        if (category === "kategori3") {
          loadInekler();
        }
      }
    });
  });

  function loadInekler() {
    fetch("inekler.php")
      .then((response) => response.json())
      .then((data) => {
        const select = document.getElementById("inekSec");
        select.innerHTML = '<option value="">-- İnek Seçin --</option>'; // Varsayılan seçenek

        data.forEach((inek) => {
          const option = document.createElement("option");
          option.value = inek.inek_adi;
          option.textContent = inek.inek_adi;
          select.appendChild(option);
        });

        select.addEventListener("change", () => {
          const selectedInek = select.value;
          if (selectedInek) {
            fetchKategori3Data(selectedInek);
          }
        });
      })
      .catch((error) => console.error("Hata:", error));
  }

  function fetchKategori3Data(inekAdi) {
    fetch(`kategori3.php?inek_adi=${encodeURIComponent(inekAdi)}`)
      .then((response) => response.json())
      .then((data) => {
        const labels = data.map((item) => item.tarih);
        const values = data.map((item) => parseFloat(item.toplam_sut));
        const percentages = data.map((item) => parseFloat(item.yuzde));

        renderKategori3Chart(labels, values, percentages);
      })
      .catch((error) => console.error("Hata:", error));
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const gosterButton = document.getElementById("gosterKategori3");
  const inekSelect = document.getElementById("inekSec");
  const canvas = document.getElementById("kategori3Chart");
  let chart;

  gosterButton.addEventListener("click", () => {
    const selectedInek = inekSelect.value;

    if (selectedInek) {
      fetch(`kategori3.php?inek_adi=${selectedInek}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            alert(data.message);
          } else {
            const labels = data.map((item) => item.tarih);
            const sutMiktarlari = data.map((item) =>
              parseFloat(item.sut_miktari)
            );

            if (chart) chart.destroy();

            chart = new Chart(canvas, {
              type: "pie",
              data: {
                labels: labels,
                datasets: [
                  {
                    label: "Süt Miktarları",
                    data: sutMiktarlari,
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(54, 162, 235, 0.2)",
                      "rgba(255, 206, 86, 0.2)",
                      "rgba(75, 192, 192, 0.2)",
                      "rgba(153, 102, 255, 0.2)",
                      "rgba(255, 159, 64, 0.2)",
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(153, 102, 255, 1)",
                      "rgba(255, 159, 64, 1)",
                    ],
                    borderWidth: 1,
                  },
                ],
              },
              options: {
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        const value = context.raw;
                        const total = context.dataset.data.reduce(
                          (a, b) => a + b,
                          0
                        );
                        const percentage = ((value / total) * 100).toFixed(2);
                        return `${context.label}: ${value} kg (%${percentage})`;
                      },
                    },
                  },
                },
              },
            });
          }
        })
        .catch((error) => console.error("Hata:", error));
    } else {
      alert("Lütfen bir inek seçin!");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const gosterButton = document.getElementById("gosterKategori5");
  const tableBody = document.querySelector("#kategori5Table tbody");

  gosterButton.addEventListener("click", () => {
    fetch("kategori5.php")
      .then((response) => response.json())
      .then((data) => {
        tableBody.innerHTML = "";

        data.forEach((item) => {
          const row = document.createElement("tr");

          const inekAdiCell = document.createElement("td");
          inekAdiCell.textContent = item.inek_adi;

          const brutGetiriCell = document.createElement("td");
          brutGetiriCell.textContent = item.brut_getiri.toFixed(2) + " TL";

          row.appendChild(inekAdiCell);
          row.appendChild(brutGetiriCell);
          tableBody.appendChild(row);
        });
      })
      .catch((error) => console.error("Hata:", error));
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const gosterButton = document.getElementById("gosterKategori6");
  const canvas = document.getElementById("kategori6Chart");
  let chart;

  gosterButton.addEventListener("click", () => {
    fetch("kategori6.php")
      .then((response) => response.json())
      .then((data) => {
        const labels = data.map((item) => item.inek_adi);
        const sutMiktarlari = data.map((item) => parseFloat(item.toplam_sut));

        if (chart) chart.destroy();

        chart = new Chart(canvas, {
          type: "bar",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Süt Miktarı (kg)",
                data: sutMiktarlari,
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Süt Miktarı (kg)",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "İnek Adları",
                },
              },
            },
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
            },
          },
        });
      })
      .catch((error) => console.error("Hata:", error));
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const gosterButton = document.getElementById("gosterKategori4");
  const canvas = document.getElementById("kategori4Chart");
  let chart;

  gosterButton.addEventListener("click", () => {
    fetch("kategori4.php")
      .then((response) => response.json())
      .then((data) => {
        const labels = data.map((item) => item.tarih);
        const sutMiktarlari = data.map((item) => parseFloat(item.toplam_sut));

        const x = labels.map((_, index) => index); // X ekseni: Gün indeksi
        const y = sutMiktarlari; // Y ekseni: Süt miktarları

        const n = x.length;
        const sumX = x.reduce((a, b) => a + b, 0);
        const sumY = y.reduce((a, b) => a + b, 0);
        const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
        const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);

        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;

        const regressionLine = x.map((xi) => slope * xi + intercept);

        if (chart) chart.destroy();

        chart = new Chart(canvas, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Gerçek Süt Miktarları",
                data: y,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: true,
              },
              {
                label: "Regresyon Çizgisi",
                data: regressionLine,
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 2,
                fill: false,
                tension: 0.4,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Tarih",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Süt Miktarı (kg)",
                },
                beginAtZero: true,
              },
            },
          },
        });
      })
      .catch((error) => console.error("Hata:", error));
  });
});
