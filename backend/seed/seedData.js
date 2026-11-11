const seedUsers = [
  {
    fullName: 'Vikramaditya Rao',
    email: 'owner@realtor.com',
    phone: '+91 98490 12345',
    password: 'password123',
    role: 'owner',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Experienced real estate investor and licensed property manager with over 12 years in Telangana properties.',
    isVerified: true,
    hidePhone: false,
    hideEmail: false
  },
  {
    fullName: 'Ananya Reddy',
    email: 'seller@realtor.com',
    phone: '+91 97001 88990',
    password: 'password123',
    role: 'both',
    profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    bio: 'Architect and certified property builder specializing in premium modern villas and luxury apartments.',
    isVerified: true,
    hidePhone: false,
    hideEmail: false
  },
  {
    fullName: 'Rahul Sharma',
    email: 'buyer@realtor.com',
    phone: '+91 91234 56789',
    password: 'password123',
    role: 'buyer',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    bio: 'Software Engineering Director relocating to Hyderabad, actively looking for residential and investment spaces.',
    isVerified: true,
    hidePhone: false,
    hideEmail: false
  }
];

const seedProperties = [
  // 1. HYDERABAD - Villas (Sale)
  {
    title: 'The Sovereign: 5 BHK Luxury Gated Villa in Jubilee Hills',
    category: 'Villas',
    propertyType: 'Residential',
    listingType: 'sale',
    price: 65000000, // 6.5 Cr
    size: 5800,
    sizeUnit: 'sq ft',
    location: {
      country: 'India',
      state: 'Telangana',
      city: 'Hyderabad',
      area: 'Jubilee Hills',
      address: 'Road No. 36, Near Peddamma Temple, Jubilee Hills, Hyderabad',
      coordinates: { lat: 17.4319, lng: 78.4073 }
    },
    bedrooms: 5,
    bathrooms: 6,
    floors: 3,
    propertyCondition: 'New',
    communityType: 'Gated Community',
    furnishedStatus: 'Furnished',
    parking: true,
    amenities: [
      '24/7 Security',
      'Private Swimming Pool',
      'Power Backup',
      'Clubhouse',
      'Gym & Spa',
      'Solar Power',
      'Home Automation',
      'Vastu Compliant',
      'Landscaped Garden'
    ],
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: '[Demo Sample Listing] An extraordinary 5 BHK architectural masterpiece nestled in the elite enclave of Jubilee Hills. Featuring Italian marble flooring, double-height living areas, private rooftop infinity pool, and smart home automation. Complete privacy with 24/7 armed gated security.',
    status: 'Available',
    isFeatured: true
  },

  // 2. HYDERABAD - Individual House (Sale)
  {
    title: 'Contemporary 4 BHK Independent House in Gachibowli',
    category: 'Individual Houses',
    propertyType: 'Residential',
    listingType: 'sale',
    price: 28500000, // 2.85 Cr
    size: 3400,
    sizeUnit: 'sq ft',
    location: {
      country: 'India',
      state: 'Telangana',
      city: 'Hyderabad',
      area: 'Gachibowli',
      address: 'Plot 42, Financial District Phase 1, Gachibowli, Hyderabad',
      coordinates: { lat: 17.4401, lng: 78.3489 }
    },
    bedrooms: 4,
    bathrooms: 4,
    floors: 2,
    propertyCondition: 'New',
    communityType: 'Individual Property',
    furnishedStatus: 'Semi-Furnished',
    parking: true,
    amenities: [
      '24/7 Security',
      'Power Backup',
      'EV Charging Point',
      'Rainwater Harvesting',
      'Modular Kitchen',
      'Terrace Garden'
    ],
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
    ],
    description: '[Demo Sample Listing] Modern east-facing independent home just minutes away from major IT corridors and international schools. Beautifully planned with open-concept dining, high ceilings, custom woodwork, and ample covered parking for 2 SUVs.',
    status: 'Available',
    isFeatured: true
  },

  // 3. HYDERABAD - Building with Rental Units (Sale/Investment)
  {
    title: 'High-Yield Commercial & Residential 5-Storey Building in Madhapur',
    category: 'Buildings with Rental Units',
    propertyType: 'Residential',
    listingType: 'sale',
    price: 49000000, // 4.9 Cr
    size: 7200,
    sizeUnit: 'sq ft',
    location: {
      country: 'India',
      state: 'Telangana',
      city: 'Hyderabad',
      area: 'Madhapur',
      address: 'Near Durgam Cheruvu Metro, Madhapur, Hyderabad',
      coordinates: { lat: 17.4483, lng: 78.3915 }
    },
    bedrooms: 12,
    bathrooms: 12,
    floors: 5,
    propertyCondition: 'Resale',
    communityType: 'Individual Property',
    furnishedStatus: 'Furnished',
    parking: true,
    amenities: [
      'Lift / Elevator',
      '100% Power Backup',
      'CCTV Surveillance',
      'Individual Electric Meters',
      'Solar Water Heating',
      'Borewell & Municipal Water'
    ],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'
    ],
    description: '[Demo Sample Listing] Prime rental income generating building comprising 6 independent 2-BHK furnished units and ground floor commercial parking/reception. Current gross monthly rental income exceeds ₹2.4 Lakhs with 100% occupancy history.',
    status: 'Available',
    isFeatured: true
  },

  // 4. HYDERABAD - Land / Plot (Sale)
  {
    title: 'HMDA Approved 400 Sq. Yds Residential Plot in Mokila',
    category: 'Land / Plots',
    propertyType: 'Residential',
    listingType: 'sale',
    price: 16000000, // 1.6 Cr
    size: 3600,
    sizeUnit: 'sq ft',
    location: {
      country: 'India',
      state: 'Telangana',
      city: 'Hyderabad',
      area: 'Mokila',
      address: 'Green Meadows Layout, Shankarpalli Road, Mokila, Hyderabad',
      coordinates: { lat: 17.4102, lng: 78.1925 }
    },
    bedrooms: 0,
    bathrooms: 0,
    floors: 0,
    propertyCondition: 'New',
    communityType: 'Gated Community',
    furnishedStatus: 'Unfurnished',
    parking: true,
    amenities: [
      'Blacktop 40ft Roads',
      'Underground Drainage',
      'Avenue Plantation',
      'Electricity with Street Lights',
      'Gated Compound Wall',
      'Clear Title'
    ],
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80'
    ],
    description: '[Demo Sample Listing] 100% clear title, HMDA approved premium villa plot in an upscale gated community near Kollur ORR exit. 40-foot wide asphalt roads, manicured landscaping, ready for immediate villa construction.',
    status: 'Available',
    isFeatured: false
  },

  // 5. HYDERABAD - Rental House (Rent)
  {
    title: 'Exquisite 3 BHK Fully Furnished Penthouse for Rent in Banjara Hills',
    category: 'Individual Houses',
    propertyType: 'Residential',
    listingType: 'rent',
    price: 95000, // 95k / month
    size: 2600,
    sizeUnit: 'sq ft',
    location: {
      country: 'India',
      state: 'Telangana',
      city: 'Hyderabad',
      area: 'Banjara Hills',
      address: 'Road No. 12, MLA Colony, Banjara Hills, Hyderabad',
      coordinates: { lat: 17.4156, lng: 78.4347 }
    },
    bedrooms: 3,
    bathrooms: 3,
    floors: 1,
    propertyCondition: 'Resale',
    communityType: 'Gated Community',
    furnishedStatus: 'Furnished',
    parking: true,
    amenities: [
      '24/7 Security',
      'Power Backup',
      'Private Terrace',
      'Modular Kitchen with Appliances',
      'Covered Car Parking',
      'High Speed Wi-Fi Ready'
    ],
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80'
    ],
    description: '[Demo Sample Listing] Luxurious 3 BHK penthouse commanding sweeping panoramic skyline views of Banjara Hills. Designed with designer fixtures, central air conditioning, imported leather sofas, and a private glass terrace.',
    status: 'Available',
    isFeatured: true
  },

  // 6. WARANGAL - Villa (Sale)
  {
    title: 'Royal Palms 4 BHK Duplex Villa in Kazipet',
    category: 'Villas',
    propertyType: 'Residential',
    listingType: 'sale',
    price: 18500000, // 1.85 Cr
    size: 3200,
    sizeUnit: 'sq ft',
    location: {
      country: 'India',
      state: 'Telangana',
      city: 'Warangal',
      area: 'Kazipet',
      address: 'Near Railway Officers Colony, Kazipet, Warangal',
      coordinates: { lat: 17.9784, lng: 79.5101 }
    },
    bedrooms: 4,
    bathrooms: 4,
    floors: 2,
    propertyCondition: 'New',
    communityType: 'Gated Community',
    furnishedStatus: 'Semi-Furnished',
    parking: true,
    amenities: [
      '24/7 Security',
      'Clubhouse',
      'Gym',
      'Children Play Area',
      'Vastu Compliant',
      'Landscaped Park',
      'Intercom Facility'
    ],
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80'
    ],
    description: '[Demo Sample Listing] A prestigious 4 BHK gated community villa nestled in a quiet, green corridor of Kazipet. Built to exacting quality standards with granite staircases, teakwood door frames, and double-car port.',
    status: 'Available',
    isFeatured: true
  },

  // 7. WARANGAL - Individual House (Sale)
  {
    title: 'Charming 3 BHK Independent House in Naimnagar',
    category: 'Individual Houses',
    propertyType: 'Residential',
    listingType: 'sale',
    price: 11500000, // 1.15 Cr
    size: 2100,
    sizeUnit: 'sq ft',
    location: {
      country: 'India',
      state: 'Telangana',
      city: 'Warangal',
      area: 'Naimnagar',
      address: 'Lane 4, Near University Arts College, Naimnagar, Warangal',
      coordinates: { lat: 17.9944, lng: 79.5638 }
    },
    bedrooms: 3,
    bathrooms: 3,
    floors: 2,
    propertyCondition: 'Resale',
    communityType: 'Individual Property',
    furnishedStatus: 'Semi-Furnished',
    parking: true,
    amenities: [
      'Municipal Water & Borewell',
      'Power Inverter Setup',
      'Car Porch',
      '100% Vastu Compliant',
      'Solar Water Heater'
    ],
    images: [
      'https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80'
    ],
    description: '[Demo Sample Listing] Well-maintained independent house in peaceful Naimnagar. Features a large hall, puja room, spacious kitchen, and private rooftop terrace. Close to Kakatiya University campus.',
    status: 'Available',
    isFeatured: false
  },

  // 8. WARANGAL - Land / Plot (Sale)
  {
    title: 'KUDA Approved 250 Sq. Yds Plot on Hunter Road Bypass',
    category: 'Land / Plots',
    propertyType: 'Residential',
    listingType: 'sale',
    price: 6500000, // 65 Lakhs
    size: 2250,
    sizeUnit: 'sq ft',
    location: {
      country: 'India',
      state: 'Telangana',
      city: 'Warangal',
      area: 'Hunter Road',
      address: 'Venkateshwara Enclave, Hunter Road, Warangal',
      coordinates: { lat: 17.9622, lng: 79.5881 }
    },
    bedrooms: 0,
    bathrooms: 0,
    floors: 0,
    propertyCondition: 'New',
    communityType: 'Individual Property',
    furnishedStatus: 'Unfurnished',
    parking: true,
    amenities: [
      'KUDA Approved Layout',
      '33ft BT Road',
      'Underground Drainage',
      'Electricity Line Installed',
      'Clear Spot Registration'
    ],
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80'
    ],
    description: '[Demo Sample Listing] Premium KUDA approved open residential plot with great connectivity to Warangal-Hyderabad national highway. Ideal for building a dream home or long-term capital appreciation.',
    status: 'Available',
    isFeatured: false
  },

  // 9. HANAMKONDA - Individual House (Sale)
  {
    title: 'Spacious 4 BHK Modern House near Kakatiya University, Subedari',
    category: 'Individual Houses',
    propertyType: 'Residential',
    listingType: 'sale',
    price: 14500000, // 1.45 Cr
    size: 2800,
    sizeUnit: 'sq ft',
    location: {
      country: 'India',
      state: 'Telangana',
      city: 'Hanamkonda',
      area: 'Subedari',
      address: 'Collectorate Road, Subedari, Hanamkonda',
      coordinates: { lat: 18.0125, lng: 79.5542 }
    },
    bedrooms: 4,
    bathrooms: 4,
    floors: 2,
    propertyCondition: 'New',
    communityType: 'Individual Property',
    furnishedStatus: 'Unfurnished',
    parking: true,
    amenities: [
      'Borewell & Mission Bhagiratha Water',
      'Covered Parking',
      'Vastu Compliant',
      'Rainwater Harvesting',
      'Compound Wall with Gate'
    ],
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: '[Demo Sample Listing] Newly constructed 4 BHK independent building in the heart of Hanamkonda, Subedari. Contemporary exterior elevations, premium vitrified tiles, false ceiling, and proximity to courts and district offices.',
    status: 'Available',
    isFeatured: true
  },

  // 10. HANAMKONDA - Building with Rental Units (Sale)
  {
    title: 'G+3 Residential Apartment Complex with 6 Rental Flats in Balasamudram',
    category: 'Buildings with Rental Units',
    propertyType: 'Residential',
    listingType: 'sale',
    price: 32000000, // 3.2 Cr
    size: 5200,
    sizeUnit: 'sq ft',
    location: {
      country: 'India',
      state: 'Telangana',
      city: 'Hanamkonda',
      area: 'Balasamudram',
      address: 'Opposite Judicial Complex, Balasamudram, Hanamkonda',
      coordinates: { lat: 18.0068, lng: 79.5678 }
    },
    bedrooms: 12,
    bathrooms: 12,
    floors: 4,
    propertyCondition: 'Resale',
    communityType: 'Individual Property',
    furnishedStatus: 'Semi-Furnished',
    parking: true,
    amenities: [
      'Passenger Lift',
      'Generator Power Backup',
      'Dedicated Stilt Parking',
      'CCTV Cameras',
      'Constant Water Supply'
    ],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
    ],
    description: '[Demo Sample Listing] An exceptional income property comprising six 2-BHK apartments and ground floor stilt parking. Fully rented to reputed bank and university professionals with dependable cash flow.',
    status: 'Available',
    isFeatured: false
  },

  // 11. HANAMKONDA - Villa (Sale)
  {
    title: 'The Grandeur: 4 BHK Luxury Villa in Waddepally Lake View',
    category: 'Villas',
    propertyType: 'Residential',
    listingType: 'sale',
    price: 21000000, // 2.1 Cr
    size: 3500,
    sizeUnit: 'sq ft',
    location: {
      country: 'India',
      state: 'Telangana',
      city: 'Hanamkonda',
      area: 'Waddepally',
      address: 'Lakeview Enclave, Waddepally, Hanamkonda',
      coordinates: { lat: 18.0241, lng: 79.5422 }
    },
    bedrooms: 4,
    bathrooms: 5,
    floors: 2,
    propertyCondition: 'New',
    communityType: 'Gated Community',
    furnishedStatus: 'Semi-Furnished',
    parking: true,
    amenities: [
      '24/7 Security',
      'Swimming Pool',
      'Clubhouse',
      'Lakefront Jogging Track',
      'Gymnasium',
      'Landscape Gardens'
    ],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: '[Demo Sample Listing] Serene waterfront luxury villa offering panoramic lake views, private landscaped lawn, master suite with walk-in wardrobe, and access to an exclusive community clubhouse.',
    status: 'Available',
    isFeatured: true
  },

  // 12. KARIMNAGAR - Villa (Sale)
  {
    title: 'Green Meadows: 4 BHK Gated Community Villa in Mankammathota',
    category: 'Villas',
    propertyType: 'Residential',
    listingType: 'sale',
    price: 19500000, // 1.95 Cr
    size: 3100,
    sizeUnit: 'sq ft',
    location: {
      country: 'India',
      state: 'Telangana',
      city: 'Karimnagar',
      area: 'Mankammathota',
      address: 'VIP Enclave, Near Civil Hospital, Mankammathota, Karimnagar',
      coordinates: { lat: 18.4386, lng: 79.1288 }
    },
    bedrooms: 4,
    bathrooms: 4,
    floors: 2,
    propertyCondition: 'New',
    communityType: 'Gated Community',
    furnishedStatus: 'Furnished',
    parking: true,
    amenities: [
      '24/7 Security',
      'Power Backup',
      'Children Play Area',
      'Community Hall',
      'Solar Rooftop',
      'Intercom'
    ],
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: '[Demo Sample Listing] Premium duplex villa located in the highly desired Mankammathota area. Built with royal red clay bricks, high-spec marble flooring, solar heating, and stylish ambient lighting.',
    status: 'Available',
    isFeatured: true
  },

  // 13. KARIMNAGAR - Individual House (Sale)
  {
    title: 'Modern 3 BHK Independent House near Collectorate Complex',
    category: 'Individual Houses',
    propertyType: 'Residential',
    listingType: 'sale',
    price: 9800000, // 98 Lakhs
    size: 1950,
    sizeUnit: 'sq ft',
    location: {
      country: 'India',
      state: 'Telangana',
      city: 'Karimnagar',
      area: 'Collectorate Area',
      address: 'Near Officers Club, Collectorate Road, Karimnagar',
      coordinates: { lat: 18.4348, lng: 79.1364 }
    },
    bedrooms: 3,
    bathrooms: 3,
    floors: 1,
    propertyCondition: 'New',
    communityType: 'Individual Property',
    furnishedStatus: 'Semi-Furnished',
    parking: true,
    amenities: [
      'Borewell & Filtered Tap Water',
      'Car Parking Port',
      'False Ceiling in All Rooms',
      '100% Vastu Approved'
    ],
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    description: '[Demo Sample Listing] Spot-registration ready 3 BHK house situated in a top residential pocket near Karimnagar Collectorate. Spacious bedrooms, modern sanitary fittings, and secure boundary wall.',
    status: 'Available',
    isFeatured: false
  },

  // 14. KARIMNAGAR - Land / Plot (Sale)
  {
    title: 'High Potential 300 Sq. Yds Highway Facing Commercial/Residential Plot',
    category: 'Land / Plots',
    propertyType: 'Commercial',
    listingType: 'sale',
    price: 8500000, // 85 Lakhs
    size: 2700,
    sizeUnit: 'sq ft',
    location: {
      country: 'India',
      state: 'Telangana',
      city: 'Karimnagar',
      area: 'Kothapalli',
      address: 'Karimnagar-Jagtial Highway, Kothapalli, Karimnagar',
      coordinates: { lat: 18.4551, lng: 79.1122 }
    },
    bedrooms: 0,
    bathrooms: 0,
    floors: 0,
    propertyCondition: 'New',
    communityType: 'Individual Property',
    furnishedStatus: 'Unfurnished',
    parking: true,
    amenities: [
      '60ft Main Highway Facing',
      'Commercial Zone Approved',
      'Clear Legal Title',
      'High Capital Appreciation'
    ],
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'
    ],
    description: '[Demo Sample Listing] Strategically positioned prime highway-front commercial/residential land in rapid expansion zone of Kothapalli. Unmatched visibility suitable for showroom, hospital, or premium retail block.',
    status: 'Available',
    isFeatured: false
  },

  // 15. HYDERABAD - Commercial Office Space (Sale)
  {
    title: 'Grade A Commercial IT Office Floor in Hitec City',
    category: 'Commercial',
    propertyType: 'Commercial',
    listingType: 'sale',
    price: 52000000, // 5.2 Cr
    size: 4500,
    sizeUnit: 'sq ft',
    location: {
      country: 'India',
      state: 'Telangana',
      city: 'Hyderabad',
      area: 'Hitec City',
      address: 'Cyber Gateway Tower, Phase 2, Hitec City, Hyderabad',
      coordinates: { lat: 17.4474, lng: 78.3762 }
    },
    bedrooms: 0,
    bathrooms: 4,
    floors: 1,
    propertyCondition: 'New',
    communityType: 'Gated Community',
    furnishedStatus: 'Furnished',
    parking: true,
    amenities: [
      '24/7 Centralized HVAC',
      'High Speed Elevators',
      '100% DG Power Backup',
      'Biometric Access Control',
      'Conference Rooms',
      'Visitor Parking'
    ],
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80'
    ],
    description: '[Demo Sample Listing] Fully plug-and-play corporate commercial space in the epicenter of Hyderabad IT hub. Features 60 workstation setups, 2 executive cabins, server room, and cafeteria. High rental yield potential.',
    status: 'Available',
    isFeatured: true
  },

  // 16. HYDERABAD - Rental 2 BHK Apartment (Rent)
  {
    title: 'Furnished 2 BHK Modern Apartment in Kondapur',
    category: 'Buildings with Rental Units',
    propertyType: 'Residential',
    listingType: 'rent',
    price: 36000, // 36k / month
    size: 1350,
    sizeUnit: 'sq ft',
    location: {
      country: 'India',
      state: 'Telangana',
      city: 'Hyderabad',
      area: 'Kondapur',
      address: 'Near Botanical Garden, Kondapur, Hyderabad',
      coordinates: { lat: 17.4615, lng: 78.3601 }
    },
    bedrooms: 2,
    bathrooms: 2,
    floors: 1,
    propertyCondition: 'New',
    communityType: 'Gated Community',
    furnishedStatus: 'Furnished',
    parking: true,
    amenities: [
      '24/7 Security',
      'Gym & Swimming Pool',
      'Power Backup',
      'Children Play Area',
      'Covered Parking'
    ],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
    ],
    description: '[Demo Sample Listing] Spotless 2 BHK apartment for rent in a gated society with full lifestyle amenities. 5 minutes from Botanical Gardens and IT parks. Modular kitchen with chimney and water purifier included.',
    status: 'Available',
    isFeatured: false
  },

  // 17. WARANGAL - Rental 3 BHK Independent House (Rent)
  {
    title: 'Peaceful 3 BHK Independent Home for Rent in Kazipet',
    category: 'Individual Houses',
    propertyType: 'Residential',
    listingType: 'rent',
    price: 22000, // 22k / month
    size: 1800,
    sizeUnit: 'sq ft',
    location: {
      country: 'India',
      state: 'Telangana',
      city: 'Warangal',
      area: 'Kazipet',
      address: 'Prashanth Nagar, Kazipet, Warangal',
      coordinates: { lat: 17.9811, lng: 79.5188 }
    },
    bedrooms: 3,
    bathrooms: 3,
    floors: 1,
    propertyCondition: 'Resale',
    communityType: 'Individual Property',
    furnishedStatus: 'Semi-Furnished',
    parking: true,
    amenities: [
      'Borewell Water Supply',
      'Covered Car Parking',
      'Vastu Compliant',
      'Quiet Residential Street'
    ],
    images: [
      'https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80'
    ],
    description: '[Demo Sample Listing] Spacious, ventilated 3 BHK ground floor independent house available for immediate family occupancy. Front porch, separate utility wash area, and pleasant residential neighborhood.',
    status: 'Available',
    isFeatured: false
  },

  // 18. KARIMNAGAR - Rental Commercial Showroom (Rent)
  {
    title: 'Prime Main Road Commercial Retail Showroom for Rent in Karimnagar',
    category: 'Commercial',
    propertyType: 'Commercial',
    listingType: 'rent',
    price: 65000, // 65k / month
    size: 1800,
    sizeUnit: 'sq ft',
    location: {
      country: 'India',
      state: 'Telangana',
      city: 'Karimnagar',
      area: 'Mukarampura',
      address: 'Tower Circle Main Road, Mukarampura, Karimnagar',
      coordinates: { lat: 18.4412, lng: 79.1311 }
    },
    bedrooms: 0,
    bathrooms: 2,
    floors: 1,
    propertyCondition: 'Resale',
    communityType: 'Individual Property',
    furnishedStatus: 'Unfurnished',
    parking: true,
    amenities: [
      'Glass Facade Frontage',
      'Heavy Footfall Zone',
      '3 Phase Electricity',
      'Dedicated Basement Parking'
    ],
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: '[Demo Sample Listing] Ground floor retail showroom space with wide glass facade on busy Tower Circle road. Excellent footfall and visibility for clothing brands, electronics, or clinic.',
    status: 'Available',
    isFeatured: false
  }
];

module.exports = { seedUsers, seedProperties };

