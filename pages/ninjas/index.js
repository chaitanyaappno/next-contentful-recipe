import React from "react";
import Head from "next/head";
import Styles from "../../styles/ninjas.module.css";
import  Link from "next/link"

export const getStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");

  const data = await res.json();

  return {
    props: {
      ninjas: data,
    },
  };
};

function Ninjas({ ninjas }) {
  console.log("props", ninjas);

  return (
    <>
      <Head>
        <title>Ninja page</title>
        <meta name="keywords" content="ninjas" />
      </Head>
      <div>
        <h1>All Users</h1>
        {ninjas.map((ninja) => (
          <Link href={"/ninjas/" + ninja?.id} key={ninja?.id}>
            <a className={Styles.single}>
              <h3>{ninja.name}</h3>
            </a>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Ninjas;
