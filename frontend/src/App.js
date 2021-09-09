import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import QuestionDetail from './pages/QuestionDetail';

const theme = {
  colors: {
    primary: '#f48024', // StackOverflow Orange
    secondary: '#0077cc',
    background: '#ffffff',
    bgGray: '#f8f9f9',
    text: '#232629',
    border: '#e3e6e8'
  }
};

const Placeholder = ({ title }) => (
  <div style={{ padding: '100px', textAlign: 'center' }}>
    <h1>{title}</h1>
    <p>Component implementation in progress...</p>
  </div>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/questions/:id" component={QuestionDetail} />
          <Route path="/ask" component={() => <Placeholder title="Ask a Question" />} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
