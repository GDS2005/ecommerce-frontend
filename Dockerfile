# Use an official Node runtime as the base image
FROM node:18.14 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli@15

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the Angular app
RUN ng serve

# Use a smaller base image for serving the Angular app
FROM nginx:alpine

# Copy the built Angular app to the nginx public directory
COPY --from=builder /app/dist/rest-fronend /usr/share/nginx/html