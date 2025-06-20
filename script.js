// Map of URLs (replicated from your Python dicts)
const SECTION3_URLS = {
  Rainy: "https://myvoiceclone.s3.ap-south-1.amazonaws.com/s3/rainy.mp4",
  Cloudy: "https://myvoiceclone.s3.ap-south-1.amazonaws.com/s3/cloudy.mp4",
  Sunny: "https://myvoiceclone.s3.ap-south-1.amazonaws.com/sunny.mp4",
  Floody: "https://myvoiceclone.s3.ap-south-1.amazonaws.com/s3/floody.mp4"
};

// ObjectId map (simulate like in Python)
const CITY_OBJECT_IDS = {
  Mumbai: "6837ff95bf6154d3bd28d0ea",
  Kochi: "6836e4a87fa8828099ec3407",
  Bangalore: "6837ffa1bf6154d3bd28d0eb"
};

document.getElementById('section3-enable').addEventListener('change', function () {
  document.getElementById('section3-options').classList.toggle('hidden', !this.checked);
});

document.getElementById('submit-btn').addEventListener('click', function () {
  const city = document.getElementById('city').value;
  const section3Enabled = document.getElementById('section3-enable').checked;
  const section3Radios = document.querySelectorAll('input[name="section3"]');
  let section3Value = null;

  section3Radios.forEach(radio => {
    if (radio.checked) {
      section3Value = radio.value;
    }
  });

  const updateData = {};
  if (section3Enabled) {
    if (!section3Value) {
      alert("Section 3 is enabled but no option selected.");
      return;
    }
    updateData.Section3 = { [section3Value]: SECTION3_URLS[section3Value] };
  }

  if (Object.keys(updateData).length === 0) {
    alert("No section selected for update.");
    return;
  }

  // Simulated backend call (replace with actual API endpoint)
  fetch("http://ceat-admin-backend.onrender.com/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      city: city,
      docId: CITY_OBJECT_IDS[city],
      update: updateData
    })
  })
    .then(res => res.json())
    .then(data => {
      alert("Updated successfully!");
    })
    .catch(err => {
      console.error(err);
      alert("Error updating data.");
    });
});
