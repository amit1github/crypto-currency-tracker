import { Container, Typography } from "@mui/material";
import React from "react";
import styles from "./Banner.module.css";
import Carousel from "./Carousel";

const Banner = () => {
  return (
    <div className={styles.banner}>
      <Container className={styles.bannerContent}>
        <div className={styles.tagline}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              marginBottom: "15px",
              fontFamily: "Montserrat",
            }}
          >
            Crypto Currency
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all the info regarding your favorite Crypto Currency
          </Typography>
        </div>
        <Carousel/>
      </Container>
    </div>
  );
};

export default Banner;
