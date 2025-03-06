"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";


export default function SignupPage() {

    const router = useRouter();

    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    })
    const [buttonDisabled, setbuttonDisabled] = React.useState(false);
    const [loading, setLoading] = useState(false)

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");
            
        } catch (error:unknown) {
            if (axios.isAxiosError(error)) {
                console.log("Signup failed", error.message);
                toast.error(error.message);
            } else {
                console.log("Signup failed", error);
                toast.error("An unexpected error occurred");
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(user.username.length > 0 && user.email.length > 0 && user.password.length > 0){
            setbuttonDisabled(false);
        } else {
            setbuttonDisabled(true);
        }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-4">
            <h1 className="text-xl">{loading ? "Processing" : "Signup"}</h1>
            <hr />
            <div className="flex flex-col justify-center items-start gap-2">
                <label htmlFor="username">Username</label>
                <input
                    className="p-1 border rounded bg-zinc-500 dark:bg-zinc-300 text-zinc-900 focus:outline-none"
                    id="username"
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="Username" />
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
                onClick={onSignup}
                className="p-1 border rounded bg-orange-600 dark:bg-orange-500 text-zinc-900 focus:outline-none">
                    {buttonDisabled ? "No signup" : "Signup now"}
                </button>
                <Link href="/login">
                     Already a user, visit Login Page
                </Link>
            </div>
        </div>
    )
}