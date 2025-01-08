import { useState } from 'react'
import './App.css'
import { queryGroq } from './main.jsx'

function App() {
  const [question, setQuestion] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!question.trim()) {
      setError('Veuillez poser une question')
      return
    }

    setLoading(true)
    setError('')
    setResponse('')

    try {
      const answer = await queryGroq(
        `Réponds à cette question en te basant uniquement sur la Bible. Pour chaque réponse, cite les versets bibliques pertinents avec leur référence (livre, chapitre, verset). Question : ${question}`
      )
      setResponse(answer)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="app">
        <header className="header">
          <h1>ParoleConnect</h1>
          <p>Votre moteur de recherche biblique intelligent</p>
        </header>

        <div className="search-container">
          <form onSubmit={handleSubmit} className="search-form">
            <input
              type="text"
              className="search-input"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Posez votre question biblique..."
              maxLength={500}
              autoFocus
            />
            <button
              type="submit"
              className="search-button"
              disabled={loading || !question.trim()}
            >
              {loading ? (
                <>
                  <div className="loading-spinner"></div>
                  Recherche en cours...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  Rechercher
                </>
              )}
            </button>
          </form>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {response && (
          <div className="response-container">
            <div className="response-header">
              <button 
                onClick={() => setResponse('')}
                className="back-button"
                title="Retour à l'accueil"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
              </button>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-book-open">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
              <h2>Réponse biblique</h2>
            </div>
            <div className="response-content">
              {response.split('\n').map((line, i) => (
                <p key={i}>
                  {line.includes('(') ? (
                    <>
                      {line.split('(')[0]}
                      <span className="verse-reference">({line.split('(')[1]}</span>
                    </>
                  ) : (
                    line
                  )}
                </p>
              ))}
            </div>
          </div>
        )}
        
        <footer className="app-footer">
          <div className="footer-content">
            <div className="footer-section">
              <h4>À propos</h4>
              <p>ParoleConnect est une plateforme biblique intelligente alimentée par l'IA Groq Cloud (Mixtral-8x7b).</p>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <p>Email: contact@paroleconnect.online</p>
              <p>Téléphone:+225 XX XX XX XX XX</p>
            </div>
            <div className="footer-section">
              <h4>Ressources</h4>
              <ul>
                <li><a href="/Faq">FAQ</a></li>
                <li><a href="/Terms">Conditions d'utilisation</a></li>
                <li><a href="/Privacy">Politique de confidentialité</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} ParoleConnect - Tous droits réservés</p>
            <p>Alimenté par Groq Cloud AI</p>
          </div>
        </footer>
      </div>
    </>
  )
}

export default App
