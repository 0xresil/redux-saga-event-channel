import {
  Card,
  CardMedia,
  CardContent,
  Table,
  Typography,
  Button,
  Grid
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import format from "format-number";

const useStyles = makeStyles((theme) => ({
  backButton: {
    margin: "20px !important",
  },
  flagImage: {
    width: "200px",
    height: "100px",
  },
  gridContainer: {
    padding: '20px'
  },
  cardContainer: {
    backgroundColor: "#ddd !important",
    padding: '30px'
  }
}));
export default function CountryDetail({ detail, toggle }) {
  const classes = useStyles();
  return (
    <>  
    <Button
        className={classes.backButton}
        color="primary"
        variant="outlined"
        onClick={() => toggle()}
    >
        {"<< Back"}
    </Button>
    <Grid
        container
        direction={'row'}
        className={classes.gridContainer}
        justifyContent={"center"}
    >
        <Grid md={6}>
            <Card className={classes.cardContainer}>
                <CardContent>
                <Typography variant="h3">
                    {detail.name}
                </Typography>
                <Table>
                    <tr>
                    <td>Capital</td>
                    <td>{detail.capital}</td>
                    </tr>
                    <tr>
                    <td>Population</td>
                    <td>{format()(detail.population)}</td>
                    </tr>
                    <tr>
                    <td>alpha2Code</td>
                    <td>{detail.alpha2Code}</td>
                    </tr>
                </Table>
                </CardContent>
                <Grid container justifyContent={"center"}>
                    <Grid item md={6}>        
                        <CardMedia
                            component="img"
                            image={detail.flag}
                            />
                    </Grid>
                </Grid>
            </Card>
        </Grid>
      
    </Grid>
    </>
  );
}
