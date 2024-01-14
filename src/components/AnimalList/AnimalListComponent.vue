<script lang="ts">
import AnimalCard from '../AnimalCard/AnimalCardComponent.vue'
import ButtonComponent from '../Button/ButtonComponent.vue'
import InputComponent from '../Input/InputComponent.vue'
import { createData, readData } from '@/utils/crud';
import type { Animal } from '@/types/animal'
import { ref } from 'vue';

type InputVModal = "name" | "image" | "age";

type InputTypes = {
  vModal:InputVModal,
  label?: {innerText: string, for:string},
  input: {
    id:string, type:string, placeholder:string, required:boolean
  }
} 

const Inputs:InputTypes[] = [
  {
    vModal:"name",
    label: { innerText: 'Name', for: 'name' },
    input: { id: 'name', type: 'text', placeholder: 'Name...', required: true }
  },
  {
    vModal:"image",
    label: { innerText: 'Image Name:', for: 'image' },
    input: { id: 'image', type: 'text', placeholder: 'Image Name...', required: true }
  },
  {
    vModal:"age",
    label: { innerText: 'Age:', for: 'age' },
    input: { id: 'age', type: 'text', placeholder: 'Age...', required: true }
  },
]

const Species = [
  "Unknown",
  "Mammal",
  "Bird",
  "Fish",
  "Reptile",
  "Amphibian",
]

export default {
  name: "AnimalsList",
  components: {
    AnimalCard,
    ButtonComponent,
    InputComponent,
  },
  data() {
    return {
      animals: [] as Animal[],
      showForm: false,
      speciesType: Species,
      formInputs: Inputs,
      formData: {
        name: ref(''),
        image: ref(''),
        age: ref(''),
        species: ref('Unknown'),
      },

    };
  },
  methods: {
    async getAnimals() {
      const data = await readData<Animal>("http://localhost:3004/animals");
      this.animals = data;
    },

    onShowFormClick() {
      this.showForm = !this.showForm;
      console.log("Hello");
    },

    onSubmit(e: Event) {
      e.preventDefault();

      createData("http://localhost:3004/animals", this.formData);
      this.getAnimals();

      console.log(this.formData);
    },
  },
  beforeMount() {
    this.getAnimals();
  },
};
</script>


<template>
  <ButtonComponent 
    :styleClass="showForm ? 'ui-select ui-active' : 'ui-select'"
    :innerText="showForm ? 'Hide Form' : 'Show Form'"
    :onClick="onShowFormClick"
  />

  <div class="editor">
    <section class="animals">
      <AnimalCard v-for="(animal, index) in animals" :key="index" :animalData=animal />
    </section>

    <section class="editor-form-section" v-if="showForm" :onSubmit="onSubmit">
      <form id="addAnimal" class="add-animal">
        <InputComponent
          v-for="(inputType, index) in formInputs"
          :key="index"
          :label="inputType.label"
          :input="inputType.input"
          v-model="formData[inputType.vModal]"
        /> 

        <label for="species">Species:</label>
        <select v-model="formData.species" id="species">
          <option v-for="(specie, index) in speciesType" :key="index" :value="specie">{{ specie }}</option>
        </select>

        <ButtonComponent innerText="Add Animal" styleClass="green" />
      </form>
    </section>
  </div>
</template>

<style>
.animals {
  margin: 1rem;
  display: grid;
  grid-template-columns: repeat(3, 256px);
  column-gap: 1rem;
  row-gap: 1rem;
}

.editor {
  display: flex;
  border: 1px solid black;
  border-radius: 5px;
  flex-direction: row;
  width: fit-content;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.5);
}

.editor-form-section {
  display: flex;
  border-left: 1px solid black;
  flex: 1;
  padding: 1em;
}

.add-animal {
  display: flex;
  flex-direction: column;
  row-gap: .5rem;
}

@media screen and (max-width: 820px) {
  .animals {
    grid-template-columns: repeat(2, 256px);
  }

  .editor {
    flex-direction: column;

    .editor-form-section {
      border: none;
      border-top: 1px solid black;
    }
  }
}

@media screen and (max-width: 640px) {
  .animals {
    grid-template-columns: repeat(1, 256px);
  }

  .editor {
    flex-direction: column;

    .editor-form-section {
      border: none;
      border-top: 1px solid black;
    }
  }
}
</style>