// import React, { useEffect, useState, useRef } from 'react';
// import BackendClient from '../backendClient';
// import { useSelector } from 'react-redux';
// import { WebrtcProvider } from 'y-webrtc';
// import * as Y from 'yjs';
// import { QuillBinding } from 'y-quill';
// import QuillCursors from 'quill-cursors';
// import ReactQuill, { Quill } from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import 'react-quill/dist/quill.bubble.css';
// import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

// Quill.register('modules/cursors', QuillCursors);

// interface TextEditorProps {}

// const TextEditor: React.FC<TextEditorProps> = () => {
//   const [editorHtml, setEditorHtml] = useState('');
//   const quillRef = useRef<ReactQuill | null>(null);

//   const currentDocumentID = useSelector((state: any) => state.openDocument.documentId);

//   // Yjs setup
//   useEffect(() => {
//     if (currentDocumentID !== -1) {
//       const ydoc = new Y.Doc();
//       const provider = new WebsocketProvider('ws://localhost:1234', currentDocumentID, ydoc);
//       const awareness = provider.awareness;
  
//       // Initialize Quill editor
//       const quillInstance = (quillRef.current as any)?.getEditor();
  
//       if (quillInstance) {
//         // Create shared Yjs text type
//         const ytext = ydoc.getText('quill');
  
//         // Bind Quill editor to Yjs text type
//         const binding = new QuillBinding(ytext, quillInstance, awareness);
  
//         // Set local user state
//         awareness.setLocalStateField('user', {
//           name: currentUserTag, // Replace with the actual username
//         });
  
//         // Blur Quill editor on window blur
//         window.addEventListener('blur', () => {
//           quillInstance.blur();
//         });
  
//         return () => {
//           provider.disconnect();
//         };
//       }
//     }
//   }, [currentDocumentID, currentUserTag]);

//   // Load initial delta from the database
//   useEffect(() => {
//     if (currentDocumentID !== -1) {
//       BackendClient.get(`document/${currentDocumentID}/`)
//         .then((res) => {
//           if (res.data.delta) {
//             const converter = new QuillDeltaToHtmlConverter(res.data.delta, {});
//             setEditorHtml(converter.convert());
//           }
//         })
//         .catch((error) => {
//           console.error('Error fetching document:', error);
//         });
//     }
//   }, [currentDocumentID]);

//   return (
//     <div className='h-full bg-slate-100 w-full'>
//       <div className='flex flex-col bg-slate-100'>
//         <ReactQuill
//           ref={quillRef}
//           theme='snow'
//           value={editorHtml}
//           modules={{
//             toolbar: [
//               ['bold', 'italic', 'underline', 'strike'],
//               [{ header: 1 }, { header: 2 }],
//               [{ list: 'ordered' }, { list: 'bullet' }],
//               ['link', 'image'],
//               ['clean'],
//             ],
//             cursors: true,
//             history: {
//               userOnly: true,
//             },
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default TextEditor;
