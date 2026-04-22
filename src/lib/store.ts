import { useEffect, useState } from "react";
import { initialServices, initialTestimonials, type Service, type Testimonial, fakeDelay } from "@/data/mockData";

const SERVICES_KEY = "pss_services";
const TEST_KEY = "pss_testimonials";
const ADMIN_AUTH_KEY = "isAdminLoggedIn";
const USER_AUTH_KEY = "userLoggedIn";
const USER_NAME_KEY = "pss_user_name";

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

export const adminAuth = {
  isLoggedIn: () =>
    typeof window !== "undefined" && localStorage.getItem(ADMIN_AUTH_KEY) === "true",
  login: (u: string, p: string) => {
    if (u === "admin" && p === "admin123") {
      localStorage.setItem(ADMIN_AUTH_KEY, "true");
      return true;
    }
    return false;
  },
  logout: () => localStorage.removeItem(ADMIN_AUTH_KEY),
};

export const userAuth = {
  isLoggedIn: () =>
    typeof window !== "undefined" && localStorage.getItem(USER_AUTH_KEY) === "true",
  getName: () =>
    typeof window !== "undefined" ? localStorage.getItem(USER_NAME_KEY) ?? "" : "",
  login: (name: string) => {
    localStorage.setItem(USER_AUTH_KEY, "true");
    localStorage.setItem(USER_NAME_KEY, name);
  },
  logout: () => {
    localStorage.removeItem(USER_AUTH_KEY);
    localStorage.removeItem(USER_NAME_KEY);
  },
};

// Hook to subscribe to user auth changes (for navbar updates)
export function useUserAuth() {
  const [state, setState] = useState({ loggedIn: false, name: "" });
  useEffect(() => {
    const sync = () => setState({ loggedIn: userAuth.isLoggedIn(), name: userAuth.getName() });
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("pss-auth-change", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("pss-auth-change", sync);
    };
  }, []);
  return state;
}

export const emitAuthChange = () => {
  if (typeof window !== "undefined") window.dispatchEvent(new Event("pss-auth-change"));
};
