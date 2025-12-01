FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy built files and package.json
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

# Install only production dependencies (for vite preview)
RUN npm install --production

# Expose port (Railway will set PORT env variable)
EXPOSE 3000

# Start the application using vite preview
CMD ["sh", "-c", "npm run start"]
