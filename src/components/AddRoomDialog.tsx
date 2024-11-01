"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { HotelWithRooms } from "@/types/type";
import { AddRoomSchema, AddRoomValues } from "@/validation/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Room } from "@prisma/client";
import { useState } from "react";
import { Form, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

interface props {
    hotel: HotelWithRooms,
    room: Room | null
}

export default function AddRoomDialog({ hotel, room }: props) {

    const [open, setOpen] = useState(false);


    const form = useForm<AddRoomValues>({
        resolver: zodResolver(AddRoomSchema),
        defaultValues: room || {
            title: "",
            description: "",
            bedCount: 0,
            questCount: 0,
            bathRoomCount: 0,
            kingBed: 0,
            queenBed: 0,
            image: "",
            breakFastPrice: 0,
            roomPrice: 0,
            roomService: false,
            TV: false,
            balcony: false,
            freeWifi: false,
            cityView: false,
            oceanView: false,
            forestView: false,
            mountainView: false,
            airCondition: false,
            soundProofed: false
        }
    })


    const onsubmit = (values: AddRoomValues) => {
        console.log(values, hotel)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"default"} className=" w-full">
                    Add Room
                </Button>
            </DialogTrigger>
            <DialogContent className=" w-[95%] max-w-[900px] h-[90vh] overflow-y-scroll ">
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onsubmit)}>
                            <FormField
                                control={form.control}
                                name={"title"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Provide a Room Name</FormLabel>
                                        <Input {...field} placeholder={'enter title'} />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
