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
    padding: '25px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  pokemonNameContainer: {
    textAlign: 'center',
    marginBottom: '15px',
  },
  pokemonName: {
    fontSize: '2.4em',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '5px',
    textTransform: 'capitalize',
  },
  pokemonNumber: {
    fontSize: '1.2em',
    color: '#666',
    fontWeight: 'normal',
  },
  pokemonImage: {
    width: '180px',
    height: '180px',
    objectFit: 'contain',
    marginBottom: '20px',
  },
  detailSection: {
    width: '100%',
    maxWidth: '450px',
    marginBottom: '20px',
    paddingBottom: '15px',
    borderBottom: '1px solid #eee',
    '&:last-child': {
      borderBottom: 'none',
      marginBottom: 0,
      paddingBottom: 0,
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
  },
  detailLabel: {
    fontWeight: 'bold',
    color: '#555',
  },
  detailValue: {
    color: '#333',
    textAlign: 'right',
  },
  sectionTitle: {
    fontSize: '1.4em',
    fontWeight: 'bold',
    color: '#444',
    marginBottom: '12px',
    textTransform: 'uppercase',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  statLabel: {
    fontSize: '0.9em',
    color: '#777',
  },
  statValue: {
    fontSize: '1.1em',
    fontWeight: 'bold',
    color: '#333',
  },
  typeBadgeContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  typeBadge: {
    backgroundColor: '#f0f0f0',
    borderRadius: '5px',
    padding: '6px 12px',
    fontSize: '0.9em',
    color: '#555',
    textTransform: 'capitalize',
  },
  weaknessResistanceContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
});

export const PokemonDetailDialog: React.FC = () => {
  const classes = useStyles();
  const params = useParams();
  const pokemonId = params.pokemonId as string | undefined;

  const navigate = useNavigate();
  const { pokemon, loading, error } = useGetPokemonDetails(pokemonId || null);

  const handleClose = () => {
    navigate('/pokemon');
  };

  useEffect(() => {
    if (!pokemonId && window.location.pathname.startsWith('/pokemon/')) {
      handleClose();
    }
  }, [pokemonId, handleClose]);

  return (
    <Dialog open={!!pokemonId} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
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
        {error && (
          <Typography color="error">Error: {error.message}</Typography>
        )}{' '}
        {pokemon && (
          <>
            <div className={classes.pokemonNameContainer}>
              <Typography
                className={classes.pokemonName}
                variant="h6"
                component="h2"
              >
                {pokemon.name}
              </Typography>
              <Typography className={classes.pokemonNumber}>
                #{pokemon.number}
              </Typography>
            </div>

            <img
              src={pokemon.image}
              alt={pokemon.name}
              className={classes.pokemonImage}
            />

            <div className={classes.detailSection}>
              <Typography className={classes.sectionTitle}>
                Classification
              </Typography>
              <Box className={classes.detailRow}>
                <Typography className={classes.detailLabel}>
                  Species:
                </Typography>
                <Typography className={classes.detailValue}>
                  {pokemon.classification}
                </Typography>
              </Box>
            </div>

            <div className={classes.detailSection}>
              <Typography className={classes.sectionTitle}>
                Flee Rate
              </Typography>
              <Box className={classes.detailRow}>
                <Typography className={classes.detailLabel}>Rate:</Typography>
                <Typography className={classes.detailValue}>
                  {(pokemon.fleeRate * 100).toFixed(1)}%
                </Typography>
              </Box>
            </div>

            <div className={classes.detailSection}>
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
                  <Typography className={classes.statValue}>
                    {pokemon.height?.minimum}
                  </Typography>
                </Box>
                <Box className={classes.statItem}>
                  <Typography className={classes.statLabel}>
                    Max Height:
                  </Typography>
                  <Typography className={classes.statValue}>
                    {pokemon.height?.maximum}
                  </Typography>
                </Box>
              </Box>
            </div>

            <div className={classes.detailSection}>
              <Typography className={classes.sectionTitle}>Types</Typography>
              <Box className={classes.typeBadgeContainer}>
                {pokemon.types.map((type: string) => (
                  <span key={type} className={classes.typeBadge}>
                    {type}
                  </span>
                ))}
              </Box>
            </div>

            <div className={classes.detailSection}>
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
            </div>

            {/* Weaknesses Section */}
            <div className={classes.detailSection}>
              <Typography className={classes.sectionTitle}>
                Weaknesses
              </Typography>
              <Box className={classes.weaknessResistanceContainer}>
                {pokemon.weaknesses.length > 0 ? (
                  pokemon.weaknesses.map(
                    (
                      weak: string // Ensure weak is string
                    ) => (
                      <span
                        key={weak}
                        className={classes.typeBadge}
                        style={{ backgroundColor: '#ffe6e6' }}
                      >
                        {weak}
                      </span>
                    )
                  )
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    N/A
                  </Typography>
                )}
              </Box>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PokemonDetailDialog;
