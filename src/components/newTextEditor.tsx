import ReactQuill from "react-quill";
import React, { useEffect, useState } from "react";
import BackendClient from "../backendClient";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { useSelector } from "react-redux";

export default function TextEditor(){

    const currentDocumentID = useSelector((state: any) => state.openDocument.documentId)
    const [editorHtml, setEditorHtml] = useState('')
    
    //initial render of the object
    useEffect(() => {
        BackendClient.get(`document/${currentDocumentID}`)
        .then(res => {
            const obj = JSON.parse(res.data.delta)
            var converter = new QuillDeltaToHtmlConverter(obj, {});
            setEditorHtml(converter.convert())
        })
    }, [currentDocumentID])

    //saving the data on change(autosave)
    function handleEditorChange(content, delta, source, editor){

    }

    return(
        <>
        <div className='h-full bg-slate-100 w-full'>
            <div className="flex flex-col bg-slate-100">
            <ReactQuill
                theme="bubble"
                value={editorHtml}
                onChange={handleEditorChange}
                modules={{
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ header: 1 }, { header: 2 }],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['link', 'image'],
                    ['clean'],
                ],
                }}
            />
            </div>
        </div>
    </>
    )
}