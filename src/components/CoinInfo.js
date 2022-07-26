
import { CircularProgress, createTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext';
import SelectButton from './SelectButton';
import { HistoricalChart } from '../api';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import axios from 'axios';

const chartDays = [
    {
      label: "1 Year",
      value: 365,
    },
    {
      label: "3 Months",
      value: 90,
    },
    {
        label: '30 Days',
        value: 30,
    },
    {
      label: "24 Hours",
      value: 1,
    },
];

const useStyles = makeStyles((theme) => ({
    container: { 
        width: '75%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        padding: 40,
        [theme.breakpoints.down('md')]: {
            width: '100%',
            marginTop: 0,
            padding: 20,
            paddingTop: 0,
        },
    },
}))

function CoinInfo({coin}) {

    const [historicalData, setHistoricalData] = useState([]);
    const [days, setDays] = useState(1);

    const { currency } = CryptoState();

    const fetchHistoricalData = async () => {
        const { data } = await axios.get(HistoricalChart(coin.id, days, currency))
        setHistoricalData(data.prices);
    }

    useEffect(() => {
        fetchHistoricalData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency, days])
    
    const classes = useStyles();
    
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
            <div className={classes.container}>
            {/* If no historical data, then show a circular progress */}
            { !historicalData ? (
                    <CircularProgress 
                        style={{color: '#00E2EC'}}
                        size={250}
                        thickness={1}
                        />
                    ) : (
                        <>
                        {/* Else show the line graph */}
                        <Line
                            data={{
                                labels: historicalData.map((coin) => {
                                    let date = new Date(coin[0]);
                                    let time = `${date.getHours()}:${date.getMinutes()}`
                                     return days === 1 ? time : date.toLocaleDateString();
                                 }),
                                 datasets: [
                                     {
                                        data: historicalData.map((coin) => coin[1]),
                                        label: `Price ( Past ${days} Days ) in ${currency}`,
                                        borderColor: '#00E2EC',
                                        borderWidth: 3,
                                     }
                                 ]
                            }}
                            options={{
                                elements: {
                                    point: {
                                        radius: 0,
                                    }
                                },
                                interaction: {
                                intersect: false,
                                },
                            }}
                        />
                        <div
                            style={{
                                display: 'flex',
                                marginTop: 20,
                                justifyContent: 'space-around',
                                width: '100%',
                                fontFamily: 'Poppins',
                            }}
                        >
                            {/* Days buttons */}
                            {chartDays.map((day) => (
                                <SelectButton
                                    key={day.value}
                                    onClick={() => setDays(day.value)}
                                    selected={day.value === days}
                                >
                                    {day.label}
                                </SelectButton>
                            ))}
                        </div>
                        </>
                    )
                } 

            </div>
        </ThemeProvider>
    )
}

export default CoinInfo