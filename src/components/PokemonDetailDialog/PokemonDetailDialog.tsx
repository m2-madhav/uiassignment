import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPokemonDetails } from '../../hooks/useGetPokemonDetails';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  dialogContent: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  pokemonImage: {
    width: '180px',
    height: '180px',
    objectFit: 'contain',
    marginBottom: '20px',
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '400px',
    marginBottom: '10px',
  },
  detailLabel: {
    fontWeight: 'bold',
    marginRight: '10px',
    color: '#555',
  },
  detailValue: {
    color: '#333',
    textAlign: 'right',
  },
  typeBadge: {
    backgroundColor: '#e0e0e0',
    borderRadius: '5px',
    padding: '5px 10px',
    fontSize: '0.9em',
    color: '#555',
    textTransform: 'capitalize',
    marginRight: '5px',
    marginBottom: '5px',
  },
  sectionTitle: {
    marginTop: '20px',
    marginBottom: '10px',
    fontSize: '1.2em',
    fontWeight: 'bold',
    color: '#444',
    borderBottom: '1px solid #eee',
    paddingBottom: '5px',
    width: '100%',
    maxWidth: '400px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
    width: '100%',
    maxWidth: '400px',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  statLabel: {
    fontSize: '0.8em',
    color: '#777',
  },
  statValue: {
    fontSize: '1em',
    fontWeight: 'bold',
    color: '#333',
  },
  weaknessResistanceContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    justifyContent: 'flex-start',
    width: '100%',
    maxWidth: '400px',
  },
  pokemonNumber: {
    fontSize: '0.9em',
    color: '#666',
    marginLeft: '10px',
  },
});

export const PokemonDetailDialog: React.FC = () => {
  const classes = useStyles();
  const params = useParams();
  const currentPokemonId = params.pokemonId as string | undefined;

  const navigate = useNavigate();
  const { pokemon, loading, error } = useGetPokemonDetails(
    currentPokemonId || null
  );

  const handleClose = () => {
    navigate('/pokemon');
  };

  useEffect(() => {
    if (!currentPokemonId && window.location.pathname.startsWith('/pokemon/')) {
      handleClose();
    }
  }, [currentPokemonId]);

  return (
    <Dialog
      open={!!currentPokemonId}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {pokemon?.name || 'Pokémon Details'}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers className={classes.dialogContent}>
        {loading && <CircularProgress />}
        {error && <Typography color="error">Error: {error.message}</Typography>}
        {pokemon && (
          <>
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className={classes.pokemonImage}
            />
            <Typography variant="h5" component="h2" gutterBottom>
              {pokemon.name}{' '}
              <span className={classes.pokemonNumber}>#{pokemon.number}</span>
            </Typography>

            <Box className={classes.detailRow}>
              <Typography className={classes.detailLabel}>
                Classification:
              </Typography>
              <Typography className={classes.detailValue}>
                {pokemon.classification}
              </Typography>
            </Box>
            <Box className={classes.detailRow}>
              <Typography className={classes.detailLabel}>
                Flee Rate:
              </Typography>
              <Typography className={classes.detailValue}>
                {pokemon.fleeRate * 100}%
              </Typography>
            </Box>

            <Typography className={classes.sectionTitle}>Stats</Typography>
            <Box className={classes.statsGrid}>
              <Box className={classes.statItem}>
                <Typography className={classes.statLabel}>Max CP:</Typography>
                <Typography className={classes.statValue}>
                  {pokemon.maxCP}
                </Typography>
              </Box>
              <Box className={classes.statItem}>
                <Typography className={classes.statLabel}>Max HP:</Typography>
                <Typography className={classes.statValue}>
                  {pokemon.maxHP}
                </Typography>
              </Box>
              <Box className={classes.statItem}>
                <Typography className={classes.statLabel}>
                  Min Weight:
                </Typography>
                <Typography className={classes.statValue}>
                  {pokemon.weight?.minimum}
                </Typography>
              </Box>
              <Box className={classes.statItem}>
                <Typography className={classes.statLabel}>
                  Max Weight:
                </Typography>
                <Typography className={classes.statValue}>
                  {pokemon.weight?.maximum}
                </Typography>
              </Box>
              <Box className={classes.statItem}>
                <Typography className={classes.statLabel}>
                  Min Height:
                </Typography>
                <Typography className={classes.statLabel}>
                  Max Height:
                </Typography>
                <Typography className={classes.statValue}>
                  {pokemon.height?.maximum}
                </Typography>
              </Box>
            </Box>

            <Typography className={classes.sectionTitle}>Types</Typography>
            <Box className={classes.weaknessResistanceContainer}>
              {pokemon.types.map((type: string) => (
                <span key={type} className={classes.typeBadge}>
                  {type}
                </span>
              ))}
            </Box>

            <Typography className={classes.sectionTitle}>
              Resistant To
            </Typography>
            <Box className={classes.weaknessResistanceContainer}>
              {pokemon.resistant.length > 0 ? (
                pokemon.resistant.map((res: string) => (
                  <span
                    key={res}
                    className={classes.typeBadge}
                    style={{ backgroundColor: '#e6ffe6' }}
                  >
                    {res}
                  </span>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  N/A
                </Typography>
              )}
            </Box>

            <Typography className={classes.sectionTitle}>Weaknesses</Typography>
            <Box className={classes.weaknessResistanceContainer}>
              {pokemon.weaknesses.length > 0 ? (
                pokemon.weaknesses.map((weak: string) => (
                  <span
                    key={weak}
                    className={classes.typeBadge}
                    style={{ backgroundColor: '#ffe6e6' }}
                  >
                    {weak}
                  </span>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  N/A
                </Typography>
              )}
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
