import { submitLogin } from "@/actions/login";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useFormStatus } from "react-dom";

export default function LoginForm() {
  return (
    <article className="max-w-md h-fit mx-auto w-full bg-slate-200 p-6 rounded-lg">
      <h2 className="text-xl text-center my-2">Login</h2>
      <form className="grid grid-flow-row gap-4" action={submitLogin}>
        <div>
          <Label htmlFor="username">Username</Label>
          <Input name="username" autoComplete="username" id="username" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input name="password" type="password" id="password" />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </article>
  );
}
