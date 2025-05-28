import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login"); //if user not found , else we will implement logic to redirect to dashboard
  return null;
}
