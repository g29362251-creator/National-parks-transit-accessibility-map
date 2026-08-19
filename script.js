// Initialize map centered on continental US
const map = L.map('map').setView([39.8283, -98.5795], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19
}).addTo(map);

// Defined early, before selectPark or any deep-link/click handler could
// possibly call clearConnections() — this was the actual bug causing
// "works once, breaks on refresh": clearConnections used to be defined much
// further down the file, so loading a page with ?park=... in the URL (which
// happens automatically after clicking any park) crashed on load, before
// the rest of the script below that point ever got a chance to run.
const connectionLines = L.layerGroup().addTo(map);

function clearConnections() {
    connectionLines.clearLayers();
}

// Round a raw total_score to the nearest quarter point (e.g. 3.625 -> 3.5, 4.1 -> 4.0)
function roundToQuarter(n) {
    return Math.round(n * 4) / 4;
}

// The score shown to users — quarter-point precision instead of a blunt integer
function getDisplayRating(park) {
    let r = roundToQuarter(park.total_score);
    if (r < -0.5) r = -0.5;
    if (r > 5) r = 5;
    return r;
}

// Buckets a precise rating into the filter categories: -0.5, 0, 1, 2, 3, 4, 5
function getScoreBucket(displayRating) {
    if (displayRating <= -0.25) return -0.5;
    if (displayRating < 0.75) return 0;
    return Math.round(displayRating);
}

function getMarkerColor(rating) {
    if (rating >= 3) return '#27ae60'; // green
    if (rating >= 2) return '#f39c12'; // yellow
    return '#e74c3c'; // red
}

function createMarkerIcon(color) {
    return L.divIcon({
        html: `<div style="
            background-color: ${color};
            width: 22px;
            height: 22px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        "></div>`,
        iconSize: [28, 28],
        className: 'custom-marker'
    });
}

function slugify(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function closeParkInfo() {
    document.getElementById('park-info').classList.add('hidden');
    document.getElementById('sidebar').classList.remove('sheet-open');
    clearConnections();
}

function selectPark(park, opts) {
    opts = opts || {};
    clearConnections();
    showParkInfo(park);
    const entry = markerGroup[park.name];
    if (entry) {
        if (opts.pan !== false) map.setView([park.lat, park.lng], 8);
        entry.marker.openPopup();
    }
    if (opts.updateUrl !== false) {
        const newUrl = window.location.pathname + '?park=' + slugify(park.name);
        history.replaceState(null, '', newUrl);
    }
}

// ---------- Distance helper (haversine, in miles) ----------
function haversineMiles(lat1, lng1, lat2, lng2) {
    const R = 3958.8;
    const toRad = d => d * Math.PI / 180;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a = Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

const NEARBY_RADIUS_MILES = 100;

const markerGroup = {};

parksData.forEach(park => {
    if (park.lat == null || park.lng == null) return;

    const displayRating = getDisplayRating(park);

    const marker = L.marker([park.lat, park.lng], {
        icon: createMarkerIcon(getMarkerColor(displayRating))
    }).addTo(map);

    marker.bindPopup(`
        <div style="min-width: 220px;">
            <h3>${park.name}</h3>
            <p style="margin: 0 0 0.5rem 0; color: #666; font-size: 13px;">${park.state}</p>
            <p style="margin: 0; font-size: 12px; color: #999;">Score: ${displayRating}/5 — click for details</p>
        </div>
    `);

    marker.on('click', () => selectPark(park, { pan: false }));

    markerGroup[park.name] = {
        marker,
        score: getScoreBucket(displayRating), // bucketed for filtering: -0.5, 0, 1, 2, 3, 4, or 5
        hasShuttle: !!(park.shuttle && park.shuttle.toLowerCase() !== 'none'),
        hasAmtrak: !!(park.amtrak && park.amtrak.toLowerCase() !== 'none' && park.amtrak.trim() !== ''),
        isYearRound: park.seasonality_score >= 0,
        nearbyAirports: [],   // filled in below, once transitPoints markers exist
        nearbyAmtrak: []
    };
});

// ---------- Search ----------
const parkListEl = document.getElementById('park-list');
parksData.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.name;
    parkListEl.appendChild(opt);
});

function findParkByQuery(query) {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    let match = parksData.find(p => p.name.toLowerCase() === q);
    if (!match) match = parksData.find(p => p.name.toLowerCase().includes(q));
    return match;
}

window.runSearch = function () {
    const input = document.getElementById('park-search');
    const match = findParkByQuery(input.value);
    if (match) {
        selectPark(match);
        input.style.background = '';
    } else {
        input.style.background = '#fdecea';
        setTimeout(() => { input.style.background = ''; }, 900);
    }
};

document.getElementById('park-search').addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        runSearch();
    }
});

// ---------- About modal ----------
window.toggleAbout = function () {
    document.getElementById('about-overlay').classList.toggle('hidden');
};

// ---------- Deep link on page load ----------
(function loadFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('park');
    if (!slug) return;
    const match = parksData.find(p => slugify(p.name) === slug);
    if (match) {
        selectPark(match, { updateUrl: false });
    }
})();

// ---------- Airport & Amtrak markers ----------
const parksByName = {};
parksData.forEach(p => { parksByName[p.name] = p; });

function drawConnections(fromLat, fromLng, parkNamesStr, color) {
    clearConnections();
    const parkNames = parkNamesStr.split(',').map(s => s.trim());
    parkNames.forEach(name => {
        const park = parksByName[name];
        if (park && park.lat != null && park.lng != null) {
            L.polyline([[fromLat, fromLng], [park.lat, park.lng]], {
                color: color,
                weight: 2,
                dashArray: '6, 6',
                opacity: 0.85
            }).addTo(connectionLines);
        }
    });
}

function createTransitIcon(emoji, bgColor) {
    return L.divIcon({
        html: `<div style="
            background-color: ${bgColor};
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 1px 4px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 11px;
        ">${emoji}</div>`,
        iconSize: [24, 24],
        className: 'transit-marker'
    });
}

const airportLayer = L.layerGroup();
const amtrakLayer = L.layerGroup();

// Separate layers that only ever hold the subset of airports/stations
// within NEARBY_RADIUS_MILES of the currently-visible (filtered) parks.
const nearbyAirportLayer = L.layerGroup();
const nearbyAmtrakLayer = L.layerGroup();

// Keep a reference to every airport/amtrak marker so the "nearby" layers
// can reuse the exact same marker instances (same popups, same click
// handlers) instead of creating duplicates.
const airportMarkersByCode = {};
const amtrakMarkersByName = {};

transitPoints.airports.forEach(a => {
    const marker = L.marker([a.lat, a.lng], {
        icon: createTransitIcon('&#9992;', '#3498db')
    }).bindPopup(`
        <div style="min-width: 200px;">
            <h3 style="font-size: 15px;">${a.name} (${a.code})</h3>
            <p style="margin: 6px 0 0 0; font-size: 12px; color: #666;">Nearest airport for: ${a.servesParks}</p>
        </div>
    `).addTo(airportLayer);

    marker.on('click', () => {
        drawConnections(a.lat, a.lng, a.servesParks, '#3498db');
    });

    airportMarkersByCode[a.code] = marker;
});

transitPoints.amtrak.forEach(s => {
    const marker = L.marker([s.lat, s.lng], {
        icon: createTransitIcon('&#128646;', '#9b59b6')
    }).bindPopup(`
        <div style="min-width: 200px;">
            <h3 style="font-size: 15px;">${s.name}</h3>
            <p style="margin: 6px 0 0 0; font-size: 12px; color: #666;">Nearest train station for: ${s.servesParks}</p>
        </div>
    `).addTo(amtrakLayer);

    marker.on('click', () => {
        drawConnections(s.lat, s.lng, s.servesParks, '#9b59b6');
    });

    amtrakMarkersByName[s.name] = marker;
});

// ---------- Compute real "within 100 miles" associations ----------
// This checks EVERY airport/station against EVERY park by actual
// lat/lng distance — not just the single "nearest" one that was
// manually curated in parks-data.js — so a park can show multiple
// nearby airports/stations if more than one happens to be close.
parksData.forEach(park => {
    if (park.lat == null || park.lng == null) return;
    const entry = markerGroup[park.name];
    if (!entry) return;

    transitPoints.airports.forEach(a => {
        const d = haversineMiles(park.lat, park.lng, a.lat, a.lng);
        if (d <= NEARBY_RADIUS_MILES) {
            entry.nearbyAirports.push(a.code);
        }
    });

    transitPoints.amtrak.forEach(s => {
        const d = haversineMiles(park.lat, park.lng, s.lat, s.lng);
        if (d <= NEARBY_RADIUS_MILES) {
            entry.nearbyAmtrak.push(s.name);
        }
    });

    entry.hasNearbyAirport = entry.nearbyAirports.length > 0;
    entry.hasNearbyAmtrak = entry.nearbyAmtrak.length > 0;
});

window.toggleAirports = function () {
    if (map.hasLayer(airportLayer)) {
        map.removeLayer(airportLayer);
        clearConnections();
    } else {
        map.addLayer(airportLayer);
    }
    document.getElementById('toggle-airports-btn').classList.toggle('active');
};

window.toggleAmtrakLayer = function () {
    if (map.hasLayer(amtrakLayer)) {
        map.removeLayer(amtrakLayer);
        clearConnections();
    } else {
        map.addLayer(amtrakLayer);
    }
    document.getElementById('toggle-amtrak-btn').classList.toggle('active');
};

// ---------- Park info panel ----------
function showParkInfo(park) {
    const parkInfo = document.getElementById('park-info');
    document.getElementById('park-name').textContent = park.name;
    document.getElementById('park-location').textContent = park.state;

    const displayRating = getDisplayRating(park);

    let ratingColor = '#e74c3c';
    let ratingText = 'Difficult — car recommended';
    if (displayRating >= 3) {
        ratingColor = '#27ae60';
        ratingText = 'Easy without a car';
    } else if (displayRating >= 2) {
        ratingColor = '#f39c12';
        ratingText = 'Moderate — doable with planning';
    }

    document.getElementById('park-details').innerHTML = `
        <div style="background: #f8f9fa; padding: 12px; border-radius: 6px; margin-bottom: 12px;">
            <div style="font-size: 11px; color: #666; text-transform: uppercase; margin-bottom: 4px;">Accessibility Score</div>
            <div style="font-size: 24px; font-weight: bold; color: ${ratingColor}; margin-bottom: 4px;">${displayRating}/5</div>
            <div style="font-size: 13px;">${ratingText}</div>
        </div>

        <div style="margin-bottom: 12px;">
            <div style="font-size: 11px; color: #666; text-transform: uppercase; margin-bottom: 6px;">Getting There</div>
            <div style="font-size: 13px; line-height: 1.6;">
                <strong>Airport:</strong> ${park.airport || 'N/A'}<br>
                <strong>Amtrak:</strong> ${park.amtrak || 'Not available'}<br>
                <strong>Shuttle:</strong> ${park.shuttle || 'None'}
            </div>
        </div>

        <div style="margin-bottom: 12px;">
            <div style="font-size: 11px; color: #666; text-transform: uppercase; margin-bottom: 6px;">Score Breakdown</div>
            <div style="font-size: 13px; line-height: 1.8;">
                🚌 Park Transit: ${park.intra_transit_score}/2.0<br>
                🚂 Train Access: ${park.train_score}/1.5<br>
                🚍 Ground Transit: ${park.ground_transit_score}/1.0<br>
                📅 Seasonality: ${park.seasonality_score > 0 ? '+' : ''}${park.seasonality_score}
            </div>
        </div>

        <div style="border-top: 1px solid #ddd; padding-top: 12px; font-size: 12px; line-height: 1.6; color: #555;">
            ${park.notes || ''}
        </div>

        <div style="margin-top: 12px;">
            <a href="${park.website}" target="_blank" rel="noopener" style="display: block; padding: 8px; background: #2c3e50; color: white; text-align: center; text-decoration: none; border-radius: 4px; font-size: 12px;">Visit NPS.gov page</a>
        </div>
    `;

    parkInfo.classList.remove('hidden');
    document.getElementById('sidebar').classList.add('sheet-open');
}

document.getElementById('close-btn').addEventListener('click', closeParkInfo);
document.getElementById('sheet-handle').addEventListener('click', closeParkInfo);

map.on('click', closeParkInfo);

// ---------- Filters ----------
// Score buttons work as an "exclude" toggle: every score bucket is included
// by default, and clicking a button removes/re-adds that bucket.
const ALL_SCORES = [-0.5, 0, 1, 2, 3, 4, 5];
const activeFilters = {
    scores: new Set(ALL_SCORES),
    shuttleOnly: false,
    amtrakOnly: false,
    yearRoundOnly: false,
    nearbyAirportOnly: false,
    nearbyAmtrakOnly: false
};

function applyFilters() {
    const visibleParkNames = [];

    Object.keys(markerGroup).forEach(name => {
        const entry = markerGroup[name];
        let visible = activeFilters.scores.has(entry.score);

        if (visible && activeFilters.shuttleOnly && !entry.hasShuttle) visible = false;
        if (visible && activeFilters.amtrakOnly && !entry.hasAmtrak) visible = false;
        if (visible && activeFilters.yearRoundOnly && !entry.isYearRound) visible = false;
        if (visible && activeFilters.nearbyAirportOnly && !entry.hasNearbyAirport) visible = false;
        if (visible && activeFilters.nearbyAmtrakOnly && !entry.hasNearbyAmtrak) visible = false;

        if (visible) {
            if (!map.hasLayer(entry.marker)) map.addLayer(entry.marker);
            visibleParkNames.push(name);
        } else {
            if (map.hasLayer(entry.marker)) map.removeLayer(entry.marker);
        }
    });

    updateNearbyTransitLayers(visibleParkNames);
    updateFilterBadge();
}

// Populates nearbyAirportLayer / nearbyAmtrakLayer with only the
// airports/stations within NEARBY_RADIUS_MILES of the parks currently
// passing the filters, and shows/hides those layers accordingly.
function updateNearbyTransitLayers(visibleParkNames) {
    nearbyAirportLayer.clearLayers();
    nearbyAmtrakLayer.clearLayers();

    if (activeFilters.nearbyAirportOnly) {
        const codes = new Set();
        visibleParkNames.forEach(name => {
            markerGroup[name].nearbyAirports.forEach(code => codes.add(code));
        });
        codes.forEach(code => {
            const marker = airportMarkersByCode[code];
            if (marker) nearbyAirportLayer.addLayer(marker);
        });
        if (!map.hasLayer(nearbyAirportLayer)) map.addLayer(nearbyAirportLayer);
    } else if (map.hasLayer(nearbyAirportLayer)) {
        map.removeLayer(nearbyAirportLayer);
    }

    if (activeFilters.nearbyAmtrakOnly) {
        const names = new Set();
        visibleParkNames.forEach(name => {
            markerGroup[name].nearbyAmtrak.forEach(stationName => names.add(stationName));
        });
        names.forEach(stationName => {
            const marker = amtrakMarkersByName[stationName];
            if (marker) nearbyAmtrakLayer.addLayer(marker);
        });
        if (!map.hasLayer(nearbyAmtrakLayer)) map.addLayer(nearbyAmtrakLayer);
    } else if (map.hasLayer(nearbyAmtrakLayer)) {
        map.removeLayer(nearbyAmtrakLayer);
    }
}

function updateFilterBadge() {
    const excludedScores = ALL_SCORES.length - activeFilters.scores.size;
    const total = excludedScores +
        (activeFilters.shuttleOnly ? 1 : 0) +
        (activeFilters.amtrakOnly ? 1 : 0) +
        (activeFilters.yearRoundOnly ? 1 : 0) +
        (activeFilters.nearbyAirportOnly ? 1 : 0) +
        (activeFilters.nearbyAmtrakOnly ? 1 : 0);

    const badge = document.getElementById('filter-badge');
    if (total > 0) {
        badge.textContent = total;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
}

// Score buttons are "on" (included) by default — reflect that in the UI
document.querySelectorAll('.filter-btn').forEach(btn => {
    const onclick = btn.getAttribute('onclick') || '';
    if (onclick.includes('filterByScore')) {
        btn.classList.add('active');
    }
});

window.filterByScore = function (score, btn) {
    if (activeFilters.scores.has(score)) {
        activeFilters.scores.delete(score);
        btn.classList.remove('active');
    } else {
        activeFilters.scores.add(score);
        btn.classList.add('active');
    }
    applyFilters();
};

window.toggleShuttle = function (btn) {
    activeFilters.shuttleOnly = !activeFilters.shuttleOnly;
    btn.classList.toggle('active', activeFilters.shuttleOnly);
    applyFilters();
};

window.toggleAmtrak = function (btn) {
    activeFilters.amtrakOnly = !activeFilters.amtrakOnly;
    btn.classList.toggle('active', activeFilters.amtrakOnly);
    applyFilters();
};

window.toggleYearRound = function (btn) {
    activeFilters.yearRoundOnly = !activeFilters.yearRoundOnly;
    btn.classList.toggle('active', activeFilters.yearRoundOnly);
    applyFilters();
};

window.toggleNearbyAirport = function (btn) {
    activeFilters.nearbyAirportOnly = !activeFilters.nearbyAirportOnly;
    btn.classList.toggle('active', activeFilters.nearbyAirportOnly);
    applyFilters();
};

window.toggleNearbyAmtrak = function (btn) {
    activeFilters.nearbyAmtrakOnly = !activeFilters.nearbyAmtrakOnly;
    btn.classList.toggle('active', activeFilters.nearbyAmtrakOnly);
    applyFilters();
};

window.clearFilters = function () {
    activeFilters.scores = new Set(ALL_SCORES);
    activeFilters.shuttleOnly = false;
    activeFilters.amtrakOnly = false;
    activeFilters.yearRoundOnly = false;
    activeFilters.nearbyAirportOnly = false;
    activeFilters.nearbyAmtrakOnly = false;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        const onclick = btn.getAttribute('onclick') || '';
        btn.classList.toggle('active', onclick.includes('filterByScore'));
    });
    applyFilters();
};

// ---------- Mobile filter drawer ----------
window.toggleFilterDrawer = function () {
    document.getElementById('filters').classList.toggle('open');
};

updateFilterBadge();