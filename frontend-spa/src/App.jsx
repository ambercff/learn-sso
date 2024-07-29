import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <>
      <main>
        <head>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity='sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGwZJEdK2Kadq2F9CUG65' crossOrigin='anonymous'/>
        </head>
        <body>
          <div className="container">
            <br />
            <div className="d-grip gap-2 col-4 mx-auto">
              <br />
              <a className='w-100 btn btn-lg btn-primary' href="http://localhost:3000/oauth2/authorization/azure" role='link' style={{marginTop: '10px'}}> Login </a>
            </div>
          </div>
        </body>
      </main>
    </>
  )
}

export default App
