import React from "react";
import Link from "next/link";
import Image from "next/image"
import {useRouter} from "next/router"

function Navbar() {
  const router = useRouter()
  return (
    <nav>
      <div className="logo" onClick={()=>router.push("/")}>
      <Image src = "/images.jpeg" width ={50} height={50}/>
      </div>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
      <Link href="/ninjas">
        <a>Users</a>
      </Link>
    </nav>
  );
}

export default Navbar;
