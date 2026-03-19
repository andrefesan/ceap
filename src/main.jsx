import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import Dashboard from './App.jsx'

const SENHA = 'Adriano'

function PasswordGate() {
  const [autenticado, setAutenticado] = useState(() => sessionStorage.getItem('ceap_auth') === '1')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState(false)

  if (autenticado) return <Dashboard />

  const handleSubmit = (e) => {
    e.preventDefault()
    if (senha === SENHA) {
      sessionStorage.setItem('ceap_auth', '1')
      setAutenticado(true)
    } else {
      setErro(true)
      setSenha('')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f0f2f5',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <form onSubmit={handleSubmit} style={{
        background: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        textAlign: 'center',
        minWidth: '300px'
      }}>
        <h2 style={{ margin: '0 0 1.5rem', color: '#333' }}>Dashboard CEAP</h2>
        <input
          type="password"
          placeholder="Digite a senha"
          value={senha}
          onChange={(e) => { setSenha(e.target.value); setErro(false) }}
          style={{
            width: '100%',
            padding: '0.75rem',
            fontSize: '1rem',
            border: `1px solid ${erro ? '#e74c3c' : '#ddd'}`,
            borderRadius: '4px',
            boxSizing: 'border-box',
            outline: 'none'
          }}
          autoFocus
        />
        {erro && <p style={{ color: '#e74c3c', margin: '0.5rem 0 0', fontSize: '0.875rem' }}>Senha incorreta</p>}
        <button type="submit" style={{
          marginTop: '1rem',
          width: '100%',
          padding: '0.75rem',
          fontSize: '1rem',
          background: '#2563eb',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Entrar
        </button>
      </form>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PasswordGate />
  </StrictMode>,
)
