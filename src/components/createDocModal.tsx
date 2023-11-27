import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import BackendClient from "../backendClient";
import { data } from "autoprefixer";

export default function CreateDocModal(props:
  { isOpen: any, onOpenChange: any }) {

  
function onSubmit(data){
  const headers = {
    
  }
  BackendClient.post("document/", data)
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
                    "delta": null,
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
