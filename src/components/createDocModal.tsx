import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import BackendClient from "../backendClient";

export default function CreateDocModal(props:
  { isOpen: any, onOpenChange: any }) {

    function getSessionCookie(cookieName) {
      const cookies = document.cookie.split(';');
      for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === cookieName) {
          return value;
        }
      }
      return null; // Return null if the cookie is not found
    }
    
    const sessionCookie = getSessionCookie('sessionid');
    
  
function onSubmit(data){
  const headers = {
    'Cookie': `sessionid=${sessionCookie}`,
    'Content-Type': 'application/json'
  }
  
  BackendClient.post("document/", data,
  { headers : headers})
      .then(res => {
          // navigate(`/document/${res.data.id}`)
          console.log(res.data)
      })
}
    

  return (
    <>
      <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange} size="3xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center flex-col gap-1">Create Document</ModalHeader>
              <ModalBody>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-5">
                <Input type="name" label="Document name" id="docName"/>
              </div>
                
              <p>Give viewing access to:</p>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input type="name" label="Rights"/>
              </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => {
                  const elem = document.getElementById("docName") as HTMLInputElement
                  const data = {
                    "name": elem.value,
                    "delta": {},
                    "text": ""
                }
                  onSubmit(data)}}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
