// app/api/v1/edit-booked-ticket/[BookedTicketId]/route.ts

export async function PUT(
  request: Request,
  { params }: { params: { BookedTicketId: string } },
) {
  try {
    const { BookedTicketId } = params;
    const body = await request.json();

    const res = await fetch(
      `${process.env.API_URL}/edit-booked-ticket/${BookedTicketId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        cache: "no-store",
      },
    );

    if (!res.ok) {
      const errorData = await res
        .json()
        .catch(() => ({ error: "Failed to edit booked ticket" }));
      return Response.json(errorData, { status: res.status });
    }

    const data = await res.json();

    return Response.json(data, { status: 200 });
  } catch (error) {
    console.error("Error editing booked ticket:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
