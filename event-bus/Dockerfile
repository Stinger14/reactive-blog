# Get base image
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy required file for npm install
COPY package.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY ./ ./

CMD ["npm", "start"]