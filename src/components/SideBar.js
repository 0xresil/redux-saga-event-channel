import React, { useState, useEffect } from 'react';

import NestedMenuItem from "material-ui-nested-menu-item";
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useMediaQuery, Grid, MenuItem } from '@material-ui/core';
import axios from "axios";

import CountryDetail from "components/CountryDetail";

export default function SideBar() {
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

  const alphabets = () => {
    let result = [];
    let chAlpha = 65;
    while (chAlpha <= 'Z'.charCodeAt(0)) { result.push(String.fromCharCode(chAlpha ++)); }
    return result;
  }
  return (
    <div>
      {
        !detailShow && <Grid
          container
          justify="space-between"
          spacing={2}
          direction={'row'}
        >
          <Grid
            item
            container
            alignItems="center"
            xs={12}
            md={3}
            data-aos={'fade-up'}
          >
            <List>
              {alphabets().map((text, index) => (
                <ListItem button key={text}>
                  <NestedMenuItem
                    label={text}
                    name = "mainButton"
                    parentMenuOpen={true}
                    rightIcon={null}
                  >
                  {
                    countries.length > 0 && countries[index].map((data, id) => (
                      <MenuItem onClick={e => handleItemClick(e, index, id)}>{data.name}</MenuItem>
                    ))
                  }
                  </NestedMenuItem>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      }
      {
          detailShow && 
            <CountryDetail detail = {countryDetail} toggle={toggleDetailShow}/>
      }

    </div>
  );
}
