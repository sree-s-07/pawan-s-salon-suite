export type Service = {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  icon: string;
};

export type Testimonial = {
  id: string;
  name: string;
  area: string;
  rating: number;
  text: string;
};

export const initialServices: Service[] = [
  { id: "s1", name: "Classic Haircut", price: 250, duration: "30 min", description: "Precision cut tailored to your face shape and style.", icon: "✂️" },
  { id: "s2", name: "Beard Trim & Shape", price: 150, duration: "20 min", description: "Sharp beard styling with hot towel finish.", icon: "🧔" },
  { id: "s3", name: "Hair Styling", price: 200, duration: "20 min", description: "Premium products for an event-ready look.", icon: "💇" },
  { id: "s4", name: "Clean Shave", price: 150, duration: "25 min", description: "Smooth shave with pre & post-shave care.", icon: "🪒" },
  { id: "s5", name: "Facial & Cleanup", price: 600, duration: "45 min", description: "Deep cleanse, exfoliation & glow treatment.", icon: "✨" },
  { id: "s6", name: "Hair Color", price: 800, duration: "60 min", description: "Ammonia-free color matched to your tone.", icon: "🎨" },
  { id: "s7", name: "Head Massage", price: 300, duration: "30 min", description: "Relaxing oil massage to relieve stress.", icon: "💆" },
  { id: "s8", name: "Grooming Combo", price: 900, duration: "90 min", description: "Haircut + Beard + Facial — full package.", icon: "🌟" },
];

export const initialTestimonials: Testimonial[] = [
  { id: "t1", name: "Rahul Sharma", area: "Malviya Nagar", rating: 5, text: "Pawan ji is a true professional. Best haircut I've had in Jaipur — and at home!" },
  { id: "t2", name: "Aman Verma", area: "Vaishali Nagar", rating: 5, text: "Super convenient. Booked a day in advance, he arrived on time with all tools." },
  { id: "t3", name: "Vikram Singh", area: "C-Scheme", rating: 5, text: "Excellent beard styling. Hygiene is top notch. Highly recommend." },
  { id: "t4", name: "Karan Mehta", area: "Mansarovar", rating: 5, text: "Saved me hours of salon waiting. Premium experience at home." },
];

export const business = {
  name: "Pawan Sain Salon Freelancer",
  tagline: "Premium Men's Grooming — At Your Doorstep",
  phone: "+91 96607 53211",
  phoneRaw: "+919660753211",
  location: "Jaipur (Home Service Only)",
};

// Simulated API
export const fakeDelay = <T>(data: T, ms = 600): Promise<T> =>
  new Promise((res) => setTimeout(() => res(data), ms));
