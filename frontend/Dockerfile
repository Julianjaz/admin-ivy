FROM node:18-alpine as build

WORKDIR /app

# Copy package files (now we're already in frontend/)
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy built files
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

# Install only production dependencies
RUN npm install --production

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start"]
