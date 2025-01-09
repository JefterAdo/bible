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
meta.content = "default-src 'self'; connect-src 'self' https://api.groq.com; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;"
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
const apiConfig = {
  apiUrl: 'https://api.groq.com/openai/v1/chat/completions',
  apiKey: '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'
}

// Fonction sécurisée pour interagir avec l'API
export const queryGroq = async (query) => {
  try {
    const response = await fetch(apiConfig.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiConfig.apiKey}`
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b-32768',
        messages: [{
          role: 'user',
          content: query
        }],
        temperature: 0.7,
        max_tokens: 4096
      }),
      credentials: 'same-origin'
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
    
  } catch (error) {
    console.error('Erreur lors de la requête API:', error);
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
