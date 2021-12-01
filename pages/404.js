import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function NotFound() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }, []);
  return (
    <div className="not-found">
      <h1>Ooopppss...</h1>
      <h2>Page Not Found</h2>
      <p>
        Go back to the<Link href="/"> Homepage</Link>{" "}
      </p>
    </div>
  );
}

export default NotFound;
