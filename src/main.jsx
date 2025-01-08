import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Faq from './pages/Faq.jsx'
import Terms from './pages/Terms.jsx'
import Privacy from './pages/Privacy.jsx'
import './index.css'

// Configuration des en-têtes de sécurité
const meta = document.createElement('meta')
meta.httpEquiv = "Content-Security-Policy"
meta.content = import.meta.env.VITE_CSP
document.head.appendChild(meta)

// Configuration du router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Faq",
    element: <Faq />,
  },
  {
    path: "/Terms", 
    element: <Terms />,
  },
  {
    path: "/Privacy",
    element: <Privacy />,
  }
])

// Configuration Groq API
const groqConfig = {
  apiUrl: import.meta.env.VITE_API_URL,
  apiKey: import.meta.env.VITE_GROQ_API_KEY
}

// Fonction sécurisée pour interagir avec Groq API
export const queryGroq = async (query) => {
  try {
    const response = await fetch(groqConfig.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${groqConfig.apiKey}`
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b-32768',
        messages: [{
          role: 'user',
          content: query
        }],
        temperature: 0.7
      }),
      credentials: 'same-origin'
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
    
  } catch (error) {
    console.error('Erreur lors de la requête à Groq:', error);
    throw error;
  }
}

// Rendu de l'application
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
