import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center">
      <Link href={"/login"} className="text-sky-400 underline">
        Login
      </Link>
    </div>
  );
}
