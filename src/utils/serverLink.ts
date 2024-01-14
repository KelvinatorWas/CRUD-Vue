const joinLink = (...links:string[]):string => links.join('/'); 
const str = (n:number):string => String(n); 


const DB_LINK = 'http://localhost:3004'
const DB_ANIMALS = joinLink(DB_LINK,'animals')


export {
  DB_LINK,
  DB_ANIMALS,
  joinLink,
  str
}