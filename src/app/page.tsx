import { Young_Serif } from "next/font/google";
import Image from "next/image";
import { Sidebar } from "@/components/ui/sidebar"
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login");
} // Langsung masuk ke login



// export default function Page() {
//   return <div></div>;
// }


// export default function Home() {
//   return (
//     <div>
//       <h1>Welcome to My App</h1>
//       <p>This is the homepage.</p>
//     </div>
//   );
// }

