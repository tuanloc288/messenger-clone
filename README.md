# Messenger clone with Next.js 13 App Router: React, Tailwind, Prisma, MongoDB, HeadlessUI, Pusher

![Individual chat](https://res.cloudinary.com/dbiliw2ja/image/upload/v1694088706/individual_itsiru.png)
![Gallery](https://res.cloudinary.com/dbiliw2ja/image/upload/v1694088706/gallery_v6184l.png)
![Group](https://res.cloudinary.com/dbiliw2ja/image/upload/v1694088706/group_yw9iyj.png)

This project is a Messenger clone with Next.js 13 App Router: 
    React, Tailwind + Headless UI, Prisma + MongoDB, 
    NextJS, Zustand, Clerk, Pusher

Features:

- Tailwind design
- Tailwind animations and effects
- Fully responsive design
- Redirect unauthorized users when accessing protected routes
- Google and Github authentication using Clerk
- Form validation and handling using react-hook-form
- Notification using react-hot-toast
- Page loading state
- Real-time chat and user status using Pusher (offline / online)
- Individual and group chat with text or image (will be added more features later if i have time 😄)

### Prerequisites

**Node version 14.x**

**NextJS version 13.x**

### Cloning the repository

```shell
git clone https://github.com/tuanloc288/messenger-clone.git
```

### Install packages

```shell
npm install
```

### Setup .env file

```js
DATABASE_URL=

NEXTAUTH_SECRET=

GITHUB_ID=
GITHUB_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=

NEXT_PUBLIC_PUSHER_APP_KEY=
PUSHER_APP_ID=
PUSHER_SECRET=
```

### Setup Prisma / MySQL 

```shell
npx prisma generate
npx prisma db push
```

### Start the app

```shell
npm run dev
```
