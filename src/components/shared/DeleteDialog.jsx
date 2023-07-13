import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
  } from "@chakra-ui/react";
  import { useRef } from "react";
  
  function DeleteDialog({
    isOpen,
    handleOpenDeleteDialog,
    handleDelete,
  }) {
    const cancelRef = useRef();
  
    return (
      <div>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={handleOpenDeleteDialog}
          isCentered={true}
          onEsc={handleOpenDeleteDialog}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Image
              </AlertDialogHeader>
  
              <AlertDialogBody>Are you sure you want delete this Image ?</AlertDialogBody>
  
              <AlertDialogFooter>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 mr-2 bg-red-500 rounded-md text-white hover:bg-red-600"
                >
                  Proceed
                </button>
                <button
                  ref={cancelRef}
                  onClick={handleOpenDeleteDialog}
                  className="px-4 py-2 bg-blue-500 rounded-md text-white hover:bg-blue-600"
                >
                  Cancel
                </button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </div>
    );
  }
  
  export default DeleteDialog;