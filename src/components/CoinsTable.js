import { 
    Container, 
    createTheme, 
    LinearProgress, 
    TableBody, 
    TableContainer, 
    TextField, 
    ThemeProvider, 
    Typography, 
    Table, 
    TableHead, 
    TableRow, 
    TableCell, 
    makeStyles 
} from '@material-ui/core';

import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';
import { CoinList } from '../api';
import axios from 'axios';

const useStyles = makeStyles({
    row: {
        backgroundColor: '#2F333A',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#272A2F',
        },

    },
    pagination: {
        '& .MuiPaginationItem-root': {
            color: '#00E2EC'
        }
    }
})

function numWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function CoinsTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1)

  const { currency, symbol } = CryptoState();
  
  const navigate = useNavigate();
  const classes = useStyles();
  
    const darkTheme = createTheme({
      palette: {
          primary: {
              main: '#eeeeee',
          },
          type: 'dark'
      }
    });
  
  const fetchCoins = async () => {
    setLoading(true)
    const { data } = await axios.get(CoinList(currency));
    
    setCoins(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchCoins()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency])

  const handleSearch = () => {
    return coins.filter((coin) =>
        coin.name.toLowerCase().includes(search) || 
        coin.symbol.toLowerCase().includes(search)
    )
  }

  return (
    <ThemeProvider theme={darkTheme}>
        <Container style={{textAlign: 'center'}}>
            <Typography
                variant='h4'
                style={{margin: 20, fontFamily: 'Poppins'}}   
            >
                Top 100 Cryptocurrency Prices
            </Typography>

            
            {/* Search field */}
            <TextField 
                label='Search for a crypto currency'
                variant='filled'
                style={{width: '100%'}}
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />

            {/* Coin table */}
            <TableContainer>
                { 
                    loading ? (
                        <LinearProgress />
                    ) : (
                        <Table>
                        
                            {/* Table head */}
                            <TableHead style={{backgroundColor: '#00adb5'}}>
                                <TableRow>
                                    {['Coin', 'Price', '24h Change', 'Market Cap'].map((head) => (
                                        <TableCell
                                            style={{
                                                fontWeight: 700
                                            }}
                                            key={head}
                                            align={head === 'Coin' ? '' : 'right'}
                                        >
                                        {head}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            
                            {/* Table body */}
                            <TableBody>
                            {
                                handleSearch()
                                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                .map((row) => {
                                const profit = row.price_change_percentage_24h > 0;
                                return (
                                <TableRow
                                    onClick={() => navigate(`/currency/${row.id}`)}
                                    className={classes.row}
                                    key={row.name}
                                >

                                    <TableCell
                                        component="th"
                                        scope="row"
                                        style={{
                                            display: "flex",
                                            gap: 15,
                                            fontFamily: 'Poppins',
                                        }}
                                    >
                                    
                                    {/* Coin image */}
                                    <img
                                        src={row?.image}
                                        alt={row.name}
                                        height="50"
                                        style={{ marginBottom: 10 }}
                                    />

                                    {/* Coin name */}
                                    <div
                                        style={{display: 'flex', flexDirection: 'column'}}
                                    >
                                        <span
                                            style={{
                                                textTransform: 'uppercase',
                                                fontSize: 22,
                                                fontFamily: 'Poppins',
                                            }}
                                        >
                                            {row.symbol}
                                        </span>
                                        <span style={{color:'darkgray'}}>{row.name}</span>
                                    </div>

                                    </TableCell>

                                    
                                    {/* Price */}
                                    <TableCell align='right' style={{fontFamily: 'Poppins'}}>
                                        {symbol}{' '}
                                        {numWithCommas(row.current_price.toFixed(2))}
                                    </TableCell>

                                    
                                    {/* Profit */}
                                    <TableCell
                                        align='right'
                                        style={{                // Green      Red
                                            color: profit > 0 ? '#23C552' : '#F84F31',
                                            fontWeight: 500,
                                            fontFamily: 'Poppins',
                                        }}
                                    >
                                    {profit && '+'}
                                    {row.price_change_percentage_24h.toFixed(2)}%
                                    </TableCell>


                                    {/* Market cap */}
                                    <TableCell align='right' style={{fontFamily: 'Poppins'}}>
                                        {symbol}{' '}
                                        {numWithCommas(row.market_cap.toString().slice(0, -6))}
                                        M
                                    </TableCell>

                                </TableRow>
                                )
                            })
                        }
                            </TableBody>
                        </Table>
                    )
                }
            </TableContainer>
            
            
            {/* Pages */}
            <Pagination 
                style={{
                    padding: 20,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                }}
                classes={{ ul: classes.pagination }}
                count={(handleSearch()?.length / 10).toFixed(0)}
                onChange= {(_, value) => {
                    setPage(value);
                    window.scroll(0, 464);
                }}
            />

        </Container>
    </ThemeProvider>
  )
}

export default CoinsTable