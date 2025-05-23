import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'react-jss';
import { PokemonList } from '../components/PokemonList/PokemonList';
import { PokemonDetailDialog } from '../components/PokemonDetailDialog/PokemonDetailDialog';
import { ApolloProvider } from '@apollo/client';
import { client } from '../app/client';
import { Nav } from '../components/Nav/Nav';
import { LayoutProvider } from '../contexts';

const theme = {
  colorPrimary: '#2196f3',
  colorSecondary: '#ffc107',
};

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Router>
          <LayoutProvider>
            <div style={{ display: 'flex', minHeight: '100vh' }}>
              {' '}
              <Nav />
              <div
                style={{
                  flexGrow: 1,
                  padding: '20px',
                  backgroundColor: '#f5f5f5',
                  color: '#333',
                  overflowY: 'auto',
                }}
              >
                <Routes>
                  <Route path="/pokemon" element={<PokemonList />} />
                  <Route path="/" element={<PokemonList />} />
                  <Route
                    path="/pokemon/:pokemonId"
                    element={
                      <>
                        <PokemonList />
                        <PokemonDetailDialog />
                      </>
                    }
                  />
                </Routes>
              </div>
            </div>
          </LayoutProvider>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
