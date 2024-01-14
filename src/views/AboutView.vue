<template>
  <h1 class="about">About this Project</h1>

  <article>
    <h2>Angular CRUD</h2>
    <p>This project was made in <b><a href="https://vuejs.org/" target="_blank">VueJs</a>.</b></p>
    <h3>Technolgies Used:</h3>
    <ul>
      <li><b>VueJS</b></li>
      <li><b>Axios</b></li>
      <li><b>Json-server</b></li>
    </ul>
    <h3>Components</h3>
    <p><b>AnimalList:</b> AnimalList Component is where axios requests data from the Json server data base and
      renders all the cards from it. Through props passes down the data to AnimalCard.</p>
    <p><b>AnimalCard:</b>AnimalCard Component where the one of the animals data is being rendered from the
      AnimalList Component that is requested from the Json-server data base.</p>
  </article>
</template>

<style>
.about {
  display: flex;
  justify-content: center;
}
</style>
