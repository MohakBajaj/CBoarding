import { CreateNew } from "@/components/create-new";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

export default function Home() {
  return (
    <main >
      <Navbar />
      <div id="Main" className="flex w-full gap-8 h-[92.26vh]">
        <Sidebar />
        <div id="Content" className="w-full h-full">
          <CreateNew />
        </div>
      </div>
    </main>
  )
}
