"use client"; // 클라이언트 측에서 동작하도록 명시

import { useEffect, useState } from "react";

function HomePage() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:9999/main`);
        const data = await res.json();
        console.log(data);
        setResult(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return <div>page</div>;
}

export default HomePage;
