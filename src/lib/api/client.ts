export type ApiResponse<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  pagination?: unknown;
};

export class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
  }
}

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:2001/api/v1";

type RequestOptions = {
  method?: string;
  body?: unknown;
  token?: string | null;
  headers?: Record<string, string>;
};

export async function apiRequest<T>(
  path: string,
  { method = "GET", body, token, headers = {} }: RequestOptions = {},
): Promise<ApiResponse<T>> {
  const requestHeaders: Record<string, string> = {
    Accept: "application/json",
    ...headers,
  };

  if (body !== undefined) {
    requestHeaders["Content-Type"] = "application/json";
  }

  if (token) {
    requestHeaders.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers: requestHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  let payload: ApiResponse<T> | null = null;

  try {
    payload = (await response.json()) as ApiResponse<T>;
  } catch {
    throw new ApiError("Unexpected server response.", response.status);
  }

  if (!response.ok || !payload.success) {
    throw new ApiError(
      payload.message || "Something went wrong. Please try again.",
      payload.statusCode || response.status,
    );
  }

  return payload;
}
