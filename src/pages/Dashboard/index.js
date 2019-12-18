import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import ScrollArea from 'react-scrollbar'


import firebase from '../../Firebase';
import './styles.css'
import Cadastro from '../../components/Cadastro'
import Comprar from '../../components/Comprar'
import Lista from '../../components/Lista'


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box className="Box">{children}</Box>}
    </Typography>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
}));

export default function Dashboard({history}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  // caso o usuário entre sem se autenticar, ele é mandado de volta para 
  // a tela de Login
  const componentDidMount = () => {
    if(firebase.auth().currentUser === null) history.push("/")
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (    
    <div id="main">
    {componentDidMount()}

      <div className={classes.root}>
        <AppBar position="static">

          <Tabs value={value} onChange={handleChange}>
            
            <Tab label="Cadastrar Produto" {...a11yProps(0)} />
            <Tab label="Comprar Produtos" {...a11yProps(1)} />
            {/* <Tab label="Histórico de Compras" {...a11yProps(2)} /> */}
            <Tab className="sair" label="Sair" onClick={() => {
                    firebase.auth().signOut()
                    history.push("/")
              }}/>
          </Tabs>
              
        {/* faz a navegação entre os components através de abas */}
        </AppBar>
        <TabPanel value={value} index={0}>
          <Cadastro />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Comprar/>
        </TabPanel>
        {/* Preferi retirar o histórico de compras de uma aba separada, 
            pois ficou muito espaço vazio na aba de compras */}
        {/* <TabPanel value={value} index={2}>
          Histórico de Compras
          <Lista />
        </TabPanel> */}
      </div>
    </div>
  );
}