# Use the official Node.js 16 image as the base image
FROM node:alpine

# Create and change to the app directory
WORKDIR /usr/src/app

COPY . /usr/src/app

# Install app dependencies
RUN npm install -g @angular/cli
RUN npm install

# Start the app
CMD ["ng", "serve", "--host", "0.0.0.0"]
