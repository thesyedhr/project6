export interface Project {
  id: string;
  code?: string;
  title: string;
  subtitle: string;
  typology: 'residential' | 'cultural' | 'pavilion' | 'masterplan';
  typologyLabel: string;
  location: string;
  year: number;
  areaM2: number;
  areaSqFt: number;
  status?: string;
  heroImage: string;
  blueprintImage?: string;
  galleryImages: string[];
  materials: string[];
  structuralConcept: string;
  sustainabilityRating: string;
  overview: string;
  articleParagraphs?: string[];
  clientBrief: string;
  quote: {
    text: string;
    author: string;
  };
  metrics: {
    label: string;
    value: string;
  }[];
}

export const PROJECTS: Project[] = [
  {
    id: 'aurum-villas',
    code: '',
    title: 'AURUM',
    subtitle: 'A world of luxury awaits — collection of 33 three-bedroom luxury villas.',
    typology: 'residential',
    typologyLabel: 'Collection of 33 Villas',
    location: 'Vilankurichi, Coimbatore',
    year: 2024,
    areaM2: 280,
    areaSqFt: 3012,
    status: '',
    heroImage: '',
    galleryImages: ['', '', ''],
    materials: ['Teak Wood Main Doors with Yale/Dorma Locks', '800x800mm Vitrified Tiles', 'Kohler / Roca Sanitaryware', 'Dedicated 11KV/440V Feeders'],
    structuralConcept: 'Earthquake resistant foundation with R.C.C. M25 Grade concrete and super structure with bricks / solid blocks / Aerocon blocks.',
    sustainabilityRating: '100% Vasthu Compliant · Hydro-Pneumatic RO Water',
    overview:
      'Welcome to Aurum by Soulspace, where sophistication meets understated elegance. Discover a collection of 33, three-bedroom villas at SF No.189, 190, Ashok J Nagar, Behind R J Matriculation School, Vilankurichi, meticulously designed with a focus on refinement, creature comforts, and blissful living. Featuring a fully furnished clubhouse with gymnasium, swimming pool, banquet hall, and snooker court, supported by 62.5 KVA genset backup, treated R.O. water via a hydro-pneumatic system, and 100% Vasthu compliance.',
    articleParagraphs: [
      'Welcome to Aurum by Soulspace, where sophistication meets understated elegance. Discover a collection of 33, three-bedroom villas, perfectly positioned in Ashok J Nagar, Vilankurichi (behind RJ Matriculation School) for those seeking a dynamic lifestyle. Each home has been meticulously designed with a focus on refinement, offering an array of stunning features that elevate the living experience to new heights.',
      'From exquisite finishes to innovative design, every detail has been thoughtfully crafted to ensure a truly exceptional living experience. The gated enclave is enriched with a fully furnished clubhouse, modern gymnasium, banquet hall, swimming pool, snooker court, 62.5 KVA genset backup, treated R.O. water via a hydro-pneumatic system, and 100% Vasthu compliance.',
    ],
    clientBrief: 'Own a piece of paradise — meticulously designed with a focus on refinement, creature comforts, and blissful living.',
    quote: {
      text: 'Homes that celebrate the richness of life. Specially crafted for those who value a private lifestyle.',
      author: 'Soulspace Infrastructure',
    },
    metrics: [
      { label: 'Villa Enclave', value: '33 Villas' },
      { label: 'Vasthu Alignment', value: '100% Compliant' },
      { label: 'Power Backup', value: '62.5 KVA Genset' },
      { label: 'Clubhouse Area', value: 'Furnished Club' },
    ],
  },
  {
    id: 'abv-arbor',
    code: '',
    title: 'ABV ARBOR',
    subtitle: 'Sign up for an unrivalled home experience — 12 exclusive luxury flats.',
    typology: 'residential',
    typologyLabel: '12 Exclusive Luxury Flats',
    location: 'Ramanathapuram, Coimbatore',
    year: 2025,
    areaM2: 222,
    areaSqFt: 2395,
    status: '',
    heroImage: '',
    galleryImages: ['', '', ''],
    materials: ['8” Thick AAC & Porotherm Blocks', 'Teakwood Frame Veneered Doors', 'Finolex / Polycab Cables', 'UPVC Windows with MS Safety Grills'],
    structuralConcept: 'Stilt + 5 Floors RCC Framed structure with isolated footing foundation.',
    sustainabilityRating: '100% Vastu & Manaiyadi Compliant · Piped Gas Connection',
    overview:
      'Welcome to ABV Arbor by Soulspace Infrastructure, an exclusive luxury apartment complex located at Plot no.18, G Square Blue Crest, Near GEM Hospital, Ramanathapuram, Coimbatore, just 5 minutes from Race Course. Offering 12 luxury 3 BHK & 4 BHK residences crafted with contemporary minimalist architecture, clean lines, and sleek finishes. Indulge in exclusive amenities including a landscaped terrace garden, state-of-the-art fitness center, community hall, piped gas connection, 1 kVA power backup per flat, and 100% Vastu & Manaiyadi compliance.',
    articleParagraphs: [
      'Welcome to ABV Arbor by Soulspace Infrastructure, an exclusive luxury apartment complex located in the heart of Coimbatore. Situated at Plot no.18, G Square Blue Crest (near GEM Hospital) in Ramanathapuram, just 5 minutes away from the prestigious Racecourse, ABV Arbor offers a unique blend of modern sophistication and convenience.',
      'Our apartments boast contemporary minimalist architecture across 12 luxury 3 BHK and 4 BHK residences with clean lines, sleek finishes, a landscaped terrace garden, fitness center, community hall, piped gas connection, 1 kVA power backup per flat, and 100% Vastu & Manaiyadi compliance.',
    ],
    clientBrief: 'Heart of the city — contemporary minimalist residences with landscaped terrace garden, gym, and community hall.',
    quote: {
      text: 'First impressions doesn’t get any better than this.',
      author: 'Soulspace Infrastructure',
    },
    metrics: [
      { label: 'Apartment Units', value: '12 Luxury Flats' },
      { label: 'Proximity', value: '5 Min Race Course' },
      { label: 'Unit Options', value: '3 BHK & 4 BHK' },
      { label: 'Power Backup', value: '1 kVA Per Flat' },
    ],
  },
  {
    id: 'dotcom-workspaces',
    code: '',
    title: 'DOTCOM',
    subtitle: 'The city\'s tech address — 16 expertly designed workspaces.',
    typology: 'cultural',
    typologyLabel: '16 Commercial Workspaces',
    location: 'PN Palayam, Coimbatore',
    year: 2024,
    areaM2: 191,
    areaSqFt: 2054,
    status: '',
    heroImage: '',
    galleryImages: ['', '', ''],
    materials: ['PT (Post-Tensioned) Slabs & Beams', '11’6” Floor-to-Floor Height', '2’ x 2’ Vitrified Designer Corridors', '8-Passenger Elevator'],
    structuralConcept: 'RCC Main Frame Stilt structure with PT slab and beams for 100% column-free office space.',
    sustainabilityRating: 'Vastu Aligned · Corporation UGD & Rainwater Harvesting',
    overview:
      'Introducing DOTCOM, a premier commercial project located at No.58B, Parameshwaran Layout Road, PN Palayam, Coimbatore, just 5 minutes from Avinashi Road and Lakshmi Mills. The project offers 16 expertly designed workspaces planned with Post-Tensioned (PT) slab and beams for 100% column-free office layouts, an 11’6” clear floor-to-floor height, and wide lobbies. Enhanced with abundant natural light and airflow, DOTCOM features a rooftop dining area, unisex gym, 2 & 4 wheeler stacked parking, and video phone provisions for each unit.',
    articleParagraphs: [
      'Introducing DOTCOM, a premier commercial project located at No.58B, Parameshwaran Layout Road, PN Palayam, Coimbatore, just 5 minutes from Avinashi Road and Lakshmi Mills. This strategic location ensures seamless connectivity to all major business districts across Coimbatore.',
      'The project offers 16 expertly designed workspaces planned with Post-Tensioned (PT) slab and beams for 100% column-free office layouts, 11’6” clear floor-to-floor height, rooftop dining area, unisex gym, 2 & 4 wheeler stacked parking, and dedicated video phone provisions for each workspace.',
    ],
    clientBrief: '16 expertly designed column-free workspaces with rooftop dining area, gym, and 2 & 4-wheeler stacked parking.',
    quote: {
      text: 'Spacious open plan layouts, unobstructed views, and high-ceilinged spaces foster collaboration, efficiency, and growth.',
      author: 'Soulspace Infrastructure',
    },
    metrics: [
      { label: 'Workspaces', value: '16 Office Units' },
      { label: 'Structural Span', value: 'Column-Free PT' },
      { label: 'Floor Height', value: '11’6” Clear' },
      { label: 'Parking System', value: 'Stacked Parking' },
    ],
  },
  {
    id: 'mystic-villas',
    code: '',
    title: 'MYSTIC',
    subtitle: 'Close to nature, near to your world — luxury gated community villas near Isha.',
    typology: 'residential',
    typologyLabel: '22 Cents + Farmhouse (2500 sqft)',
    location: 'Semmedu, Coimbatore',
    year: 2025,
    areaM2: 232,
    areaSqFt: 2500,
    status: '',
    heroImage: '',
    galleryImages: ['', '', ''],
    materials: ['Teakwood Frame & Teak Ply Doors', '800x800mm Vitrified & Wooden Flooring', 'Roca / Kohler / American Standard Sanitaryware', 'Finolex / Polycab ISO Fire Resistant Wires'],
    structuralConcept: 'RCC Framed structure with isolated footing foundation & 8” AAC / Solid Blocks / Porotherm bricks.',
    sustainabilityRating: '80% Plantation & 20% Nature Homes · Surplus Siruvani Water',
    overview:
      'With social responsibility in mind, Soulspace Infrastructure created "MYSTIC" with utmost care to reunite ourselves with nature. Spanning 2.5 acres of well-maintained coconut plantation with surplus Siruvani water (world’s 2nd tastiest water), located just a 10 min drive to Adiyogi & Isha Yoga Centre in Semmedu, Coimbatore. MYSTIC offers 22 cents (or more) plantation land with a custom 2,500 sq.ft. luxury farmhouse and private plunge pool built under our signature 80-20 concept (80% plantation & 20% nature homes).',
    articleParagraphs: [
      'With a Social Responsibility in mind, our company created “MYSTIC”, with utmost care on our community just to reunite ourselves with nature. Our project spreads across a 2.5 acre of well-maintained heavenly coconut plantation with surplus amount of Siruvani water, where many claim it as the world’s second tastiest.',
      'Just a 10 min drive to Adiyogi (the 112ft world record bust structure) and Isha Yoga Centre. Create a nest for generations with our 80-20 concept (80% plantation & 20% of well-constructed nature homes). To experience all this at one place, we provide you 22 cents (or more) of our plantation land along with a custom 2500 sqft farmhouse and private plunge pool.',
    ],
    clientBrief: 'Close to nature, near to your world — 22+ cents plantation land with 2500 sqft farmhouse & private plunge pool.',
    quote: {
      text: 'Create a nest for generations with our 80-20 concept (80% plantation & 20% of well-constructed nature homes).',
      author: 'Soulspace Infrastructure',
    },
    metrics: [
      { label: 'Plantation Plot', value: '22+ Cents Land' },
      { label: 'Farmhouse Area', value: '2500 Sq.Ft.' },
      { label: 'Key Highlight', value: 'Private Plunge Pool' },
      { label: 'Proximity', value: '10 Min to Adiyogi' },
    ],
  },
  {
    id: 'uptown-residences',
    code: '',
    title: 'UPTOWN',
    subtitle: 'Luxury space in an unbeatable price — 110 thoughtfully crafted apartments.',
    typology: 'residential',
    typologyLabel: '110 Crafted Budget Units',
    location: 'Eachanari, Coimbatore',
    year: 2025,
    areaM2: 135,
    areaSqFt: 1450,
    status: '',
    heroImage: '',
    galleryImages: ['', '', ''],
    materials: ['8” Thick Solid Blocks', '600x600mm Vitrified Tiles', 'Branded CPVC Concealed Lines', 'Teakwood Main Door Frames'],
    structuralConcept: 'Stilt + 5 Floors RCC Framed structure with isolated footing foundation.',
    sustainabilityRating: 'Vaastu Compliant · On-Site Sewage Treatment Plant',
    overview:
      'Situated in Eachanari, famous for its 500-year-old Vinayagar temple and fast-developing social and educational hub, UPTOWN brings "Luxury Space in an Unbeatable Price." A collaborative 110 units of 1 BHK, 2 BHK & 3 BHK thoughtfully crafted budget apartments located just 500 meters from Eachanari Temple. Featuring world-class amenities including a swimming pool, community hall, indoor modern gym, home theatre, and children’s park, engineered with 8” thick solid blocks, branded CPVC concealed lines, and 100% Vaastu compliance.',
    articleParagraphs: [
      'Eachanari, famous for its 500-year-old Vinayagar temple, is a fast-developing residential and educational corridor in Coimbatore with effortless connectivity to leading schools, colleges, IT corridors, and healthcare centers.',
      '“Luxury Space in an Unbeatable Price” is the core conception of UPTOWN, delivering 110 thoughtfully crafted 1 BHK, 2 BHK & 3 BHK apartments located 500 meters from Eachanari Temple, complete with swimming pool, community hall, modern indoor gym, home theatre, and children’s park.',
    ],
    clientBrief: 'Luxury space in an unbeatable price with swimming pool, community hall, indoor gym, home theatre, and children’s park.',
    quote: {
      text: '“Luxury space in an unbeatable price” is our main conception of this project.',
      author: 'Soulspace Infrastructure',
    },
    metrics: [
      { label: 'Total Units', value: '110 Residences' },
      { label: 'Configurations', value: '1, 2 & 3 BHK' },
      { label: 'Temple Proximity', value: '500m Vinayagar' },
      { label: 'Amenities', value: 'Pool, Gym & Theatre' },
    ],
  },
];
