const reviewSeedData = [
  {
    name: "James Whitfield",
    location: "London, United Kingdom",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
    rating: 5,
    date: "March 2024",
    text: "Absolutely extraordinary. The Danakil Depression expedition was unlike anything I have ever experienced. The logistics were flawless — from the 4x4 pickup at Addis Ababa airport to the final drop-off. Our guide Sisay was a walking encyclopedia of Ethiopian geology and culture. I have traveled to 47 countries and this ranks in my top three experiences of all time.",
    tag: "Adventure"
  },
  {
    name: "Sophie Müller",
    location: "Berlin, Germany",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    rating: 5,
    date: "February 2024",
    text: "We booked a 10-day cultural circuit covering Lalibela, Axum, and Gondar. Every detail was handled with care — the hotels, the guides, the transport. The rock-hewn churches of Lalibela left me speechless. EthioTour's team was responsive and professional throughout. I will be recommending them to every traveler I know.",
    tag: "Cultural Tour"
  },
  {
    name: "Abebe Kebede",
    location: "Addis Ababa, Ethiopia",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    rating: 5,
    date: "January 2024",
    text: "As an Ethiopian myself, I was skeptical about using a tour agency for domestic travel. But EthioTour showed me parts of my own country I had never seen. The Simien Mountains trek was breathtaking. The guides were knowledgeable, the 4x4 was in perfect condition, and the camping setup was world-class. Truly proud of what this team has built.",
    tag: "Nature & Trekking"
  },
  {
    name: "Yuki Tanaka",
    location: "Tokyo, Japan",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?w=150&h=150&fit=crop",
    rating: 5,
    date: "December 2023",
    text: "I came to Ethiopia specifically for the Omo Valley tribes and EthioTour delivered beyond my expectations. The cultural encounters were respectful, authentic, and deeply moving. Our guide spoke the local languages and had genuine relationships with the communities. The photography opportunities were incredible. A once-in-a-lifetime journey.",
    tag: "Cultural Tour"
  },
  {
    name: "Maria Santos",
    location: "São Paulo, Brazil",
    avatar: "https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?w=150&h=150&fit=crop",
    rating: 5,
    date: "November 2023",
    text: "The Lake Assal trip in Djibouti was surreal — the saltiest lake outside Antarctica, surrounded by volcanic rock. EthioTour organized everything seamlessly across two countries. The luxury coach was spotless and the driver was incredibly professional. I felt safe the entire time. Already planning my return trip to see the Afar region.",
    tag: "Coastal & Marine"
  },
  {
    name: "David Okonkwo",
    location: "Lagos, Nigeria",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    rating: 4,
    date: "October 2023",
    text: "Solid experience overall. The Gondar castles tour was well-organized and our guide was excellent. The minibus was comfortable for our group of 8. Minor hiccup with hotel check-in timing but the team resolved it quickly. Would definitely book again for the Bale Mountains next time.",
    tag: "City & Heritage"
  },
  {
    name: "Emma Richardson",
    location: "Sydney, Australia",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    rating: 5,
    date: "September 2023",
    text: "I traveled solo as a woman and felt completely safe and supported throughout my 12-day Ethiopia journey. The team checked in on me daily, the accommodations were carefully selected, and my guide was both professional and kind. The Blue Nile Falls and Lake Tana monasteries were magical. EthioTour understands solo female travelers.",
    tag: "Nature & Trekking"
  },
  {
    name: "Chen Wei",
    location: "Shanghai, China",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    rating: 5,
    date: "August 2023",
    text: "Our corporate group of 15 used EthioTour for a team retreat combining Langano lake resort with a Lalibela cultural day. The luxury coach was immaculate, the itinerary was perfectly balanced between relaxation and exploration. The team handled all logistics including dietary requirements for our diverse group. Exceptional service.",
    tag: "Corporate Travel"
  },
  {
    name: "Fatima Al-Rashid",
    location: "Dubai, UAE",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
    rating: 5,
    date: "July 2023",
    text: "Visited Harar — the ancient walled city — and it was like stepping back 500 years. EthioTour arranged a private guide who knew every alley and every story. The hyena feeding ceremony at night was unforgettable. The premium SUV made the journey comfortable. Halal food arrangements were handled perfectly without me even asking.",
    tag: "City & Heritage"
  },
  {
    name: "Pierre Dubois",
    location: "Paris, France",
    avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop",
    rating: 5,
    date: "June 2023",
    text: "As a wildlife photographer, I needed a vehicle with a pop-up roof for the Bale Mountains. EthioTour provided the perfect Safari Land Cruiser and a guide who knew exactly where to find the Ethiopian wolf. I got shots I had been dreaming of for years. The attention to detail for photography-focused tours is outstanding.",
    tag: "Wildlife & Safari"
  },
  {
    name: "Tigist Haile",
    location: "Bahir Dar, Ethiopia",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop",
    rating: 5,
    date: "May 2023",
    text: "Booked the Simien Mountains trek for my honeymoon and it was perfect. EthioTour arranged a private camp with a romantic setup on the escarpment overlooking the valley. Waking up to Gelada baboons outside our tent was magical. The team went above and beyond to make it special. We will be back for our anniversary.",
    tag: "Adventure"
  },
  {
    name: "Robert Kimani",
    location: "Nairobi, Kenya",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop",
    rating: 4,
    date: "April 2023",
    text: "Great value for money. The economy sedan for my solo Addis Ababa city tour was clean and the driver was punctual and knowledgeable. Visited the National Museum, Merkato, and the Ethnological Museum in one day. Efficient, affordable, and professional. Will use EthioTour again for my next Ethiopia visit.",
    tag: "City & Heritage"
  }
];

module.exports = reviewSeedData;
