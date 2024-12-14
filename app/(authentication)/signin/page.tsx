import SignInForm from "@/components/signin/SignInForm";
import Link from "next/link";

export default function SignInPage() {
  return (
    <article className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign In
      </h2>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <SignInForm />
        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <Link
            href="/signup"
            className=" ml-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </article>
  );
}
