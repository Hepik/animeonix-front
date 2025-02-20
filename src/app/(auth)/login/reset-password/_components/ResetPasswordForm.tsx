"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z
  .object({
    password: z.string().min(6, "Password is too short"),
    confirmpassword: z.string().min(6, "Password is too short"),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords don't match",
    path: ["confirmpassword"],
  });

interface ResetPasswordFormPropsType {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormPropsType> = ({
  onSubmit,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmpassword: "",
    },
  });

  return (
    <Form {...form}>
      <div className="max-w-md w-full mx-auto border border-black dark:border-white rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Create new password
        </h2>

        <form className="mt-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <LabelInputContainer className="mt-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      placeholder="••••••••"
                      type="password"
                      {...field}
                    />
                  </LabelInputContainer>
                </FormControl>
                <FormMessage className="mb-0" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmpassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <LabelInputContainer className="mt-2">
                    <Label htmlFor="confirmpassword">Confirm password</Label>
                    <Input
                      id="confirmpassword"
                      placeholder="••••••••"
                      type="password"
                      {...field}
                    />
                  </LabelInputContainer>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button
            className="mt-3 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Create new password &rarr;
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-2 h-[1px] w-full" />

          <div className="flex justify-end">
            <Link href="/login" className="text-blue-500 text-sm">
              &larr; Back to login
            </Link>
          </div>
        </form>
      </div>
    </Form>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
