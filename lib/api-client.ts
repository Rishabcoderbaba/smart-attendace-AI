export async function apiCall(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("sb_access_token")
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }

  const response = await fetch(endpoint, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.error || `API error: ${response.status}`)
  }

  return response.json()
}

export const api = {
  users: {
    getAll: () => apiCall("/api/users"),
    getById: (id: string) => apiCall(`/api/users/${id}`),
    create: (data: any) => apiCall("/api/users", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: any) => apiCall(`/api/users/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    delete: (id: string) => apiCall(`/api/users/${id}`, { method: "DELETE" }),
  },
  classes: {
    getAll: () => apiCall("/api/classes"),
    getById: (id: string) => apiCall(`/api/classes/${id}`),
    create: (data: any) => apiCall("/api/classes", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: any) => apiCall(`/api/classes/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    delete: (id: string) => apiCall(`/api/classes/${id}`, { method: "DELETE" }),
  },
  attendance: {
    getAll: (params?: Record<string, string>) => {
      const query = new URLSearchParams(params).toString()
      return apiCall(`/api/attendance${query ? `?${query}` : ""}`)
    },
    mark: (data: any) => apiCall("/api/attendance", { method: "POST", body: JSON.stringify(data) }),
  },
  face: {
    register: (embedding: number[]) =>
      apiCall("/api/face/register", { method: "POST", body: JSON.stringify({ embedding }) }),
    verify: (classId: string, embedding: number[]) =>
      apiCall("/api/face/verify", { method: "POST", body: JSON.stringify({ class_id: classId, embedding }) }),
  },
  corrections: {
    getAll: (status?: string) => apiCall(`/api/corrections${status ? `?status=${status}` : ""}`),
    create: (data: any) => apiCall("/api/corrections", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: any) => apiCall(`/api/corrections/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  },
}
