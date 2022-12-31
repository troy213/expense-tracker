<div align='center'><h1>Simple Expense Tracker</h1>
<p>A simple expense tracker that public can use. You can login as a guest or register your account.</p>
</div>

![Sign In](../media/1.png?raw=true)
![Register](../media/2.png?raw=true)
![Dashboard](../media/3.png?raw=true)
![Category](../media/4.png?raw=true)

## 🍴 Forking this repo

Feel free to fork this repo, any attribution would help me a lot :)

## 🛠 Installation

1. Installation for client
   `cd client`
   `npm install`
2. Installation for server
   `cd server`
   <sub>Add .env file</sub>

   ```
   # Database
   HOST="your_db_host"
   USER="your_db_user"
   PASSWORD="your_db_password"
   DATABASE="your_db_name"

   ACCESS_TOKEN_SECRET="your_generated_random_string"
   REFRESH_TOKEN_SECRET="your_generated_random_string"
   ```

   `npm install`

3. Start Development
   `npm run dev`

## 🚀 Building for production

1. Generate
   `cd client`
   `npm run build`
2. Preview
   `serve dist`
