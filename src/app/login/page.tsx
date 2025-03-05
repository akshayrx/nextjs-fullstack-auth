"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";


export default function LoginPage() {
    const router = useRouter();

    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })
    const [buttonDisabled, setbuttonDisabled] = React.useState(false);
    const [loading, setLoading] = useState(false)

    const onLogin = async () => {
        try {
            //show user that something is processing
            setLoading(true);
            //make api call and send this data to process
            //sending a request to our logic saved in api folder, and sending user object with it
            const response = await axios.post("api/users/login", user)
            console.log("login success", response.data);
            //send notification to user (toast not configure yet, do later or use shadcn toast - this is homework)
            toast.success("login success");
            //once login, redirect user to a specific page
            router.push("/profile");

        } catch (error: any) {
            console.log("login failed", error.message);
            //toast is like notification sent on ui, but not configured yet here written only for future reference
            toast.error(error.message);
            
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        //checking if user has entered anything in input fields, and modyfing submit button state based on that
        if(user.email.length > 0 && user.password.length > 0){
            setbuttonDisabled(false);
        } else {
            setbuttonDisabled(true);
        }
    }, [user])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-4">
            <h1 className="text-xl">{loading ? "Processing" : "Login"}</h1>
            <hr />
            <div className="flex flex-col justify-center items-start gap-2">
                <label htmlFor="email">Email</label>
                <input
                    className="p-1 border rounded bg-zinc-500 dark:bg-zinc-300 text-zinc-900 focus:outline-none"
                    id="email" 
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Email" />
                <label htmlFor="password">Password</label>
                <input
                    className="p-1 border rounded bg-zinc-500 dark:bg-zinc-300 text-zinc-900 focus:outline-none"
                    id="password" 
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Password" />
                <button
                onClick={onLogin}
                className="p-1 border rounded bg-orange-600 dark:bg-orange-500 text-zinc-900 focus:outline-none">
                    {buttonDisabled ? "Kuch to enter kro" : "Login kro"}
                </button>
                <Link href="/signup">
                     New user, visit Signup Page
                </Link>
            </div>
        </div>
    )
}