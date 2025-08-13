# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Install build tools for sqlite3 native module
RUN apk add --no-cache python3 make g++ sqlite

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy only package.json and package-lock.json first (to cache Docker layers)
COPY package*.json ./

# Install dependencies inside container
RUN npm install

# Copy the rest of the app code
COPY . .

# Expose port
EXPOSE 5000

# Run migration
RUN npm run migrate

# Run the app
CMD [ "npm", "start" ]
