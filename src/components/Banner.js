import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
    banner: {
        backgroundColor: '#00adb5',
    },
    bannerContent: {
        color: '#eeeeee',
        height: 400,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    logo: {
        maxHeight: 250,
    }
})

function Banner() {

  const classes = useStyles();

  return (
    <div className={classes.banner}>
        <Container className={classes.bannerContent}>
            <div>
            <Typography
                    variant='h2'
                    style={{
                        fontWeight: 'bold',
                        
        fontFamily: 'Poppins',
                    }}
                >
                Crypto Tracker
                </Typography>   

            <Typography
                    variant='subtitle1'
                    style={{
                        
        fontFamily: 'Poppins',
                        textTransform: 'capitalize'
                    }}
                >
                Track your favorite currencies today! 
            </Typography>
            </div>
            <img className={classes.logo} src='./btc-svg.svg' alt='BTC logo'/>
        </Container>
    </div>
  )
}

export default Banner