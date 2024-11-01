"use client"

import LoadingButton from "@/components/LoadingButton"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignUpSchema, SignUpValues } from "@/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { signUp } from "./actions"

export default function SignUpForm() {

    const [error, setError] = useState("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<SignUpValues>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            name: "atick",
            email: "atick@gmail.com",
            password: "atick123"
        }
    })

    const onsubmit = (values: SignUpValues) => {
        setError("")
        startTransition(async () => {
            const data = await signUp(values)
            setError(data?.error as string)
        })
    }

    return (
        <div className=" h-screen w-full flex justify-center items-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onsubmit)} className=" space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter your Name" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter your email" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter your email" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Link href={'/login'} className="hover:underline text-sm pr-6">Login</Link>
                    <LoadingButton isPending={isPending} disabled={isPending} type="submit" >Sign Up</LoadingButton>
                    {error && <p className=" text-destructive text-sm">{error}</p>}
                </form>
            </Form>
        </div>
    )
} 