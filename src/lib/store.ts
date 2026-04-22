import { useEffect, useState } from "react";
import { initialServices, initialTestimonials, type Service, type Testimonial, fakeDelay } from "@/data/mockData";

const SERVICES_KEY = "pss_services";
const TEST_KEY = "pss_testimonials";
const AUTH_KEY = "pss_admin_auth";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, val: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(val));
}

export function useServices() {
  const [services, setServices] = useState<Service[] | null>(null);
  useEffect(() => {
    fakeDelay(read(SERVICES_KEY, initialServices)).then(setServices);
  }, []);
  const update = (next: Service[]) => {
    setServices(next);
    write(SERVICES_KEY, next);
  };
  return { services, setServices: update };
}

export function useTestimonials() {
  const [items, setItems] = useState<Testimonial[] | null>(null);
  useEffect(() => {
    fakeDelay(read(TEST_KEY, initialTestimonials)).then(setItems);
  }, []);
  const update = (next: Testimonial[]) => {
    setItems(next);
    write(TEST_KEY, next);
  };
  return { items, setItems: update };
}

export const auth = {
  isLoggedIn: () => (typeof window !== "undefined" ? localStorage.getItem(AUTH_KEY) === "1" : false),
  login: (u: string, p: string) => {
    if (u === "admin" && p === "admin123") {
      localStorage.setItem(AUTH_KEY, "1");
      return true;
    }
    return false;
  },
  logout: () => localStorage.removeItem(AUTH_KEY),
};
