import { useState } from 'react';
import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const onSubmit = (e) => {
    e.preventDefault()
    const [username, password] = e.target;
    fetch('http://localhost:3000/api/login', {
      method: 'post',
      body: JSON.stringify({ username, password })
    }).then(res => res.json()).then(console.log)
  }
  return (
    <Layout>
      <form className={utilStyles.form} onSubmit={onSubmit}>
        <p>
          username : <input type="text" />
        </p>
        <p>
          password : <input type={showPassword ? 'text' : 'password'} />
        </p>
        <p>
          show password? <input type="checkbox" onChange={() => setShowPassword(prev => !prev)} />
        </p>
        <input type="submit" />
      </form>
    </Layout>
  )
}