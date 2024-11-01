"use client"

import { login } from "@/app/(auth)/login/actions"
import LoadingButton from "@/components/LoadingButton"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginSchema, LoginValues } from "@/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"

export default function LoginForm() {

    const [error, setError] = useState("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<LoginValues>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "atick@gmail.com", //
            password: "atick123"
        }
    })

    const onsubmit = (values: LoginValues) => {
        setError("")
        startTransition(async () => {
            const data = await login(values)
            setError(data?.error as string)
        })
    }

    return (
        <div className=" h-screen w-full flex flex-col justify-center items-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onsubmit)} className=" space-y-6">
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
                    <Link href={'/sign-up'} className="hover:underline text-sm pr-6">Sign Up</Link>
                    <LoadingButton isPending={isPending} disabled={isPending} type="submit" >Login</LoadingButton>
                    <br /> <br />
                    {error && <p className=" text-destructive text-sm">{error}</p>}

                </form>
            </Form>
            <br /> <br />
            <Button onClick={async () => await signIn('google', { callbackUrl: "/" })}>Login with google</Button>
        </div>
    )
} 