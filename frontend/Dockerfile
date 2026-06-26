# syntax=docker/dockerfile:1
# ============================================================================
#  StudentPay · Frontend (React 19 / Vite 6) — build estático servido por nginx
# ============================================================================

# ---------- Stage 1: build ----------
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm install
COPY . .
RUN npm run build

# ---------- Stage 2: runtime (nginx) ----------
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
