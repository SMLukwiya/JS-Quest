"use client"

import React, { useState } from "react";
import { Editor } from "@monaco-editor/react";
import axios from "axios";

interface Question {
    question: string;
    goal: string;
    codeSample: string;
    explanation: string
    applications?: string
}

export default function Question(props: Question) {
    const {question, goal, codeSample, explanation, applications} = props
    const [code, setCode] = useState(codeSample || "")
    const [output, setOutput] = useState<any>(null)
    const [processing, setProcessing] = useState(false)

    const handleChange = (value: string | undefined) => {
        setCode(value || '')
    }

    const handleCompile = async () => {
        setProcessing(true)
        try {
            const response = await axios.post('/api', {code})
            setProcessing(false)
            setOutput(response.data.data)
        } catch (e) {
            setProcessing(false)
        }
    }

    return (
        <div>
            <h1>{question}</h1>
            <h1>{goal}</h1>
            <Editor
                height={300}
                width="100%"
                language="javascript"
                theme="vs-dark"
                value={code}
                onChange={handleChange}
            />
            <button
                className="bg-green-600 py-2 px-3 rounded-md text-white font-semibold my-2"
                disabled={!code || processing}
                onClick={handleCompile}
            >
                Run
            </button>
            {processing && <div className=""><p className="text-slate-300">Executing...</p></div>}
            {output && <div className={`h-56 overflow-scroll p-2 bg-gray-200 border ${output.stderr ? 'border-red-700' : 'border-gray-400'}`}>
                <h1 className="text-gray-700">Output</h1>
                {output.stdout && <h1 className="text-gray-800">{window.atob(output.stdout)}</h1>}
                {output.stderr && <h1 className="text-gray-800">{window.atob(output.stderr)}</h1>}
            </div>}
            <h1>{explanation}</h1>
            {applications && <h1>{applications}</h1>}
        </div>
    )
}