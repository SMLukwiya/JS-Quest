"use client"

import React, { useState } from "react";
import { Editor } from "@monaco-editor/react";
import axios from "axios";
import AccordionComponent from "./UI/Accordion";
import ReactMarkdown from 'react-markdown'
import markdownStyle from "../styles/markdown-dark.module.css"
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

export default function Question({md}: {md: string}) {
    const [code, setCode] = useState("// run code samples")
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
        <div className="my-10">
            <ReactMarkdown 
                className={markdownStyle["markdown-body"]}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                >
                {md}
            </ReactMarkdown>
            <div className="mt-4">
                <AccordionComponent title="Run Code" content={
                    <>
                        <Editor
                            height={280}
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
                        {output && <div className={`h-44 overflow-scroll p-2 bg-gray-200 border ${output.stderr ? 'border-red-700' : 'border-gray-400'}`}>
                            <h1 className="text-gray-500">Output</h1>
                            {output.stdout && <h1 className="text-gray-800">{window.atob(output.stdout)}</h1>}
                            {output.stderr && <h1 className="text-gray-800">{window.atob(output.stderr)}</h1>}
                        </div>}
                    </>
                    } 
                />
            </div>
        </div>
    )
}