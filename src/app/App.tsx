import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'react-jss';
import { ApolloProvider } from '@apollo/client';
import { client } from '../app/client';
import { PokemonList } from '../components/PokemonList/PokemonList';
import { PokemonDetailDialog } from '../components/PokemonDetailDialog/PokemonDetailDialog'; // Import the new dialog component

const theme = {
  colorPrimary: '#2196f3',
  colorSecondary: '#ffc107',
};

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Router>
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
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
