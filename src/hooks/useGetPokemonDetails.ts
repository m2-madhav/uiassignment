import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_POKEMON_DETAILS = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

export const useGetPokemonDetails = (pokemonId: string | null) => {
  const { loading, error, data } = useQuery(GET_POKEMON_DETAILS, {
    variables: { id: pokemonId },
    skip: !pokemonId,
  });

  return {
    pokemon: data?.pokemon,
    loading,
    error,
  };
};
