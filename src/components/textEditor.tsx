import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { useParams } from 'react-router-dom';
import BackendClient from '../backendClient';


export default function TextEditor(){
  const [content, setContent] = useState('');
  const {documentId} = useParams()

  // useEffect(() => {
  //   BackendClient.get(`document/${documentId}`)
  //   .then(res => {
  //     setContent(res.data.text)
  //   })
  // })

  const handleEditorChange = (value) => {
    setContent(value);
  };

  return (
    <>
    <div className='h-full bg-slate-100 w-full'>
    <div className="flex flex-col bg-slate-100">
      <ReactQuill
        theme="bubble"
        value={content}
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
