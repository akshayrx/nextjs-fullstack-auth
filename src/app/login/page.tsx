"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
//import { axios } from "axios";


export default function LoginPage() {

    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })

    const onLogin = async () => {

    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-4">
            <h1 className="text-xl">Login Page</h1>
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
                    Login now
                </button>
                <Link href="/signup">
                     New user, visit Signup Page
                </Link>
            </div>
        </div>
    )
}