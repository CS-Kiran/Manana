# Manana (मनन)

🚀 **Manana** (मनन) - A mindful task tracker and diary app, designed for simplicity and productivity. Future AI integrations coming soon!

## 🛠 Tech Stack
- **Framework:** Next.js 15
- **Database:** MongoDB Atlas
- **UI:** ShadCN-UI

## 📌 Features
- ✅ Task Management: Create, edit, and track your tasks efficiently.
- 📖 Personal Diary: Write and reflect on your thoughts.
- 🔔 Notifications & Reminders: Stay on top of your tasks with timely alerts.
- 📊 Progress Tracking: Visualize your productivity with insights.
- 🔍 Search & Filter: Easily find tasks and diary entries.
- 🧠 AI Integration (Coming Soon): Smart insights and assistance.

## 🔧 Installation

```bash
# Clone the repository
git clone https://github.com/CS-Kiran/Manana.git
cd Manana

# Install dependencies
pnpm install  # or yarn install

# Set up environment variables in .env || .env.local file
MONGODB_URL = "mongodb+srv://[username]:[password]@[cluster-name].uern4.mongodb.net/[database-name]?retryWrites=true&w=majority"  # Add your MongoDB Atlas URL
JWT_SECRET = "[jwt_secret_key]"     # Add your jwt secret key
NEXTAUTH_URL = "[localhost-url]"    # eg : http://localhost:3000
NEXTAUTH_SECRET="[next_auth_secret_key]"       # Add your next-auth secret key
GOOGLE_CLIENT_ID="[google_client_id_from_google_API]"
GOOGLE_CLIENT_SECRET="[google_client_sceret_from_google_AP]"

# Run the app
npm run dev  # or yarn dev
```
The application will run on "http://localhost:3000"

## 🚀 Deployment
Manana can be deployed easily on platforms like Vercel. Ensure your environment variables are set correctly before deploying.

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

---

🌟 Star this repo if you find it useful!
