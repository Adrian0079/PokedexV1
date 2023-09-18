import React from 'react'
import { useState, useEffect } from 'react'
import { app } from './fb'
import axios from 'axios';
import { Button, Container, TextField, Typography, createTheme, ThemeProvider } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';  


const Home = () => {

    //---Styles------------------
    const theme = createTheme({
        palette: {
            type: 'dark',
    primary: {
      main: '#2644ff',
      light: '#f86ff1',
      dark: '#2f79ff',
    },
    secondary: {
      main: '#f50057',
      dark: '#75052e',
          },
        },
      });
      
    //---Styles------------------
  //--Cerramos sesión--
  const closeSession =()=>{
    app.auth().signOut();
  }
 //--Cerramos sesión--

 //--Colocamos la API de pokemon--
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=35') // Cambia el límite según tus necesidades
      .then(response => {
        setPokemonList(response.data.results);
        console.log("https://pokeapi.co/api/v2/pokemon/25/");
      })
      .catch(error => {
        console.error('Error al obtener la lista de Pokémon:', error);
      });
  }, []); // El segundo argumento [] asegura que se ejecute solo una vez cuando se monta el componente
  

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
    
  const filteredPokemon = pokemonList.filter((pokemon) =>
  pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

 //--Colocamos la API de pokemon--

  return (
    <Container>
      <Typography variant='h2'>Welcome</Typography>
      

      {/* ---Colocamos la parte de pokemon ----------------------*/}
      <ThemeProvider theme={theme}>  
        <Container maxWidth="xs"
            sx={{
            border: 4,
            boxShadow: 5,
            pb: 2,
            }}>
            <TextField
                className='INP'
                type="text"
                placeholder="Search Pokemon"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            
        </Container>
      </ThemeProvider>
        <Button 
            variant="contained" 
            color="error" 
            onClick={closeSession}
            endIcon={<ExitToAppIcon />} 
            className='btCS'>Close session
        </Button>


      <div>
        

        <div className='container'>
          {filteredPokemon.map((pokemon, index) => (
          <div className='cardP'  key={pokemon.name}>{pokemon.name}
          &nbsp;
          <span className="pokedex-number">#{index + 1}</span>
          <img
              className='imgD'
              alt={pokemon.name}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonId(pokemon.url)}.png`}
          />
          </div>
          
          ))}
        </div>

      </div>
      {/* ---Colocamos la parte de pokemon ----------------------*/}


    </Container>
  )


// Función para extraer el ID del Pokémon desde la URL
function getPokemonId(url) {
  const parts = url.split('/');
  return parts[parts.length - 2];
}

}

export default Home
