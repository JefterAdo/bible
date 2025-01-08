import React from 'react'
import '../styles/Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>À propos</h4>
          <p>ParoleConnect - Plateforme biblique</p>
          <p>Version 1.0</p>
        </div>
        
        <div className="footer-section">
          <h4>Contact</h4>
          <p>support@paroleconnect.online</p>
          <p>+225 XX XX XX XX XX</p>
        </div>
        
        <div className="footer-section">
          <h4>Légal</h4>
          <a href="/privacy">Politique de confidentialité</a>
          <a href="/terms">Conditions d'utilisation</a>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2024 ParoleConnect. Tous droits réservés.</p>
      </div>
    </footer>
  )
}

export default Footer
