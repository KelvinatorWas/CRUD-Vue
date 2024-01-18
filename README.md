# Vue-Crud

### To get started run:
```sh
npm run dev
```
```sh
npm run db
```
</article>
<p>This project was made in <b><a href="https://vuejs.org/" target="_blank">VueJs</a>.</b></p>
<h3>Technolgies Used:</h3>
<ul>
<li><b>VueJS</b></li>
<li><b>Axios</b></li>
<li><b>Json-server</b></li>
</ul>
<h3>Components</h3>
<p><b>AnimalList:</b> AnimalList Component is where axios requests data from the Json server data base and renders all the cards from it. Through props passes down the data to AnimalCard.</p>
<p><b>AnimalCard:</b>AnimalCard Component where the one of the animals data is being rendered from the AnimalList Component that is requested from the Json-server data base.</p>
<p><b>Button:</b> Button&nbsp;takes in 3 props label, style, size, and 1 emitter onClick.</p>
<p><b>Header:</b> Header is the navigation componenent, by adding more routes can go to diffrerent places on the web.</p>
<p><b>Image: </b>Image component is Animal requested data from database - "image", takes this image name and if the image database has this "image" then and returns a image, if not returns default image but with the alt of&nbsp; "image".</p>
</article>

#### Input Component
```ts
type InputProps = {
  label?: { // add this if you want a label on your input
    innerText: string, // what the label says example: "Name:"
    for: string, // exampel: "name" if the input name is name
  },
  input: {
    id?: string,  // id of the input
    type: string, // type example: "text", "number", "password",...
    placeholder: string, // placeholder example: "John Doe" for the name input.
    required: boolean, // if required will warn that its empty and needs to be filled to submit.
    size?: 'big' | 'small' | 'medium' | undefined, // input sizes
  }
}
```
