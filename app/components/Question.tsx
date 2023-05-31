"use client"

import React, { useState } from "react";
import { Editor } from "@monaco-editor/react";

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
    const [output, setOutput] = useState('')
    const [processing, setProcessing] = useState(false)

    const handleChange = (value: string | undefined) => {
        setCode(value || '')
    }

    const executeHandler = () => {}

    const handleCompile = () => {}

    const checkStatus = () => {}

    return (
        <div>
            <h1>{question}</h1>
            <h1>{goal}</h1>
            <Editor
                height={90}
                width="100%"
                language="javascript"
                theme="vs-dark"
                value={code}
                onChange={handleChange}
            />
            <button disabled={!code} onClick={handleCompile}>Run</button>
            <div>
                <h1>{output}</h1>
            </div>
            <h1>{explanation}</h1>
            {applications && <h1>{applications}</h1>}
        </div>
    )
}