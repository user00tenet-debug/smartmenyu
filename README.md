# Smart Menyu

A comprehensive SaaS platform for digital restaurant menus.

## Production Links
- **Frontend App:** [https://smartmenyu.vercel.app](https://smartmenyu.vercel.app)
- **Backend API:** [https://smartmenyu.onrender.com](https://smartmenyu.onrender.com)

## Project Structure
- **/frontend**: Next.js application with Vercel deployment.
- **/backend**: Express.js server with Render deployment and Prisma/PostgreSQL.

## Required Production Environment Variables (Render)
To ensure the restaurant redirections work correctly, add the following to your Render dashboard:

| Variable Name | Value | Description |
| :--- | :--- | :--- |
| `PARADISE_WHATSAPP` | `919381957903` | WhatsApp number for Paradise |
| `PARADISE_UPI` | `8008942741@ptsbi` | UPI ID for Paradise |
| `DATABASE_URL` | *(Your Supabase URL)* | Connection string for Postgres |
| `CORS_ORIGINS` | `https://smartmenyu.vercel.app` | Allowed frontend origin |
