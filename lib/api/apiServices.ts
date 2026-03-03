const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function apiClient<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error || "Something went wrong");
  }

  return data;
}

export type Ticket = {
  ticketCode: string;
  ticketName: string;
  eventDate: string;
  quantity: number;
};

export type BookedTicketGroup = {
  qtyPerCategory: number;
  categoryName: string;
  tickets: Ticket[];
};

export type EditResponse = {
  ticketCode: string;
  ticketName: string;
  quantity: number;
  categoryName: string;
};

export type UpdatedTicket = {
  ticketCode: string;
  ticketName: string;
  categoryName: string;
  quantity: number;
};

export type AvailableTicketResponse = {
  tickets: any[];
  totalTickets: number;
};

export function getBookedTickets(bookedTicketId: string) {
  return apiClient<BookedTicketGroup[]>(`/get-booked-ticket/${bookedTicketId}`);
}

export function editBookedTickets(
  bookedTicketId: string,
  payload: {
    tickets: { ticketCode: string; newQuantity: number }[];
  },
) {
  return apiClient<EditResponse[]>(`/edit-booked-ticket/${bookedTicketId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function revokeTicket(
  bookedTicketId: number,
  ticketCode: string,
  qty: number,
) {
  return apiClient<UpdatedTicket>(
    `/revoke-ticket/${bookedTicketId}/${encodeURIComponent(ticketCode)}/${qty}`,
    {
      method: "DELETE",
    },
  );
}

export function getAvailableTickets(queryString: string) {
  return apiClient<AvailableTicketResponse>(
    `/get-available-ticket?${queryString}`,
  );
}

export function bookTicket(payload: {
  tickets: { ticketCode: string; quantity: number }[];
}) {
  return apiClient<any>(`/book-ticket`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
