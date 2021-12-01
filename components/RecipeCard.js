import React, { useState } from "react";
import styles from "../styles/RecipeCard.module.css";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function RecipeCard({ recipe }) {
  const [expanded, setExpanded] = React.useState(false);
  const [spacing, setSpacing] = React.useState();
  console.log("recipes", recipe);
  const { title, cookingTime, thumbnail, slug } = recipe.fields;

  return (
    <>
      <Grid item xs={4}>
        <Grid container justifyContent="center" >
          <Grid item xs={12}>
            <Card sx={{ maxWidth: 500 }} key={"cbc"}>
              <CardHeader disableTypography="true" title={title} />
              {/* <CardMedia
                  component="img"
                  height="194"
                  image={thumbnail}
                  alt="{recipe.fields.title}"
                /> */}
              <Image
                src={"https:" + thumbnail.fields.file.url}
                height={400}
                width={400}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Takes approax {cookingTime} mins to make
                </Typography>
              </CardContent>
              <Link href={"/recipes/" + slug}>
                <a className={styles.btn}>See Recipe </a>
              </Link>{" "}
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default RecipeCard;
