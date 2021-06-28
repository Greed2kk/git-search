import React from 'react'
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import { Profile } from './pages/Profile'
import { About } from './pages/About'
import Alert from './components/Alert'
import AlertState from './context/alert/alertState'
import GitHubState from './context/github/gitHubState'
import PaginationState from './context/pagination/paginationState'

function App() {
  return (
    <GitHubState>
      <PaginationState>
        <AlertState>
          <BrowserRouter>
            <Navbar />
            <div className="container pt-4">
              <Alert alert={{ text: 'Test' }} />
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/about" component={About} />
                <Route
                  path="/profile/:name"
                  component={Profile}
                />
              </Switch>
            </div>
          </BrowserRouter>
        </AlertState>
      </PaginationState>
    </GitHubState>
  )
}

export default App
