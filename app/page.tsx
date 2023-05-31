import { questions } from "@/questions/advanced"
import Question from "./components/Question"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-14 w-full">
      <h1 className='text-3xl font-bold'>JS Quest</h1>
      <div className="w-full md:w-3/4">
        {questions.map((question) => <Question key={question.question} {...question} />)}
      </div>
    </main>
  )
}
