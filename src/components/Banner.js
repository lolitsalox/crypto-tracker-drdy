import { Container, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

const useStyles = makeStyles((theme) => ({
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
        [theme.breakpoints.down("xs")]: {
            height: 450,
            flexDirection: 'column',
        },
    },
    logo: {
        maxHeight: 250,
    }
}))

function Banner() {

  const classes = useStyles();

  const [isMobile, setIsMobile] = useState(false)
 
  const handleResize = () => {
    if (window.innerWidth < 720) {
        setIsMobile(true)
        return
    }
    
    setIsMobile(false)
  }
  
  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })

  return (
    <div className={classes.banner}>
        <Container className={classes.bannerContent}>
            <div>
            <Typography
                    variant={isMobile ? 'h3' : 'h2'}
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