import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import BackendClient from "../backendClient";
import { useDispatch } from "react-redux";
import { changeDocument } from "../features/openDocumentSlice";

export default function CreateDocModal(props:
  { isOpen: any, onOpenChange: any }) {

    const dispatch = useDispatch()

  function onSubmit(data){
    const headers = {
      'Content-Type': 'application/json'
    }
    
    console.log(data)
    BackendClient.post("document/", data,
    { headers : headers})
        .then(res => {
          dispatch(changeDocument(res.data.id))
        })
  }
    

  return (
    <>
      <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange} size="xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center flex-col gap-1">Create Document</ModalHeader>
              <ModalBody>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-5">
                <Input type="name" label="Document name" id="docName"/>
              </div>
                
              <p>Give reading access to:</p>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input type="name" label="Enter space seperated tags" id="readAccessTags"/>
              </div>
              <p>Give commenting access to:</p>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input type="name" label="Enter space seperated tags" id="commentAccessTags"/>
              </div>
              <p>Give edit access to:</p>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input type="name" label="Enter space seperated tags" id="writeAccessTags"/>
              </div>
              <p>Give complete access to:</p>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input type="name" label="Enter space seperated tags" id="deleteAccessTags"/>
              </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => {
                  const docName = document.getElementById("docName") as HTMLInputElement
                  const readAccessTags = document.getElementById("readAccessTags") as HTMLInputElement
                  const commentAccessTags = document.getElementById("commentAccessTags") as HTMLInputElement
                  const writeAccessTags = document.getElementById("writeAccessTags") as HTMLInputElement
                  const deleteAccessTags = document.getElementById("deleteAccessTags") as HTMLInputElement

                  const data = {
                    "name": docName.value,
                    "delta": {},
                    "text": "",
                    "read_permissions": readAccessTags.value.split(" "),
                    "comment_permissions": commentAccessTags.value.split(" "),
                    "write_permissions": writeAccessTags.value.split(" "),
                    "delete_permissions": deleteAccessTags.value.split(" "),
                }
                  onSubmit(data)
                  onClose()}}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
