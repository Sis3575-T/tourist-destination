const destinations = [
  {
    name: 'Lalibela Rock-Hewn Churches',
    location: 'Lalibela, Ethiopia',
    country: 'Ethiopia',
    description:
      'UNESCO World Heritage churches carved from solid rock in the 12th and 13th centuries. Often called the "Eighth Wonder of the World", Lalibela is a holy city in northern Ethiopia known for its distinctive rock-cut churches. These monolithic structures are carved out of a single block of stone, with their roofs at ground level. It remains a major center of pilgrimage for Ethiopian Orthodox Christians.',
    price: 980,
    bestSeason: 'October to May',
    category: 'Cultural Tours',
    image: '/destinations/lalibela.jpg',
    activities: ['Church visits', 'Guided heritage tour', 'Photography'],
    duration: '4 days',
    distanceFromAddis: 700
  },
  {
    name: 'Simien Mountains Trek',
    location: 'Simien Mountains, Ethiopia',
    country: 'Ethiopia',
    description:
      'Highland trekking route with dramatic escarpments, endemic wildlife and stunning viewpoints. The Simien Mountains National Park is a massive plateau, split by deep gorges and valleys. It is home to the Gelada baboon, the Walia ibex, and the Ethiopian wolf. The trek offers some of the most spectacular mountain scenery in Africa, with peaks reaching over 4,500 meters.',
    price: 1150,
    bestSeason: 'October to March',
    category: 'Adventure Trips',
    image: '/destinations/semien_mountain.jpg',
    activities: ['Multi-day trekking', 'Wildlife watching', 'Camping'],
    duration: '6 days',
    distanceFromAddis: 800
  },
  {
    name: 'Danakil Depression Expedition',
    location: 'Afar, Ethiopia',
    country: 'Ethiopia',
    description:
      'Explore colorful hydrothermal fields, salt flats, and one of the hottest landscapes on Earth. The Danakil Depression is a tectonic triple junction where three plates are pulling apart. It features the Dallol hydrothermal field with its neon-colored acid ponds, the Erta Ale active volcano with its permanent lava lake, and vast salt pans where caravans still mine salt as they have for centuries.',
    price: 1350,
    bestSeason: 'November to February',
    category: 'Adventure Trips',
    image: '/destinations/denkil.jpg',
    activities: ['Volcanic landscapes', 'Salt caravans', 'Desert tour'],
    duration: '5 days',
    distanceFromAddis: 600
  },
  {
    name: 'Gondar Castles & Fasil Ghebbi',
    location: 'Gondar, Ethiopia',
    country: 'Ethiopia',
    description:
      'Visit Ethiopia’s royal enclosure and historic castles from the 17th-century imperial era. Known as the "Camelot of Africa", Gondar was the capital of the Ethiopian Empire for two centuries. The Fasil Ghebbi fortress-city contains several well-preserved palaces, a library, a banquet hall, and churches, reflecting a unique blend of African, European, and Indian architectural styles.',
    price: 720,
    bestSeason: 'October to May',
    category: 'Cultural Tours',
    image: '/destinations/gonder.jpg',
    activities: ['Castle tours', 'Cultural storytelling', 'Museum visit'],
    duration: '3 days',
    distanceFromAddis: 730
  },
  {
    name: 'Blue Nile Falls Escape',
    location: 'Bahir Dar, Ethiopia',
    country: 'Ethiopia',
    description:
      'Scenic day trips around the iconic Tis Issat falls and nearby cultural landmarks. The Blue Nile Falls, known locally as Tis Abay (Great Smoke), is a stunning waterfall on the Blue Nile river. During the wet season, the falls can reach up to 400 meters wide. The area is lush and green, offering beautiful walks and boat trips on nearby Lake Tana, the source of the Blue Nile.',
    price: 450,
    bestSeason: 'July to October',
    category: 'Camping Tours',
    image: '/destinations/blue_nile_falls.png',
    activities: ['Boat ride', 'Village walk', 'Waterfall viewpoint'],
    duration: '2 days',
    distanceFromAddis: 560
  },
  {
    name: 'Axum Historical Route',
    location: 'Axum, Ethiopia',
    country: 'Ethiopia',
    description:
      'Discover ancient obelisks, archaeological treasures, and Ethiopia’s deep historical legacy. Axum was the center of the powerful Aksumite Empire, which thrived from the 1st to the 7th century AD. It is home to massive monolithic stelae, royal tombs, and the Church of St. Mary of Zion, which is said to house the original Ark of the Covenant.',
    price: 670,
    bestSeason: 'October to March',
    category: 'Cultural Tours',
    image: '/destinations/axum.jpg',
    activities: ['Archaeological sites', 'Historical museums', 'City tour'],
    duration: '3 days',
    distanceFromAddis: 1000
  },
  {
    name: 'Lido Beach & Mogadishu City Tour',
    location: 'Mogadishu, Somalia',
    country: 'Somalia',
    description:
      'A curated city and coastline experience with local guides and cultural highlights. Mogadishu, the White Pearl of the Indian Ocean, offers a mix of historic architecture and vibrant beach life. Lido Beach is a popular spot for locals and visitors alike, while the old quarter (Hamar Weyne) contains ancient mosques and markets that tell the story of the city\'s rich trading history.',
    price: 890,
    bestSeason: 'November to February',
    category: 'City & Heritage',
    image: '/destinations/lido_beach.png',
    activities: ['Beach walk', 'Old quarter tour', 'Local cuisine'],
    duration: '3 days',
    distanceFromAddis: 1060
  },
  {
    name: 'Laas Geel Cave Paintings',
    location: 'Hargeisa, Somalia',
    country: 'Somalia',
    description:
      'Prehistoric cave art complex considered one of the most important rock art sites in Africa. Located near Hargeisa, the capital of Somaliland, Laas Geel features incredibly well-preserved rock paintings dating back between 5,000 and 10,000 years. The paintings depict wild animals, cattle, and humans, providing a fascinating glimpse into the lives of the prehistoric pastoralists who lived here.',
    price: 760,
    bestSeason: 'November to February',
    category: 'Cultural Tours',
    image: '/destinations/laas_geel.png',
    activities: ['Archaeological exploration', 'Guided history walk'],
    duration: '2 days',
    distanceFromAddis: 700
  },
  {
    name: 'Berbera Coast Experience',
    location: 'Berbera, Somalia',
    country: 'Somalia',
    description:
      'Relax on the Gulf of Aden coastline and explore Berbera’s old-town architecture. Berbera is a historic port city with a mix of Ottoman, British, and local architectural styles. The city features pristine sandy beaches and clear waters, while the "Old Quarter" offers a step back in time with its narrow streets and historic buildings.',
    price: 710,
    bestSeason: 'November to March',
    category: 'Coastal & Marine',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200',
    activities: ['Coastline tour', 'Swimming', 'Photography'],
    duration: '3 days',
    distanceFromAddis: 860
  },
  {
    name: 'Kismayo Marine Weekend',
    location: 'Kismayo, Somalia',
    country: 'Somalia',
    description:
      'A short marine retreat featuring beach activities and local seafood culture. Kismayo is a major port city in southern Somalia, known for its beautiful beaches and rich marine life. This retreat focuses on the city\'s coastal charm, offering boat trips, snorkeling, and a chance to experience the local hospitality and fresh seafood.',
    price: 680,
    bestSeason: 'December to March',
    category: 'Coastal & Marine',
    image: 'https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=1200',
    activities: ['Boat outing', 'Beach leisure', 'Food experience'],
    duration: '2 days',
    distanceFromAddis: 1200
  },
  {
    name: 'Lake Assal & Salt Fields',
    location: 'Tadjoura Region, Djibouti',
    country: 'Djibouti',
    description:
      'Visit the lowest point in Africa and Djibouti’s dramatic white salt landscapes. Lake Assal is a crater lake located 155 meters below sea level, surrounded by an alien-looking landscape of volcanic rock and white salt. The water is incredibly saline, creating unique salt formations and a surreal atmosphere. It is one of the most spectacular natural wonders in the Horn of Africa.',
    price: 950,
    bestSeason: 'November to February',
    category: 'Camping Tours',
    image: '/destinations/lake_assal.png',
    activities: ['Geo-tour', 'Salt flats visit', 'Photography'],
    duration: '3 days',
    distanceFromAddis: 800
  },
  {
    name: 'Moucha Island Snorkeling',
    location: 'Gulf of Tadjoura, Djibouti',
    country: 'Djibouti',
    description:
      'Crystal-clear waters and coral-rich marine life, perfect for snorkeling adventures. Moucha Island is a small coral island located in the Gulf of Tadjoura. It is a haven for divers and snorkelers, with its vibrant coral reefs and abundant marine life, including colorful fish and the occasional whale shark (during the season). The island offers white sandy beaches and a peaceful escape.',
    price: 1120,
    bestSeason: 'October to March',
    category: 'Coastal & Marine',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200',
    activities: ['Snorkeling', 'Boat transfer', 'Beach day'],
    duration: '2 days',
    distanceFromAddis: 850
  },
  {
    name: 'Day Forest National Park',
    location: 'Goda Mountains, Djibouti',
    country: 'Djibouti',
    description:
      'A cooler highland ecosystem with native juniper forests and hiking trails. Located in the Goda Mountains, Day Forest is a rare remnant of ancient primary forest in Djibouti. The park offers a cool respite from the heat of the lowlands, with its lush vegetation and unique wildlife. It is a great place for hiking and birdwatching, offering panoramic views of the surrounding mountains and the Gulf of Tadjoura.',
    price: 840,
    bestSeason: 'November to March',
    category: 'Nature Tours',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200',
    activities: ['Forest hiking', 'Birdwatching', 'Nature walks'],
    duration: '3 days',
    distanceFromAddis: 820
  },
  {
    name: 'Asmara Art Deco Heritage',
    location: 'Asmara, Eritrea',
    country: 'Eritrea',
    description:
      'UNESCO-listed modernist architecture and rich urban heritage in Eritrea’s capital. Asmara is renowned for its incredible collection of modernist architecture from the Italian colonial era. The city feels like a museum of 1930s Art Deco, Futurism, and Rationalism. Its clean streets, historic cafés, and unique buildings make it one of the most distinctive and charming capitals in Africa.',
    price: 790,
    bestSeason: 'October to April',
    category: 'City & Heritage',
    image: '/destinations/asmara.png',
    activities: ['Architecture tour', 'Historic cafés', 'Walking tour'],
    duration: '3 days',
    distanceFromAddis: 1080
  },
  {
    name: 'Massawa Old Port Discovery',
    location: 'Massawa, Eritrea',
    country: 'Eritrea',
    description:
      'Explore the Red Sea port city known for Ottoman-era buildings and coastal history. Massawa is a city of islands and peninsulas, with a rich history as a major Red Sea port. Its "Old Town" features beautiful buildings with Ottoman, Egyptian, and Italian influences, many with intricate coral-stone details. The city is known for its seafood, its bustling harbor, and its proximity to the Dahlak Islands.',
    price: 730,
    bestSeason: 'November to February',
    category: 'City & Heritage',
    image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=1200',
    activities: ['Old town walk', 'Sea promenade', 'Culture visit'],
    duration: '2 days',
    distanceFromAddis: 1150
  },
  {
    name: 'Dahlak Archipelago Escape',
    location: 'Dahlak Islands, Eritrea',
    country: 'Eritrea',
    description:
      'Island-hopping experience with Red Sea beaches, snorkeling and serene coastal scenery. The Dahlak Archipelago consists of over 100 islands in the Red Sea. Most of the islands are uninhabited and offer pristine beaches, clear turquoise waters, and incredible marine life. It is a true off-the-beaten-path destination for those looking for isolation, natural beauty, and world-class snorkeling and diving.',
    price: 1240,
    bestSeason: 'October to March',
    category: 'Coastal & Marine',
    image: 'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?w=1200',
    activities: ['Island boat tour', 'Snorkeling', 'Beach relaxation'],
    duration: '4 days',
    distanceFromAddis: 1200
  },
  {
    name: 'Omo Valley Cultural Encounter',
    location: 'Southern Nations, Ethiopia',
    country: 'Ethiopia',
    description:
      'Immerse yourself in the unique lifestyles of the Mursi, Hamer, and Karo tribes. The Lower Omo Valley is a spectacular landscape of savanna and riverine forest. It is a UNESCO World Heritage site, world-renowned for its archaeological and paleontological discoveries, but most famous today for its diverse ethnic groups who have maintained their ancient traditions and rituals for centuries.',
    price: 1100,
    bestSeason: 'June to September',
    category: 'Cultural Tours',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200',
    activities: ['Tribal visits', 'Traditional ceremonies', 'Nature photography'],
    duration: '6 days',
    distanceFromAddis: 520
  }
];

export default destinations;
