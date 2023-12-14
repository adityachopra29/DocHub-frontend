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
import { WebrtcProvider } from 'y-webrtc'
import { QuillBinding } from 'y-quill'
import { WebsocketProvider } from 'y-websocket'


export default function TextEditor() {
  const [editorHtml, setEditorHtml] = useState('');
  const quillRef = useRef(null);

  Quill.register('modules/cursors', QuillCursors)


  const currentDocumentID = useSelector((state: any) => state.openDocument.documentId)
  const currentUserTag = useSelector((state:any) => state.currentUser.tag)


  useEffect(() => {
    if(currentDocumentID != -1){
      console.log("we inside collab editing useeffect")
      const ydoc = new Y.Doc();
      const provider = new WebsocketProvider('ws://localhost:1234', currentDocumentID, ydoc)
      const awareness = provider.awareness;

      // Initialize Quill editor
      
      const quill = (quillRef.current as any).getEditor();
      if (quill) {
        // Create shared Yjs text type
        const ytext = ydoc.getText('quill');

        // Bind Quill editor to Yjs text type
        const binding = new QuillBinding(ytext, quill, awareness);

        // Set local user state
        awareness.setLocalStateField('user', {
          name: currentUserTag, // Replace with the actual username
        });

        window.addEventListener('blur', () => {
          quill.blur();
        });

        return () => {
          provider.disconnect();
        };
      }
    }
  },[currentDocumentID])


  // to set the html of the text editor according to the delta from DB the first time
  useEffect(() => {
    console.log("loading data from backend useeffect called")
    if (currentDocumentID != -1) {
      BackendClient.get(`document/${currentDocumentID}/`)
        .then(res => {
          // Check if delta is present before parsing
          // console.log("we here")
          // console.log("data loaded from backend: "+res.data.delta)
          if (res.data.delta) {
            // console.log("yo boys")
            // console.log(res.data.delta)
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
  // useEffect(() => {
  //   console.log("autosave")
  //   if(currentDocumentID != -1){
  //     if (stateDelta) {
  //       const data = {
  //         'delta': stateDelta
  //       }
  //       const headers = {
  //         'Content-Type': 'application/json'
  //       }
  //       // this is not working
  //       BackendClient.patch(`document/${currentDocumentID}/`, data, { headers: headers })
  //         .then(res => console.log(res.data))
  
  //     }
  //   }
  // }, [editorHtml])


  return (
    <>
      <div className='h-full bg-slate-100 w-full'>
        <div className="flex flex-col bg-slate-100">
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={editorHtml}
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
    </>
  );
};
