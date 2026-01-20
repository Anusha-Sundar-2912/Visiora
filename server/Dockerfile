# Use official Node image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install


# Copy rest of the backend code
COPY . .

# Expose the port
EXPOSE 10000

# Start the server
CMD ["node", "server.js"]
