export const API_BASE = import.meta.env.VITE_API_BASE;

export async function apiRequest(url, options = {}) {
    const res = await fetch(`${API_BASE}${url}`, {
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        ...options,
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Request failed");
    }

    return data;
}
