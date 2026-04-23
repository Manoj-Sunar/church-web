# Stage 1: build
FROM node:22.20.0 AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: runtime
FROM node:24.13.0

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=build /app/dist ./dist

EXPOSE 5000
CMD ["node", "dist/main.js"]
