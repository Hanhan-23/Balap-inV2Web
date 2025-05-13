import { Young_Serif } from "next/font/google";
import Image from "next/image";
import { Sidebar } from "@/components/ui/sidebar"
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login");
} // Langsung masuk ke login