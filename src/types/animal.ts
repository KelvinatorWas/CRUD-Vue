export type Animal = {
  id?:number,
  name:string,
  image:string,
  age:number,
  species: "Mammal" | "Bird" | "Fish" | "Reptile" | "Amphibian" | "Unknown",
}