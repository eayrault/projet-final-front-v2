const API_BASE_URL = '/api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

interface RegisterResponse {
  username: string;
  email: string;
}

export interface EventResponse {
  id: string;
  name: string;
  description: string | null;
  attendees: number;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
}

export interface MyEventRegistration {
  id: string;
  user_id: string;
  event_id: string;
  registered_at: string;
  event_name: string;
  event_description: string | null;
  event_start_date: string;
  username: string;
}

export interface UserProfile {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export async function register(data: RegisterData): Promise<RegisterResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Registration failed");
  }

  return response.json();
}

export async function login(
  credentials: LoginCredentials
): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  const data = await response.json();

  if (data.accessToken) {
    localStorage.setItem("accessToken", data.accessToken);
  }
  if (data.refreshToken) {
    localStorage.setItem("refreshToken", data.refreshToken);
  }

  return data;
}

export async function logout(): Promise<void> {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    return;
  }

  try {
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });
  } finally {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
}

export async function refreshAccessToken(): Promise<AuthResponse> {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    throw new Error("Token refresh failed");
  }

  const data = await response.json();

  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);

  return data;
}

export function getAccessToken(): string | null {
  return localStorage.getItem("accessToken");
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem("accessToken");
}

async function tryRefreshToken(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });
    return response.ok;
  } catch {
    return false;
  }
}

async function fetchWithAuth(
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> {
  const response = await fetch(input, { ...init, credentials: "include" });

  if (response.status === 401) {
    const refreshed = await tryRefreshToken();
    if (refreshed) {
      return fetch(input, { ...init, credentials: "include" });
    }
  }

  return response;
}

export async function getMe(): Promise<UserProfile> {
  const response = await fetchWithAuth(`${API_BASE_URL}/user/me`);

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }

  return response.json();
}

export async function getEvents(): Promise<EventResponse[]> {
  const response = await fetch(`${API_BASE_URL}/events`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  return response.json();
}

export async function getEvent(id: string): Promise<EventResponse> {
  const response = await fetch(`${API_BASE_URL}/events/${id}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Event not found");
  }

  return response.json();
}

export async function registerToEvent(eventId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/event-registrations`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event_id: eventId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Registration failed");
  }
}

export async function unregisterFromEvent(eventId: string): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/event-registrations/${eventId}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Unregistration failed");
  }
}

export async function checkRegistration(eventId: string): Promise<boolean> {
  const response = await fetch(
    `${API_BASE_URL}/event-registrations/check/${eventId}`,
    {
      credentials: "include",
    },
  );

  if (!response.ok) {
    return false;
  }

  const data = await response.json();
  return data.isRegistered;
}

export async function getMyEvents(): Promise<MyEventRegistration[]> {
  const response = await fetch(
    `${API_BASE_URL}/event-registrations/my-events`,
    {
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch registrations");
  }

  return response.json();
}
