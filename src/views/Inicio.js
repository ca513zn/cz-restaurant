import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Box, makeStyles, Typography } from "@material-ui/core";
import Page from "../components/Page";

const useStyles = makeStyles((theme) => ({
  carousel: {
    "&>div": {
      height: 460,
      [theme.breakpoints.down("sm")]: {
        height: "100%",
      },
    },
  },
  imageContainer: {
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      height: 460,
      backgroundSize: "cover",
      "&>img": {
        objectFit: "cover",
        height: "100%",
      },
    },
  },
  lessons: {
    padding: "20px",
    textAlign: "initial",
  },
}));

const DemoCarousel = () => {
  const classes = useStyles();

  return (
    <Page>
      <Carousel
        className={classes.carousel}
        showThumbs={false}
        infiniteLoop={true}
        showStatus={false}
        autoPlay={true}
      >
        <div className={classes.imageContainer}>
          <img
            src="https://www.codigounico.com/wp-content/uploads/sites/2/2019/04/los-mejores-vinos-para-carne-cual-es-el-adecuado-2.jpg"
            alt="cover_3"
          />
        </div>
        <div className={classes.imageContainer}>
          <img
            src="https://www.codigounico.com/wp-content/uploads/sites/2/2019/04/los-mejores-vinos-para-carne-cual-es-el-adecuado-10.jpg"
            alt="cover_2"
          />
        </div>
        <div className={classes.imageContainer}>
          <img
            src="https://revistaelconocedor.com/wp-content/uploads/2017/01/shutterstock_405494680-1024x683.jpg"
            alt="cover_3"
          />
        </div>
        <div className={classes.imageContainer}>
          <img
            src="https://asadacho.com/wp-content/uploads/2014/05/vino-carne.jpg"
            alt="cover_3"
          />
        </div>
      </Carousel>
      <Box mt={3}>
        <Typography variant="h4" align="center" color="textPrimary">
          Bienvenidos a Nuestro Excelente Restaurante!
        </Typography>
      </Box>
    </Page>
  );
};

export default DemoCarousel;
