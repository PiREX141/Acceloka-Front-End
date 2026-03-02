// app/api/v1/get-booked-ticket/[BookedTicketId]/route.ts

export async function GET(
  request: Request,
  { params }: { params: { BookedTicketId: string } },
) {
  try {
    const { BookedTicketId } = params;

    const res = await fetch(
      `${process.env.API_URL}/get-booked-ticket/${BookedTicketId}`,
      { cache: "no-store" },
    );

    if (!res.ok) {
      const errorData = await res
        .json()
        .catch(() => ({ error: "Failed to fetch booked ticket" }));
      return Response.json(errorData, { status: res.status });
    }

    const data = await res.json();

    return Response.json(data);
  } catch (error) {
    console.error("Error fetching booked ticket:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
