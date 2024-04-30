# AI Journal

AI Journal is a personal journaling application powered by OpenAI, designed to track your mood based on your entries. It offers insights into your emotional state over time and provides a platform for self-reflection.

## Technolgy
- Typescript
- Next 14
- OpenAI
- Langchain
- Clerk
- Tailwind
- Prisma

## Features

- **AI-Powered Mood Tracking:** Utilizing OpenAI's advanced language processing capabilities, AI Journal analyzes your journal entries to discern your mood and tracks it over time.
- **Personalized Insights via Questions:** Pose questions about your entries to gain deeper understanding of your mood patterns.
- **Easy to Use:** AI Journal has a simple and intuitive interface that makes journaling easy and enjoyable.
- **Data Persistence**: Save and load your journal entries effortlessly.

## TODO
- Stripe for subscription
- Mobile Design

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (version > 18)
- Next.js (version > 13.4.5)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
NEXT_PUBLIC_CLERK_SIGN_IN_URL
NEXT_PUBLIC_CLERK_SIGN_UP_URL
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL
DATABASE_URL
OPENAI_API_KEY
```

### Installation

1. Clone the repo
   ```bash
   git clone https://github.com/your_username_/ai-journal.git
