const parkConnections = [
    {
        park1: "Bryce Canyon National Park",
        park2: "Capitol Reef National Park",
        distance: 66,
        hasRoute: false,
        route: null
    },
    {
        park1: "Canyonlands National Park",
        park2: "Capitol Reef National Park",
        distance: 75,
        hasRoute: false,
        route: null
    },
    {
        park1: "Kings Canyon National park",
        park2: "Yosemite National Park",
        distance: 89,
        hasRoute: false,
        route: null
    },
    {
        park1: "Death Valley National park",
        park2: "Sequoia National Park",
        distance: 95,
        hasRoute: false,
        route: null
    },
    {
        park1: "Arches National Park",
        park2: "Capitol Reef National Park",
        distance: 97,
        hasRoute: false,
        route: null
    },
    {
        park1: "Grand Canyon National Park",
        park2: "Zion National Park",
        distance: 98,
        hasRoute: true,
        route: "Take the national parks express shuttle from Grand Canyon to Las Vegas, and then from Las Vegas to Zion National Park. Use the following website to book both legs: https://nationalparkexpress.com/shuttle-service/"
    },
    {
        park1: "Guadalupe Mountains National Park",
        park2: "White Sands National Park",
        distance: 98,
        hasRoute: false,
        route: null
    },
    {
        park1: "Death Valley National park",
        park2: "Kings Canyon National park",
        distance: 99,
        hasRoute: false,
        route: null
    },
    {
        park1: "Arches National Park",
        park2: "Black Canyon Of The Gunnison National Park",
        distance: 100,
        hasRoute: false,
        route: null
    },
    {
        park1: "Black Canyon Of The Gunnison National Park",
        park2: "Mesa Verde National Park",
        distance: 101,
        hasRoute: false,
        route: null
    },
    {
        park1: "Carlsbad Caverns National Park",
        park2: "White Sands National Park",
        distance: 102,
        hasRoute: false,
        route: null
    },
    {
        park1: "Bryce Canyon National Park",
        park2: "Grand Canyon National Park",
        distance: 105,
        hasRoute: true,
        route: "Take the national parks express shuttle from the Grand Canyon to LAs Vegas. Then take the express shuttle from Las Vegas to Bryce Canyon National Park. Book here: https://nationalparkexpress.com/shuttle-service/"
    },
    {
        park1: "Canyonlands National Park",
        park2: "Mesa Verde National Park",
        distance: 107,
        hasRoute: false,
        route: null
    },
    {
        park1: "Sequoia National Park",
        park2: "Yosemite National Park",
        distance: 109,
        hasRoute: true,
        route: "Take the Mariposa YARTS bus from Mariposa Grove to the Fresno Amtrak station. Book here: https://tickets.yarts.com/search-result/?wbtm_form_nonce=70a041d1e7&_wp_http_referer=%2Fsearch-result%2F%3Fwbtm_form_nonce%3D45bbce216a%26bus_start_route%3DMariposa%2BGrove%26bus_end_route%3DFresno%2BAmtrak%26j_date%3D2026-08-29%26r_date&bus_start_route=Mariposa+Grove&bus_end_route=Fresno+Amtrak&j_date=2026-08-30&r_date=, th, then take the greyhound from the Fresno bus station to Visalia Book here: https://shop.greyhound.com/search?departureCity=d0180f92-2583-43d1-8049-1e0abaa2aef4&arrivalCity=4cb1590a-51ce-4e28-9ea1-a0517b0584fb&route=Fresno%2C+CA-Visalia%2C+CA&rideDate=31.08.2026&adult=1&_locale=en_US&departureCountryCode=US&arrivalCountryCode=US&features%5Bfeature.enable_distribusion%5D=1&features%5Bfeature.train_cities_only%5D=0&features%5Bfeature.station_search%5D=0&features%5Bfeature.station_search_recommendation%5D=0&features%5Bfeature.darken_page%5D=1&atb_pdid=31015fe9-b382-449c-9419-c248e407f713&_sp=6b364933-72c7-495d-88f0-8c40f5a6c133&_spnuid=b40d6603-575c-4c05-a00f-8befa41c9c9a_1788055986660. Then take the sequoia shuttle from Visalia to  Sequoia National park. Book here: https://www.visalia.gov/360/Sequoia-Shuttle"
    },
    {
        park1: "Mount Rainier national park",
        park2: "North Cascades National Park",
        distance: 110,
        hasRoute: false,
        route: null
    },
    {
        park1: "Capitol Reef National Park",
        park2: "Zion National Park",
        distance: 113,
        hasRoute: false,
        route: null
    },
    {
        park1: "Haleakala National Park",
        park2: "Hawaii Volcanoes National Park",
        distance: 114,
        hasRoute: false,
        route: null
    },
    {
        park1: "Arches National Park",
        park2: "Mesa Verde National Park",
        distance: 116,
        hasRoute: false,
        route: null
    },
    {
        park1: "Black Canyon Of The Gunnison National Park",
        park2: "Canyonlands National Park",
        distance: 118,
        hasRoute: false,
        route: null
    },
    {
        park1: "Black Canyon Of The Gunnison National Park",
        park2: "Great Sand Dunes National Park",
        distance: 128,
        hasRoute: false,
        route: null
    },
    {
        park1: "Pinnacles National Park",
        park2: "Yosemite National Park",
        distance: 131,
        hasRoute: false,
        route: null
    },
    {
        park1: "Kenai Fjords National Park",
        park2: "Lake Clark National Park",
        distance: 133,
        hasRoute: false,
        route: null
    },
    {
        park1: "Great Basin National Park",
        park2: "Zion National Park",
        distance: 135,
        hasRoute: false,
        route: null
    },
    {
        park1: "Bryce Canyon National Park",
        park2: "Canyonlands National Park",
        distance: 135,
        hasRoute: false,
        route: null
    },
    {
        park1: "Lassen Volcanic National Park",
        park2: "Redwood National and State Parks",
        distance: 140,
        hasRoute: false,
        route: null
    },
    {
        park1: "Congaree National Park",
        park2: "Great Smoky Mountains National Park",
        distance: 142,
        hasRoute: false,
        route: null
    },
    {
        park1: "Kings Canyon National park",
        park2: "Pinnacles National Park",
        distance: 143,
        hasRoute: false,
        route: null
    },
    {
        park1: "Pinnacles National Park",
        park2: "Sequoia National Park",
        distance: 145,
        hasRoute: false,
        route: null
    },
    {
        park1: "Dry Tortugas National Park",
        park2: "Everglades national park",
        distance: 145,
        hasRoute: false,
        route: null
    },
    {
        park1: "Bryce Canyon National Park",
        park2: "Great Basin National Park",
        distance: 147,
        hasRoute: false,
        route: null
    },
    {
        park1: "New River Gorge National Park",
        park2: "Shenandoah National Park",
        distance: 152,
        hasRoute: false,
        route: null
    },
    {
        park1: "Channel Islands national park",
        park2: "Sequoia National Park",
        distance: 178,
        hasRoute: true,
        route: "Start by taking the Visalia bus from Giant Forest Museum station to the Visalia transit center. Book here: https://www.sequoiashuttle.com/ From there, take the greyhound from Visalia to the Bakersfield Amtrak station. Book here: https://www.greyhound.com/. From there, take Amtrak thruway service from Bakersfield to Oxnard. Book here: https://www.amtrak.com/tickets/departure.html. Finally, take the Oxnard ferry from Oxnard to East Anacapa Island. Book here: https://www.islandpackers.com/anacapa-island/"
    },
    {
        park1: "Channel Islands national park",
        park2: "Joshua Tree National Park",
        distance: 202,
        hasRoute: true,
        route: "Start by taking the Oxnard Ferry from East Ancapa Island to Oxnard. Book here:  https://www.islandpackers.com/anacapa-island/. Then, take the Pacific Surfliner from Oxnard to Palm Springs via a connection onto the Sunset Limited in LA. Book here: https://www.amtrak.com/tickets/departure.html. Finally, use Basin transit to get to the park from the 29 palms transit center. Book here: https://basin-transit.com"
    },
    {
        park1: "Denali National Park",
        park2: "Kenai Fjords National Park",
        distance: 211,
        hasRoute: true,
        route: "Take the park connection bus from Seward to Denali. Book here: https://www.alaskatravel.com/anchorage/transportation/?. ref=703&gad_source=1&gad_campaignid=11886331867&gbraid=0AAAAAD_wou2xlVuwUsULFyizdJLyEJ5iL&gclid=CjwKCAjwzNTUBhAjEiwA7zcvWrToH8_Xfv0dZwmD7Lr6DIWDwZqXK8PIRxQVH0ok1xL9_M6mrYiDHBoCkp0QAvD_BwE, or take the Alaska railroad from Seward to Denali via the Coastal connection train to anchorage and the Denali star to Denali national park*. *Note these services only run during the summer. Book here: https://www.alaskarailroad.com/ride-a-train/our-trains"
    },
    {
        park1: "Joshua Tree National Park",
        park2: "Sequoia National Park",
        distance: 235,
        hasRoute: true,
        route: "Start by taking the Sequoia shuttle from Sequoia to Visalia. Book here: https://www.visalia.gov/360/Sequoia-Shuttle. Then, take the Greyhound from Visalia to Bakersfield. Book here: https://www.greyhound.com. After that, take the amtrak thruway bus to Los Angeles Union station, and connect onto the sunset limited to Palm Springs. Book here: https://www.amtrak.com/tickets/departure.html . Finally, take basin transit bus to the 29 Palms Transit Center. Book here: https://basin-transit.com"
    },
    {
        park1: "Cuyahoga Valley National Park",
        park2: "New River Gorge National Park",
        distance: 236,
        hasRoute: false,
        route: null
    },
    {
        park1: "Gateway National Park",
        park2: "Mammoth Caves National Park",
        distance: 244,
        hasRoute: true,
        route: "From Mammoth Caves national park, take the Tornado Bus from Cave City to Nashville. Book here: https://webtec.tornadobus.com/?searchOrigin=Cave+City%2C+%28KY+-+Shell+Gas+Station-Cave+City%29&origin=1479&searchDestiny=Nashville%2C+%28TN+-+TBC+Nashville%29&destiny=386&initDate=2026-09-01T04%3A00%3A00.254Z&adult=1&senior=0&child=0&flux=0. Then, take the Greyhound bus from Nasville to St. Louis and from there walk to the national park. Book here: https://shop.greyhound.com/search?departureCity=2f996fb9-7cba-4d55-bc66-94fe1ebe9e3a&arrivalCity=8e173706-dbc4-4622-91b8-dd37a7df6de5&route=Nashville%2C+TN-St+Louis%2C+MO&rideDate=31.08.2026&adult=1&_locale=en_US&departureCountryCode=US&arrivalCountryCode=US&features%5Bfeature.enable_distribusion%5D=1&features%5Bfeature.train_cities_only%5D=0&features%5Bfeature.station_search%5D=0&features%5Bfeature.station_search_recommendation%5D=0&features%5Bfeature.darken_page%5D=1&atb_pdid=1fb4a8d9-ec35-40cc-997e-2fe3fb2f5736&_sp=34b4fc43-99e5-4b4e-8c03-a788c5acdafb&_spnuid=65d79b77-b9df-4594-9ec2-2a5e95fac818_1788206869155"
    },
    {
        park1: "Cuyahoga Valley National Park",
        park2: "Shenandoah National Park",
        distance: 258,
        hasRoute: false,
        route: null
    },
    {
        park1: "Grand Canyon National Park",
        park2: "Joshua Tree National Park",
        distance: 261,
        hasRoute: true,
        route: "Start by taking the national express shuttle from the Grand Canyon South Rim to Las Vegas. Book here: https://nationalparkexpress.com/shuttle-service/. Then, take the Luxury coach bus from Las Vegas to San Bernadino. https://luxcoachamerica.com/daily-tickets. From there, take the Sunline transit but from San Bernadino to El Cielo at Kirk Douglas in Palm springs with a transfer in Varner at Harry Oliver. Book here: https://www.sunline.org/services/sun-bus/routes-and-schedules.  Finally, take basin transit bus to the 29 Palms Transit Center. Book here: https://basin-transit.com."
    },
    {
        park1: "Kenai Fjords National Park",
        park2: "Wrangell-St.Elias National Park",
        distance: 262,
        hasRoute: true,
        route: "Take the Alaska railroad from Seward to Denali via the Coastal connection train to Anchorage*. *Note this service only run during the summer. Book here: https://www.alaskarailroad.com/ride-a-train/our-trains. Then, take the Interior Alaska bus lines from Anchorage to Glennallen. Book here: https://interioralaskabusline.com/ . Finally, take the Kennicott shuttle from Glennallen to Mccarthy. Book here: https://kennicottshuttle.com/"
    },
    {
        park1: "Channel Islands national park",
        park2: "Yosemite National Park",
        distance: 266,
        hasRoute: true,
        route: "Take the Mariposa YARTS bus from Mariposa Grove to the Fresno Amtrak station. Book here: https://tickets.yarts.com/search-result/?wbtm_form_nonce=70a041d1e7&_wp_http_referer=%2Fsearch-result%2F%3Fwbtm_form_nonce%3D45bbce216a%26bus_start_route%3DMariposa%2BGrove%26bus_end_route%3DFresno%2BAmtrak%26j_date%3D2026-08-29%26r_date&bus_start_route=Mariposa+Grove&bus_end_route=Fresno+Amtrak&j_date=2026-08-30&r_date=, th, then take the greyhound from the Fresno bus station to Visalia Book here: https://shop.greyhound.com/search?departureCity=d0180f92-2583-43d1-8049-1e0abaa2aef4&arrivalCity=4cb1590a-51ce-4e28-9ea1-a0517b0584fb&route=Fresno%2C+CA-Visalia%2C+CA&rideDate=31.08.2026&adult=1&_locale=en_US&departureCountryCode=US&arrivalCountryCode=US&features%5Bfeature.enable_distribusion%5D=1&features%5Bfeature.train_cities_only%5D=0&features%5Bfeature.station_search%5D=0&features%5Bfeature.station_search_recommendation%5D=0&features%5Bfeature.darken_page%5D=1&atb_pdid=31015fe9-b382-449c-9419-c248e407f713&_sp=6b364933-72c7-495d-88f0-8c40f5a6c133&_spnuid=b40d6603-575c-4c05-a00f-8befa41c9c9a_1788055986660. From there, take the greyhound from Visalia to the Bakersfield Amtrak station. Book here: https://www.greyhound.com/. From there, take Amtrak thruway service from Bakersfield to Oxnard. Book here: https://www.amtrak.com/tickets/departure.html. Finally, take the Oxnard ferry from Oxnard to East Anacapa Island. Book here: https://www.islandpackers.com/anacapa-island/"
    },
    {
        park1: "Gateway National Park",
        park2: "Indiana Dunes National Park",
        distance: 267,
        hasRoute: true,
        route: "Take the South Shore Line train from Indiana Dunes to Van Buren St. https://mysouthshoreline.com. Take the CTA bus from Van Buren St. To Chicago Union Station. Book here: https://www.transitchicago.com. From there, take any of the amtrak services from Chicago Union Station to St. Louis, where you can walk to the Gateway Arch. Book here: https://www.amtrak.com/home."
    },
    {
        park1: "Mammoth Caves National Park",
        park2: "New River Gorge National Park",
        distance: 280,
        hasRoute: true,
        route: "From Mammoth Caves national park, take the Tornado Bus from Cave City to Indianapolis. Book here: https://webtec.tornadobus.com/?searchOrigin=Cave+City%2C+%28KY+-+Shell+Gas+Station-Cave+City%29&origin=1479&searchDestiny=Indianapolis%2C+%28IN+-+TBC+Indianapolis%29&destiny=1522&initDate=2026-09-03T04%3A00%3A00.254Z&adult=1&senior=0&child=0&flux=0. Then, take the Cardinal from Indianapolis to Thurmond station. Book here: https://www.amtrak.com/tickets/departure.html"
    },
    {
        park1: "Denali National Park",
        park2: "Wrangell-St.Elias National Park",
        distance: 285,
        hasRoute: true,
        route: "Take the Denali Star from Denali to Anchorage*. *Note this service only run during the summer. Book here: https://www.alaskarailroad.com/ride-a-train/our-trains. Then, take the Interior Alaska bus lines from Anchorage to Glennallen. Book here: https://interioralaskabusline.com/ . Finally, take the Kennicott shuttle from Glennallen to Mccarthy. Book here: https://kennicottshuttle.com/"
    },
    {
        park1: "Cuyahoga Valley National Park",
        park2: "Indiana Dunes National Park",
        distance: 286,
        hasRoute: true,
        route: "Take the South Shore Line train from Indiana Dunes to Gary. https://mysouthshoreline.com. Then, take the Flixbus from Gary to Akron. Book here: https://shop.greyhound.com/search?departureCity=68b95ae3-e083-4503-a034-2c4002acec75&arrivalCity=e8bcb13f-6e26-40b8-9c4a-5cd746c67db4&route=Gary%2C+IN-Akron%2C+OH&rideDate=01.09.2026&adult=1&_locale=en_US&departureCountryCode=US&arrivalCountryCode=US&features%5Bfeature.enable_distribusion%5D=1&features%5Bfeature.train_cities_only%5D=0&features%5Bfeature.station_search%5D=0&features%5Bfeature.station_search_recommendation%5D=0&features%5Bfeature.darken_page%5D=1&atb_pdid=1fb4a8d9-ec35-40cc-997e-2fe3fb2f5736&_sp=34b4fc43-99e5-4b4e-8c03-a788c5acdafb&_spnuid=65d79b77-b9df-4594-9ec2-2a5e95fac818_1788208580054 . Finally, take the Akron metro bus from the Akron tranist center to E. Highland Rd & Capital Blvd, putting visitors within spitting distance of the park. Book here: https://www.riderta.com."
    },
    {
        park1: "Joshua Tree National Park",
        park2: "Zion National Park",
        distance: 288,
        hasRoute: true,
        route: "Start by taking the national express shuttle from Zion National Park to Las Vegas. Book here: https://nationalparkexpress.com/shuttle-service/. Then, take the Luxury coach bus from Las Vegas to San Bernadino. https://luxcoachamerica.com/daily-tickets. From there, take the Sunline transit but from San Bernadino to El Cielo at Kirk Douglas in Palm springs with a transfer in Varner at Harry Oliver. Book here: https://www.sunline.org/services/sun-bus/routes-and-schedules.  Finally, take basin transit bus to the 29 Palms Transit Center. Book here: https://basin-transit.com."
    },
    {
        park1: "Indiana Dunes National Park",
        park2: "Mammoth Caves National Park",
        distance: 313,
        hasRoute: true,
        route: "From Mammoth Caves national park, take the Tornado Bus from Cave City to Indianapolis. Book here: https://webtec.tornadobus.com/?searchOrigin=Cave+City%2C+%28KY+-+Shell+Gas+Station-Cave+City%29&origin=1479&searchDestiny=Indianapolis%2C+%28IN+-+TBC+Indianapolis%29&destiny=1522&initDate=2026-09-03T04%3A00%3A00.254Z&adult=1&senior=0&child=0&flux=0. Then, take the Greyhound from Indianapolis to Gary. Book here: https://shop.greyhound.com/search?departureCity=bebc98ce-a05e-4f7f-bc4b-191a5343791c&arrivalCity=68b95ae3-e083-4503-a034-2c4002acec75&route=Indianapolis%2C+IN-Gary%2C+IN&rideDate=01.09.2026&adult=1&_locale=en_US&departureCountryCode=US&arrivalCountryCode=US&features%5Bfeature.enable_distribusion%5D=1&features%5Bfeature.train_cities_only%5D=0&features%5Bfeature.station_search%5D=0&features%5Bfeature.station_search_recommendation%5D=0&features%5Bfeature.darken_page%5D=1&atb_pdid=1fb4a8d9-ec35-40cc-997e-2fe3fb2f5736&_sp=34b4fc43-99e5-4b4e-8c03-a788c5acdafb&_spnuid=65d79b77-b9df-4594-9ec2-2a5e95fac818_1788209415192. Finally, take the South Shore line from Gary to Indiana Dunes. Book here: https://mysouthshoreline.com."
    },
    {
        park1: "Sequoia National Park",
        park2: "Zion National Park",
        distance: 314,
        hasRoute: true,
        route: "Start by taking the Sequoia shuttle from Sequoia to Visalia. Book here: https://www.visalia.gov/360/Sequoia-Shuttle. Then, take the Greyhound from Visalia to Bakersfield. Book here: https://www.greyhound.com. After that, take the thruaway bus from Bakersfield to Las Vegas. Finally, take the national park express from Las Vegas to Zion national park. Book here: https://nationalparkexpress.com/shuttle-service/."
    },
    {
        park1: "Bryce Canyon National Park",
        park2: "Joshua Tree National Park",
        distance: 288,
        hasRoute: true,
        route: "Start by taking the national express shuttle from Bryce Canyon to Las Vegas. Book here: https://nationalparkexpress.com/shuttle-service/. Then, take the Luxury coach bus from Las Vegas to San Bernadino. https://luxcoachamerica.com/daily-tickets. From there, take the Sunline transit but from San Bernadino to El Cielo at Kirk Douglas in Palm springs with a transfer in Varner at Harry Oliver. Book here: https://www.sunline.org/services/sun-bus/routes-and-schedules.  Finally, take basin transit bus to the 29 Palms Transit Center. Book here: https://basin-transit.com."
    },
    {
        park1: "Redwood National and State Parks",
        park2: "Yosemite National Park",
        distance: 332,
        hasRoute: false,
        route: null
    },
    {
        park1: "Joshua Tree National Park",
        park2: "Yosemite National Park",
        distance: 343,
        hasRoute: true,
        route: "Take the Mariposa YARTS bus from Mariposa Grove to the Fresno Amtrak station. Book here: https://tickets.yarts.com/search-result/?wbtm_form_nonce=70a041d1e7&_wp_http_referer=%2Fsearch-result%2F%3Fwbtm_form_nonce%3D45bbce216a%26bus_start_route%3DMariposa%2BGrove%26bus_end_route%3DFresno%2BAmtrak%26j_date%3D2026-08-29%26r_date&bus_start_route=Mariposa+Grove&bus_end_route=Fresno+Amtrak&j_date=2026-08-30&r_date=, th, then take the greyhound from the Fresno bus station to Visalia Book here: https://shop.greyhound.com/search?departureCity=d0180f92-2583-43d1-8049-1e0abaa2aef4&arrivalCity=4cb1590a-51ce-4e28-9ea1-a0517b0584fb&route=Fresno%2C+CA-Visalia%2C+CA&rideDate=31.08.2026&adult=1&_locale=en_US&departureCountryCode=US&arrivalCountryCode=US&features%5Bfeature.enable_distribusion%5D=1&features%5Bfeature.train_cities_only%5D=0&features%5Bfeature.station_search%5D=0&features%5Bfeature.station_search_recommendation%5D=0&features%5Bfeature.darken_page%5D=1&atb_pdid=31015fe9-b382-449c-9419-c248e407f713&_sp=6b364933-72c7-495d-88f0-8c40f5a6c133&_spnuid=b40d6603-575c-4c05-a00f-8befa41c9c9a_1788055986660. Then, take the Greyhound from Fresno to Bakersfield. Book here: https://www.greyhound.com. After that, take the amtrak thruway bus to Los Angeles Union station, and connect onto the sunset limited to Palm Springs. Book here: https://www.amtrak.com/tickets/departure.html . Finally, take basin transit bus to the 29 Palms Transit Center. Book here: https://basin-transit.com"
    },
    {
        park1: "Grand Teton National Park",
        park2: "Rocky Mountain Natinoal Park",
        distance: 349,
        hasRoute: true,
        route: "Start by taking the Bustang bus from Rmnp Park & Ride to Denver Union station. Book here: https://ridebustang.com/. Then, take the Greyhound from Denver Union Station to the Salt Lake City Intermodal Hub. Book here: https://www.greyhound.com. After that, take the Mountain States Express from Salt Lake City to Alpine Junction. Book here: https://mountainstatesexpress.com. Finally, take the Salt Lake Express from Alpine Juncion to Jackson Airport in the national park. Book here: https://saltlakeexpress.com/?utm_term=salt%20lake%20express&utm_campaign=SLE_Brand&utm_source=adwords&utm_medium=ppc&hsa_acc=7716669181&hsa_cam=1765898048&hsa_grp=69270475576&hsa_ad=380951443851&hsa_src=g&hsa_tgt=kwd-298907118882&hsa_kw=salt%20lake%20express&hsa_mt=e&hsa_net=adwords&hsa_ver=3&gad_source=1&gad_campaignid=1765898048&gbraid=0AAAAADepHEz0POl1keR8Y-Y-qSgWCd5a2&gclid=CjwKCAjwzNTUBhAjEiwA7zcvWpI1fg5cusetB4Wjs0ZzrQDgxT87mmlgMBd3F2PyJ88kGFfKzbrI9xoCXIsQAvD_BwE."
    },
    {
        park1: "Grand Canyon National Park",
        park2: "Sequoia National Park",
        distance: 359,
        hasRoute: true,
        route: "Start by taking the Sequoia shuttle from Sequoia to Visalia. Book here: https://www.visalia.gov/360/Sequoia-Shuttle. Then, take the Greyhound from Visalia to Bakersfield. Book here: https://www.greyhound.com. After that, take the thruaway bus from Bakersfield to Las Vegas. Finally, take the national park express from Las Vegas to Grand Canyon National Park. Book here: https://nationalparkexpress.com/shuttle-service/."
    },
    {
        park1: "Bryce Canyon National Park",
        park2: "Sequoia National Park",
        distance: 360,
        hasRoute: true,
        route: "Start by taking the Sequoia shuttle from Sequoia to Visalia. Book here: https://www.visalia.gov/360/Sequoia-Shuttle. Then, take the Greyhound from Visalia to Bakersfield. Book here: https://www.greyhound.com. After that, take the thruaway bus from Bakersfield to Las Vegas. Finally, take the national park express from Las Vegas to Bryce Canyon National Park. Book here: https://nationalparkexpress.com/shuttle-service/."
    },
    {
        park1: "Yosemite National Park",
        park2: "Zion National Park",
        distance: 361,
        hasRoute: true,
        route: "Take the Mariposa YARTS bus from Mariposa Grove to the Fresno Amtrak station. Book here: https://tickets.yarts.com/search-result/?wbtm_form_nonce=70a041d1e7&_wp_http_referer=%2Fsearch-result%2F%3Fwbtm_form_nonce%3D45bbce216a%26bus_start_route%3DMariposa%2BGrove%26bus_end_route%3DFresno%2BAmtrak%26j_date%3D2026-08-29%26r_date&bus_start_route=Mariposa+Grove&bus_end_route=Fresno+Amtrak&j_date=2026-08-30&r_date=, th, then take the greyhound from the Fresno bus station to Visalia Book here: https://shop.greyhound.com/search?departureCity=d0180f92-2583-43d1-8049-1e0abaa2aef4&arrivalCity=4cb1590a-51ce-4e28-9ea1-a0517b0584fb&route=Fresno%2C+CA-Visalia%2C+CA&rideDate=31.08.2026&adult=1&_locale=en_US&departureCountryCode=US&arrivalCountryCode=US&features%5Bfeature.enable_distribusion%5D=1&features%5Bfeature.train_cities_only%5D=0&features%5Bfeature.station_search%5D=0&features%5Bfeature.station_search_recommendation%5D=0&features%5Bfeature.darken_page%5D=1&atb_pdid=31015fe9-b382-449c-9419-c248e407f713&_sp=6b364933-72c7-495d-88f0-8c40f5a6c133&_spnuid=b40d6603-575c-4c05-a00f-8befa41c9c9a_1788055986660. Then, take the Greyhound from Fresno to Bakersfield. Book here: https://www.greyhound.com. After that, take the thruaway bus from Bakersfield to Las Vegas. Finally, take the national park express from Las Vegas to Zion national park. Book here: https://nationalparkexpress.com/shuttle-service/."
    },
    {
        park1: "Cuyahoga Valley National Park",
        park2: "Mammoth Caves National Park",
        distance: 376,
        hasRoute: false,
        route: null
    },
];
