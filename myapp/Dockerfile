# Step 1: Use Node.js image
FROM node:18

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy project files
COPY . .

# Step 5: Build React app
RUN npm run build

# Step 6: Serve build using Nginx
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html

# Step 7: Expose port
EXPOSE 80

# Step 8: Start Nginx
CMD ["nginx", "-g", "daemon off;"]
