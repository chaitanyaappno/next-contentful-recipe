import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { Grid } from "@mui/material";
import { createClient } from "contentful";

import RecipeCard from "../components/RecipeCard";

export const getStaticProps = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });
  const res = await client.getEntries({ content_type: "blogPost" });

  return {
    props: {
      recipes: res.items,
      revalidate: 1,
    },
  };
};

export default function Home({ recipes }) {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="keywords" content="ninjas" />
      </Head>
      <div>
        <h1 className={styles.title}> Indian Recipe </h1>
        <Grid sx={{ flexGrow: 1 }} container spacing={4}>
          {" "}
          {recipes?.map((recipe) => (
            <RecipeCard recipe={recipe} key={recipe.sys.id} />
          ))}
        </Grid>

        {/* 
        <p className={styles.text}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
        <Link href="/ninjas">
          <a className={styles.btn}>See Users </a>
        </Link> */}
      </div>
    </>
  );
}
