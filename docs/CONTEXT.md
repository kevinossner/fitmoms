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

```plaintext
fitmoms/
├── src/
│   ├── app/                      # Expo Router app directory
│   │   ├── (auth)/              # Authentication routes
│   │   │   ├── sign-in.tsx
│   │   │   ├── sign-up.tsx
│   │   │   └── _layout.tsx
│   │   ├── (app)/               # Protected app routes
│   │   │   ├── (tabs)/         # Bottom tab navigation
│   │   │   │   ├── feed/       # Feed tab routes
│   │   │   │   ├── calendar/   # Calendar tab routes
│   │   │   │   ├── courses/    # Courses tab routes
│   │   │   │   ├── profile/    # Profile tab routes
│   │   │   │   └── _layout.tsx # Tab navigation layout
│   │   │   ├── course/         # Course details routes
│   │   │   ├── session/        # Session details routes
│   │   │   └── _layout.tsx     # Protected layout with auth check
│   │   ├── (admin)/            # Admin-only routes
│   │   │   ├── users/         # User management
│   │   │   ├── sessions/      # Session management
│   │   │   ├── courses/       # Course management
│   │   │   └── _layout.tsx    # Admin layout with role check
│   │   └── _layout.tsx         # Root layout
│   ├── components/             # Reusable components
│   │   ├── auth/              # Authentication components
│   │   ├── courses/           # Course-related components
│   │   ├── sessions/          # Session-related components
│   │   ├── ui/               # UI components (buttons, cards, etc.)
│   │   └── forms/            # Form components
│   ├── hooks/                 # Custom React hooks
│   │   ├── auth/             # Authentication hooks
│   │   ├── courses/          # Course-related hooks
│   │   ├── sessions/         # Session-related hooks
│   │   └── api/              # API-related hooks
│   ├── lib/                  # Library code and utilities
│   │   ├── supabase.ts      # Supabase client
│   │   ├── api.ts           # API functions
│   │   └── utils/           # Utility functions
│   ├── providers/           # React context providers
│   │   ├── auth.tsx        # Authentication provider
│   │   └── theme.tsx       # Theme provider
│   ├── services/           # Business logic services
│   │   ├── auth.ts        # Authentication service
│   │   ├── courses.ts     # Course service
│   │   └── sessions.ts    # Session service
│   ├── styles/            # Global styles and theme
│   │   ├── theme.ts      # Theme configuration
│   │   └── global.ts     # Global styles
│   └── types/             # TypeScript type definitions
│       ├── database.ts   # Database types
│       ├── api.ts       # API types
│       └── navigation.ts # Navigation types
├── assets/               # Static assets
│   ├── images/         # Image assets
│   ├── fonts/          # Font files
│   └── icons/          # Icon assets
├── docs/                # Documentation
│   ├── CONTEXT.md      # Project context and requirements
│   └── DEVELOPMENT_PLAN.md # Development plan
└── tests/              # Test files
    ├── unit/          # Unit tests
    ├── integration/   # Integration tests
    └── e2e/          # End-to-end tests
```

### Directory Structure Explanation

- **src/app/**: Contains all the route components using Expo Router's file-based routing system

  - **(auth)/**: Authentication-related routes (public)
  - **(app)/**: Main application routes (protected)
  - **(admin)/**: Admin-only routes (protected + role check)

- **src/components/**: Reusable React components organized by feature

  - **ui/**: Generic UI components
  - **forms/**: Form-related components
  - Feature-specific component directories

- **src/hooks/**: Custom React hooks organized by feature

  - **api/**: Data fetching hooks
  - Feature-specific hook directories

- **src/lib/**: Core functionality and utilities

  - **supabase.ts**: Supabase client configuration
  - **utils/**: Helper functions and utilities

- **src/providers/**: React Context providers for global state management

  - **auth.tsx**: Authentication state management
  - **theme.tsx**: Theme state management

- **src/services/**: Business logic layer

  - Handles complex operations
  - Interacts with the API
  - Manages data transformations

- **src/styles/**: Global styles and theme configuration

  - **theme.ts**: Theme variables and configuration
  - **global.ts**: Global style utilities

- **src/types/**: TypeScript type definitions
  - **database.ts**: Supabase database types
  - **api.ts**: API request/response types
  - **navigation.ts**: Navigation types

### Key Features of the Structure

1. **Feature-based Organization**: Components, hooks, and services are organized by feature for better scalability
2. **Clear Separation of Concerns**: Each directory has a specific responsibility
3. **Type Safety**: Comprehensive TypeScript types for database, API, and navigation
4. **Scalable Routing**: Expo Router's file-based routing with nested layouts
5. **Reusable Components**: UI components are separated from feature-specific components
6. **Maintainable Testing**: Separate directories for different types of tests
