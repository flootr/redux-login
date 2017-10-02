import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './components/app'
import './index.css'
import initStore from './store'
import registerServiceWorker from './registerServiceWorker'

const store = initStore()

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path='/' component={App} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
