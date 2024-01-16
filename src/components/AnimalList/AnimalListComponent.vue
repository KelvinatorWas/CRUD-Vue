<script lang="ts">
import AnimalCard from '../AnimalCard/AnimalCardComponent.vue'
import ButtonComponent from '../Button/ButtonComponent.vue'
import InputComponent from '../Input/InputComponent.vue'
import SelectComponent from '../Select/SelectComponent.vue'
import { createData, readData } from '@/utils/crud';
import type { Animal } from '@/types/animal'
import { ref } from 'vue';
import { Species, type InputTypes } from '@/types/input';
import Toastify from 'toastify-js'

const Inputs:InputTypes[] = [
  {
    vModal:"name",
    input: { id: 'name', type: 'text', placeholder: 'Name...', required: true }
  },
  {
    vModal:"image",
    input: { id: 'image', type: 'text', placeholder: 'Image Name...', required: true }
  },
  {
    vModal:"age",
    input: { id: 'age', type: 'text', placeholder: 'Age...', required: true }
  },
]

export default {
  name: "AnimalsList",
  components: {
    AnimalCard,
    ButtonComponent,
    InputComponent,
    SelectComponent,
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
        species: ref(''),
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

      Toastify({
        text: `Created a new animal!`,
        duration: 3000,
        style: {
          background: "linear-gradient(to right, green, darkgreen)",
        }
      }).showToast();

    },
  },
  beforeMount() {
    this.getAnimals();
  },
};
</script>


<template>

  <section>

    <ButtonComponent 
      :style="showForm ? 'ui-select ui-active' : 'ui-select'"
      :label="showForm ? 'Hide Form' : 'Show Form'"
      :onClick="onShowFormClick"
    />

    <div class="editor">
      <section class="animals">
        <AnimalCard 
          v-for="(animal, index) in animals"
          :key="index"
          :animalData=animal
        />
      </section>

      <section :class="`editor-form-section ${showForm ? 'active' : ''}`" >
        <form id="addAnimal" class="add-animal" :onSubmit="onSubmit">
          <InputComponent
            v-for="(inputType, index) in formInputs"
            :key="index"
            :label="inputType.label"
            :input="inputType.input"
            v-model="formData[inputType.vModal]"
          /> 

          <SelectComponent
            v-model="formData.species"
            placeholder="Select Species"
            id="species"
            :optionValues="speciesType"
          />

          <ButtonComponent :style="'success'" label="Add Animal"/>
        </form>
      </section>
    </div>

</section>
</template>

<style>


.animals {
  margin: 1rem;
  display: grid;
  grid-template-columns: repeat(4, 256px);
  column-gap: 1rem;
  row-gap: 1rem;
}

.editor {
  display: flex;
  border: 1px solid black;
  border-radius: 5px;
  flex-direction: column-reverse;
  width: fit-content;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.5);
}

.editor-form-section.active {
  display: flex;
  visibility: visible;
  justify-content: center;
  border-bottom: 1px solid black;
  flex: 1;
  padding: 1em;
  transition: .5s;
  transform: scaleY(1);
}

.editor-form-section {
  display: flex;
  justify-content: center;
  transform: scaleY(0);
  transition: .5s;
  visibility: hidden;
}

.add-animal {
  display: flex;
  column-gap: .5rem;
}

.base_select {
  padding: .2rem .5rem;
  border: 2px solid transparent;
  background-color: rgba(118, 123, 255, 0.23);
  color: black;
  font-weight: bold;
  border-radius: 5px;
  outline: none;
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