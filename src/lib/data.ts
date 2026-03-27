export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  description: string;
  avgPrice: number;
}

export interface Package {
  id: string;
  name: string;
  destination: string;
  destinationCountry: string;
  image: string;
  duration: number;
  hotel: string;
  hotelStars: number;
  airline: string;
  inclusions: string[];
  retailPrice: number;
  netPrice: number;
  isExclusive: boolean;
  rating: number;
  reviews: number;
  maxPax: number;
  departureDates: string[];
  description: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  destination: string;
  budget: number;
  source: "web" | "whatsapp" | "phone" | "walkin" | "b2b";
  status: "new" | "contacted" | "quoted" | "booked" | "traveled" | "lost";
  assignedTo: string;
  createdAt: string;
  notes: string;
}

export interface Task {
  id: string;
  title: string;
  assignedTo: string;
  bookingId?: string;
  dueDate: string;
  status: "todo" | "in_progress" | "done" | "overdue";
  priority: "low" | "medium" | "high" | "urgent";
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bookings: number;
  leads: number;
  conversion: number;
}

export interface Operator {
  id: string;
  company: string;
  contactName: string;
  email: string;
  tier: "gold" | "silver" | "bronze";
  creditLimit: number;
  totalOrders: number;
  revenue: number;
}

// --- SEED DATA ---

export const destinations: Destination[] = [
  { id: "antalya", name: "Antalya", country: "Turkey", image: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=600&h=400&fit=crop", description: "Sun-soaked beaches and ancient ruins on the Turkish Riviera", avgPrice: 1200 },
  { id: "istanbul", name: "Istanbul", country: "Turkey", image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&h=400&fit=crop", description: "Where East meets West — mosques, bazaars, and Bosphorus views", avgPrice: 950 },
  { id: "cappadocia", name: "Cappadocia", country: "Turkey", image: "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?w=600&h=400&fit=crop", description: "Hot air balloons over fairy chimneys and cave hotels", avgPrice: 1400 },
  { id: "dubai", name: "Dubai", country: "UAE", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop", description: "Luxury shopping, ultramodern architecture, and desert adventures", avgPrice: 1800 },
  { id: "maldives", name: "Maldives", country: "Maldives", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&h=400&fit=crop", description: "Crystal-clear waters, overwater villas, and world-class diving", avgPrice: 2800 },
  { id: "bali", name: "Bali", country: "Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400&fit=crop", description: "Terraced rice paddies, temples, and vibrant culture", avgPrice: 1100 },
  { id: "sharm", name: "Sharm El-Sheikh", country: "Egypt", image: "https://images.unsplash.com/photo-1539768942893-daf53e736b68?w=600&h=400&fit=crop", description: "Red Sea coral reefs and year-round sunshine", avgPrice: 800 },
  { id: "phuket", name: "Phuket", country: "Thailand", image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=600&h=400&fit=crop", description: "Tropical beaches, vibrant nightlife, and island hopping", avgPrice: 1000 },
];

export const packages: Package[] = [
  {
    id: "ant-luxury-7",
    name: "Antalya Luxury All-Inclusive",
    destination: "Antalya",
    destinationCountry: "Turkey",
    image: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=800&h=500&fit=crop",
    duration: 7,
    hotel: "Rixos Premium Belek",
    hotelStars: 5,
    airline: "Turkish Airlines",
    inclusions: ["All-inclusive meals & drinks", "Airport transfers", "Spa access", "Kids club", "Beach & pool"],
    retailPrice: 1450,
    netPrice: 980,
    isExclusive: true,
    rating: 4.8,
    reviews: 342,
    maxPax: 50,
    departureDates: ["2026-06-15", "2026-06-22", "2026-07-01", "2026-07-10", "2026-07-20"],
    description: "Experience the ultimate Turkish Riviera vacation at the 5-star Rixos Premium Belek. All-inclusive dining, pristine private beach, world-class spa, and endless activities for the whole family.",
  },
  {
    id: "ant-budget-7",
    name: "Antalya Beach Getaway",
    destination: "Antalya",
    destinationCountry: "Turkey",
    image: "https://images.unsplash.com/photo-1568702846914-96b305d2ead1?w=800&h=500&fit=crop",
    duration: 7,
    hotel: "Sherwood Exclusive Lara",
    hotelStars: 4,
    airline: "Pegasus Airlines",
    inclusions: ["Half-board meals", "Airport transfers", "Pool access"],
    retailPrice: 890,
    netPrice: 620,
    isExclusive: false,
    rating: 4.3,
    reviews: 189,
    maxPax: 80,
    departureDates: ["2026-06-10", "2026-06-17", "2026-06-24", "2026-07-05"],
    description: "Affordable beach vacation on the stunning Lara Beach. Comfortable 4-star hotel with excellent dining and easy access to Antalya's attractions.",
  },
  {
    id: "ist-culture-5",
    name: "Istanbul Cultural Discovery",
    destination: "Istanbul",
    destinationCountry: "Turkey",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&h=500&fit=crop",
    duration: 5,
    hotel: "Pera Palace Hotel",
    hotelStars: 5,
    airline: "Turkish Airlines",
    inclusions: ["Breakfast daily", "Guided city tours", "Bosphorus cruise", "Grand Bazaar tour", "Airport transfers"],
    retailPrice: 1280,
    netPrice: 870,
    isExclusive: true,
    rating: 4.9,
    reviews: 256,
    maxPax: 30,
    departureDates: ["2026-05-01", "2026-05-15", "2026-06-01", "2026-06-15", "2026-09-01"],
    description: "Immerse yourself in the rich history and culture of Istanbul. Stay at the legendary Pera Palace, explore the Hagia Sophia, Blue Mosque, and cruise the Bosphorus.",
  },
  {
    id: "cap-balloon-4",
    name: "Cappadocia Balloon & Cave Experience",
    destination: "Cappadocia",
    destinationCountry: "Turkey",
    image: "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?w=800&h=500&fit=crop",
    duration: 4,
    hotel: "Museum Hotel Cappadocia",
    hotelStars: 5,
    airline: "Turkish Airlines",
    inclusions: ["Hot air balloon ride", "Cave hotel stay", "Guided valley hikes", "Turkish cooking class", "Airport transfers"],
    retailPrice: 1650,
    netPrice: 1100,
    isExclusive: true,
    rating: 4.9,
    reviews: 412,
    maxPax: 20,
    departureDates: ["2026-05-10", "2026-05-20", "2026-06-05", "2026-09-10", "2026-09-20"],
    description: "The ultimate Cappadocia experience — soar over fairy chimneys in a hot air balloon, sleep in a luxurious cave suite, and explore ancient underground cities.",
  },
  {
    id: "dubai-premium-5",
    name: "Dubai Premium Experience",
    destination: "Dubai",
    destinationCountry: "UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=500&fit=crop",
    duration: 5,
    hotel: "Atlantis The Palm",
    hotelStars: 5,
    airline: "Emirates",
    inclusions: ["Breakfast daily", "Aquaventure waterpark", "Desert safari", "Dubai Mall tour", "Burj Khalifa ticket", "Airport transfers"],
    retailPrice: 2100,
    netPrice: 1450,
    isExclusive: false,
    rating: 4.7,
    reviews: 198,
    maxPax: 40,
    departureDates: ["2026-10-01", "2026-10-15", "2026-11-01", "2026-11-15", "2026-12-01"],
    description: "Live the Dubai dream — stay at Atlantis The Palm, conquer the desert dunes, shop at the world's largest mall, and see the city from the top of the Burj Khalifa.",
  },
  {
    id: "maldives-honeymoon-7",
    name: "Maldives Honeymoon Paradise",
    destination: "Maldives",
    destinationCountry: "Maldives",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&h=500&fit=crop",
    duration: 7,
    hotel: "Soneva Fushi",
    hotelStars: 5,
    airline: "Emirates",
    inclusions: ["All-inclusive meals", "Overwater villa", "Sunset cruise", "Couples spa", "Snorkeling gear", "Seaplane transfer"],
    retailPrice: 3200,
    netPrice: 2200,
    isExclusive: true,
    rating: 5.0,
    reviews: 89,
    maxPax: 10,
    departureDates: ["2026-06-01", "2026-07-01", "2026-08-01", "2026-09-01"],
    description: "The most romantic escape — overwater villa with glass floor, private beach dining, couples spa treatments, and the world's clearest waters.",
  },
  {
    id: "bali-wellness-10",
    name: "Bali Wellness & Culture Retreat",
    destination: "Bali",
    destinationCountry: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=500&fit=crop",
    duration: 10,
    hotel: "COMO Shambhala Estate",
    hotelStars: 5,
    airline: "Qatar Airways",
    inclusions: ["Full-board meals", "Daily yoga", "Temple tours", "Rice terrace trek", "Balinese cooking class", "Spa treatments", "Airport transfers"],
    retailPrice: 1900,
    netPrice: 1250,
    isExclusive: false,
    rating: 4.8,
    reviews: 167,
    maxPax: 25,
    departureDates: ["2026-05-15", "2026-06-15", "2026-07-15", "2026-08-15", "2026-09-15"],
    description: "A transformative 10-day journey through Bali — rejuvenate with daily yoga and spa, explore sacred temples, trek through emerald rice terraces, and master Balinese cuisine.",
  },
  {
    id: "sharm-diving-5",
    name: "Sharm El-Sheikh Diving Adventure",
    destination: "Sharm El-Sheikh",
    destinationCountry: "Egypt",
    image: "https://images.unsplash.com/photo-1539768942893-daf53e736b68?w=800&h=500&fit=crop",
    duration: 5,
    hotel: "Reef Oasis Blue Bay",
    hotelStars: 4,
    airline: "EgyptAir",
    inclusions: ["All-inclusive", "3 diving excursions", "Snorkeling trip", "Glass-bottom boat", "Airport transfers"],
    retailPrice: 750,
    netPrice: 490,
    isExclusive: false,
    rating: 4.4,
    reviews: 223,
    maxPax: 60,
    departureDates: ["2026-05-01", "2026-05-15", "2026-06-01", "2026-06-15", "2026-09-01"],
    description: "Explore the Red Sea's legendary coral reefs with world-class diving. All-inclusive beachfront resort with multiple pools and direct reef access.",
  },
  {
    id: "phuket-family-7",
    name: "Phuket Family Fun",
    destination: "Phuket",
    destinationCountry: "Thailand",
    image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&h=500&fit=crop",
    duration: 7,
    hotel: "Angsana Laguna Phuket",
    hotelStars: 5,
    airline: "Thai Airways",
    inclusions: ["Half-board meals", "Island hopping tour", "Elephant sanctuary visit", "Kids club", "Pool access", "Airport transfers"],
    retailPrice: 1350,
    netPrice: 900,
    isExclusive: false,
    rating: 4.6,
    reviews: 301,
    maxPax: 45,
    departureDates: ["2026-06-20", "2026-07-05", "2026-07-20", "2026-08-05"],
    description: "The perfect family vacation in tropical paradise — island hopping, ethical elephant encounters, kids club, and stunning lagoon-side resort.",
  },
  {
    id: "ist-ant-combo-10",
    name: "Turkey Grand Tour: Istanbul + Antalya",
    destination: "Istanbul",
    destinationCountry: "Turkey",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&h=500&fit=crop",
    duration: 10,
    hotel: "Multiple (5-star)",
    hotelStars: 5,
    airline: "Turkish Airlines",
    inclusions: ["Breakfast daily", "Internal flight IST-AYT", "Guided tours", "Bosphorus cruise", "Beach access", "Airport transfers"],
    retailPrice: 1780,
    netPrice: 1200,
    isExclusive: true,
    rating: 4.7,
    reviews: 145,
    maxPax: 30,
    departureDates: ["2026-06-01", "2026-06-15", "2026-07-01", "2026-09-01"],
    description: "The best of Turkey in one trip — 4 nights exploring Istanbul's historic treasures, then fly to Antalya for 6 nights of sun, sea, and relaxation.",
  },
];

export const leads: Lead[] = [
  { id: "L001", name: "Aisha Karimova", email: "aisha@mail.com", phone: "+996 555 123456", destination: "Antalya", budget: 1500, source: "whatsapp", status: "new", assignedTo: "Maria", createdAt: "2026-03-27T09:15:00", notes: "Family of 4, wants all-inclusive, July dates" },
  { id: "L002", name: "Dmitry Petrov", email: "dmitry.p@gmail.com", phone: "+7 912 3456789", destination: "Dubai", budget: 3000, source: "web", status: "contacted", assignedTo: "Alex", createdAt: "2026-03-26T14:30:00", notes: "Honeymoon trip, looking for premium experience" },
  { id: "L003", name: "Gulnara Tashmatova", email: "gulnara@inbox.ru", phone: "+998 90 1234567", destination: "Istanbul", budget: 1200, source: "phone", status: "quoted", assignedTo: "Maria", createdAt: "2026-03-25T11:00:00", notes: "Sent quote for Cultural Discovery package, waiting for response" },
  { id: "L004", name: "Bakyt Orozov", email: "bakyt.o@mail.com", phone: "+996 700 987654", destination: "Maldives", budget: 5000, source: "walkin", status: "booked", assignedTo: "Ivan", createdAt: "2026-03-24T16:45:00", notes: "Booked Maldives Honeymoon - departure June 1" },
  { id: "L005", name: "Elena Sokolova", email: "elena.s@yandex.ru", phone: "+7 925 5551234", destination: "Cappadocia", budget: 2000, source: "web", status: "new", assignedTo: "Maria", createdAt: "2026-03-27T08:00:00", notes: "Couple, interested in balloon ride package" },
  { id: "L006", name: "Timur Aliev", email: "t.aliev@corp.kg", phone: "+996 312 445566", destination: "Antalya", budget: 8000, source: "b2b", status: "quoted", assignedTo: "Alex", createdAt: "2026-03-23T10:00:00", notes: "B2B inquiry - group of 12, corporate retreat" },
  { id: "L007", name: "Nuriza Mamatova", email: "nuriza@mail.kg", phone: "+996 555 778899", destination: "Bali", budget: 2500, source: "whatsapp", status: "contacted", assignedTo: "Ivan", createdAt: "2026-03-26T09:30:00", notes: "Solo traveler, interested in wellness retreat" },
  { id: "L008", name: "Ruslan Kasenov", email: "ruslan.k@gmail.com", phone: "+7 701 2345678", destination: "Phuket", budget: 4000, source: "phone", status: "new", assignedTo: "Alex", createdAt: "2026-03-27T10:30:00", notes: "Family of 5, summer vacation, July-August" },
  { id: "L009", name: "Svetlana Kim", email: "sveta.kim@mail.ru", phone: "+7 903 4455667", destination: "Sharm El-Sheikh", budget: 1000, source: "web", status: "booked", assignedTo: "Maria", createdAt: "2026-03-20T13:00:00", notes: "Booked diving adventure, departure May 15" },
  { id: "L010", name: "Aziz Nazarov", email: "aziz@business.uz", phone: "+998 93 5556677", destination: "Turkey", budget: 15000, source: "b2b", status: "contacted", assignedTo: "Ivan", createdAt: "2026-03-22T15:00:00", notes: "Tour operator - wants to become a partner, interested in exclusive inventory" },
  { id: "L011", name: "Meerim Asanova", email: "meerim.a@inbox.kg", phone: "+996 550 112233", destination: "Istanbul", budget: 1800, source: "whatsapp", status: "lost", assignedTo: "Alex", createdAt: "2026-03-15T11:00:00", notes: "Lost - went with competitor, price was lower" },
  { id: "L012", name: "Artem Volkov", email: "artem.v@corp.ru", phone: "+7 915 6677889", destination: "Dubai", budget: 6000, source: "walkin", status: "traveled", assignedTo: "Ivan", createdAt: "2026-03-01T14:00:00", notes: "Traveled March 10-15, Dubai Premium, very satisfied" },
];

export const tasks: Task[] = [
  { id: "T001", title: "Follow up with Aisha Karimova on Antalya package", assignedTo: "Maria", dueDate: "2026-03-28", status: "todo", priority: "high" },
  { id: "T002", title: "Send revised quote to Dmitry Petrov", assignedTo: "Alex", dueDate: "2026-03-27", status: "in_progress", priority: "high" },
  { id: "T003", title: "Confirm hotel block for July group (Timur Aliev)", assignedTo: "Alex", bookingId: "B006", dueDate: "2026-03-28", status: "todo", priority: "urgent" },
  { id: "T004", title: "Issue e-tickets for Bakyt Orozov - Maldives", assignedTo: "Ivan", bookingId: "B004", dueDate: "2026-03-29", status: "todo", priority: "medium" },
  { id: "T005", title: "Review visa documents for Elena Sokolova", assignedTo: "Maria", dueDate: "2026-03-30", status: "todo", priority: "medium" },
  { id: "T006", title: "Respond to RFP from TourCo Uzbekistan", assignedTo: "Ivan", dueDate: "2026-03-25", status: "overdue", priority: "urgent" },
  { id: "T007", title: "Send post-trip survey to Artem Volkov", assignedTo: "Ivan", dueDate: "2026-03-27", status: "done", priority: "low" },
  { id: "T008", title: "Update Sharm El-Sheikh summer pricing", assignedTo: "Alex", dueDate: "2026-03-28", status: "todo", priority: "medium" },
  { id: "T009", title: "Prepare welcome package for Svetlana Kim trip", assignedTo: "Maria", bookingId: "B009", dueDate: "2026-05-10", status: "todo", priority: "low" },
  { id: "T010", title: "Schedule meeting with Aziz Nazarov (new operator)", assignedTo: "Ivan", dueDate: "2026-03-28", status: "in_progress", priority: "high" },
];

export const staff: StaffMember[] = [
  { id: "maria", name: "Maria Ivanova", role: "Senior Sales Agent", avatar: "MI", bookings: 12, leads: 38, conversion: 31.6 },
  { id: "alex", name: "Alex Nurmatov", role: "Sales Agent", avatar: "AN", bookings: 8, leads: 29, conversion: 27.6 },
  { id: "ivan", name: "Ivan Kozlov", role: "Sales Agent / B2B", avatar: "IK", bookings: 6, leads: 22, conversion: 27.3 },
];

export const operators: Operator[] = [
  { id: "OP001", company: "SunTravel KG", contactName: "Aigul Beishenova", email: "aigul@suntravel.kg", tier: "gold", creditLimit: 50000, totalOrders: 145, revenue: 210000 },
  { id: "OP002", company: "VostokTour", contactName: "Rashid Umarov", email: "rashid@vostoktour.uz", tier: "silver", creditLimit: 30000, totalOrders: 89, revenue: 125000 },
  { id: "OP003", company: "NomadTrips", contactName: "Kurmanbek Asanov", email: "kurmanbek@nomadtrips.kg", tier: "gold", creditLimit: 40000, totalOrders: 112, revenue: 178000 },
  { id: "OP004", company: "Silk Road Travel", contactName: "Daria Popova", email: "daria@silkroad.kz", tier: "bronze", creditLimit: 15000, totalOrders: 34, revenue: 45000 },
  { id: "OP005", company: "Peak Holidays", contactName: "Bolot Turduev", email: "bolot@peakholidays.kg", tier: "silver", creditLimit: 25000, totalOrders: 67, revenue: 98000 },
];

// Dashboard metrics
export const dashboardMetrics = {
  revenue: { mtd: 485000, target: 600000, lastMonth: 520000 },
  leads: { total: 142, new: 38, converted: 28, conversionRate: 19.7 },
  bookings: { total: 28, pending: 8, confirmed: 15, completed: 5 },
  b2b: { activeOperators: 24, newOperators: 3, b2bRevenue: 210000 },
  topDestinations: [
    { name: "Antalya", share: 34 },
    { name: "Istanbul", share: 21 },
    { name: "Cappadocia", share: 18 },
    { name: "Dubai", share: 12 },
    { name: "Other", share: 15 },
  ],
  monthlySales: [
    { month: "Oct", revenue: 320000 },
    { month: "Nov", revenue: 380000 },
    { month: "Dec", revenue: 450000 },
    { month: "Jan", revenue: 410000 },
    { month: "Feb", revenue: 520000 },
    { month: "Mar", revenue: 485000 },
  ],
};
