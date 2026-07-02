# Deployment Guide — TravelWithUs AI

This guide describes how to deploy the TravelWithUs AI SaaS platform to production using **Vercel** (Frontend), **Koyeb** (Backend), **Neon PostgreSQL** (Database), and **Cloudinary** (Object Storage).

---

## 1. Required Accounts & Services

| Service | Purpose | Pricing Tier Recommendation |
| :--- | :--- | :--- |
| **GitHub** | Repository VCS hosting and Koyeb/Vercel continuous integration trigger | Free |
| **Neon** | Serverless PostgreSQL database for production tables | Free Tier (0.5 GiB storage, auto-suspend) |
| **Koyeb** | Backend FastAPI app hosting (Dockerized Web Service) | Eco Nano Free Instance ($0/mo, 512MB RAM, 0.1 vCPU) |
| **Vercel** | Frontend static Vite React application hosting | Free (Hobby) |
| **Cloudinary** | Asset and image storage for dynamic destination cover uploads | Free Tier (25 Credits, generous bandwidth) |

---

## 2. Step-by-Step Deployment Order

To ensure correct variable injection and system health, follow this exact sequence:

```mermaid
graph TD
    A[1. Setup Neon DB] --> B[2. Obtain Connection Strings]
    B --> C[3. Deploy Koyeb Backend]
    C --> D[4. Obtain Backend URL]
    D --> E[5. Deploy Vercel Frontend]
    E --> F[6. Live Verification]
```

### Step 1: Database Setup (Neon PostgreSQL)
1. Sign in to [Neon](https://neon.tech) and create a new project named `travelwithus-db`.
2. Select PostgreSQL version **15** or **16**.
3. Choose the region closest to your target audience.
4. Once created, copy the **Connection string** (PostgreSQL URI format, e.g., `postgresql://syam:PASSWORD@ep-noisy-wave-12345.ap-south-1.aws.neon.tech/neondb?sslmode=require`).

### Step 2: Object Storage Setup (Cloudinary)
1. Sign in to [Cloudinary](https://cloudinary.com).
2. Note down your cloud variables from the Dashboard console:
   - **Cloud Name**
   - **API Key**
   - **API Secret**
   - **API Environment Variable URL` (`CLOUDINARY_URL`)

### Step 3: Backend Deployment (Koyeb Dockerized Web Service)
1. Sign in to [Koyeb](https://app.koyeb.com).
2. Click **Create Service**.
3. Connect your GitHub account and select your **`travelwithus`** repository.
4. Configure the Service settings:
   - **Deployment Type**: `GitHub`
   - **Repository Branch**: `main`
   - **Builder**: Select **Docker**
   - **Dockerfile Path**: `backend/Dockerfile`
   - **Build Context Directory**: `backend`
   - **Instance Size**: Select **Eco Nano** ($0/month Free Tier)
   - **Exposed Port**: Set to **`8000`** (Protocol: HTTP, Route: `/`)
   - **Service Name**: `travelwithus-backend`
5. Scroll to **Environment Variables** and add:
   
   | Key | Value | Description |
   | :--- | :--- | :--- |
   | `DATABASE_URL` | `postgresql://...` (from Neon) | PostgreSQL database connection string |
   | `JWT_SECRET` | `supersecrettravelwithuskey1234567890abcdef` | Key used to sign authorization cookies/tokens |
   | `CLOUDINARY_CLOUD_NAME` | *[Your Cloud Name]* | Cloudinary integration cloud name |
   | `CLOUDINARY_API_KEY` | *[Your API Key]* | Cloudinary access API key |
   | `CLOUDINARY_API_SECRET` | *[Your API Secret]* | Cloudinary access API secret |

6. Click **Deploy**. Koyeb will compile your Docker container, spin up migrations, and output a public app URL (e.g., `https://travelwithus-backend-yourname.koyeb.app`).

### Step 4: Frontend Deployment (Vercel)
1. Sign in to [Vercel](https://vercel.com).
2. Click **Add New** -> **Project**.
3. Connect your GitHub repository.
4. Configure Project settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. **Rewrites & Routing Configuration**:
   - The project includes a pre-configured [vercel.json](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/frontend/vercel.json) in the `frontend` folder that proxies `/api/*` traffic automatically to the production backend URL.
   - Update [vercel.json](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/frontend/vercel.json)'s `destination` path to your Koyeb backend URL before committing/pushing.
6. Click **Deploy**.

---

## 3. Common Deployment Issues & Troubleshooting

### 1. Database Connection Timeout on Startup
- **Symptom**: Logs show `sqlalchemy.exc.OperationalError: (psycopg2.OperationalError) connection to server at ... timed out`.
- **Solution**: Ensure your connection string ends with `?sslmode=require` (Neon requires SSL connections).

### 2. Koyeb Port Health Check Timeout
- **Symptom**: Deployment fails health checks with `port 8000 not responding`.
- **Solution**: Ensure your Dockerfile exposes port `8000` and starts uvicorn with `--host 0.0.0.0 --port 8000` to allow external routing.

### 3. Vercel SPA Routing 404
- **Symptom**: Refreshing browser on sub-pages yields a Vercel `404 - Not Found` error.
- **Solution**: Check that [vercel.json](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/frontend/vercel.json) is properly deployed to the project root.

---

## 4. Rollback Procedure

Revert to the last stable build if required:
1. **Frontend Rollback**:
   - Vercel Dashboard -> Deployments -> Select last stable build -> Click three dots -> **Promote to Production**.
2. **Backend Rollback**:
   - Koyeb Console -> Services -> Select `travelwithus-backend` -> Redeploy last successful Git commit.

