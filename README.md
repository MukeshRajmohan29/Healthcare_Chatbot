

# Healthcare Chatbot - Privacy-Aware AI Assistant

A full-stack web application featuring a privacy-aware healthcare chatbot with a React frontend and Node.js backend. The chatbot is designed for healthcare use cases and follows HIPAA privacy measures.


## 🧠 Features

- **Healthcare Contexts**: Symptom checking, mental health support, and chronic care management
- **HIPAA Privacy Popup**: Registration page includes a required privacy acceptance checkbox with a popup showing official HIPAA privacy measures
- **AI-Powered Responses**: OpenAI GPT-4-turbo integration for intelligent healthcare conversations
- **Healthcare Context Enforcement**: Chatbot responses are always in healthcare context; non-healthcare questions are redirected
- **Session Management**: Deterministic session ID based on first name, last name, and date of birth; returning users get the same session ID
- **Modern UI**: Built with React, Tailwind CSS, and shadcn/ui components


## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd Chatbot
   npm run install-all
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=5000
   ```

3. **Start the development servers:**
   ```bash
   npm run dev
   ```

   This will start:
   - Backend server on http://localhost:5000
   - Frontend client on http://localhost:3000


## 📁 Project Structure

```
Chatbot/
├── client/                 # React frontend
│   ├── public/             # Static files
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── contexts/       # React contexts
│   │   └── utils/          # Utility functions
│   └── package.json
├── server/                 # Node.js backend
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   └── package.json
├── src/                    # TypeScript/React components (optional, for advanced usage)
├── package.json            # Root package.json
└── README.md
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration (for chatlog storage)
DATABASE_URL=sqlite:./chatbot.db
```


### API Endpoints

- `POST /api/chat` - Send message to chatbot
- `POST /api/chatlog` - Save chat session data

## 🏥 Healthcare Contexts

The chatbot operates strictly within healthcare contexts:

1. **Symptom Checking**: General health symptom assessment
2. **Mental Health Support**: Emotional and psychological support
3. **Chronic Care Management**: Long-term condition management

Non-healthcare questions are redirected to keep the conversation in context.

## 🔒 Privacy Communication

- **HIPAA Privacy Popup**: On registration, users must accept privacy measures. Clicking the link opens a popup with official HIPAA privacy information (not a new tab).
- **Privacy Type Dropdown Removed**: The privacy type dropdown has been removed for a streamlined experience.

## 🛠️ Development


### Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run server` - Start only the backend server
- `npm run client` - Start only the frontend client
- `npm run build` - Build the frontend for production
- `npm run install-all` - Install dependencies for all packages


### Database

The application uses SQLite for storing chat logs. The database file (`chatbot.db`) will be created automatically on first run.


## 🔐 Security & Session Features

- Input sanitization and validation
- Protected API routes
- Environment variable protection
- Session-based context management
- Deterministic session ID: Based on first name, last name, and date of birth. Returning users get the same session ID on login or registration.


## 📝 License

MIT License - see LICENSE file for details.


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request


## ⚠️ Disclaimer

This chatbot is for educational and demonstration purposes only. It should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers for medical concerns.