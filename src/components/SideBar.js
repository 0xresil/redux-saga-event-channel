import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useMediaQuery, Grid, MenuItem } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

import CountryDetail from "components/CountryDetail";

const useStyles = makeStyles((theme) => ({
  drawerStyle: {
    backgroundColor: '#222',
    color: '#ddd'
  },
}));
export default function SideBar() {
  const classes = useStyles();

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      //setCountries(response.data);
      console.log("countries=", response.data);
      
      const countries = [];
      alphabets().forEach((text, index) => {
        countries[index] = [];
        response.data.forEach((data) => {
          if (data.name.at(0) == text.at(0)) countries[index].push(data);
        })
      })
      console.log(countries.length);
      setCountries(countries);
    });
  }, []);
  
  const [countries, setCountries] = useState([]);
  const [countriesInAlphabet, setCountriesInAlphabet] = useState(-1);
  const [countryDetail, setCountryDetail] = useState(null);
  const [detailShow, setDetailShow] = useState(false);

  const toggleDetailShow = () => {
    setDetailShow(!detailShow);
  }

  const handleItemClick = (event, index, id) => {
    console.log(countries[index][id]);
    //setMenuPosition(null);
    setCountryDetail(countries[index][id]);
    setDetailShow(true);
  };

  const handleAlphabetClick = (e, index) => {
    setCountriesInAlphabet(index);
  }

  const alphabets = () => {
    let result = [];
    let chAlpha = 65;
    while (chAlpha <= 'Z'.charCodeAt(0)) { result.push(String.fromCharCode(chAlpha ++)); }
    return result;
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
            >
              <List  className = {classes.drawerStyle}>
                {alphabets().map((text, index) => (
                  <ListItem button key={text} onClick={e => handleAlphabetClick(e, index)} value={text} 
                  >
                    <ListItemText primary={text}/>
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
        </div>
      }
      {
          detailShow && 
            <CountryDetail detail = {countryDetail} toggle={toggleDetailShow}/>
      }

    </div>
  );
}
