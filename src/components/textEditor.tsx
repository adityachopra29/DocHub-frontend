import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';


export default function TextEditor(){
  const [content, setContent] = useState('');

  const handleEditorChange = (value) => {
    setContent(value);
  };

  return (
    <>
    <div className='h-full bg-slate-100 w-full'>
    <div className=" flex flex-col bg-slate-500 h-12">
        Navbar
      </div>  
    <div className=" bg-slate-200 py-24 m-0">
            The header
      </div>
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
