// Initialize map centered on continental US
const map = L.map('map').setView([39.8283, -98.5795], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19
}).addTo(map);

const connectionLines = L.layerGroup().addTo(map);

function clearConnections() {
    connectionLines.clearLayers();
}

function parseMilesFromText(str) {
    if (!str) return null;
    const text = str.toLowerCase();
    const zeroDistancePhrases = ['inside', 'at the park', 'direct access', 'right outside', 'outside the entrance', 'entrance to the park'];
    if (zeroDistancePhrases.some(p => text.includes(p))) return 0;
    const m = str.match(/(\d+(?:\.\d+)?)\s*mi/i);
    return m ? parseFloat(m[1]) : null;
}

function distanceScore(miles) {
    const score = 1.5 - (miles / 2) * 0.01;
    return Math.max(0, Math.min(1.5, Math.round(score * 100) / 100));
}

function getAirportScore(park) {
    const miles = parseMilesFromText(park.airport);
    if (miles == null) return 0;
    return distanceScore(miles);
}

function getTrainScore(park) {
    const miles = parseMilesFromText(park.amtrak);
    if (miles == null) {
        return park.train_score != null ? park.train_score : 0;
    }
    return distanceScore(miles);
}

function getGettingToScore(park) {
    const airportScore = getAirportScore(park);
    const trainScore = getTrainScore(park);
    const groundScore = (park.ground_transit_score || 0) * 2;
    const total = trainScore + airportScore + groundScore;
    return Math.round(total * 10) / 10;
}

function getGettingAroundScore(park) {
    const intraScaled = (park.intra_transit_score || 0) * 2.5;
    const seasonality = park.seasonality_score || 0;
    const total = Math.min(5, intraScaled + seasonality);
    return Math.round(total * 10) / 10;
}

function getGettingToCategory(score) {
    if (score >= 3) return 'easy';
    if (score >= 2) return 'moderate';
    return 'difficult';
}

function getGettingAroundCategory(score) {
    if (score >= 3) return 'easy';
    if (score >= 2) return 'moderate';
    return 'difficult';
}

function getCombinedScore(gettingToScore, gettingAroundScore) {
    return Math.round(((gettingToScore + gettingAroundScore) / 2) * 10) / 10;
}

function categoryColor(cat) {
    if (cat === 'easy') return '#27ae60';
    if (cat === 'moderate') return '#f39c12';
    return '#e74c3c';
}

function categoryLabel(cat, dimension) {
    if (dimension === 'to') {
        if (cat === 'easy') return 'Easy to reach without a car';
        if (cat === 'moderate') return 'Moderate — reachable with planning';
        return 'Difficult to reach — a car is likely needed to get there';
    }
    if (cat === 'easy') return 'Easy to get around once there';
    if (cat === 'moderate') return 'Moderate — some walking or waiting';
    return 'Difficult — limited options once you arrive';
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

// Straight-line ("as the crow flies") distance in miles between two points
function haversineMiles(lat1, lng1, lat2, lng2) {
    const R = 3958.8; // Earth's radius in miles
    const toRad = d => d * Math.PI / 180;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a = Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Closest parks to this one that also have a real ground transit connection
// (score >= 1), sorted by straight-line distance, nearest first.
function getNearbyParksWithGroundTransit(park, limit) {
    limit = limit || 5;
    return parksData
        .filter(p => p.name !== park.name && p.lat != null && p.lng != null && (p.ground_transit_score || 0) >= 1)
        .map(p => ({ park: p, distance: haversineMiles(park.lat, park.lng, p.lat, p.lng) }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, limit);
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

const markerGroup = {};

parksData.forEach(park => {
    if (park.lat == null || park.lng == null) return;

    const gettingToScore = getGettingToScore(park);
    const gettingAroundScore = getGettingAroundScore(park);
    const gettingToCategory = getGettingToCategory(gettingToScore);
    const gettingAroundCategory = getGettingAroundCategory(gettingAroundScore);
    const combinedScore = getCombinedScore(gettingToScore, gettingAroundScore);
    const combinedCategory = getGettingToCategory(combinedScore);

    const marker = L.marker([park.lat, park.lng], {
        icon: createMarkerIcon(categoryColor(gettingToCategory))
    }).addTo(map);

    marker.bindPopup(`
        <div style="min-width: 220px;">
            <h3>${park.name}</h3>
            <p style="margin: 0 0 0.5rem 0; color: #666; font-size: 13px;">${park.state}</p>
            <p style="margin: 0; font-size: 12px; color: #999;">Getting there: ${gettingToScore}/5 (${gettingToCategory}) — click for full details</p>
        </div>
    `);

    marker.on('click', () => selectPark(park, { pan: false }));

    markerGroup[park.name] = {
        marker,
        name: park.name,
        state: park.state,
        states: (park.state || '').split('/').map(s => s.trim()),
        gettingToScore,
        gettingAroundScore,
        combinedScore,
        gettingToCategory,
        gettingAroundCategory,
        combinedCategory,
        hasShuttle: !!(park.shuttle && park.shuttle.toLowerCase() !== 'none'),
        hasAmtrak: !!(park.amtrak && park.amtrak.toLowerCase() !== 'none' && park.amtrak.trim() !== ''),
        isYearRound: park.seasonality_score >= 0
    };
});

let currentColorMode = 'gettingTo';
const colorModeLabel = {
    gettingTo: 'Getting there',
    gettingAround: 'Getting around',
    combined: 'Combined score'
};

function recolorMarkers() {
    Object.values(markerGroup).forEach(entry => {
        const category = entry[currentColorMode + 'Category'];
        const score = entry[currentColorMode + 'Score'];
        entry.marker.setIcon(createMarkerIcon(categoryColor(category)));
        entry.marker.setPopupContent(`
            <div style="min-width: 220px;">
                <h3>${entry.name}</h3>
                <p style="margin: 0 0 0.5rem 0; color: #666; font-size: 13px;">${entry.state}</p>
                <p style="margin: 0; font-size: 12px; color: #999;">${colorModeLabel[currentColorMode]}: ${score}/5 (${category}) — click for full details</p>
            </div>
        `);
    });
}

window.setColorMode = function (mode, btn) {
    currentColorMode = mode;
    document.querySelectorAll('.color-mode-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    recolorMarkers();
};

const parkListEl = document.getElementById('park-list');
parksData.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.name;
    parkListEl.appendChild(opt);
});

const stateFilterEl = document.getElementById('state-filter');
const uniqueStates = new Set();
parksData.forEach(p => {
    (p.state || '').split('/').forEach(s => {
        const trimmed = s.trim();
        if (trimmed) uniqueStates.add(trimmed);
    });
});
Array.from(uniqueStates).sort().forEach(state => {
    const opt = document.createElement('option');
    opt.value = state;
    opt.textContent = state;
    stateFilterEl.appendChild(opt);
});

window.filterByState = function (value) {
    activeFilters.state = value;
    applyFilters();
    updateParkInStateDropdown(value);
};

function updateParkInStateDropdown(stateValue) {
    const sel = document.getElementById('park-in-state');
    sel.innerHTML = '<option value="">Jump to a park...</option>';

    if (stateValue === 'all') {
        sel.classList.add('hidden');
        return;
    }

    const matches = parksData
        .filter(p => (p.state || '').split('/').map(s => s.trim()).includes(stateValue))
        .sort((a, b) => a.name.localeCompare(b.name));

    matches.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.name;
        opt.textContent = p.name;
        sel.appendChild(opt);
    });

    sel.classList.remove('hidden');
}

window.jumpToParkInState = function (name) {
    if (!name) return;
    const park = parksData.find(p => p.name === name);
    if (park) selectPark(park);
};

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

window.toggleAbout = function () {
    document.getElementById('about-overlay').classList.toggle('hidden');
};

(function loadFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('park');
    if (!slug) return;
    const match = parksData.find(p => slugify(p.name) === slug);
    if (match) {
        selectPark(match, { updateUrl: false });
    }
})();

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

// Shows, in the sidebar, how to get from this airport to each park it
// serves — reusing each park's existing researched `notes` field rather
// than fabricating new route descriptions.
function showAirportInfo(airport) {
    const parkInfo = document.getElementById('park-info');
    document.getElementById('park-name').textContent = `${airport.name} (${airport.code})`;
    document.getElementById('park-location').textContent = 'Airport';

    const servedNames = airport.servesParks.split(',').map(s => s.trim());
    const cards = servedNames.map(name => {
        const park = parksByName[name];
        if (!park) return '';
        const safeName = name.replace(/'/g, "\\'");
        const airportLine = park.airport
            ? `<div style="font-size: 12px; color: #666; margin-bottom: 6px;">&#9992; ${park.airport}</div>`
            : '';
        const notesText = park.notes && park.notes.trim()
            ? park.notes
            : 'See full park details for transit information.';
        return `
            <div style="background: #f8f9fa; padding: 12px; border-radius: 6px; margin-bottom: 10px;">
                <div style="font-size: 14px; font-weight: bold; color: #2c3e50; margin-bottom: 4px;">${park.name}</div>
                ${airportLine}
                <div style="font-size: 12px; line-height: 1.6; color: #444; margin-bottom: 8px;">${notesText}</div>
                <button onclick="jumpToParkFromAirport('${safeName}')" style="font-size: 12px; padding: 6px 10px; background: #2c3e50; color: white; border: none; border-radius: 4px; cursor: pointer;">View full park details</button>
            </div>
        `;
    }).join('');

    document.getElementById('park-details').innerHTML = `
        <div style="font-size: 12px; color: #666; margin-bottom: 12px;">
            Getting from ${airport.name} to nearby parks:
        </div>
        ${cards}
    `;

    parkInfo.classList.remove('hidden');
    document.getElementById('sidebar').classList.add('sheet-open');
}

window.jumpToParkFromAirport = function (name) {
    const park = parksByName[name];
    if (park) selectPark(park);
};

transitPoints.airports.forEach(a => {
    const marker = L.marker([a.lat, a.lng], {
        icon: createTransitIcon('&#9992;', '#3498db')
    }).addTo(airportLayer);

    marker.on('click', () => {
        drawConnections(a.lat, a.lng, a.servesParks, '#3498db');
        showAirportInfo(a);
    });
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

const SERVICE_NAMES = {
    "abqsunport.com": "Albuquerque Sunport",
    "amtrak.com": "Amtrak",
    "yarts.com": "YARTS (Yosemite Transit)",
    "nationalparkexpress.com": "National Park Express",
    "greyhound.com": "Greyhound",
    "basin-transit.com": "Basin Transit",
    "alaskarailroad.com": "Alaska Railroad",
    "interioralaskabusline.com": "Interior Alaska Bus Line",
    "kennicottshuttle.com": "Kennicott Shuttle",
    "visalia.gov": "Visalia Transit",
    "sequoiashuttle.com": "Sequoia Shuttle",
    "islandpackers.com": "Island Packers",
    "sunline.org": "SunLine Transit",
    "luxcoachamerica.com": "Lux Coach America",
    "tornadobus.com": "Tornado Bus Company",
    "webtec.tornadobus.com": "Tornado Bus Company",
    "mysouthshoreline.com": "South Shore Line",
    "transitchicago.com": "Chicago Transit Authority",
    "riderta.com": "RTA (Akron)",
    "ridebustang.com": "Bustang",
    "alaskatravel.com": "Alaska Travel",
    "mountainstatesexpress.com": "Mountain States Express",
    "saltlakeexpress.com": "Salt Lake Express",
    "shop.greyhound.com": "Greyhound"
};

function serviceNameFromUrl(url) {
    try {
        const host = new URL(url).hostname.replace(/^www\./, '');
        if (SERVICE_NAMES[host]) return SERVICE_NAMES[host];
        const base = host.split('.').slice(0, -1).join('.') || host;
        return base
            .split(/[-_.]/)
            .filter(Boolean)
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ');
    } catch (e) {
        return 'Website';
    }
}

function linkOrText(label, url) {
    if (!label) return url ? `<a href="${url}" target="_blank" rel="noopener">${serviceNameFromUrl(url)}</a>` : '';
    if (!url) return label;
    return `<a href="${url}" target="_blank" rel="noopener">${label}</a>`;
}

// Turns raw URLs inside researched route descriptions into real clickable
// links (labeled by service name), leaving the surrounding text untouched.
function linkifyUrls(text) {
    if (!text) return '';
    return text.replace(/https?:\/\/[^\s]+/g, url => {
        const clean = url.replace(/[.,;)]+$/, '');
        return `<a href="${clean}" target="_blank" rel="noopener">${serviceNameFromUrl(clean)}</a>`;
    });
}

// Looks up a researched connection between two parks (order-independent).
// Returns null if this pair wasn't part of the researched close-pairs list.
function getConnection(nameA, nameB) {
    const [p1, p2] = [nameA, nameB].sort();
    return parkConnections.find(c => c.park1 === p1 && c.park2 === p2) || null;
}

function showParkInfo(park) {
    const parkInfo = document.getElementById('park-info');
    document.getElementById('park-name').textContent = park.name;
    document.getElementById('park-location').textContent = park.state;

    const gettingToScore = getGettingToScore(park);
    const gettingAroundScore = getGettingAroundScore(park);
    const toCat = getGettingToCategory(gettingToScore);
    const aroundCat = getGettingAroundCategory(gettingAroundScore);
    const airportScore = getAirportScore(park);
    const trainScore = getTrainScore(park);
    const groundScore = Math.round((park.ground_transit_score || 0) * 2 * 10) / 10;

    document.getElementById('park-details').innerHTML = `
        <div style="background: #f8f9fa; padding: 12px; border-radius: 6px; margin-bottom: 10px;">
            <div style="font-size: 11px; color: #666; text-transform: uppercase; margin-bottom: 4px;">Getting To the Park</div>
            <div style="font-size: 22px; font-weight: bold; color: ${categoryColor(toCat)}; margin-bottom: 4px;">${gettingToScore}/5</div>
            <div style="font-size: 13px; margin-bottom: 8px;">${categoryLabel(toCat, 'to')}</div>
            <div style="font-size: 12px; line-height: 1.7; color: #444;">
                &#9992; Nearest airport: ${airportScore}/1.5 — ${linkOrText(park.airport || 'N/A', park.airport_website)}<br>
                &#128646; Train access: ${trainScore}/1.5 — ${linkOrText(park.amtrak || 'Not available', park.train_website)}<br>
                &#128652; Ground transit: ${groundScore}/2.0${park.ground_transit_links && park.ground_transit_links.length ? ' — ' + park.ground_transit_links.map(u => `<a href="${u}" target="_blank" rel="noopener">${serviceNameFromUrl(u)}</a>`).join(', ') : ''}
            </div>
        </div>

        <div style="background: #f8f9fa; padding: 12px; border-radius: 6px; margin-bottom: 12px;">
            <div style="font-size: 11px; color: #666; text-transform: uppercase; margin-bottom: 4px;">Getting Around the Park</div>
            <div style="font-size: 22px; font-weight: bold; color: ${categoryColor(aroundCat)}; margin-bottom: 4px;">${gettingAroundScore}/5</div>
            <div style="font-size: 13px; margin-bottom: 8px;">${categoryLabel(aroundCat, 'around')}</div>
            <div style="font-size: 12px; line-height: 1.7; color: #444;">
                &#128652; In-park shuttle: ${park.intra_transit_score}/2.0 — ${linkOrText(park.shuttle || 'None', park.shuttle_website)}<br>
                &#128197; Seasonality: ${park.seasonality_score > 0 ? '+' : ''}${park.seasonality_score} (${park.seasonality_score >= 0 ? 'year-round' : 'seasonal only'})
            </div>
        </div>

        <div style="border-top: 1px solid #ddd; padding-top: 12px; font-size: 12px; line-height: 1.6; color: #555;">
            ${park.notes || ''}
        </div>

        <div style="margin-top: 12px; background: #f8f9fa; padding: 12px; border-radius: 6px;">
            <div style="font-size: 11px; color: #666; text-transform: uppercase; margin-bottom: 8px;">Nearby Parks with Ground Transit (score 1+)</div>
            ${(() => {
                const nearby = getNearbyParksWithGroundTransit(park);
                if (nearby.length === 0) {
                    return '<div style="font-size: 12px; color: #888;">No nearby parks currently meet this threshold.</div>';
                }
                return nearby.map(item => {
                    const safeName = item.park.name.replace(/'/g, "\\'");
                    const miles = Math.round(item.distance);
                    const conn = getConnection(park.name, item.park.name);
                    let routeHtml = '';
                    if (conn) {
                        if (conn.hasRoute) {
                            routeHtml = `<div style="font-size: 12px; color: #444; line-height: 1.5; margin-top: 6px;">${linkifyUrls(conn.route)}</div>`;
                        } else {
                            routeHtml = `<div style="font-size: 11px; color: #999; margin-top: 4px;">No direct public transit connection currently known between these two.</div>`;
                        }
                    }
                    return `
                        <div style="padding: 8px 0; border-bottom: 1px solid #eee; font-size: 12px;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span>${item.park.name} <span style="color: #999;">(${miles} mi)</span></span>
                                <button onclick="jumpToParkFromAirport('${safeName}')" style="font-size: 11px; padding: 4px 8px; background: #2c3e50; color: white; border: none; border-radius: 4px; cursor: pointer;">View</button>
                            </div>
                            ${routeHtml}
                        </div>
                    `;
                }).join('');
            })()}
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

const CATEGORIES = ['easy', 'moderate', 'difficult'];
const activeFilters = {
    gettingTo: new Set(CATEGORIES),
    gettingAround: new Set(CATEGORIES),
    state: 'all',
    shuttleOnly: false,
    amtrakOnly: false,
    yearRoundOnly: false
};

function applyFilters() {
    Object.keys(markerGroup).forEach(name => {
        const entry = markerGroup[name];
        let visible = activeFilters.gettingTo.has(entry.gettingToCategory) &&
            activeFilters.gettingAround.has(entry.gettingAroundCategory);

        if (visible && activeFilters.state !== 'all' && !entry.states.includes(activeFilters.state)) visible = false;
        if (visible && activeFilters.shuttleOnly && !entry.hasShuttle) visible = false;
        if (visible && activeFilters.amtrakOnly && !entry.hasAmtrak) visible = false;
        if (visible && activeFilters.yearRoundOnly && !entry.isYearRound) visible = false;

        if (visible) {
            if (!map.hasLayer(entry.marker)) map.addLayer(entry.marker);
        } else {
            if (map.hasLayer(entry.marker)) map.removeLayer(entry.marker);
        }
    });
    updateFilterBadge();
}

function updateFilterBadge() {
    const excluded = (CATEGORIES.length - activeFilters.gettingTo.size) +
        (CATEGORIES.length - activeFilters.gettingAround.size) +
        (activeFilters.state !== 'all' ? 1 : 0) +
        (activeFilters.shuttleOnly ? 1 : 0) +
        (activeFilters.amtrakOnly ? 1 : 0) +
        (activeFilters.yearRoundOnly ? 1 : 0);

    const badge = document.getElementById('filter-badge');
    if (excluded > 0) {
        badge.textContent = excluded;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
}

document.querySelectorAll('.filter-btn:not(.color-mode-btn)').forEach(btn => {
    const onclick = btn.getAttribute('onclick') || '';
    if (onclick.includes('filterByCategory')) {
        btn.classList.add('active');
    }
});

window.filterByCategory = function (dimension, category, btn) {
    const set = activeFilters[dimension];
    if (set.has(category)) {
        set.delete(category);
        btn.classList.remove('active');
    } else {
        set.add(category);
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

window.clearFilters = function () {
    activeFilters.gettingTo = new Set(CATEGORIES);
    activeFilters.gettingAround = new Set(CATEGORIES);
    activeFilters.state = 'all';
    document.getElementById('state-filter').value = 'all';
    updateParkInStateDropdown('all');
    activeFilters.shuttleOnly = false;
    activeFilters.amtrakOnly = false;
    activeFilters.yearRoundOnly = false;
    document.querySelectorAll('.filter-btn:not(.color-mode-btn)').forEach(btn => {
        const onclick = btn.getAttribute('onclick') || '';
        btn.classList.toggle('active', onclick.includes('filterByCategory'));
    });
    applyFilters();
};

window.toggleFilterDrawer = function () {
    document.getElementById('filters').classList.toggle('open');
};

window.setFilterTab = function (tab, btn) {
    document.querySelectorAll('.filter-tab-panel').forEach(panel => {
        panel.classList.toggle('hidden', panel.getAttribute('data-tab') !== tab);
    });
    document.querySelectorAll('.filter-tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
};

updateFilterBadge();
