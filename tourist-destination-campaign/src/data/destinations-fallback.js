const destinations = [
  {

    name: 'Lalibela Rock-Hewn Churches',
    location: 'Lalibela, Ethiopia',
    country: 'Ethiopia',
    description: 'UNESCO World Heritage churches carved from solid rock in the 12th and 13th centuries.',
    price: 980,
    bestSeason: 'October to May',
    category: 'Cultural Tours',
    image: 'https://images.unsplash.com/photo-1570291254328-8048a01e43b?w=1200',
    activities: ['Church visits', 'Guided heritage tour', 'Photography'],
    duration: '4 days',
    distanceFromAddis: 700
  },
  {

    name: 'Simien Mountains Trek',
    location: 'Simien Mountains, Ethiopia',
    country: 'Ethiopia',
    description: 'Highland trekking route with dramatic escarpments and endemic wildlife.',
    price: 1150,
    bestSeason: 'October to March',
    category: 'Adventure Trips',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200',
    activities: ['Multi-day trekking', 'Wildlife watching', 'Camping'],
    duration: '6 days',
    distanceFromAddis: 800
  },
  {

    name: 'Danakil Depression Expedition',
    location: 'Afar, Ethiopia',
    country: 'Ethiopia',
    description: 'Explore colorful hydrothermal fields, salt flats, and volcanic landscapes.',
    price: 1350,
    bestSeason: 'November to February',
    category: 'Adventure Trips',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200',
    activities: ['Volcanic landscapes', 'Salt caravans', 'Desert tour'],
    duration: '5 days',
    distanceFromAddis: 600
  },
  {

    name: 'Gondar Castles & Fasil Ghebbi',
    location: 'Gondar, Ethiopia',
    country: 'Ethiopia',
    description: 'Visit Ethiopia\'s royal enclosure and historic castles from the 17th-century.',
    price: 720,
    bestSeason: 'October to May',
    category: 'Cultural Tours',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200',
    activities: ['Castle tours', 'Cultural storytelling', 'Museum visit'],
    duration: '3 days',
    distanceFromAddis: 730
  },
  {

    name: 'Blue Nile Falls Escape',
    location: 'Bahir Dar, Ethiopia',
    country: 'Ethiopia',
    description: 'Scenic day trips around the iconic Tis Issat falls and Lake Tana.',
    price: 450,
    bestSeason: 'July to October',
    category: 'Camping Tours',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200',
    activities: ['Boat ride', 'Village walk', 'Waterfall viewpoint'],
    duration: '2 days',
    distanceFromAddis: 560
  },
  {

    name: 'Axum Historical Route',
    location: 'Axum, Ethiopia',
    country: 'Ethiopia',
    description: 'Discover ancient obelisks and archaeological treasures of the Aksumite Empire.',
    price: 670,
    bestSeason: 'October to March',
    category: 'Cultural Tours',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200',
    activities: ['Archaeological sites', 'Historical museums', 'City tour'],
    duration: '3 days',
    distanceFromAddis: 1000
  },
  {

    name: 'Lido Beach & Mogadishu City Tour',
    location: 'Mogadishu, Somalia',
    country: 'Somalia',
    description: 'A curated city and coastline experience with local guides and cultural highlights.',
    price: 890,
    bestSeason: 'November to February',
    category: 'City & Heritage',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200',
    activities: ['Beach walk', 'Old quarter tour', 'Local cuisine'],
    duration: '3 days',
    distanceFromAddis: 1060
  },
  {

    name: 'Laas Geel Cave Paintings',
    location: 'Hargeisa, Somalia',
    country: 'Somalia',
    description: 'Prehistoric cave art complex with paintings dating back 5,000-10,000 years.',
    price: 760,
    bestSeason: 'November to February',
    category: 'Cultural Tours',
    image: 'https://images.unsplash.com/photo-1589292851210-938bf90c1c49?w=1200',
    activities: ['Archaeological exploration', 'Guided history walk'],
    duration: '2 days',
    distanceFromAddis: 700
  },
  {

    name: 'Berbera Coast Experience',
    location: 'Berbera, Somalia',
    country: 'Somalia',
    description: 'Relax on the Gulf of Aden coastline and explore historic architecture.',
    price: 710,
    bestSeason: 'November to March',
    category: 'Coastal & Marine',
    image: 'https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=1200',
    activities: ['Coastline tour', 'Swimming', 'Photography'],
    duration: '3 days',
    distanceFromAddis: 860
  },
  {

    name: 'Kismayo Marine Weekend',
    location: 'Kismayo, Somalia',
    country: 'Somalia',
    description: 'A short marine retreat featuring beach activities and local seafood culture.',
    price: 680,
    bestSeason: 'December to March',
    category: 'Coastal & Marine',
    image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3?w=1200',
    activities: ['Boat outing', 'Beach leisure', 'Food experience'],
    duration: '2 days',
    distanceFromAddis: 1200
  },
  {

    name: 'Lake Assal & Salt Fields',
    location: 'Tadjoura Region, Djibouti',
    country: 'Djibouti',
    description: 'Visit the lowest point in Africa with dramatic white salt landscapes.',
    price: 950,
    bestSeason: 'November to February',
    category: 'Camping Tours',
    image: 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=1200',
    activities: ['Geo-tour', 'Salt flats visit', 'Photography'],
    duration: '3 days',
    distanceFromAddis: 800
  },
  {

    name: 'Moucha Island Snorkeling',
    location: 'Gulf of Tadjoura, Djibouti',
    country: 'Djibouti',
    description: 'Crystal-clear waters and coral-rich marine life for snorkeling adventures.',
    price: 1120,
    bestSeason: 'October to March',
    category: 'Coastal & Marine',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200',
    activities: ['Snorkeling', 'Boat transfer', 'Beach day'],
    duration: '2 days',
    distanceFromAddis: 850
  },
  {

    name: 'Day Forest National Park',
    location: 'Goda Mountains, Djibouti',
    country: 'Djibouti',
    description: 'A cooler highland ecosystem with native juniper forests and hiking trails.',
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
    description: 'UNESCO-listed modernist architecture and rich urban heritage in Asmara.',
    price: 790,
    bestSeason: 'October to April',
    category: 'City & Heritage',
    image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cd86?w=1200',
    activities: ['Architecture tour', 'Historic cafés', 'Walking tour'],
    duration: '3 days',
    distanceFromAddis: 1080
  },
  {

    name: 'Massawa Old Port Discovery',
    location: 'Massawa, Eritrea',
    country: 'Eritrea',
    description: 'Explore the Red Sea port city known for Ottoman-era buildings.',
    price: 730,
    bestSeason: 'November to February',
    category: 'City & Heritage',
    image: 'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?w=1200',
    activities: ['Old town walk', 'Sea promenade', 'Culture visit'],
    duration: '2 days',
    distanceFromAddis: 1150
  },
  {

    name: 'Dahlak Archipelago Escape',
    location: 'Dahlak Islands, Eritrea',
    country: 'Eritrea',
    description: 'Island-hopping experience with Red Sea beaches and snorkeling.',
    price: 1240,
    bestSeason: 'October to March',
    category: 'Coastal & Marine',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200',
    activities: ['Island boat tour', 'Snorkeling', 'Beach relaxation'],
    duration: '4 days',
    distanceFromAddis: 1200
  },
  {

    name: 'Omo Valley Cultural Encounter',
    location: 'Southern Nations, Ethiopia',
    country: 'Ethiopia',
    description: 'Immerse yourself in the unique lifestyles of the Mursi, Hamer, and Karo tribes.',
    price: 1100,
    bestSeason: 'June to September',
    category: 'Cultural Tours',
    image: 'https://images.unsplash.com/photo-1520437351795-29a623cdd53?w=1200',
    activities: ['Wildlife spotting', 'Plateau trekking', 'Birdwatching'],
    duration: '5 days',
    distanceFromAddis: 430
  },
  {

    name: 'Ras Dashen Summit',
    location: 'Simien Mountains, Ethiopia',
    country: 'Ethiopia',
    description: 'Summit Ethiopia\'s highest peak at 4,550 meters with breathtaking views.',
    price: 1200,
    bestSeason: 'October to March',
    category: 'Adventure Trips',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200',
    activities: ['Mountain trekking', 'Summit hike', 'Wildlife viewing'],
    duration: '5 days',
    distanceFromAddis: 830
  },
  {

    name: 'Bale Mountains Wilderness Camp',
    location: 'Bale Mountains National Park, Ethiopia',
    country: 'Ethiopia',
    description: 'Camp in the heart of the Bale Mountains with endemic wildlife.',
    price: 950,
    bestSeason: 'October to December',
    category: 'Camping Tours',
    image: 'https://images.unsplash.com/photo-1504387102698-e6e240ffff54?w=1200',
    activities: ['Ethiopian wolf tracking', 'Alpine camping', 'Stargazing'],
    duration: '4 days',
    distanceFromAddis: 400
  },
  {

    name: 'Harar Jugol - City of Saints',
    location: 'Harar, Ethiopia',
    country: 'Ethiopia',
    description: 'Explore the ancient walled city and Islamic cultural heritage of Harar.',
    price: 680,
    bestSeason: 'October to May',
    category: 'Cultural Tours',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=1200',
    activities: ['Walled city tour', 'Hyena feeding', 'Market visit'],
    duration: '3 days',
    distanceFromAddis: 520
  },
  {

    name: 'Sof Omar Cave System',
    location: 'Bale Zone, Ethiopia',
    country: 'Ethiopia',
    description: 'Marvel at one of the largest cave systems in Africa with spectacular formations.',
    price: 590,
    bestSeason: 'November to March',
    category: 'Adventure Trips',
    image: 'https://images.unsplash.com/photo-1474398763683-7e6b8d9d23a1?w=1200',
    activities: ['Cave exploration', 'River walk', 'Photography'],
    duration: '2 days',
    distanceFromAddis: 480
  },
  {

    name: 'Nakfa Resistance Memorial',
    location: 'Nakfa, Eritrea',
    country: 'Eritrea',
    description: 'Visit the symbolic heart of Eritrean independence struggle and underground tunnels.',
    price: 690,
    bestSeason: 'October to April',
    category: 'Cultural Tours',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200',
    activities: ['Museum visit', 'Tunnel tour', 'Historical briefing'],
    duration: '2 days',
    distanceFromAddis: 1200
  },
  {

    name: 'Tadjoura Gulf Retreat',
    location: 'Tadjoura, Djibouti',
    country: 'Djibouti',
    description: 'Experience the charm of Djibouti\'s oldest town on the shores of the Gulf of Tadjoura.',
    price: 880,
    bestSeason: 'October to March',
    category: 'Coastal & Marine',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200',
    activities: ['Whale shark tour', 'Old town walk', 'Coastal relaxation'],
    duration: '3 days',
    distanceFromAddis: 780
  },
  {

    name: 'Abbe Lake & Flamingos',
    location: 'Lake Abbe, Djibouti',
    country: 'Djibouti',
    description: 'Witness otherworldly limestone chimneys and thousands of flamingos at Lake Abbe.',
    price: 990,
    bestSeason: 'November to February',
    category: 'Nature Tours',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200',
    activities: ['Birdwatching', 'Landscape photography', 'Camping'],
    duration: '3 days',
    distanceFromAddis: 850
  },
  {

    name: 'Sheikh Cave Dwellings',
    location: 'Sheikh, Somalia',
    country: 'Somalia',
    description: 'Discover the cave dwellings and natural springs of this historic highland town.',
    price: 650,
    bestSeason: 'November to February',
    category: 'Cultural Tours',
    image: 'https://images.unsplash.com/photo-1504387102698-e6e240ffff54?w=1200',
    activities: ['Cave exploration', 'Highland walking', 'Cultural exchange'],
    duration: '2 days',
    distanceFromAddis: 750
  },
  {

    name: 'Eyl Coastal Haven',
    location: 'Eyl, Somalia',
    country: 'Somalia',
    description: 'Relax at this pristine fishing town turned peaceful coastal getaway.',
    price: 720,
    bestSeason: 'November to March',
    category: 'Coastal & Marine',
    image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3?w=1200',
    activities: ['Beach leisure', 'Fishing experience', 'Sea cave tour'],
    duration: '3 days',
    distanceFromAddis: 1050
  },
  {

    name: 'Serengeti Wilderness Camp',
    location: 'Serengeti National Park, Tanzania',
    country: 'Tanzania',
    description: 'Experience the Great Migration up close from luxury tented camps.',
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
    description: 'Camp on the rim of the world\'s largest unbroken caldera.',
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
    description: 'Traditional camping experience in the heart of Kenya\'s most famous game reserve.',
    price: 1450,
    bestSeason: 'July to October',
    category: 'Camping Tours',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200',
    activities: ['Game viewing', 'Maasai village visit', 'Hot air balloon'],
    duration: '5 days',
    distanceFromAddis: 1100
  },
  {

    name: 'Mount Kenya Base Camp',
    location: 'Mount Kenya National Park, Kenya',
    country: 'Kenya',
    description: 'Camp on the slopes of Africa\'s second-highest peak with spectacular alpine scenery.',
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
    description: 'Camp along the shores of Africa\'s deepest lake with pristine beaches.',
    price: 980,
    bestSeason: 'June to October',
    category: 'Camping Tours',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200',
    activities: ['Lake swimming', 'Chimpanzee trekking', 'Fishing'],
    duration: '4 days',
    distanceFromAddis: 1300
  },
  {

    name: 'Ruwenzori Mountains Camp',
    location: 'Ruwenzori Mountains, Uganda',
    country: 'Uganda',
    description: 'Base camp on the legendary "Mountains of the Moon" with glacial peaks.',
    price: 1380,
    bestSeason: 'December to February',
    category: 'Camping Tours',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200',
    activities: ['Alpine camping', 'Glacial trekking', 'Endemic birding'],
    duration: '7 days',
    distanceFromAddis: 1000
  },
  {

    name: 'Nyungwe Forest Camp',
    location: 'Nyungwe National Park, Rwanda',
    country: 'Rwanda',
    description: 'Camp at the edge of East Africa\'s largest montane rainforest.',
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
    description: 'Camp along the beautiful shores of Lake Tanganyika in Burundi.',
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
    description: 'Experience the wilderness of Africa\'s newest nation in Boma National Park.',
    price: 1050,
    bestSeason: 'January to April',
    category: 'Camping Tours',
    image: 'https://images.unsplash.com/photo-1595781512989-e73ae46944e3?w=1200',
    activities: ['Game drives', 'Migration viewing', 'Community visits'],
    duration: '5 days',
    distanceFromAddis: 1300
  },
  {

    name: 'Nimule River Camp',
    location: 'Nimule, South Sudan',
    country: 'South Sudan',
    description: 'Camp along the White Nile near the Ugandan border in Nimule National Park.',
    price: 890,
    bestSeason: 'December to March',
    category: 'Camping Tours',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200',
    activities: ['River fishing', 'Boat safari', 'Birdwatching'],
    duration: '4 days',
    distanceFromAddis: 1400
  },
  {

    name: 'Mount Karthala Crater Camp',
    location: 'Grande Comore, Comoros',
    country: 'Comoros',
    description: 'Camp on the slopes of the active Karthala volcano in the Comoros.',
    price: 920,
    bestSeason: 'May to November',
    category: 'Camping Tours',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1200',
    activities: ['Volcano trekking', 'Crater exploration', 'Cloud forest hike'],
    duration: '4 days',
    distanceFromAddis: 2800
  },
  {

    name: 'Nosy Be Island Camp',
    location: 'Nosy Be, Madagascar',
    country: 'Madagascar',
    description: 'Camp on Madagascar\'s premier tropical island with lemur encounters.',
    price: 780,
    bestSeason: 'April to November',
    category: 'Camping Tours',
    image: 'https://images.unsplash.com/photo-1555082556-43b791ba1ea3?w=1200',
    activities: ['Lemur spotting', 'Island hopping', 'Beach camping'],
    duration: '4 days',
    distanceFromAddis: 3200
  },
  {

    name: 'Andasibe Rainforest Camp',
    location: 'Andasibe-Mantadia National Park, Madagascar',
    country: 'Madagascar',
    description: 'Camp in the eastern rainforest home to the largest lemur species, the Indri.',
    price: 850,
    bestSeason: 'April to November',
    category: 'Camping Tours',
    image: 'https://images.unsplash.com/photo-1589979481223-deb893043163?w=1200',
    activities: ['Lemur tracking', 'Night walks', 'Rainforest hikes'],
    duration: '5 days',
    distanceFromAddis: 3300
  },
  {

    name: 'Vallée de Mai Camp',
    location: 'Praslin Island, Seychelles',
    country: 'Seychelles',
    description: 'Camp in the mystical palm forest of Vallée de Mai, a UNESCO World Heritage site.',
    price: 1150,
    bestSeason: 'April to May',
    category: 'Camping Tours',
    image: 'https://images.unsplash.com/photo-1589197331516-4b6f3a2b6b3?w=1200',
    activities: ['Palm forest tour', 'Tortoise encounter', 'Beach camping'],
    duration: '3 days',
    distanceFromAddis: 3400
  },
  {

    name: 'Black River Gorges Camp',
    location: 'Black River Gorges National Park, Mauritius',
    country: 'Mauritius',
    description: 'Camp in Mauritius\' largest national park with endemic birds and waterfalls.',
    price: 980,
    bestSeason: 'May to December',
    category: 'Camping Tours',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200',
    activities: ['Rainforest hiking', 'Waterfall trek', 'Birdwatching'],
    duration: '3 days',
    distanceFromAddis: 3500
  }
];

export default destinations;
