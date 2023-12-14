import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import BackendClient from '../backendClient';
import { useSelector } from 'react-redux';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { DeltaOperation, DeltaStatic } from 'quill';


export default function TextEditor() {
  const [editorHtml, setEditorHtml] = useState('');
  const [stateDelta, setStateDelta] = useState<DeltaOperation[] | undefined>([])

  const currentDocumentID = useSelector((state: any) => state.openDocument.documentId)

  function handleEditorChange(value: string, delta: DeltaStatic, source, editor: ReactQuill.UnprivilegedEditor) {
    const temp = editor.getContents().ops
    if (temp && JSON.stringify(temp) !== JSON.stringify(stateDelta)) {
      setStateDelta(temp);
    console.log("yo" + temp)
    if (temp) {
      const converter = new QuillDeltaToHtmlConverter(temp, {});
      setEditorHtml(converter.convert());
    }
  }}

  // to set the html of the text editor according to the delta
  useEffect(() => {
    console.log("called")
    if (currentDocumentID != -1) {
      BackendClient.get(`document/${currentDocumentID}/`)
        .then(res => {
          // Check if delta is present before parsing
          console.log("we here")
          console.log(res.data.delta)
          if (res.data.delta) {
            console.log("yo boys")
            console.log(res.data.delta)
            // const obj = JSON.parse(res.data.delta);
            console.log((res.data.delta))
            setStateDelta(res.data.delta)
            var converter = new QuillDeltaToHtmlConverter(res.data.delta, {});
            setEditorHtml(converter.convert());
          }
        })
        .catch((e) => {
          console.log("error");
          console.log(e);
        });
    }
  }, [currentDocumentID]);

  // autosave function
  useEffect(() => {
    console.log("autosave")
    if(currentDocumentID != -1){
      if (stateDelta) {
        const data = {
          'delta': stateDelta
        }
        const headers = {
          'Content-Type': 'application/json'
        }
        // this is not working
        BackendClient.patch(`document/${currentDocumentID}/`, data, { headers: headers })
          .then(res => console.log(res.data))
  
      }
    }
  }, [stateDelta])

  return (
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
  );
};
