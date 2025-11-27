import { redirect } from "next/navigation";

export default function Home() {
  // Redirect root to the main chat experience
  redirect("/chat");
}
