# temp_store

# install

npm install

- start the app
node server.js

http://localhost:80


# Project Update Instructions

Follow these steps to update your project:

1. **SSH into the server**:  
   ```bash
   ssh root@172.104.49.13
   ```

2. **Navigate to the project directory**:  
   ```bash
   cd /root/natasha_website
   ```

3. **Pull the latest changes from the repository**:  
   ```bash
   git pull
   ```

4. **Reload the application using PM2**:  
   ```bash
   pm2 reload all
   ```

That's it! Your project should now be updated and running.