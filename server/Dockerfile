# Base Image
FROM node:20-alpine

# Application Directory
WORKDIR /app

# Copy dependency files first for caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Application Port
EXPOSE 10000

# Start application
CMD ["npm", "start"]