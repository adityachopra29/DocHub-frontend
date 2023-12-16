import React, { useEffect, useState } from 'react';
import BackendClient from '../backendClient';
import { useSelector } from 'react-redux';
import { useRef } from 'react';


// quill imports
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import QuillCursors from 'quill-cursors'

// yjs imports
import * as Y from 'yjs'
import { QuillBinding } from 'y-quill'
import { WebsocketProvider } from 'y-websocket'
import { Button } from '@nextui-org/react';


export default function TextEditor() {
  const [editorHtml, setEditorHtml] = useState('');
  const quillRef = useRef(null);
  const [readOnly, setReadOnly] = React.useState<boolean>()
  // let autosave : number | null = null;

  Quill.register('modules/cursors', QuillCursors)

  
  const currentDocumentID = useSelector((state: any) => state.openDocument.documentId)
  const currentUserTag = useSelector((state:any) => state.currentUser.tag)
  
  // for collaborative editing
  useEffect(() => {
    setReadOnly(true)
      if (currentDocumentID !== -1) {
        const ydoc = new Y.Doc();
        const provider = new WebsocketProvider('ws://localhost:1234',currentDocumentID ,ydoc);
        const awareness = provider.awareness;
        const quillInstance = (quillRef.current as any).getEditor();

          BackendClient.get(`user_access_permissions/${currentDocumentID}/`)
        .then(res => {
          console.log("perm level: ", res.data)
          if(res.data > 2){
            setReadOnly(false)
            console.log( readOnly)
          }else{
            setReadOnly(true)
            console.log(readOnly)
          }
        
        console.log("we making ydoc instance")
        
        // Initialize Quill editor
  
        console.log("readonly after quillinstance: "+readOnly)
        if(readOnly == true){
          quillInstance.disable()
        }else{
          quillInstance.enable()
        }
      })
        if (quillInstance) {
          // Create shared Yjs text type
          const ytext = ydoc.getText('quill');
  
          // Bind Quill editor to Yjs text type
          const binding = new QuillBinding(ytext, quillInstance, awareness);
  
          // Set local user state
          awareness.setLocalStateField('user', {
            name: currentUserTag,
          });
  
          // Blur Quill editor on window blur
          window.addEventListener('blur', () => {
            quillInstance.blur();
          });
  
        //   console.log("loading data from backend useeffect called")
        // if (currentDocumentID != -1) {
        //   BackendClient.get(`document/${currentDocumentID}/`)
        //   .then(res => {
        //     console.log("data loaded from backend: "+res.data.delta)
        //     if (res.data.delta) {
        //       console.log(res.data.delta)
        //       var converter = new QuillDeltaToHtmlConverter(res.data.delta, {});
        //       // console.log(converter.convert());
        //       console.log("editorHtml: " + editorHtml)
        //       // setEditorHtml("yooo nigga")
        //     }
        //     })
        //     .catch((e) => {
        //       console.log("error");
        //       console.log(e);
        //     });
        //   }
  
          return () => {
            console.log("we disconnecting")
            provider.disconnect();
          };
        }
      } 
  }, [currentDocumentID]);
  
  // to set the html of the text editor according to the delta from DB the first time
  useEffect(() => {
    
    }, [currentDocumentID]);
    
    const savedoc = () => {
      console.log("saving")
      const quillInstance = (quillRef.current as any).getEditor();
      const delta = quillInstance.getContents()
      console.log("delta: ", delta)
      const data = {
        'delta' : delta
    }
    BackendClient.patch(`document/${currentDocumentID}/`, data)
    .then(res => console.log(res.data))
  }
  
  
  return (
    <>
      <div className='h-full bg-slate-100 w-full'>
        <div>
          <div className="flex flex-col mx-[6.5rem]">
            <ReactQuill
              ref={quillRef}
              theme="snow"
              // value={editorHtml}
              modules={{
                toolbar: [
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ header: 1 }, { header: 2 }],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  ['link', 'image'],
                  ['clean'],
                ],
                cursors:true,
                history:{
                  userOnly:true
                }
              }}
            />
          </div>
        </div>
        <Button onClick={savedoc} className='fixed right-10 bottom-10 z-50' color='primary'>Save</Button>
      </div>
    </>
  );
};
