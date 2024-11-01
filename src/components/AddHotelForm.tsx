"use client"

import Loading from "@/app/loading"
import closeImage from '@/assets/close.png'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import useLocation from "@/hooks/useLocation"
import { UploadButton } from "@/utils/uploadthing"
import { AddHotelSchema, AddHotelValues } from "@/validation/zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Hotel } from "@prisma/client"
import { ICity, IState } from "country-state-city"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import AddRoomDialog from "./AddRoomDialog"
import LoadingButton from "./LoadingButton"
import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"

interface props {
  hotel: Hotel | undefined
}

export default function AddHotelForm({ hotel }: props) {

  console.log({ hotel })

  const form = useForm<AddHotelValues>({
    resolver: zodResolver(AddHotelSchema),
    defaultValues: hotel || {
      title: "",
      description: "",
      image: "",
      country: "",
      state: "",
      city: "",
      locationDescription: "",
      gym: false,
      spa: false,
      bar: false,
      laundry: false,
      restaurant: false,
      shopping: false,
      freeParking: false,
      bikeRental: false,
      freeWifi: false,
      movieNights: false,
      swimmingPool: false,
      coffeeShop: false,
    }
  })

  const [image, setImage] = useState<string | undefined>(hotel?.image);
  const [isImageDeleting, setIsImageDeleting] = useState(false);

  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [isDeletePending, setIsDeletePending] = useState(false);

  const { getAllCountries, getStateCities, getCountryStates } = useLocation()
  const countries = getAllCountries()
  const router = useRouter()

  const handleDelete = async (image: string) => {
    setIsImageDeleting(true)
    const imageKey = image.split('https://utfs.io/f/')[1]
    const res = await fetch(`/api/uploadthing/delete`, {
      method: "POST",
      body: JSON.stringify({ imageKey }),
    })

    if (res.ok) {
      setIsImageDeleting(false)
      setImage(undefined)
      toast.success("Image deleted successfully")
    }

  }


  const handleDeleteHotelHandler = async (hotelId: string) => {
    setIsDeletePending(true)
    const imageKey = image?.split('https://utfs.io/f/')[1]

    try {
      await fetch('/api/uploadthing/delete', {
        method: "POST",
        body: JSON.stringify({ imageKey }),
      })
      const res = await fetch(`/api/hotel/${hotelId}`, {
        method: "DELETE",
        body: JSON.stringify({ imageKey }),
      })

      if (res.ok) {
        toast.success("Hotel deleted successfully")
        router.push('/hotel/new')
      }

    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    } finally {
      setIsDeletePending(false)
    }
  }
  const onsubmit = async (values: AddHotelValues) => {
    setIsPending(true)
    try {

      if (hotel) {
        const res = await fetch(`/api/hotel/${hotel.id}`, {
          method: "PATCH",
          body: JSON.stringify(values)
        })

        if (res.ok) {
          const newHotel = await res.json()
          console.log({ newHotel })
          router.push(`/hotel/${newHotel.id}`)
          toast.success("Hotel updated successfully 🎉")
        }

      }

      if (!hotel) {
        const res = await fetch('/api/hotel', {
          method: "POST",
          body: JSON.stringify(values)
        })

        if (res.ok) {
          const hotel = await res.json()
          router.push(`/hotel/${hotel.id}`)
          toast.success("Hotel added successfully")
        }
      }

    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    } finally {
      setIsPending(false)
    }
  }


  useEffect(() => {
    if (typeof image === "string") {
      form.setValue("image", image, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true
      })
    }
  }, [image]);

  useEffect(() => {
    const selectedCountry = form.watch("country")
    const countryStates = getCountryStates(selectedCountry)

    if (countryStates) {
      setStates(countryStates)
    }

  }, [form.watch("country")]);

  useEffect(() => {
    const selectedCountry = form.watch("country")
    const selectedState = form.watch("state")
    const stateCities = getStateCities(selectedCountry, selectedState!)

    if (stateCities) {
      setCities(stateCities)
    }

  }, [form.watch("country"), form.watch("state")]);



  return (
    <div className=" container mx-auto py-10 w-full">
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onsubmit)} className="flex gap-8 items-start justify-center">

          {/* PART - 1 */}
          <div className=" w-full flex-1 space-y-6 p-2">
            {/* FOR INPUT AND TEXTAREA */}
            <div className="space-y-6  flex-1">
              <div>
                <FormLabel className=" text-lg">Add hotel</FormLabel>
                <FormDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. In, minus?</FormDescription>
              </div>

              {/* title FIELD */}
              <FormField
                control={form.control}
                name={"title"}
                render={({ field }) => (
                  <FormItem >
                    <FormLabel>Hotel Title</FormLabel>
                    <Input {...field} placeholder={'enter title'} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* description FIELD */}
              <FormField
                control={form.control}
                name={"description"}
                render={({ field }) => (
                  <FormItem >
                    <FormLabel>Hotel Description</FormLabel>
                    <Textarea {...field} placeholder={'enter description'} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* FOR CHECKBOX AND UPLOAD IMAGE*/}
            <div className=" w-full space-y-6">
              <div>
                <FormLabel >Choose Amenities</FormLabel>
                <FormDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. In, minus?</FormDescription>
              </div>
              <div className="grid grid-cols-2 gap-x-10">
                {/* title FIELD */}
                <FormField
                  control={form.control}
                  name={"gym"}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4 h-20 justify-start w-full" >
                      <Checkbox id="gym" checked={field.value} onCheckedChange={field.onChange} />
                      <FormLabel htmlFor="gym" className=" cursor-pointer h-full text-center flex justify-start items-center w-full" >Gym</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={"spa"}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4 h-20 justify-start w-full" >
                      <Checkbox id="spa" checked={field.value} onCheckedChange={field.onChange} />
                      <FormLabel htmlFor="spa" className=" cursor-pointer h-full text-center flex justify-start items-center w-full">Spa</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={"bar"}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4 h-20 justify-start w-full" >
                      <Checkbox id="bar" checked={field.value} onCheckedChange={field.onChange} />
                      <FormLabel htmlFor="bar" className=" cursor-pointer h-full text-center flex justify-start items-center w-full">Bar</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={"laundry"}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4 h-20 justify-start w-full" >
                      <Checkbox id="laundry" checked={field.value} onCheckedChange={field.onChange} />
                      <FormLabel htmlFor="laundry" className=" cursor-pointer h-full text-center flex justify-start items-center w-full">Laundry</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={"restaurant"}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4 h-20 justify-start w-full" >
                      <Checkbox id="restaurant" checked={field.value} onCheckedChange={field.onChange} />
                      <FormLabel htmlFor="restaurant" className=" cursor-pointer h-full text-center flex justify-start items-center w-full">Restaurant</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={"shopping"}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4 h-20 justify-start w-full" >
                      <Checkbox id="shopping" checked={field.value} onCheckedChange={field.onChange} />
                      <FormLabel htmlFor="shopping" className=" cursor-pointer h-full text-center flex justify-start items-center w-full">Shopping</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={"freeParking"}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4 h-20 justify-start w-full" >
                      <Checkbox id="freeParking" checked={field.value} onCheckedChange={field.onChange} />
                      <FormLabel htmlFor="freeParking" className=" cursor-pointer h-full text-center flex justify-start items-center w-full">Free Parking</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={"bikeRental"}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4 h-20 justify-start w-full" >
                      <Checkbox id="bikeRental" checked={field.value} onCheckedChange={field.onChange} />
                      <FormLabel htmlFor="bikeRental" className=" cursor-pointer h-full text-center flex justify-start items-center w-full">Bike Rental</FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={"freeWifi"}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4 h-20 justify-start w-full" >
                      <Checkbox id="freeWifi" checked={field.value} onCheckedChange={field.onChange} />
                      <FormLabel htmlFor="freeWifi" className=" cursor-pointer h-full text-center flex justify-start items-center w-full">Free Wifi</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={"movieNights"}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4 h-20 justify-start w-full" >
                      <Checkbox id="movieNights" checked={field.value} onCheckedChange={field.onChange} />
                      <FormLabel htmlFor="movieNights" className=" cursor-pointer h-full text-center flex justify-start items-center w-full">Movie Nights</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={"swimmingPool"}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4 h-20 justify-start w-full" >
                      <Checkbox id="swimmingPool" checked={field.value} onCheckedChange={field.onChange} />
                      <FormLabel htmlFor="swimmingPool" className=" cursor-pointer h-full text-center flex justify-start items-center w-full">Swimming Pool</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={"coffeeShop"}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4 h-20 justify-start w-full" >
                      <Checkbox id="coffeeShop" checked={field.value} onCheckedChange={field.onChange} />
                      <FormLabel htmlFor="coffeeShop" className=" cursor-pointer h-full text-center flex justify-start items-center w-full">Coffee Shop</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* PART - 2 */}

          <div className=" flex-1 w-full space-y-6">
            {/*  IMAGE UPLOAD WITH UPLOADTHINGS */}
            <div className=" space-y-2">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload An Image</FormLabel>
                    <FormDescription>Choose an image that will show-case your hotel nicely</FormDescription>
                    <FormControl>
                      {!image && <div className=" p-12 bg-primary-foreground rounded-xl hover:border-white border border-dashed ">
                        <UploadButton
                          {...field}
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            setImage(res[0].url)
                            toast.success("Upload Completed");
                          }}
                          onUploadError={(error: Error) => {
                            toast.error(`ERROR! ${error.message}`);
                          }}
                        />
                      </div>}

                    </FormControl>
                  </FormItem>
                )}
              />
              {image && <div className=" relative max-w-[300px] aspect-[16/10]">
                <Image src={image} alt="" fill sizes="200px" className=" object-cover rounded-xl" />
                <Button type='button' size={'icon'} variant={'secondary'} className=" text-white absolute top-2 right-2 rounded-full text-lg font-semibold backdrop-blur-lg bg-[#00000081]" onClick={() => handleDelete(image)}>
                  {isImageDeleting ?
                    <Loading /> : (
                      <Image alt="" src={closeImage} height={15} className=" invert" />
                    )}
                </Button>
              </div>}

            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* FOR COUNTRY */}
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Country *</FormLabel>
                    <FormDescription>In which country is your property located?</FormDescription>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a country" defaultValue={field.value} />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          countries.map((country) => (
                            <SelectItem key={country.isoCode} value={country.isoCode}>
                              {country.name}
                            </SelectItem>
                          ))
                        }

                      </SelectContent>
                    </Select>

                  </FormItem>
                )}
              />

              {/* FOR STATE */}
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select State *</FormLabel>
                    <FormDescription>In which State is your property located?</FormDescription>
                    <Select
                      disabled={isPending || states?.length < 1}
                      onValueChange={field.onChange}
                      value={field.value ?? undefined}
                      defaultValue={field.value ?? undefined}
                    >
                      <SelectTrigger className=" w-full">
                        <SelectValue placeholder="Select a State" defaultValue={field.value ?? undefined} />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          states.map((country) => (
                            <SelectItem key={country.isoCode} value={country.isoCode}>
                              {country.name}
                            </SelectItem>
                          ))
                        }

                      </SelectContent>
                    </Select>

                  </FormItem>
                )}
              />
            </div>
            {/* FOR CITY */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select City *</FormLabel>
                  <FormDescription>In which city is your property located?</FormDescription>
                  <Select
                    disabled={isPending || cities.length < 1}
                    onValueChange={field.onChange}
                    value={field.value ?? undefined}
                    defaultValue={field.value ?? undefined}
                  >
                    <SelectTrigger className=" w-full" >
                      <SelectValue placeholder="Select a city" defaultValue={field.value ?? undefined} />
                    </SelectTrigger>
                    <SelectContent>
                      {
                        cities.map((city) => (
                          <SelectItem key={city.name} value={city.name}>
                            {city.name}
                          </SelectItem>
                        ))
                      }

                    </SelectContent>
                  </Select>

                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"locationDescription"}
              render={({ field }) => (
                <FormItem >
                  <FormLabel>Location Description</FormLabel>
                  <FormDescription>In which location is your property located give short description?</FormDescription>
                  <Textarea {...field} placeholder={'enter location description'} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <br />

            {
              hotel &&
              <AddRoomDialog hotel={hotel} />
            }

            <div className=" flex items-center gap-2">
              <Button variant={"secondary"} className=" w-full" onClick={() => router.push(`/hotel-details/${hotel?.id}`)}>View</Button>
              {hotel &&
                <LoadingButton type="button" onClick={() => handleDeleteHotelHandler(hotel.id)} isPending={isDeletePending} disabled={isDeletePending} variant={'destructive'} className=" w-full"> Delete </LoadingButton>
              }
              <LoadingButton isPending={isPending} disabled={isPending} className=" w-full"> {hotel ? "Update" : "Create"} </LoadingButton>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
