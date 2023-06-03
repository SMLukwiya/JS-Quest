"use client"
import { questions } from "@/questions/advanced"
import Question from "./components/Question"
import Image from "next/image"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center px-14 pt-4 w-full">
      <Image src='/logo.png' alt="logo" width={100} height={100} />
      <h1 className='text-3xl font-bold my-2'>JS Quest</h1>
      <div className="w-full md:w-3/4">
        {questions.map((question) => <Question key={question.question} {...question} />)}
      </div>
    </main>
  )
}
