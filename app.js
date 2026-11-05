document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("search-btn");
    const searchInput = document.getElementById("city-input");
    const weatherCard = document.getElementById("weather-card");

    if (searchBtn) {
        searchBtn.addEventListener("click", async () => {
            const query = searchInput.value.trim();
            if (!query) {
                weatherCard.innerHTML = "<p style='color: #fee2e2;'>⚠️ Por favor, introduce un lugar para buscar.</p>";
                return;
            }

            weatherCard.innerHTML = "<p>Buscando ubicación...</p>";

            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
                const data = await response.json();

                if (data && data.length > 0) {
                    const place = data[0];
                    weatherCard.innerHTML = `
                        <h3>📍 ${place.display_name}</h3>
                        <p><strong>Latitud:</strong> ${place.lat}</p>
                        <p><strong>Longitud:</strong> ${place.lon}</p>
                    `;
                } else {
                    weatherCard.innerHTML = "<p style='color: #fee2e2;'>❌ No se encontró la ubicación en el servidor.</p>";
                }
            } catch (error) {
                weatherCard.innerHTML = "<p style='color: #fee2e2;'>❌ Error en la comunicación asíncrona con el servidor.</p>";
            }
        });
    }
});