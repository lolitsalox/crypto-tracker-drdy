import './App.css';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';

import Header from './components/Header';
import Home from './pages/Home.js';
import Currency from './pages/Currency';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#222831',
    color: '#eeeeee',
    scrollBehavior: 'smooth',
    minHeight: '100vh',
  },
});

function App() {
  
  const classes = useStyles();
  
  return (
    <Router>
      <div className={classes.root}>

        <Header/>

        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/currency/:id' element={<Currency />}  />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
