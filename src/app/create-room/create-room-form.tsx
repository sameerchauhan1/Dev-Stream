"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { createRoomAction } from "./actions";

const formSchema = z.object({
   name: z.string().min(1).max(50),
   description: z.string().min(1).max(50),
   githubRepo: z.string().min(1).max(50),
   language: z.string().min(1).max(50),
});

export function CreateRoomForm() {
   const route = useRouter();

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         name: "",
         description: "",
         githubRepo: "",
         language: "",
      },
   });

   async function onSubmit(values: z.infer<typeof formSchema>) {
      // TODO: invoke a server action to store the data in our database
      await createRoomAction(values);
      route.push("/");
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
               control={form.control}
               name="name"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Name</FormLabel>
                     <FormControl>
                        <Input {...field} />
                     </FormControl>
                     <FormDescription>
                        This is your public display name.
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="description"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Description</FormLabel>
                     <FormControl>
                        <Input {...field} />
                     </FormControl>
                     <FormDescription>
                        Please describe about your room.
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="githubRepo"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Github Repository</FormLabel>
                     <FormControl>
                        <Input {...field} />
                     </FormControl>
                     <FormDescription>
                        Please put a link to a project you are working on.
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="language"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel> Primary programming languages</FormLabel>
                     <FormControl>
                        <Input {...field} />
                     </FormControl>
                     <FormDescription>
                        List the primary programming language you are working
                        with.
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button type="submit">Submit</Button>
         </form>
      </Form>
   );
}
