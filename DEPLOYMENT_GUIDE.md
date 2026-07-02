# Deployment Guide — TravelWithUs AI

This guide describes how to deploy the TravelWithUs AI SaaS platform to production using **Vercel** (Frontend), **Render** (Backend), **Neon PostgreSQL** (Database), and **Cloudinary** (Object Storage).

---

## 1. Required Accounts & Services

| Service | Purpose | Pricing Tier Recommendation |
| :--- | :--- | :--- |
| **GitHub** | Repository VCS hosting and Render/Vercel continuous integration trigger | Free |
| **Neon** | Serverless PostgreSQL database for production tables | Free Tier (0.5 GiB storage, auto-suspend) |
| **Render** | Backend FastAPI app hosting (Web Service) | Free / Individual ($7/mo for non-sleeping instance) |
| **Vercel** | Frontend static Vite React application hosting | Free (Hobby) |
| **Cloudinary** | Asset and image storage for dynamic destination cover uploads | Free Tier (25 Credits, generous bandwidth) |

---

## 2. Step-by-Step Deployment Order

To ensure correct variable injection and system health, follow this exact sequence:

```mermaid
graph TD
    A[1. Setup Neon DB] --> B[2. Obtain Connection Strings]
    B --> C[3. Deploy Render Backend]
    C --> D[4. Obtain Backend URL]
    D --> E[5. Deploy Vercel Frontend]
    E --> F[6. Live Verification]
```

### Step 1: Database Setup (Neon PostgreSQL)
1. Sign in to [Neon](https://neon.tech) and create a new project named `travelwithus-db`.
2. Select PostgreSQL version **15** or **16**.
3. Choose the region closest to your target audience (e.g., `aws-ap-south-1` Mumbai or `aws-eu-central-1` Frankfurt).
4. Once created, copy the **Connection string** (PostgreSQL URI format, e.g., `postgresql://syam:PASSWORD@ep-noisy-wave-12345.ap-south-1.aws.neon.tech/neondb?sslmode=require`).

### Step 2: Object Storage Setup (Cloudinary)
1. Sign in to [Cloudinary](https://cloudinary.com).
2. Note down your cloud variables from the Dashboard console:
   - **Cloud Name**
   - **API Key**
   - **API Secret**
   - **API Environment Variable URL** (`CLOUDINARY_URL`)

### Step 3: Backend Deployment (Render Web Service)
1. Sign in to [Render](https://render.com).
2. Click **New +** and select **Web Service**.
3. Connect your GitHub repository and select the workspace root folder.
4. Configure the Web Service settings:
   - **Name**: `travelwithus-backend`
   - **Region**: Same region as your Neon database (e.g., Frankfurt/Oregon)
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT`
5. Click **Advanced** and add the following **Environment Variables**:
   
   | Key | Value | Description |
   | :--- | :--- | :--- |
   | `DATABASE_URL` | `postgresql://...` (from Neon) | PostgreSQL database connection string |
   | `JWT_SECRET` | *[Generate a 32-character random string]* | Key used to sign authorization cookies/tokens |
   | `CLOUDINARY_CLOUD_NAME` | *[Your Cloud Name]* | Cloudinary integration cloud name |
   | `CLOUDINARY_API_KEY` | *[Your API Key]* | Cloudinary access API key |
   | `CLOUDINARY_API_SECRET` | *[Your API Secret]* | Cloudinary access API secret |

6. Deploy the Web Service. Render will build, run startup migrations, seed initial records, and output a URL (e.g., `https://travelwithus-backend.onrender.com`).

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
   - The project includes a pre-configured [vercel.json](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/frontend/vercel.json) in the `frontend` folder that proxies `/api/*` traffic automatically to the production Render backend URL.
   - If your Render backend URL differs from `https://travelwithus-backend.onrender.com`, update [vercel.json](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/frontend/vercel.json)'s `destination` path before committing/pushing.
6. Click **Deploy**.

---

## 3. Common Deployment Issues & Troubleshooting

### 1. Database Connection Timeout on Startup
- **Symptom**: Render logs show `sqlalchemy.exc.OperationalError: (psycopg2.OperationalError) connection to server at ... timed out`.
- **Solution**: Ensure your connection string ends with `?sslmode=require` (Neon requires SSL connections). Double check your database host whitelist rules or region settings.

### 2. Render Free Tier Wake-up Latency
- **Symptom**: Opening the application causes a 50-second delay or loading spinners before content loads.
- **Explanation**: Render's free tier spins down web services after 15 minutes of inactivity. The wake-up phase takes 30-50 seconds.
- **Solution**: Upgrade Render service to the $7 Starter tier for production environments, or configure a monitoring service (like UptimeRobot) to ping `/api/health` every 10 minutes.

### 3. Vercel SPA Routing 404
- **Symptom**: Navigating to pages like `/explore` or `/planner` works, but refreshing the browser on those pages yields a Vercel `404 - Not Found` error.
- **Solution**: The `vercel.json` redirects all non-API paths to `index.html` to allow React Router to handle client-side routing. Confirm that [vercel.json](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/frontend/vercel.json) exists in the Vercel root directory and is deployed.

---

## 4. Rollback Procedure

Should a production deploy introduce breaking changes, revert to the last stable state instantly:
1. **Frontend Rollback**:
   - Go to your Vercel Dashboard -> Deployments.
   - Locate the last stable deployment, click the three dots, and select **Redeploy** or **Promote to Production**.
2. **Backend Rollback**:
   - Go to the Render Dashboard -> Select `travelwithus-backend`.
   - Click **Deploy History**.
   - Locate the last successful commit build, click the three dots, and select **Rollback to this deploy**.
