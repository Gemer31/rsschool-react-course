import { Component } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/ErrorBoundary';

export class App extends Component<unknown, unknown> {
  render() {
    return (
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    );
  }
}

export class WrappedApp extends Component<unknown, unknown> {
  render() {
    return (
      <HashRouter>
        <App />
      </HashRouter>
    );
  }
}
