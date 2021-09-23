import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useMediaQuery, Typography, Input } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

import CountryDetail from "components/CountryDetail";
import { SearchContext } from 'contexts/SearchContext';
const useStyles = makeStyles((theme) => ({
  drawerStyle: {
    backgroundColor: '#222',
    color: '#ddd',
  },
}));
const SideBar = ({ countries }) => {
  const classes = useStyles();
  
  const searchTerm = useContext(SearchContext);
  const [countriesInAlphabet, setCountriesInAlphabet] = useState(-1);
  const [countryDetail, setCountryDetail] = useState(null);
  const [detailShow, setDetailShow] = useState(false);

  const toggleDetailShow = () => {
    setDetailShow(!detailShow);
  }

  const handleItemClick = (event, index, id) => {
    setCountryDetail(countries[index][id]);
    setDetailShow(true);
  };

  const handleSearchTerm = (e) => {
    searchTerm[1](e.target.value);
  }

  const handleAlphabetClick = (e, index) => {
    setCountriesInAlphabet(index);
  }

  const alphabet = (index) => {
    return String.fromCharCode('A'.charCodeAt(0) + index);
  }
  return (
    <div>
      {
        !detailShow && 
        <div>
          <Drawer
            anchor = "left"
            open = {true}
            variant="permanent"
            style={{width: '100px'}}
            >
              <List  className = {classes.drawerStyle}>
                {countries.map((data, index) => (
                  <ListItem button key={index} onClick={e => handleAlphabetClick(e, index)}
                  >
                    <ListItemText primary={alphabet(index)}/>
                  </ListItem>
                ))}
              </List>
          </Drawer>
          <List style={{marginLeft: '100px', cursor: 'pointer'}}>
            {
              countriesInAlphabet >=0 && countries[countriesInAlphabet].map((data, id) => (
                <ListItem key={id}>
                  <ListItemText primary={data.name} onClick={e => handleItemClick(e, countriesInAlphabet, id)}/>
                </ListItem>
              ))
            }
          </List>
          <Input name="searchTerm" onChange={e=> handleSearchTerm(e)}></Input>
          <Typography variant="h6" align="center">{`Loading... ${searchTerm[0]}`}</Typography>
        </div>
      }
      {
          detailShow && 
            <CountryDetail detail = {countryDetail} toggle={toggleDetailShow}/>
      }

    </div>
  );
}
const mapStateToProps = (state) => (
  { countries: state.countries }
)
export default connect(mapStateToProps)(SideBar);