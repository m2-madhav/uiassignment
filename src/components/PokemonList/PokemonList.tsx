import React, { useState, useMemo } from 'react';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const useStyles = createUseStyles({
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  searchBox: {
    marginBottom: '20px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '300px',
    fontSize: '16px',
    '&:focus': {
      outline: 'none',
      borderColor: '#007bff',
      boxShadow: '0 0 5px rgba(0, 123, 255, 0.5)',
    },
  },
  pokemonGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
    width: '100%',
    maxWidth: '1200px',
  },
  pokemonCard: {
    backgroundColor: '#fff',
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    padding: '15px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    '&:hover': {
      // Hover effect
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    },
  },
  pokemonImage: {
    width: '120px',
    height: '120px',
    objectFit: 'contain',
    marginBottom: '10px',
  },
  pokemonNumber: {
    fontSize: '0.9em',
    color: '#666',
    marginBottom: '5px',
  },
  pokemonName: {
    fontSize: '1.2em',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  pokemonTypes: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '5px',
  },
  typeBadge: {
    backgroundColor: '#f0f0f0',
    borderRadius: '5px',
    padding: '5px 10px',
    fontSize: '0.8em',
    color: '#555',
    textTransform: 'capitalize',
  },
});

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading, error } = useGetPokemons();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredPokemons = useMemo(() => {
    if (!searchTerm) {
      return pokemons;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return pokemons.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        pokemon.number.toLowerCase().includes(lowerCaseSearchTerm) ||
        pokemon.types.some((type: string) =>
          type.toLowerCase().includes(lowerCaseSearchTerm)
        )
    );
  }, [pokemons, searchTerm]);

  if (loading) return <p>Loading Pokemons...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleCardClick = (pokemonId: string) => {
    navigate(`/pokemon/${pokemonId}`);
  };

  return (
    <div className={classes.listContainer}>
      <input
        type="text"
        placeholder="Search Pokémon by name, number, or type..."
        className={classes.searchBox}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className={classes.pokemonGrid}>
        {filteredPokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            className={classes.pokemonCard}
            onClick={() => handleCardClick(pokemon.id)} // Add click handler
          >
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className={classes.pokemonImage}
            />
            <p className={classes.pokemonNumber}>#{pokemon.number}</p>
            <h3 className={classes.pokemonName}>{pokemon.name}</h3>
            <div className={classes.pokemonTypes}>
              {pokemon.types.map((type: string) => (
                <span key={type} className={classes.typeBadge}>
                  {type}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
