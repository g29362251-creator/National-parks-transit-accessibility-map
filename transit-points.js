const transitPoints = {
    airports: [
        {
            code: "ABQ",
            name: "Albuquerque International Sunport",
            lat: 35.0402,
            lng: -106.6092,
            servesParks: "Mesa Verde National Park"
        },
        {
            code: "ANC",
            name: "Ted Stevens Anchorage International",
            lat: 61.1743,
            lng: -149.9982,
            servesParks: "Kenai Fjords National Park, Wrangell-St.Elias National Park, Lake Clark National Park, Katmai National Park"
        },
        {
            code: "BGR",
            name: "Bangor International",
            lat: 44.8074,
            lng: -68.8281,
            servesParks: "Acadia National Park"
        },
        {
            code: "BNA",
            name: "Nashville International",
            lat: 36.1263,
            lng: -86.6774,
            servesParks: "Mammoth Caves National Park"
        },
        {
            code: "CAK",
            name: "Akron-Canton Airport",
            lat: 40.9161,
            lng: -81.4422,
            servesParks: "Cuyahoga Valley National Park"
        },
        {
            code: "CLE",
            name: "Cleveland Hopkins International",
            lat: 41.4117,
            lng: -81.8498,
            servesParks: "Cuyahoga Valley National Park"
        },
        {
            code: "CLT",
            name: "Charlotte Douglas International",
            lat: 35.2144,
            lng: -80.9473,
            servesParks: "Congaree National Park"
        },
        {
            code: "CRW",
            name: "Yeager Airport (Charleston, WV)",
            lat: 38.3731,
            lng: -81.5932,
            servesParks: "New River Gorge National Park"
        },
        {
            code: "DEN",
            name: "Denver International",
            lat: 39.8561,
            lng: -104.6737,
            servesParks: "Rocky Mountain Natinoal Park, Great Sand Dunes National Park"
        },
        {
            code: "DIK",
            name: "Dickinson Theodore Roosevelt Regional",
            lat: 46.7973,
            lng: -102.8021,
            servesParks: "Theodore Roosevelt National Park"
        },
        {
            code: "ELP",
            name: "El Paso International",
            lat: 31.8072,
            lng: -106.3781,
            servesParks: "White Sands National Park, Carlsbad Caverns National Park, Guadalupe Mountains National Park"
        },
        {
            code: "EYW",
            name: "Key West International",
            lat: 24.5561,
            lng: -81.7596,
            servesParks: "Dry Tortugas National Park"
        },
        {
            code: "FAI",
            name: "Fairbanks International",
            lat: 64.8151,
            lng: -147.856,
            servesParks: "Denali National Park, Gates of the Arctic National Park"
        },
        {
            code: "FAT",
            name: "Fresno Yosemite International",
            lat: 36.7762,
            lng: -119.7181,
            servesParks: "Yosemite National Park, Sequoia National Park, Kings Canyon National park"
        },
        {
            code: "FCA",
            name: "Glacier Park International (Kalispell)",
            lat: 48.3105,
            lng: -114.256,
            servesParks: "Glacier National Park"
        },
        {
            code: "GJT",
            name: "Grand Junction Regional",
            lat: 39.1224,
            lng: -108.5267,
            servesParks: "Black Canyon Of The Gunnison National Park"
        },
        {
            code: "IAD",
            name: "Washington Dulles International",
            lat: 38.9531,
            lng: -77.4565,
            servesParks: "Shenandoah National Park"
        },
        {
            code: "INL",
            name: "Falls International (Intl Falls)",
            lat: 48.5661,
            lng: -93.4033,
            servesParks: "Voyageurs National Park"
        },
        {
            code: "ITO",
            name: "Hilo International",
            lat: 19.7203,
            lng: -155.0485,
            servesParks: "Hawaii Volcanoes National Park"
        },
        {
            code: "JAC",
            name: "Jackson Hole Airport",
            lat: 43.6073,
            lng: -110.7377,
            servesParks: "Grand Teton National Park, Yellowstone National Park"
        },
        {
            code: "JNU",
            name: "Juneau International",
            lat: 58.3549,
            lng: -134.5763,
            servesParks: "Glacier Bay National Park"
        },
        {
            code: "LAS",
            name: "Harry Reid International (Las Vegas)",
            lat: 36.084,
            lng: -115.1537,
            servesParks: "Death Valley National park, Zion National Park, Bryce Canyon National Park"
        },
        {
            code: "LAX",
            name: "Los Angeles International",
            lat: 33.9416,
            lng: -118.4085,
            servesParks: "Channel Islands national park"
        },
        {
            code: "LIT",
            name: "Bill & Hillary Clinton National (Little Rock)",
            lat: 34.7294,
            lng: -92.2243,
            servesParks: "Hot Springs National Park"
        },
        {
            code: "MAF",
            name: "Midland International",
            lat: 31.9425,
            lng: -102.2019,
            servesParks: "Big Bend National Park"
        },
        {
            code: "MDW",
            name: "Chicago Midway International",
            lat: 41.7868,
            lng: -87.7522,
            servesParks: "Indiana Dunes National Park"
        },
        {
            code: "MFR",
            name: "Rogue Valley International (Medford)",
            lat: 42.3742,
            lng: -122.8735,
            servesParks: "Redwood National and State Parks, Crater Lake National Park"
        },
        {
            code: "MIA",
            name: "Miami International",
            lat: 25.7959,
            lng: -80.287,
            servesParks: "Biscayne National Park, Everglades national park"
        },
        {
            code: "OGG",
            name: "Kahului Airport",
            lat: 20.8986,
            lng: -156.4305,
            servesParks: "Haleakala National Park"
        },
        {
            code: "OTZ",
            name: "Ralph Wien Memorial (Kotzebue)",
            lat: 66.8847,
            lng: -162.5994,
            servesParks: "Kobuk Valley National Park"
        },
        {
            code: "PHX",
            name: "Phoenix Sky Harbor International",
            lat: 33.4373,
            lng: -112.0078,
            servesParks: "Grand Canyon National Park, Petrified Forest National Park"
        },
        {
            code: "PPG",
            name: "Pago Pago International",
            lat: -14.331,
            lng: -170.7108,
            servesParks: "American Samoa National Park"
        },
        {
            code: "PSP",
            name: "Palm Springs International",
            lat: 33.8297,
            lng: -116.507,
            servesParks: "Joshua Tree National Park"
        },
        {
            code: "RAP",
            name: "Rapid City Regional",
            lat: 44.0453,
            lng: -103.0574,
            servesParks: "Wind Cave National Park, Badlands National Park"
        },
        {
            code: "SDF",
            name: "Louisville Muhammad Ali International",
            lat: 38.1744,
            lng: -85.736,
            servesParks: "Mammoth Caves National Park"
        },
        {
            code: "SEA",
            name: "Seattle-Tacoma International",
            lat: 47.4502,
            lng: -122.3088,
            servesParks: "Mount Rainier national park, North Cascades National Park, Olympic National Park"
        },
        {
            code: "SJC",
            name: "San Jose (Mineta) International",
            lat: 37.3639,
            lng: -121.9289,
            servesParks: "Pinnacles National Park"
        },
        {
            code: "SLC",
            name: "Salt Lake City International",
            lat: 40.7899,
            lng: -111.9791,
            servesParks: "Great Basin National Park, Arches National Park, Canyonlands National Park, Capitol Reef National Park"
        },
        {
            code: "SMF",
            name: "Sacramento International",
            lat: 38.6954,
            lng: -121.5908,
            servesParks: "Lassen Volcanic National Park"
        },
        {
            code: "STL",
            name: "St. Louis Lambert International",
            lat: 38.7487,
            lng: -90.37,
            servesParks: "Gateway National Park"
        },
        {
            code: "STT",
            name: "Cyril E. King Airport (St. Thomas)",
            lat: 18.3373,
            lng: -64.9734,
            servesParks: "Virgin Islands National Park"
        },
        {
            code: "TUS",
            name: "Tucson International",
            lat: 32.1161,
            lng: -110.941,
            servesParks: "Saguaro National Park"
        },
        {
            code: "TYS",
            name: "McGhee Tyson Airport (Knoxville)",
            lat: 35.811,
            lng: -83.994,
            servesParks: "Great Smoky Mountains National Park"
        },
        {
            code: "YQT",
            name: "Thunder Bay Airport",
            lat: 48.3719,
            lng: -89.3239,
            servesParks: "Isle Royale National Park"
        },
    ],
    amtrak: [
        {
            name: "Alpine, TX Amtrak",
            lat: 30.3588,
            lng: -103.6614,
            servesParks: "Big Bend National Park"
        },
        {
            name: "Anchorage (Alaska Railroad)",
            lat: 61.2181,
            lng: -149.9003,
            servesParks: "Wrangell-St.Elias National Park, Lake Clark National Park, Katmai National Park"
        },
        {
            name: "Bakersfield Amtrak",
            lat: 35.3733,
            lng: -119.0187,
            servesParks: "Death Valley National park"
        },
        {
            name: "Brunswick, ME Amtrak",
            lat: 43.9145,
            lng: -69.9653,
            servesParks: "Acadia National Park"
        },
        {
            name: "Charlottesville Amtrak",
            lat: 38.0293,
            lng: -78.4767,
            servesParks: "Shenandoah National Park"
        },
        {
            name: "Cleveland Amtrak",
            lat: 41.4993,
            lng: -81.6944,
            servesParks: "Cuyahoga Valley National Park"
        },
        {
            name: "Columbia, SC Amtrak",
            lat: 34.0007,
            lng: -81.0348,
            servesParks: "Congaree National Park"
        },
        {
            name: "Denali (Alaska Railroad)",
            lat: 63.7229,
            lng: -148.9188,
            servesParks: "Denali National Park"
        },
        {
            name: "Denver Union Station",
            lat: 39.7527,
            lng: -104.9998,
            servesParks: "Great Sand Dunes National Park"
        },
        {
            name: "Dune Park Station",
            lat: 41.6378,
            lng: -87.0847,
            servesParks: "Indiana Dunes National Park"
        },
        {
            name: "East Glacier Amtrak",
            lat: 48.4459,
            lng: -113.2385,
            servesParks: "Glacier National Park"
        },
        {
            name: "El Paso Amtrak",
            lat: 31.7599,
            lng: -106.489,
            servesParks: "White Sands National Park, Carlsbad Caverns National Park, Guadalupe Mountains National Park"
        },
        {
            name: "Fairbanks (Alaska Railroad)",
            lat: 64.8378,
            lng: -147.7164,
            servesParks: "Gates of the Arctic National Park, Kobuk Valley National Park"
        },
        {
            name: "Flagstaff Amtrak",
            lat: 35.1983,
            lng: -111.6513,
            servesParks: "Grand Canyon National Park, Bryce Canyon National Park"
        },
        {
            name: "Fort Morgan, CO Amtrak",
            lat: 40.25,
            lng: -103.7996,
            servesParks: "Wind Cave National Park, Badlands National Park"
        },
        {
            name: "Fulton, KY Amtrak",
            lat: 36.5395,
            lng: -88.8778,
            servesParks: "Mammoth Caves National Park"
        },
        {
            name: "Gallup Amtrak",
            lat: 35.5281,
            lng: -108.7426,
            servesParks: "Mesa Verde National Park"
        },
        {
            name: "Granby, CO Amtrak",
            lat: 40.0805,
            lng: -105.9394,
            servesParks: "Rocky Mountain Natinoal Park"
        },
        {
            name: "Grand Junction Amtrak",
            lat: 39.0639,
            lng: -108.5506,
            servesParks: "Black Canyon Of The Gunnison National Park"
        },
        {
            name: "Green River, UT Amtrak",
            lat: 38.993,
            lng: -110.1546,
            servesParks: "Arches National Park, Canyonlands National Park"
        },
        {
            name: "Greenville, SC Amtrak",
            lat: 34.8526,
            lng: -82.394,
            servesParks: "Great Smoky Mountains National Park"
        },
        {
            name: "Hanford Amtrak",
            lat: 36.3302,
            lng: -119.6457,
            servesParks: "Sequoia National Park, Kings Canyon National park"
        },
        {
            name: "Helper, UT Amtrak",
            lat: 39.6841,
            lng: -110.8557,
            servesParks: "Capitol Reef National Park"
        },
        {
            name: "Hinton, WV Amtrak",
            lat: 37.6706,
            lng: -80.8909,
            servesParks: "New River Gorge National Park"
        },
        {
            name: "Klamath Falls Amtrak",
            lat: 42.2249,
            lng: -121.7817,
            servesParks: "Redwood National and State Parks, Crater Lake National Park"
        },
        {
            name: "Malvern, AR Amtrak",
            lat: 34.3623,
            lng: -92.8148,
            servesParks: "Hot Springs National Park"
        },
        {
            name: "Merced Amtrak",
            lat: 37.3022,
            lng: -120.483,
            servesParks: "Yosemite National Park"
        },
        {
            name: "Miami Amtrak",
            lat: 25.7781,
            lng: -80.21,
            servesParks: "Biscayne National Park, Dry Tortugas National Park, Everglades national park"
        },
        {
            name: "Mount Vernon, WA Amtrak",
            lat: 48.4212,
            lng: -122.334,
            servesParks: "North Cascades National Park"
        },
        {
            name: "Ogden Amtrak (Frontrunner)",
            lat: 41.223,
            lng: -111.9738,
            servesParks: "Grand Teton National Park, Yellowstone National Park"
        },
        {
            name: "Palm Springs, CA Amtrak",
            lat: 33.8151,
            lng: -116.5459,
            servesParks: "Joshua Tree National Park"
        },
        {
            name: "Prince, WV Amtrak",
            lat: 37.81,
            lng: -80.96,
            servesParks: "Glacier Bay National Park, New River Gorge National Park"
        },
        {
            name: "Provo Amtrak",
            lat: 40.2338,
            lng: -111.6585,
            servesParks: "Zion National Park"
        },
        {
            name: "Redding Amtrak",
            lat: 40.5865,
            lng: -122.3917,
            servesParks: "Lassen Volcanic National Park"
        },
        {
            name: "Salinas Amtrak",
            lat: 36.6777,
            lng: -121.6555,
            servesParks: "Pinnacles National Park"
        },
        {
            name: "Salt Lake City Amtrak",
            lat: 40.7596,
            lng: -111.901,
            servesParks: "Great Basin National Park"
        },
        {
            name: "Seattle King Street Station",
            lat: 47.5989,
            lng: -122.3301,
            servesParks: "Olympic National Park"
        },
        {
            name: "Seward (Alaska Railroad)",
            lat: 60.1042,
            lng: -149.4422,
            servesParks: "Kenai Fjords National Park"
        },
        {
            name: "Sioux Lookout (VIA Rail)",
            lat: 50.1001,
            lng: -91.9173,
            servesParks: "Voyageurs National Park"
        },
        {
            name: "St. Louis Gateway Station",
            lat: 38.6303,
            lng: -90.1998,
            servesParks: "Gateway National Park"
        },
        {
            name: "Tacoma Amtrak",
            lat: 47.2529,
            lng: -122.4443,
            servesParks: "Mount Rainier national park"
        },
        {
            name: "Thurmond, WV Amtrak",
            lat: 38.0876,
            lng: -81.0784,
            servesParks: "New River Gorge National Park"
        },
        {
            name: "Tucson Amtrak",
            lat: 32.211,
            lng: -110.9636,
            servesParks: "Saguaro National Park"
        },
        {
            name: "Ventura Amtrak",
            lat: 34.2746,
            lng: -119.2932,
            servesParks: "Channel Islands national park"
        },
        {
            name: "West Glacier Amtrak",
            lat: 48.495,
            lng: -113.9812,
            servesParks: "Glacier National Park"
        },
        {
            name: "Williston, ND Amtrak",
            lat: 48.147,
            lng: -103.618,
            servesParks: "Theodore Roosevelt National Park"
        },
        {
            name: "Winslow, AZ Amtrak",
            lat: 35.0242,
            lng: -110.6974,
            servesParks: "Petrified Forest National Park"
        },
    ]
};
