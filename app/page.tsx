"use client"

import closure from '../questions/advanced/closures'
import Question from "./components/Question"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center px-14 pt-4 w-full">
      <Image src='/logo.png' alt="logo" width={100} height={100} />
      <h1 className='text-3xl font-bold my-2'>JS Quest</h1>
      <p className="w-full md:w-3/4 text-lg my-7">JS Quest explores a comprehensive collection of advanced JavaScript questions, 
        designed to challenge and deepen your understanding of the language. 
        Each question is accompanied by a detailed explanation, 
        providing clear insights into the underlying concepts and solutions. 
        Whether you&apos;re preparing for a technical interview or aiming to enhance your JavaScript skills, 
        js quest offers a valuable resource for honing your expertise. 
        All contributions from fellow developers are welcome,
        just head over to github and follow the guide <Link href="https://github.com/SMLukwiya/JS-Quest" target="__blank" className="font-bold underline text-blue-300">GitHub</Link>.
        Don&apos;t forget to add that star ⭐ on github 🔥.
        </p>
        
      <div className="w-full md:w-3/4">
        <Question md={closure} />
      </div>
    </main>
  )
}
