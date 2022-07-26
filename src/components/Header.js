import React from 'react'
import { useNavigate } from 'react-router-dom';
import { AppBar, Container, createTheme, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import { CryptoState } from '../CryptoContext';

const useStyles = makeStyles({
    title: {
        flex: 1,
        fontFamily: 'Poppins',
        fontSize: '24px',
        color: '#eeeeee',
        fontWeight: 'bold',
        cursor: 'pointer'
    },
    bgColor: {
        background: '#393e46'
    }
});

function Header() {

  const classes = useStyles();
  const navigate = useNavigate();

  const { currency, setCurrency } = CryptoState();

  const darkTheme = createTheme({
    palette: {
        primary: {
            main: '#eeeeee',
        },
        type: 'dark'
    }
  });

  return (
    <ThemeProvider theme={darkTheme}>
        <AppBar className={classes.bgColor} position='static'>
            <Container>
                <Toolbar>
                    <Typography 
                    onClick={() => navigate('/')} 
                    className={classes.title}
                    variant='h6'
                    >
                    Crypto Tracker
                    </Typography>

                    <Select
                        variant="outlined"
                        style={{
                            width: 100,
                            height: 40,
                        }}
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                    > 
                        <MenuItem value={"USD"}>USD</MenuItem>
                        <MenuItem value={"ILS"}>ILS</MenuItem>
                        <MenuItem value={"EUR"}>EUR</MenuItem>
                        <MenuItem value={"RUB"}>RUB</MenuItem>
                    </Select>
                </Toolbar>
            </Container>
        </AppBar>
    </ThemeProvider>
  )
}

export default Header