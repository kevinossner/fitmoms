# Sports Courses App for Mothers

## Overview

This app is designed to facilitate the management and participation in sports courses, specifically tailored for mothers. It provides functionalities for both users (mothers) and trainers (admins) to interact with the courses, sessions, and subscriptions.

## Tech Stack

- Frontend: React Native with TypeScript, Expo, and Expo Router
- Backend/Database: Supabase
- UI Framework: React Native Paper

## User Flow

### Welcome Screen

- **Description**: A clean and inviting welcome screen.
- **Actions**:
  - Sign up using Email, Apple ID, or Google account.
  - Enter first and last name.

### Main Feed

- **Description**: The central hub for users after signing up.
- **Features**:
  - View current announcements made by trainers (admins).

### Calendar Screen

- **Description**: Displays training sessions for subscribed courses.
- **Features**:
  - View training sessions.
  - Sign off from specific training sessions.

### Subscriptions Screen

- **Description**: Overview of user's current subscriptions.
- **Features**:
  - View subscription details.
  - Check payment status.
  - Monitor attendance frequency for subscribed courses.

### Courses Screen

- **Description**: Displays all available courses.
- **Features**:
  - Browse all courses.
  - Subscribe to courses.

## Trainer (Admin) Flow

### Calendar Management

- **Description**: Manage training sessions.
- **Features**:
  - View all training sessions.
  - Add new sessions.
  - Cancel sessions.
  - Notify users of canceled sessions via message feed.

### User Management

- **Description**: Overview of all users.
- **Features**:
  - View signed-in users for a session.
  - Change payment status of user subscriptions.
  - Check attendance and note absences without excuse.

### Course Management

- **Description**: Manage courses and sessions.
- **Features**:
  - Create new courses.
  - Create a series of recurring training sessions.

## Notifications

- **Description**: Keep users informed.
- **Features**:
  - Notify users of session cancellations.
  - Announcements from trainers appear in the main feed.

## Implementation Notes

- Ensure seamless integration of sign-up options (Email, Apple ID, Google).
- Implement a robust notification system for session updates.
- Design a user-friendly interface for both users and trainers.
- Consider scalability for adding more courses and sessions.

## Conclusion

This app aims to streamline the process of managing and participating in sports courses, providing a comprehensive platform for both users and trainers. By following the structured flow and features outlined above, developers can create an intuitive and efficient application.

## Database Schema

### Tables

#### users

- id: uuid (PK)
- email: string (unique)
- first_name: string
- last_name: string
- created_at: timestamp
- is_trainer: boolean
- avatar_url: string (nullable)

#### courses

- id: uuid (PK)
- name: string
- description: text
- max_participants: integer
- created_at: timestamp
- created_by: uuid (FK -> users.id)
- is_active: boolean

#### sessions

- id: uuid (PK)
- course_id: uuid (FK -> courses.id)
- start_time: timestamp
- end_time: timestamp
- location: string
- max_participants: integer (nullable)
- is_cancelled: boolean
- cancellation_reason: text (nullable)
- created_at: timestamp

#### subscriptions

- id: uuid (PK)
- user_id: uuid (FK -> users.id)
- course_id: uuid (FK -> courses.id)
- start_date: date
- end_date: date
- payment_status: enum ('pending', 'paid', 'overdue')
- created_at: timestamp

#### session_attendances

- id: uuid (PK)
- session_id: uuid (FK -> sessions.id)
- user_id: uuid (FK -> users.id)
- status: enum ('signed_up', 'attended', 'no_show', 'excused')
- created_at: timestamp

#### announcements

- id: uuid (PK)
- title: string
- content: text
- created_by: uuid (FK -> users.id)
- created_at: timestamp
- is_important: boolean

## Project Structure
