import React from "react";
import { createClient } from "contentful";
import Image from "next/image";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Styles from "../../styles/RecipeDetailPage.module.css"

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({ content_type: "blogPost" });
  const paths = await res.items.map((item) => {
    return {
      params: {
        slug: item.fields.slug,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const slug = context.params.slug;
  const res = await client.getEntries({
    content_type: "blogPost",
    "fields.slug": slug,
  });

  return {
    props: {
      recipe: res.items,
    },
  };
};

const ingredientList = (ingredientsArray, colValue) => {
  return ingredientsArray.slice().map((renderData, i) =>
    i % 2 == colValue ? (
      <List>
        <ListItem alignItems="flex-start">
          <ListItemAvatar></ListItemAvatar>
          <Typography
            sx={{ display: "inline" }}
            component="span"
            variant="h5"
            color="#777"
          >
            {renderData}
          </Typography>
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
    ) : (
      <></>
    )
  );
};

function RecipeDetail({ recipe }) {
  console.log("recccc", recipe);
  return (
    <div>
      {recipe.map((rec) => (
        <div key={rec.sys.id}>
          <h1 className={`${Styles.title} ${Styles.bannerTitle}`} >{rec.fields.title}</h1>
          <Image
            src={`http:${rec.fields.featuredImage.fields.file.url}`}
            width={1000}
            height={350}
          />
          <div className="Ingredients-container">
            <h1 className={Styles.title}>Ingredients</h1>
            <Grid direction="row" container spacing={1}>
              <Grid container item sm={6}>
                {ingredientList(rec.fields.ingredients, 0)}
              </Grid>
              <Grid container item sm={6}>
                {ingredientList(rec.fields.ingredients, 1)}
              </Grid>
            </Grid>
          </div>

          <div>
          <h1 className={Styles.title}>Method:</h1>
            {documentToReactComponents(rec.fields.method)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecipeDetail;
