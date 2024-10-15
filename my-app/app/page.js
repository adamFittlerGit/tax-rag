'use client';
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { TypeAnimation } from 'react-type-animation';

export default function Home() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("Here is some example text to demonstrate what the response being generated could potentially look like longer and loneger, Here is some example text to demonstrate what the response being generated could potentially look like longer and loneger");

  // Function to submit the query to the Supabase Edge Function
  async function submitQuery() {
    if (!query) return;

    try {
      // Replace 'your-supabase-function-url' with your actual Supabase Edge Function URL
      const res = await fetch("https://your-supabase-url/functions/v1/your-supabase-function", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }), // Send query as the body
      });

      const data = await res.json();
      setResponse(data); // Assuming the response contains the embedded documents or results
    } catch (error) {
      console.error("Error fetching data from Supabase Edge Function:", error);
    }
  }

  // Handle "Enter" key press to trigger the submitQuery function
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        submitQuery();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [query]); // Include query dependency to use the latest query when enter is pressed

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-2  font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center w-2/3">
        {response && (
            <div className="flex items-start">
              <Image
                src="/happyhg.png" // path to the image in the public folder
                alt="Happy face logo"
                width={25} // Adjust the width
                height={25} // Adjust the height
                className=""
              />
              <p>:&nbsp;&nbsp;</p> 
              <TypeAnimation
                sequence={[
                  response, 
                ]}
                cursor={true}
                repeat={1}
                className=""
              />
            </div>
          )}
        {!response && (
          <div className="flex items-center justify-items">
            <Image
              src="/happyhg.png" // path to the image in the public folder
              alt="Happy face logo"
              width={50} // Adjust the width
              height={50} // Adjust the height
              className=""
            />
            <TypeAnimation
                sequence={[
                  "What can I help with today?", 
                ]}
                cursor={true}
                repeat={1}
                className="text-2xl font-bold p-2 m-2 "
              />
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Prevent form submission refresh
            submitQuery();
          }}
          className="w-full"
        >
          <div className="grid grid-cols-8">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)} // Update query as user types
              placeholder="What would you like to know?"
              className="col-span-7 bg-gray-200 rounded-lg p-3"
            />
            <button type="submit" className="bg-blue-500 ml-2 p-2 text-white h-full rounded-lg col-span-1">
              Ask
            </button>
          </div>
        </form>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
