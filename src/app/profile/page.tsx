"use client"
import React, { useEffect, useState } from "react";
import axios from "axios"
import Link from "next/link"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

export default function ProfilePage() {

    const router = useRouter();
    const [data, setData] = useState("Nothing");
    const logout = async () => {
        try {
            //get a logic of logout from our api
            await axios.get("/api/users/logout");
            toast.success("logout successful");
            router.push("/login");

        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);

        }
    }

    const getUserDetails = async () => {
                const res = await axios.get("/api/users/me")
                console.log(res.data);
                //as res data object is availabl to us, we can fetch any field value username, email etc
                //setData(res.data.data.username);
                setData(res.data.data.email);
    }
    
    useEffect(() => {
        getUserDetails(); // Call the function when the page loads
    }, []); // Empty array ensures it runs only once on mount

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-4">
            <h1 className="text-xl">Profile Page</h1>
            <hr />
            <div className="flex flex-col justify-center items-start gap-2">
                <p className="text-4xl">user profile email is: 
                    <span className="p-1 rounded bg-blue-300 text-black">
                        {data === "Nothing" ? "Loading.." : <Link href={`/profile/${data}`}>{data}</Link>}
                    </span>
                </p>
            </div>
            <hr />
            <button
                onClick={logout}
                className="p-2 bg-amber-200 dark:bg-amber-400 text-black mt-4 rounded">
                Log out
            </button>
            {/* 
            //earlier function getUserDetails was run only by this button click, made it auto on page load with useEffect
            <button
                onClick={getUserDetails}
                className="p-2 bg-pink-400 dark:bg-pink-400 text-black mt-4 rounded">
                Get user detail
            </button> */}
        </div>
    )
}