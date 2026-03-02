import images from "./images";
import schools from "./schools";

const onboardingSlide = [
  {
    id: "1",
    title: "Campus News & Events",
    description: "Stay fully informed about everything happening around your school. Get real-time updates on announcements, academic schedules, tutorials, departmental news, student union information, and exciting campus events. From seminars and workshops to parties and competitions, never miss out on what matters most to you.",
  },
  {
    id: "2",
    title: "Campus Marketplace",
    description: "Buy directly from trusted campus and off-campus vendors offering food, fashion, gadgets, and everyday essentials. Easily browse products, connect with sellers nearby, and enjoy the convenience of shopping within your campus community. Support student entrepreneurs while saving time and stress.",
  },
  {
    id: "3",
    title: "Find & Rent Apartments",
    description: "Easily search for lodges, hostels, shared apartments, and off-campus housing around your school. Browse verified listings, compare prices, view details, and connect directly with landlords or agents. Whether you're looking for a budget-friendly space or something more comfortable, find accommodation that fits your needs without stress.",
  },
  {
    id: "4",
    title: "Connect & Match",
    description: "Build meaningful connections within your school community. Find serious reading partners to boost your academic performance, make new friends who share your interests, or explore relationships in a safe and student-focused environment designed to help you connect authentically.",
  },
  {
    id: "5",
    title: "Handyman & Fixers",
    description: "Need something fixed or set up on campus? Find friendly local handymen for repairs, small jobs, or quick fixes. Browse helpers nearby, book a time, and get things done fast. Support student talent while skipping the stress of doing it yourself.",
  },
  {
    id: "6",
    title: "Advertise on Campus",
    description:
      "Promote your brand, business, or campus event directly to students who matter most. Whether you're launching a product, hosting an event, or growing your hustle, our platform gives you affordable and effective visibility within your school environment.",
  },
  {
    id: "7",
    title: "Buy & Sell Used Items",
    description: "Turn unused items into cash and find great deals from fellow students. Buy and sell fairly-used gadgets, textbooks, furniture, and more within a secure campus-based marketplace. Save money, reduce waste, and trade safely with verified students.",
  },
];

const explore = [
  {
    id: 1,
    title: "Restaurants",
    desc: "Order food from your favorite restaurants and enjoy quick delivery to your doorstep.",
    image: images.restaurant
  },
  {
    id: 2,
    title: "Shops",
    desc: "Browse and shop from local and online stores with ease.",
    image: images.shop
  },
  {
    id: 3,
    title: "Pharmacies",
    desc: "Get medicines and health essentials delivered safely and quickly.",
    image: images.pharmacy
  },
  {
    id: 4,
    title: "Bills",
    desc: "Pay utility bills, subscriptions, and other payments seamlessly.",
    image: images.bill
  },
  {
    id: 5,
    title: "Packages",
    desc: "Send and receive packages with reliable delivery services.",
    image: images.boxPackage
  },
  {
    id: 6,
    title: "Local Markets",
    desc: "Shop fresh groceries and items from nearby markets.",
    image: images.localMarket
  },
  {
    id: 7,
    title: "Events",
    desc: "Discover and book tickets for exciting local events.",
    image: images.event
  },
  {
    id: 8,
    title: "More",
    desc: "Explore additional services and features available on the platform.",
    image: images.more
  }
]

export default { schools, onboardingSlide, explore }