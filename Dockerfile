# Multi-stage build dla aplikacji React + Vite
# Stage 1: Builder - budowanie aplikacji
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --quiet

COPY . .

# Run CI checks before build
RUN npm run lint && npm run type-check

RUN npm run build

# Stage 2: Production - serwowanie plików statycznych
FROM node:24-alpine

WORKDIR /app

# Instalacja serve - lekki serwer plików statycznych
RUN npm install -g serve

# Kopiowanie zbudowanych plików
COPY --from=builder /app/dist ./dist

EXPOSE 3000

# Serve z obsługą SPA (fallback do index.html)
CMD ["serve", "-s", "dist", "-l", "3000"]
