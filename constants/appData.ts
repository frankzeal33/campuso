export const marketplaceCategories = [
  "All",
  "Food",
  "Fashion",
  "Gadgets",
  "Books",
];

export const products = [
  {
    id: "1",
    name: "Campus breakfast combo",
    seller: "Tasty Bites",
    price: "₦3,500",
    category: "Food",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    name: "Wireless headphones",
    seller: "Tech Hub",
    price: "₦18,000",
    category: "Gadgets",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    name: "Premium hoodie",
    seller: "Campus Drip",
    price: "₦12,500",
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    name: "Calculus textbook",
    seller: "Book Corner",
    price: "₦5,200",
    category: "Books",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80",
  },
];

export const vendors = [
  {
    id: "v1",
    name: "Tasty Bites",
    category: "Food & Drinks",
    rating: "4.8",
    distance: "0.3 km",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "v2",
    name: "Tech Hub",
    category: "Gadgets",
    rating: "4.7",
    distance: "Student Centre",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "v3",
    name: "Campus Drip",
    category: "Fashion",
    rating: "4.6",
    distance: "0.8 km",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "v4",
    name: "Book Corner",
    category: "Books & Study",
    rating: "4.9",
    distance: "Main Gate",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&w=800&q=80",
  },
];

export const people = [
  {
    id: "1",
    name: "Amara Okafor",
    course: "Computer Science · 300L",
    initials: "AO",
    interests: ["Reading", "Tech"],
    image: require("@/assets/images/people-amara.png"),
    school: "Your school",
    isSameSchool: true,
  },
  {
    id: "2",
    name: "Tobi Akinwale",
    course: "Architecture · 200L",
    initials: "TA",
    interests: ["Design", "Football"],
    image: null,
    school: "Your school",
    isSameSchool: true,
  },
  {
    id: "3",
    name: "Zainab Musa",
    course: "Economics · 400L",
    initials: "ZM",
    interests: ["Business", "Music"],
    image: require("@/assets/images/people-zainab.png"),
    school: "Your school",
    isSameSchool: true,
  },
  {
    id: "4",
    name: "David Eze",
    course: "Medicine · 300L",
    initials: "DE",
    interests: ["Fitness", "Study"],
    image: null,
    school: "Your school",
    isSameSchool: true,
  },
  {
    id: "5",
    name: "Chidinma Nwosu",
    course: "Mass Communication · 300L",
    initials: "CN",
    interests: ["Media", "Writing"],
    image: null,
    school: "University of Nigeria",
    isSameSchool: false,
  },
  {
    id: "6",
    name: "Malik Bello",
    course: "Electrical Engineering · 400L",
    initials: "MB",
    interests: ["Robotics", "Football"],
    image: null,
    school: "Ahmadu Bello University",
    isSameSchool: false,
  },

];

export const findCategories = [
  { name: "Apartments", icon: "home-city-outline", color: "yellow" },
  { name: "Services", icon: "tools", color: "green" },
  { name: "Jobs", icon: "briefcase-outline", color: "green" },
  { name: "Roommates", icon: "account-group-outline", color: "yellow" },
  { name: "Lost & Found", icon: "magnify-scan", color: "yellow" },
  { name: "Tutors", icon: "school-outline", color: "green" },
];

export const listings = [
  {
    id: "1",
    title: "Self-contained apartment",
    location: "South Gate · 6 min away",
    price: "₦420k/year",
    icon: "home-city-outline",
    category: "Apartments",
    provider: "GreenView Properties",
    rating: "4.8",
    verified: true,
    description:
      "A clean self-contained apartment with steady water, prepaid electricity, and secure access close to campus.",
  },
  {
    id: "2",
    title: "Shared 2-bedroom flat",
    location: "Campus Road · 10 min away",
    price: "₦250k/year",
    icon: "bunk-bed-outline",
    category: "Apartments",
    provider: "Campus Homes",
    rating: "4.6",
    verified: true,
    description:
      "A spacious shared flat for students looking for affordable accommodation near lectures and transport.",
  },
  {
    id: "3",
    title: "Phone & laptop repairs",
    location: "Student Centre",
    price: "From ₦5,000",
    icon: "tools",
    category: "Services",
    provider: "Tobi Tech Fix",
    rating: "4.9",
    verified: true,
    description:
      "Fast phone and laptop diagnostics, software installation, screen replacement, and general repairs.",
  },
  {
    id: "4",
    title: "Laundry pickup service",
    location: "Available campus-wide",
    price: "From ₦1,500",
    icon: "washing-machine",
    category: "Services",
    provider: "FreshFold Laundry",
    rating: "4.7",
    verified: true,
    description:
      "Affordable wash, dry, fold, and doorstep pickup service available throughout the campus area.",
  },
  {
    id: "5",
    title: "Social media assistant",
    location: "Remote · Part-time",
    price: "₦45k/month",
    icon: "briefcase-outline",
    category: "Jobs",
    provider: "Campus Creative Hub",
    rating: "4.5",
    verified: true,
    description:
      "Create short posts, reply to customers, and help manage weekly content for a growing student business.",
  },
  {
    id: "6",
    title: "Weekend event ushers",
    location: "Student Centre",
    price: "₦8,000/day",
    icon: "account-tie-outline",
    category: "Jobs",
    provider: "Prime Events",
    rating: "4.4",
    verified: true,
    description:
      "Friendly students needed for registration, guest direction, and event support this weekend.",
  },
  {
    id: "7",
    title: "Female roommate wanted",
    location: "North Gate · 8 min away",
    price: "₦180k/year",
    icon: "account-group-outline",
    category: "Roommates",
    provider: "Amara O.",
    rating: "4.8",
    verified: true,
    description:
      "Looking for a tidy female student to share a furnished two-bedroom apartment near North Gate.",
  },
  {
    id: "8",
    title: "Roommate near medical hostel",
    location: "Medical Campus",
    price: "₦210k/year",
    icon: "account-group-outline",
    category: "Roommates",
    provider: "David E.",
    rating: "4.6",
    verified: true,
    description:
      "One space available in a quiet shared apartment suitable for a focused student.",
  },
  {
    id: "9",
    title: "Lost student ID card",
    location: "Main Library",
    price: "Reward available",
    icon: "card-account-details-outline",
    category: "Lost & Found",
    provider: "Zainab M.",
    rating: "5.0",
    verified: true,
    description:
      "A student ID card was misplaced around the main library reading hall. Please get in touch if found.",
  },
  {
    id: "10",
    title: "Found wireless earbuds",
    location: "Science Complex",
    price: "Claim item",
    icon: "headphones",
    category: "Lost & Found",
    provider: "Campus Security",
    rating: "5.0",
    verified: true,
    description:
      "Wireless earbuds were found near the Science Complex. Ownership verification is required.",
  },
  {
    id: "11",
    title: "Calculus and statistics tutor",
    location: "Online or Main Library",
    price: "₦3,000/hour",
    icon: "school-outline",
    category: "Tutors",
    provider: "Tobi A.",
    rating: "4.9",
    verified: true,
    description:
      "Patient one-on-one support for first- and second-year calculus, algebra, and introductory statistics.",
  },
  {
    id: "12",
    title: "Programming lessons",
    location: "ICT Centre",
    price: "₦4,000/hour",
    icon: "laptop",
    category: "Tutors",
    provider: "Amara O.",
    rating: "4.8",
    verified: true,
    description:
      "Beginner-friendly lessons in JavaScript, React Native, and practical mobile app development.",
  },
];
