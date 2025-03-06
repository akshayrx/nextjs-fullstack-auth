"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage(){

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    // const verifyUserEmail = async () => {
    //     try {
    //         console.log("api call made");
    //         await axios.post("/api/users/verifyemail", { token })
    //         setVerified(true);
    //     } catch (error: any) {
    //         setError(true);
    //         console.log(error.response.data);
            
    //     }
    // }
    const verifyUserEmail = async () => {
        try {
          console.log("Token being sent:", token); // Debug: Check token value
          if (!token) {
            throw new Error("Token is empty"); // Early exit if token is missing
          }
    
          const res = await axios.post("/api/users/verifyemail", { token }, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log("API response:", res.data); // Debug: Check response
          setVerified(true);
        } catch (error: unknown) {
          setError(true);
          if (axios.isAxiosError(error)) {
            console.log("Error details:", error.response?.data || error.message);
          } else {
            console.log("Error details:", (error as Error).message);
          }
        }
      };

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken);
    }, [])

    useEffect(() => {
      if(token.length > 0) {
        verifyUserEmail();
      }
    }, [token])
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-400 text-black ">{token ? `${token}` : "no token"}</h2>

            {verified && (
                <div>
                    <h2>Email Verified</h2>
                    <Link href="/login" className="text-blue-500">Login</Link>
                </div>
            )}
            {error && (
                <div>
                    <h2>Error is here</h2>
                </div>
            )}
        </div>
    )
}