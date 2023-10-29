"use client"
import { CreateNew } from "@/components/create-new";
import { useEffect } from "react";

function init() {
  console.log("init")
  if (!!localStorage && !localStorage["notes"] && !localStorage["folders"] && !localStorage["boards"]) {
    localStorage.setItem("notes", JSON.stringify([]))
    localStorage.setItem("folders", JSON.stringify([]))
    localStorage.setItem("boards", JSON.stringify([]))
  }
}

export default function Home() {
  useEffect(() => init())
  return (
    <CreateNew />
  )
}
