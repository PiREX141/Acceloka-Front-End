# Acceloka
This is the Front End repository for Full-Stack Developer Intern training at Accelist Lentera Indonesia.

For the Back End repository, check here: https://github.com/PiREX141/ExamAccelook

Original Figma prototype design: https://www.figma.com/proto/0ppNbziJqvdfgm0ui4FB13/Accelook-FE?page-id=0%3A1&node-id=26-688&viewport=240%2C361%2C0.47&t=lknJaP4HtgooIKix-1&scaling=scale-down-width&content-scaling=fixed

### Notes
Since the App uses localhost and it could potentially be a different localhost for the API during testing, please go to .env.local file and change NEXT_PUBLIC_API_URL=https://localhost:7055/api/v1 according to the tester's localhost.

## NavBar
<img width="891" height="52" alt="image" src="https://github.com/user-attachments/assets/d058a017-2297-4c18-b1ed-46b4f14f64af" />

In the NavBar, there are buttons that will redirect the user to different pages. There are the HomePage, TicketPage, and Bookings Page.

## HomePage
<img width="899" height="675" alt="image" src="https://github.com/user-attachments/assets/6b574859-15bb-48af-a651-83775765d998" />
<img width="898" height="674" alt="image" src="https://github.com/user-attachments/assets/ab7cdd96-cc83-4d96-9576-0c74752a4124" />

Upon App startup, the user will be directed to the HomePage. In this page, the user can find general information about Acceloka and go to the TicketPage by clicking the "View Ticket" Button or selecting one of the "Booking Services". 

## TicketPage
<img width="899" height="673" alt="image" src="https://github.com/user-attachments/assets/f919a3cf-dcc6-4fcf-a605-f179e6b9be1c" />
<img width="901" height="676" alt="image" src="https://github.com/user-attachments/assets/d037528b-9085-4f27-810c-34fa041c757f" />

Upon entering the TicketPage, the user will be greeted with the available tickets from the database. Pagination has been implemented here so a user can only see a maximum of 8 tickets per page.

<img width="358" height="183" alt="image" src="https://github.com/user-attachments/assets/e354dac4-ee29-4748-ac61-1eb06c67173c" />

Users can change what they want to base their search on by clicking the filter button.  

<img width="629" height="275" alt="image" src="https://github.com/user-attachments/assets/fd00de0e-d4dc-4e7a-9763-2bb06e4278f5" />

There's also a calendar so users can pick a date range to show any tickets for any event within that date range.

<img width="886" height="448" alt="image" src="https://github.com/user-attachments/assets/79bde256-39e7-432f-8c36-0694ea6001ba" />

There's a shopping cart modal which will show a modal. By default, it is empty.

<img width="444" height="329" alt="image" src="https://github.com/user-attachments/assets/9a56e9cd-dc8a-49f4-bbf4-46f2d7d205e8" />

When a user clicks the "Book" button on any ticket, the shopping cart will automatically pop up. The user can close the modal and book different tickets. After confirming their bookings, the booked tickets will be uploaded to the database.


## BookingPage
<img width="901" height="510" alt="image" src="https://github.com/user-attachments/assets/24dca18a-5023-48de-a2cd-b58472962d13" />

When a user enters the BookingPage, they may choose 3 actions. 

### Check Booking
<img width="898" height="590" alt="image" src="https://github.com/user-attachments/assets/e24e6d89-ead2-4920-8b73-abc1a42fa2bb" />

The user can "Check Booking". This is the default view for the page when a user enters it. After searching for a BookedTicketId, if the BookedTicketId exists, then it will show all the tickets that were booked.

### Revoke Booking
<img width="606" height="288" alt="image" src="https://github.com/user-attachments/assets/aa125265-49fe-404f-b57a-e16e15c3570a" />

If the user clicks "Revoke Booking", the view will change into the above. It wants the user to input the BookedTicketId, TicketCode, and the Quantity of tickets they want to revoke.

<img width="885" height="380" alt="image" src="https://github.com/user-attachments/assets/9522500b-bd5d-491a-91be-e37e80728724" />

After clicking "Revoke Ticket", a modal will appear to confirm.

<img width="498" height="185" alt="image" src="https://github.com/user-attachments/assets/7ab30682-88fd-496f-8426-c9501e2b817d" />

After a successful revoke, the updated ticket will be shown.

### Edit Booking
<img width="452" height="214" alt="image" src="https://github.com/user-attachments/assets/7a4000eb-d8a8-4613-8356-349de4d0e3c9" />

If the user clicks "Edit Booking", the user will be asked to enter a BookedTicketId.

<img width="863" height="580" alt="image" src="https://github.com/user-attachments/assets/64b2660e-3b02-48f9-b394-9bfa458dd1d1" />

After entering a BookedTicketId, all the tickets will be shown with their current quantity. The user can change the quantity by changing the value in the textbox.

<img width="859" height="606" alt="image" src="https://github.com/user-attachments/assets/111b40c9-fd47-49fc-88b5-267ae01d9fd4" />

After confirming the update, the page will show all the updated tickets.





