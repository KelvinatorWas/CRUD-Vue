export type InputVModal = "name" | "image" | "age";

export type InputTypes = {
  vModal:InputVModal,
  label?: {innerText: string, for:string},
  input: {
    id:string, type:string, placeholder:string, required:boolean
  }
} 