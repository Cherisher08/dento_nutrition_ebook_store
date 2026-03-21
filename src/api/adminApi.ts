import { type Book } from "../data/books";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

type BookPayload = Omit<Book, "id">;

function headers(token: string) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || `Request failed: ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export async function apiGetBooks(token: string): Promise<Book[]> {
  const res = await fetch(`${API_URL}/books`, { headers: headers(token) });
  return handleResponse<Book[]>(res);
}

export async function apiCreateBook(token: string, payload: BookPayload): Promise<Book> {
  const res = await fetch(`${API_URL}/books`, {
    method: "POST",
    headers: headers(token),
    body: JSON.stringify(payload),
  });
  return handleResponse<Book>(res);
}

export async function apiUpdateBook(
  token: string,
  id: number,
  payload: BookPayload,
): Promise<Book> {
  const res = await fetch(`${API_URL}/books/${id}`, {
    method: "PUT",
    headers: headers(token),
    body: JSON.stringify(payload),
  });
  return handleResponse<Book>(res);
}

export async function apiDeleteBook(token: string, id: number): Promise<void> {
  const res = await fetch(`${API_URL}/books/${id}`, {
    method: "DELETE",
    headers: headers(token),
  });
  return handleResponse<void>(res);
}
