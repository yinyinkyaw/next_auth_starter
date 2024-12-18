import SignupForm from "@/components/signup/SignupForm";
import Link from "next/link";

export default function SignupPage() {
  return (
    <article className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign up
      </h2>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <SignupForm />
        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?
          <Link
            href="/signin"
            className=" ml-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Sign In
          </Link>
        </p>
      </div>
    </article>
  );
}
