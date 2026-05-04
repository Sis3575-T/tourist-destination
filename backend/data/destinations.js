const destinationSeedData = [
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
      'Visit Ethiopia\'s royal enclosure and historic castles from the 17th-century imperial era. Known as the "Camelot of Africa", Gondar was the capital of the Ethiopian Empire for two centuries. The Fasil Ghebbi fortress-city contains several well-preserved palaces, a library, a banquet hall, and churches, reflecting a unique blend of African, European, and Indian architectural styles.',
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
      'Discover ancient obelisks, archaeological treasures, and Ethiopia\'s deep historical legacy. Axum was the center of the powerful Aksumite Empire, which thrived from the 1st to the 7th century AD. It is home to massive monolithic stelae, royal tombs, and the Church of St. Mary of Zion, which is said to house the original Ark of the Covenant.',
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
      'Relax on the Gulf of Aden coastline and explore Berbera\'s old-town architecture. Berbera is a historic port city with a mix of Ottoman, British, and local architectural styles. The city features pristine sandy beaches and clear waters, while the "Old Quarter" offers a step back in time with its narrow streets and historic buildings.',
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
      'Visit the lowest point in Africa and Djibouti\'s dramatic white salt landscapes. Lake Assal is a crater lake located 155 meters below sea level, surrounded by an alien-looking landscape of volcanic rock and white salt. The water is incredibly saline, creating unique salt formations and a surreal atmosphere. It is one of the most spectacular natural wonders in the Horn of Africa.',
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
      'UNESCO-listed modernist architecture and rich urban heritage in Eritrea\'s capital. Asmara is renowned for its incredible collection of modernist architecture from the Italian colonial era. The city feels like a museum of 1930s Art Deco, Futurism, and Rationalism. Its clean streets, historic cafés, and unique buildings make it one of the most distinctive and charming capitals in Africa.',
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
  },
  {
    name: 'Bale Mountains Wilderness',
    location: 'Bale Mountains, Ethiopia',
    country: 'Ethiopia',
    description:
      'Discover Ethiopia\'s most biodiverse region with endemic wildlife including the Ethiopian wolf and Mountain Nyala. The Bale Mountains National Park offers stunning Afro-alpine landscapes, vast plateaus, and dense forests. It\'s one of the best places in Africa for trekking and wildlife viewing, with over 300 bird species and rare mammals found nowhere else on Earth.',
    price: 1050,
    bestSeason: 'October to March',
    category: 'Nature Tours',
    image: 'https://images.unsplash.com/photo-1504387102698-e6e240ffff54?w=1200',
    activities: ['Wildlife spotting', 'Plateau trekking', 'Birdwatching'],
    duration: '5 days',
    distanceFromAddis: 430
  },
  {
    name: 'Harar Jugol - City of Saints',
    location: 'Harar, Ethiopia',
    country: 'Ethiopia',
    description:
      'Explore the ancient walled city and Islamic cultural heritage of Harar. Known as the "City of Saints", Harar Jugol is a UNESCO World Heritage site with 82 mosques and 102 shrines. Famous for its unique hyena feeding tradition and vibrant markets, the city has been an important center of Islamic learning and trade for over a thousand years.',
    price: 680,
    bestSeason: 'October to May',
    category: 'Cultural Tours',
    image: 'https://images.unsplash.com/photo-1589292851210-938bf90c1c49?w=1200',
    activities: ['Walled city tour', 'Hyena feeding', 'Market visit'],
    duration: '3 days',
    distanceFromAddis: 520
  },
  {
    name: 'Sof Omar Cave System',
    location: 'Bale Zone, Ethiopia',
    country: 'Ethiopia',
    description:
      'Marvel at one of the largest cave systems in Africa with spectacular limestone formations. The Sof Omar Caves stretch for over 15 kilometers along the Weyib River. This sacred site for Muslims houses numerous natural chambers and pillars, with the river flowing through dramatic underground passages. It\'s a geological wonder and a place of spiritual significance.',
    price: 590,
    bestSeason: 'November to March',
    category: 'Adventure Trips',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200',
    activities: ['Cave exploration', 'River walk', 'Photography'],
    duration: '2 days',
    distanceFromAddis: 480
  },
  {
    name: 'Qohaito Archaeological Site',
    location: 'Debub Region, Eritrea',
    country: 'Eritrea',
    description:
      'Step back in time at this ancient pre-Aksumite archaeological site in the highlands. Qohaito is believed to be the site of the ancient city of Koloe, dating back to the 5th century BC. The site features the famous "Tomb of the King", ancient reservoirs, and stunning views of the Great Rift Valley escarpment.',
    price: 750,
    bestSeason: 'October to April',
    category: 'Cultural Tours',
    image: 'https://images.unsplash.com/photo-1474398763683-7e6b8d9d23a1?w=1200',
    activities: ['Archaeological tour', 'Highland hiking', 'Historical sites'],
    duration: '3 days',
    distanceFromAddis: 1100
  },
  {
    name: 'Nakfa Resistance Memorial',
    location: 'Nakfa, Eritrea',
    country: 'Eritrea',
    description:
      'Visit the symbolic heart of Eritrean independence struggle and its underground tunnels. Nakfa was the base of the Eritrean People\'s Liberation Front during the 30-year war for independence. The site includes an extensive network of underground facilities, bunkers, and the famous Nakfa Museum, offering deep insights into Eritrea\'s modern history.',
    price: 690,
    bestSeason: 'October to April',
    category: 'Cultural Tours',
    image: 'https://images.unsplash.com/photo-1589650600654-4a991e1a3f27?w=1200',
    activities: ['Museum visit', 'Tunnel tour', 'Historical briefing'],
    duration: '2 days',
    distanceFromAddis: 1200
  },
  {
    name: 'Tadjoura Gulf Retreat',
    location: 'Tadjoura, Djibouti',
    country: 'Djibouti',
    description:
      'Experience the charm of Djibouti\'s oldest town on the shores of the Gulf of Tadjoura. Tadjoura is known for its whitewashed buildings, historic mosques, and as a gateway to whale shark spotting (seasonal). The town offers a relaxed atmosphere with beautiful coastal views and easy access to both marine and mountain adventures.',
    price: 880,
    bestSeason: 'October to March',
    category: 'Coastal & Marine',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200',
    activities: ['Whale shark tour', 'Old town walk', 'Coastal relaxation'],
    duration: '3 days',
    distanceFromAddis: 780
  },
  {
    name: 'Abbe Lake & Flamingos',
    location: 'Lake Abbe, Djibouti',
    country: 'Djibouti',
    description:
      'Witness otherworldly limestone chimneys and thousands of flamingos at the salt lake on the Ethiopia-Djibouti border. Lake Abbe is the ultimate destination for landscape photographers and nature lovers. The lake features dramatic limestone chimneys (some over 50 meters tall) belching sulfurous steam, creating an alien-like landscape.',
    price: 990,
    bestSeason: 'November to February',
    category: 'Nature Tours',
    image: 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=1200',
    activities: ['Birdwatching', 'Landscape photography', 'Camping'],
    duration: '3 days',
    distanceFromAddis: 850
  },
  {
    name: 'Sheikh Cave Dwellings',
    location: 'Sheikh, Somalia',
    country: 'Somalia',
    description:
      'Discover the cave dwellings and natural springs of this historic highland town. Sheikh is a town in Somaliland known for its pleasant climate, natural caves, and historical significance as an early Islamic center. The area features ancient cave paintings, natural rock formations, and a welcoming local community preserving centuries-old traditions.',
    price: 650,
    bestSeason: 'November to February',
    category: 'Cultural Tours',
    image: 'https://images.unsplash.com/photo-1470093851219-69951fcbb533?w=1200',
    activities: ['Cave exploration', 'Highland walking', 'Cultural exchange'],
    duration: '2 days',
    distanceFromAddis: 750
  },
  {
    name: 'Eyl Coastal Haven',
    location: 'Eyl, Somalia',
    country: 'Somalia',
    description:
      'Relax at this pristine fishing town turned peaceful coastal getaway. Eyl is a historic port town on the Gulf of Aden with beautiful beaches, turquoise waters, and a relaxed atmosphere. Once a hub for fishermen and traders, it now offers visitors a chance to experience authentic Somali coastal life, enjoy fresh seafood, and explore nearby sea caves.',
    price: 720,
    bestSeason: 'November to March',
    category: 'Coastal & Marine',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200',
    activities: ['Beach leisure', 'Fishing experience', 'Sea cave tour'],
    duration: '3 days',
    distanceFromAddis: 1050
  },
  {
    name: 'Serengeti Wilderness Camp',
    location: 'Serengeti National Park, Tanzania',
    country: 'Tanzania',
    description:
      'Experience the Great Migration up close from luxury tented camps in the Serengeti. Wake up to the sounds of lions roaring and elephants trumpeting in the distance. This camping experience offers front-row seats to one of nature\'s greatest spectacles, with comfortable tents, campfire dinners under the stars, and guided game drives.',
    price: 1580,
    bestSeason: 'June to October',
    category: 'Camping Tours',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200',
    activities: ['Game drives', 'Night safari', 'Bush dinners'],
    duration: '5 days',
    distanceFromAddis: 1200
  },
  {
    name: 'Ngorongoro Crater Camping',
    location: 'Ngorongoro Conservation Area, Tanzania',
    country: 'Tanzania',
    description:
      'Camp on the rim of the world\'s largest unbroken caldera with breathtaking views. The Ngorongoro Crater is home to an incredible concentration of wildlife including the Big Five. Your campsite offers panoramic views down into the crater floor, with guided descents each day to explore this natural wonder and its abundant wildlife.',
    price: 1420,
    bestSeason: 'June to September',
    category: 'Camping Tours',
    image: 'https://images.unsplash.com/photo-1583134481433-7b16dcbd8c69?w=1200',
    activities: ['Crater game drives', 'Birdwatching', 'Photography'],
    duration: '4 days',
    distanceFromAddis: 1250
  },
  {
    name: 'Maasai Mara Safari Camp',
    location: 'Maasai Mara National Reserve, Kenya',
    country: 'Kenya',
    description:
      'Traditional camping experience in the heart of Kenya\'s most famous game reserve. Stay in comfortable tents with modern amenities while surrounded by the African wilderness. Witness the Great Migration (seasonal), enjoy Maasai cultural visits, and experience unforgettable game drives across the vast savannah plains.',
    price: 1450,
    bestSeason: 'July to October',
    category: 'Camping Tours',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200',
    activities: ['Game viewing', 'Maasai village visit', 'Hot air balloon'],
    duration: '5 days',
    distanceFromAddis: 1100
  },
  {
    name: 'Mount Kenya Base Camp',
    location: 'Mount Kenya National Park, Kenya',
    country: 'Kenya',
    description:
      'Camp on the slopes of Africa\'s second-highest peak with spectacular alpine scenery. Experience high-altitude camping surrounded by giant lobelias, senecios, and glacial valleys. The trek to base camp takes you through diverse ecological zones, from bamboo forests to alpine meadows, with stunning views of the mountain\'s peaks.',
    price: 1180,
    bestSeason: 'January to March',
    category: 'Camping Tours',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200',
    activities: ['Alpine trekking', 'Glacial valley walks', 'Star gazing'],
    duration: '6 days',
    distanceFromAddis: 1050
  },
  {
    name: 'Lake Tanganyika Beach Camp',
    location: 'Kigoma, Tanzania',
    country: 'Tanzania',
    description:
      'Camp along the shores of Africa\'s deepest lake with pristine beaches and crystal-clear waters. Lake Tanganyika is the world\'s second-oldest freshwater lake, home to hundreds of cichlid fish species found nowhere else. Enjoy lakeside camping, snorkeling in calm waters, and visits to nearby Gombe Stream National Park for chimpanzee trekking.',
    price: 980,
    bestSeason: 'June to October',
    category: 'Camping Tours',
    image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3?w=1200',
    activities: ['Lake swimming', 'Chimpanzee trekking', 'Fishing'],
    duration: '4 days',
    distanceFromAddis: 1300
  },
  {
    name: 'Ruwenzori Mountains Camp',
    location: 'Ruwenzori Mountains, Uganda',
    country: 'Uganda',
    description:
      'Base camp on the legendary "Mountains of the Moon" with glacial peaks and unique flora. The Ruwenzori range features Africa\'s third-highest peak, Margherita (5,109m), with year-round snow and glaciers. Camp in alpine meadows surrounded by giant lobelias and senecios, with guided climbs and endemic birdwatching opportunities.',
    price: 1380,
    bestSeason: 'December to February',
    category: 'Camping Tours',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200',
    activities: ['Alpine camping', 'Glacier trekking', 'Endemic birding'],
    duration: '7 days',
    distanceFromAddis: 1000
  },
  {
    name: 'Nyungwe Forest Camp',
    location: 'Nyungwe National Park, Rwanda',
    country: 'Rwanda',
    description:
      'Camp at the edge of East Africa\'s largest montane rainforest with canopy walks and primate tracking. Nyungwe is home to 13 primate species including chimpanzees, colobus monkeys, and L\'Hoest\'s monkeys. The campsite offers a unique opportunity to experience the ancient rainforest, with guided nature walks and the famous canopy walkway.',
    price: 1260,
    bestSeason: 'June to September',
    category: 'Camping Tours',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200',
    activities: ['Primate tracking', 'Canopy walk', 'Forest hiking'],
    duration: '5 days',
    distanceFromAddis: 1150
  },
  {
    name: 'Bujumbura Lake Retreat',
    location: 'Bujumbura, Burundi',
    country: 'Burundi',
    description:
      'Camp along the beautiful shores of Lake Tanganyika in Burundi\'s coastal capital region. Experience the tranquil beaches, vibrant local markets, and the famous Livingstone-Stanley Monument. The campsite offers stunning sunset views over the lake, fresh fish barbecues, and boat trips to nearby islands and fishing villages.',
    price: 720,
    bestSeason: 'June to September',
    category: 'Camping Tours',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200',
    activities: ['Lake tours', 'Beach camping', 'Boat trips'],
    duration: '3 days',
    distanceFromAddis: 1250
  },
  {
    name: 'Boma National Park Camp',
    location: 'Boma, South Sudan',
    country: 'South Sudan',
    description:
      'Experience the wilderness of Africa\'s newest nation in Boma National Park. Home to one of the largest mammal migrations in the world, the park hosts massive herds of white-eared kob, tiang antelope, and Mongalla gazelle. Camp under acacia trees with guided game drives and cultural visits to local communities.',
    price: 1050,
    bestSeason: 'January to April',
    category: 'Camping Tours',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200',
    activities: ['Game drives', 'Migration viewing', 'Community visits'],
    duration: '5 days',
    distanceFromAddis: 1300
  },
  {
    name: 'Nimule River Camp',
    location: 'Nimule, South Sudan',
    country: 'South Sudan',
    description:
      'Camp along the White Nile near the Ugandan border in Nimule National Park. This riverside camping experience offers fishing, boat trips, and wildlife viewing in a lush tropical setting. The park is home to elephants, hippos, crocodiles, and numerous bird species, with the roaring rapids of the White Nile as your backdrop.',
    price: 890,
    bestSeason: 'December to March',
    category: 'Camping Tours',
    image: 'https://images.unsplash.com/photo-1595781512989-e73ae46944e3?w=1200',
    activities: ['River fishing', 'Boat safari', 'Birdwatching'],
    duration: '4 days',
    distanceFromAddis: 1400
  },
  {
    name: 'Mount Karthala Crater Camp',
    location: 'Grande Comore, Comoros',
    country: 'Comoros',
    description:
      'Camp on the slopes of the active Karthala volcano, one of the largest active volcanoes in the world. The crater is home to unique flora and fauna found nowhere else on Earth. Experience cloud forests, crater lakes, and panoramic views of the Indian Ocean from your campsite on this incredible volcanic island.',
    price: 920,
    bestSeason: 'May to November',
    category: 'Camping Tours',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200',
    activities: ['Volcano trekking', 'Crater exploration', 'Cloud forest hike'],
    duration: '4 days',
    distanceFromAddis: 2800
  },
  {
    name: 'Nosy Be Island Camp',
    location: 'Nosy Be, Madagascar',
    country: 'Madagascar',
    description:
      'Camp on Madagascar\'s premier tropical island with lemur encounters and pristine beaches. Nosy Be offers a unique camping experience with its volcanic lakes, ylang-ylang plantations, and incredible biodiversity. Spot wild lemurs, swim in turquoise waters, and enjoy fresh vanilla and seafood from local villages.',
    price: 780,
    bestSeason: 'April to November',
    category: 'Camping Tours',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1200',
    activities: ['Lemur spotting', 'Island hopping', 'Beach camping'],
    duration: '4 days',
    distanceFromAddis: 3200
  },
  {
    name: 'Andasibe Rainforest Camp',
    location: 'Andasibe-Mantadia National Park, Madagascar',
    country: 'Madagascar',
    description:
      'Camp in the eastern rainforest home to the largest lemur species, the Indri. Andasibe offers an immersive camping experience in one of Madagascar\'s most accessible rainforests. Wake up to the haunting calls of Indri lemurs, explore orchid-filled forests, and discover chameleons, frogs, and countless endemic species.',
    price: 850,
    bestSeason: 'April to November',
    category: 'Camping Tours',
    image: 'https://images.unsplash.com/photo-1555082556-43b791ba1ea3?w=1200',
    activities: ['Lemur tracking', 'Night walks', 'Rainforest hikes'],
    duration: '5 days',
    distanceFromAddis: 3300
  },
  {
    name: 'Vallée de Mai Camp',
    location: 'Praslin Island, Seychelles',
    country: 'Seychelles',
    description:
      'Camp in the mystical palm forest of Vallée de Mai, a UNESCO World Heritage site. This ancient forest is home to the famous Coco de Mer palm with its enormous seeds. The campsite is surrounded by towering palms, rare black parrots, and giant tortoises, offering a truly unique island camping experience in paradise.',
    price: 1150,
    bestSeason: 'April to May',
    category: 'Camping Tours',
    image: 'https://images.unsplash.com/photo-1589979481223-deb893043163?w=1200',
    activities: ['Palm forest tour', 'Tortoise encounter', 'Beach camping'],
    duration: '3 days',
    distanceFromAddis: 3400
  },
  {
    name: 'Black River Gorges Camp',
    location: 'Black River Gorges National Park, Mauritius',
    country: 'Mauritius',
    description:
      'Camp in Mauritius\' largest national park with endemic birds and waterfalls. The park protects most of the island\'s remaining rainforest and is home to the pink pigeon, Mauritius kestrel, and echo parakeet. Your campsite offers hiking trails to spectacular waterfalls, mountain peaks, and panoramic views of the island.',
    price: 980,
    bestSeason: 'May to December',
    category: 'Camping Tours',
    image: 'https://images.unsplash.com/photo-1589197331516-4b6f3a2b6b3?w=1200',
    activities: ['Rainforest hiking', 'Waterfall trek', 'Birdwatching'],
    duration: '3 days',
    distanceFromAddis: 3500
  }
];

module.exports = destinationSeedData;
