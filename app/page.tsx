import Link from "next/link";
import { permanentRedirect } from "next/navigation";

export default function HomePage() {
  permanentRedirect("/todos");
  return (
    <div className="flex items-center justify-center">
      <Link href={"/signin"} className="text-sky-400 underline">
        Login
      </Link>
    </div>
  );
}
