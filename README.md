# Nixor — ISP Billing & Network Management Website

A modern, conversion-focused marketing website for Nixor ISP billing software.

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- React Router
- Lucide React icons

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for Production

```bash
npm run build
npm run preview
```

## Pages

| Route               | Description                    |
|---------------------|--------------------------------|
| `/`                 | Marketing landing page         |
| `/login`            | User login                     |
| `/register`         | Free trial registration        |
| `/admin`            | Administrator login            |
| `/admin/dashboard`  | Content management dashboard   |

## Admin Dashboard

Login at `/admin` (default: `admin` / `admin123` — change via `.env`).

From the dashboard you can:

- **Package Pricing** — Edit plan names, monthly/yearly prices, and features
- **Dashboard Images** — Upload or link images for Admin, Customer Management, Billing, Reports, and Package Management tabs
- **Page Sections** — Show/hide the Testimonials section
- **Contact Settings** — Set company email, phone, and address
- **Messages Inbox** — View all contact form submissions

Changes are saved to the browser and reflected on the public site immediately.

## Features

- Fully responsive (mobile, tablet, desktop)
- Dark mode with system preference detection
- SEO meta tags and semantic HTML
- Contact form with validation
- Live chat widget
- Google Analytics integration (optional)
- Monthly/yearly pricing toggle
- Interactive dashboard showcase

## Environment Setup

Copy `.env.example` to `.env` and configure:

```
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_ADMIN_USERNAME=admin
VITE_ADMIN_PASSWORD=your_secure_password
VITE_WEB3FORMS_ACCESS_KEY=your_access_key_here
```

### Contact Form Email

1. Sign up free at [web3forms.com](https://web3forms.com)
2. Add your company email as the recipient
3. Copy your access key into `VITE_WEB3FORMS_ACCESS_KEY`

Messages are always saved in the admin Messages Inbox, even without email setup.

## Project Structure

```
src/
├── components/   # UI sections (Hero, Features, Pricing, etc.)
├── pages/        # Route pages (Home, Login, Admin, Register)
├── context/      # Theme provider
├── hooks/        # Custom hooks
└── utils/        # Analytics helpers
```
