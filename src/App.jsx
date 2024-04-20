import { useState } from 'react'
import './App.css'
import Dashboard from './components/dashboard'

function App() {
  const [Email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [objective, setObjective] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [height, setHeight] = useState(' ');
  const [weight, setWeight] = useState(' ');
  const [weeks, setWeeks] = useState(' ');
  const [user, setUser] = useState('');
  const [loggedIn, setLogin] = useState(false);


  const users = {
    1: {
      Email: 'chibi chibi',
      password: 'chapa chapa',
      FirstName: 'Joe',
      lastName: 'Mama',
      objective: 'lose weight',
      weight: 300,
      height: 6.3,
      weeks: 69
    },
  }

  const signInWrapper = document.querySelector('.login-page');

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Handle login logic here

    setLogin(true);

    const signInFormWrapper = document.querySelector('.login-page');
    signInFormWrapper.classList.add('hide');

    console.log("Email:", Email)
    console.log("Password:", password)
  }

  const handleCreateAccount = (e) => {
    // Handle create account logic here
    console.log("test")
    e.preventDefault();
    
    const signInFormWrapper = document.querySelector('.signin.form-wrapper');
    signInFormWrapper.classList.add('hide');

    const signUpFormWrapper = document.querySelector('.signup.form-wrapper');
    signUpFormWrapper.classList.remove('hide');

  }

  const createDashBoard = (e) => {
    e.preventDefault();

    const signUpFormWrapper = document.querySelector('.login-page');
    signUpFormWrapper.classList.add('hide');

    setLogin(true);
    
  }

  const back = () => {
    const signInFormWrapper = document.querySelector('.signin.form-wrapper');
    signInFormWrapper.classList.remove('hide');

    const signUpFormWrapper = document.querySelector('.signup.form-wrapper');
    signUpFormWrapper.classList.add('hide');
  }

  const handleObjectiveChange = (e) => {
    setObjective(e.target.value);
  };

  return (
    <div>
    <div className='login-page'>
      <div className="login-container">
        <h1>Macromaster</h1>
        <div className="signin form-wrapper">
          <h2>Sign in</h2>
          <form onSubmit={createDashBoard}>
            <div className="input-container">
              <label htmlFor="Email"></label>
              <input 
                placeholder='Email'
                type="text" 
                id="Email" 
                value={Email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div className="input-container">
              <label htmlFor="password"></label>
              <input 
                placeholder='Password'
                type="password" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            <button type="submit">Login</button>
          </form>
          <button onClick={handleCreateAccount}>Create Account</button>
        </div>

        <div className="signup form-wrapper hide">
          <form onSubmit={createDashBoard}>
            <div className="input-container">
              <label htmlFor="firstName"></label>
              <input 
              placeholder='First Name'
                type="text" 
                id="firstName" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
              />
              <label htmlFor="lastName"></label>
              <input 
                placeholder='Last Name'
                type="text" 
                id="lastName" 
                value={Email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div className='input-container'>
              <label htmlFor="password"></label>
              <input 
                className='input'
                placeholder='Create password'
                type="password" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            <div className='input-container'>
              <label htmlFor="Email"></label>
              <input 
                className='input'
                placeholder='Email'
                type="text" 
                id="Email" 
                value={Email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div className="input-container">
              <label htmlFor="height"></label>
              <input 
                placeholder='Height'
                type="text" 
                id="height" 
                value={Email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
              <label htmlFor="weight"></label>
              <input 
                placeholder='Weight'
                type="text" 
                id="weight" 
                value={weight} 
                onChange={(e) => setWeight(e.target.value)} 
              />
            </div>
            <div>
              <h4>Objective:</h4>
              <input type="radio" id="losing-weight" value="losing" checked={objective === 'losing'} onChange={handleObjectiveChange} />
              <label htmlFor="losing">lose weight</label>
              <input type="radio" id="maintaining-weight" value="maintaining" checked={objective === 'maintaining'} onChange={handleObjectiveChange} />
              <label htmlFor="maintaining">maintain weight</label>
              <input type="radio" id="gain" value="gaining" checked={objective === 'gaining'} onChange={handleObjectiveChange} />
              <label htmlFor="gain">gain weight</label>
            </div>

            {objective === 'losing' && (
              <div className='input-container'>
                <label htmlFor="weight">Lose:</label>
                <input type="number" id="weight" />
                <label htmlFor="weight">Lbs      In:</label>
                <input type="number" id="weight" />
                <label>Weeks</label>
              </div>
            )}

            {objective === 'gaining' && (
              <div className='input-container'>
                <label htmlFor="weight">Gain:</label>
                <input type="number" id="weight" />
                <label htmlFor="weight">Lbs      In:</label>
                <input type="number" id="weight" />
                <label>Weeks</label>
              </div>
            )}

            <button onClick={createDashBoard}>Create Account</button>
          </form>
          <p>Have an account?</p>
          <button onClick={back}>Login</button>
          </div>
        </div>
        
        
      </div>
        <div>
            {loggedIn && 
                <Dashboard board={users[1]}/>
            }
          </div>
      </div>

  )

}

export default App
