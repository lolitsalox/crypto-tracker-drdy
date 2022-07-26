import { LinearProgress, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import ReactHtmlParser from 'react-html-parser';
import { CryptoState } from '../CryptoContext';
import CoinInfo from '../components/CoinInfo';
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../api';
import axios from 'axios';

// Returns the number as a string with commas in the right places
function numWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
          alignItems: "center",
        },
      },
      sidebar: {
        width: "30%",
        [theme.breakpoints.down("md")]: {
          width: "100%",
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
        borderRight: "2px solid grey",
      },
      heading: {
        fontWeight: "bold",
        marginBottom: 20,
      },
      description: {
        width: "100%",
        padding: 25,
        paddingBottom: 15,
        paddingTop: 0,
        textAlign: "justify",
      },
      marketData: {
        alignSelf: "start",
        padding: 25,
        paddingTop: 10,
        width: "100%",
        [theme.breakpoints.down("md")]: {
          display: "flex",
          justifyContent: "space-around",
        },
        [theme.breakpoints.down("sm")]: {
          flexDirection: "column",
          alignItems: "center",
        },
        [theme.breakpoints.down("xs")]: {
          alignItems: "start",
        },
      },
}))

function Currency() {
    const [coin, setCoin] = useState();
  
    const { id } = useParams();
    const { currency, symbol } = CryptoState();

    const fetchCoin = async () => {
        const { data } = await axios.get(SingleCoin(id));
        setCoin(data)
    }

    useEffect(() => {
      fetchCoin()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const classes = useStyles();    

    if (!coin) return <LinearProgress />

    return (
        <div className={classes.container}>
            <div className={classes.sidebar}>
                <img
                    src={coin?.image.large}
                    alt={coin?.name}
                    height='200'
                    style={{marginBottom: 20}}
                />
                <Typography
                    variant='h3'
                    className={classes.heading}
                    style={{fontFamily: 'Poppins'}}
                >
                    {coin?.name}
                </Typography>
                <Typography
                    variant='subtitle1'
                    className={classes.description}
                    style={{fontFamily: 'Poppins'}}
                >
                    {ReactHtmlParser(coin?.description.en.split('. ')[0])}.
                </Typography>

                <div className={classes.marketData}>
                    <span style={{display: 'flex'}}>
                        <Typography variant='h5' style={{fontFamily: 'Poppins'}}>
                            Rank:
                            &nbsp;
                            {coin?.market_cap_rank}
                        </Typography>
                    </span>

                    <span style={{display: 'flex'}}>
                        <Typography variant='h5' style={{fontFamily: 'Poppins'}}>
                            Current Price:
                            &nbsp;
                            {symbol}{' '}
                            {numWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
                        </Typography>
                    </span>

                    <span style={{display: 'flex'}}>
                        <Typography variant='h5' style={{fontFamily: 'Poppins'}}>
                            Market Cap:
                            &nbsp;
                            {symbol}{' '}
                            {numWithCommas(coin?.market_data.market_cap[currency.toLowerCase()]
                                .toString()
                                .slice(0, -6))}
                            M
                        </Typography>
                    </span>
                </div>
            </div>

            <CoinInfo coin={coin}/>
        </div>
    )
}

export default Currency