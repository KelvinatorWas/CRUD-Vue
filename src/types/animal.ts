export type SpeciesType = "Mammal" | "Bird" | "Fish" | "Reptile" | "Amphibian" | "Unknown";

export type Animal = {
  id?:number,
  name:string,
  image:string,
  age:number,
  species: SpeciesType,
}