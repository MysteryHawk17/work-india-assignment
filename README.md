# Railway Management System

## Overview
This project is a Railway Management System similar to IRCTC, allowing users to check train availability between two stations, view seat availability, and book seats. The system is designed to handle real-time bookings with multiple users and includes role-based access for Admin and regular users.

## Technology Stack
- **Web Server**: Node.js / Express.js
- **Database**: MySQL / PostgreSQL

## Setup Instructions
1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Copy .env.example and add necessay env keys**
   ```bash
   cp .env.example .env
   ```
4. **Run the Application**
   ```bash
   npm start
   ```

## Assignment Details
### Features
1. **User Registration**: Endpoint for registering a new user.
2. **User Login**: Ability for users to log into their accounts.
3. **Add New Train**: Admin endpoint to create a new train with source and destination.
4. **Get all Trains**: Endpoint for users to fetch all trains.
5. **Update Train Details**: Admin endpoint to update train details.
6. **Delete Train**: Admin endpoint to delete a train.
7. **Get Trains Between Stations**: Endpoint for users to fetch trains between specified routes.
8. **Get Seat Availability**: Endpoint for users to fetch trains and their seat availability between specified routes.
9. **Book a Seat**: Endpoint for users to book a seat on a specific train.
10. **Get Specific Booking Details**: Endpoint for users to retrieve details of their bookings.

### How did we handle concurrent bookings?
1. **Transactions**: We used transactions to ensure that the booking process is atomic and that the database is in a consistent state.
2. **Pubsub**: We initially booked the ticket in waiting and pushed the ticket to a queue.The queue then picked up the ticket and processed it. We then used a pubsub mechanism to notify the user when the ticket was confirmed or not.

### Why did we booked the seats in waiting initially?
1. **Concurrency**: To handle concurrent bookings, we initially booked the seats in waiting to ensure that the same seat is not booked by multiple users.It is observed in Tatkal booking in irctc when a large number of booking is done at the same time.


### How did we handle Admin role authentication?
1. **JWT**: We used JWT to authenticate users and differentiate between Admin and regular users.
2. **Middleware**: We created a middleware function to check if the user is an Admin before allowing them to access Admin endpoints.While checking for Admin, we verified the api key in the header.

## Conclusion
This Railway Management System is designed to efficiently handle user requests and ensure data integrity during concurrent bookings.