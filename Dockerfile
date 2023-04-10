# Base image
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build --prod


# Use a smaller nginx base image to serve the built application
FROM nginx:1.21-alpine

# Create a directory for the app files
# RUN mkdir -p /usr/share/nginx/html/
RUN mkdir -p /usr/share/nginx/html/assets

# Copy the built application from the previous stage to the app directory
COPY --from=build /app/dist/manazel-alabrar-fe /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80
