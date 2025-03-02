# Step 1: Use Node.js image
FROM node:18

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy project files
COPY . .

# Step 5: Expose API port
EXPOSE 5000

# Step 6: Start backend server
CMD ["node", "index.js"]
