<script setup lang="ts">
import Input from '@/components/Input/InputComponent.vue'
import Modal from '@/components/Modal/ModalComponent.vue';
import Button from '@/components/Button/ButtonComponent.vue';
import Select from '@/components/Select/SelectComponent.vue'
import type { Animal, SpeciesType } from '@/types/animal';
import { readDataOne, updateData } from '@/utils/crud';
import { DB_ANIMALS, joinLink, str } from '@/utils/serverLink';
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

type InputVModal = "name" | "image" | "age";

type InputTypes = {
  vModal: InputVModal,
  label?: { innerText: string, for: string },
  input: {
    id: string, type: string, placeholder: string, required: boolean
  }
}

const Inputs: InputTypes[] = [
  {
    vModal: "name",
    label: { innerText: 'Name', for: 'name' },
    input: { id: 'name', type: 'text', placeholder: 'Name...', required: true }
  },
  {
    vModal: "image",
    label: { innerText: 'Image Name:', for: 'image' },
    input: { id: 'image', type: 'text', placeholder: 'Image Name...', required: true }
  },
  {
    vModal: "age",
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

// Route & Router
const route = useRoute();
const router = useRouter();
const id = route.params.id as string;

// Animal Reference
const animal = ref<Animal>();
const child = ref<typeof Modal>();
const formData = {
  name: ref(''),
  image: ref(''),
  age: ref(''),
  species: ref<SpeciesType>('Unknown'),
}

const getAnimal = async () => {
  const data = await readDataOne<Animal>(joinLink(DB_ANIMALS, id));
  animal.value = data;

  if (!animal.value) return;

  formData.name.value = animal.value.name;
  formData.image.value = animal.value.image;
  formData.age.value = str(animal.value.age);
  formData.species.value = animal.value.species;

}

const onSubmitClick = () => {
  child.value?.closeModal();
}

const reRoute = () => {
  router.push('/'+joinLink('preview', id));
}

const updateAnimal = () => {
  const { name, image, age, species } = formData;
  updateData<Animal>(DB_ANIMALS, id, { id: +id, name: name.value, age: +age.value, image: image.value, species: species.value });
  Toastify({
    text: `Updated Animal`,
    duration: 3000,
    style: {
      background: "linear-gradient(to right, green, darkgreen)",
    }
  }).showToast();
  reRoute();
}

onBeforeMount(() => {
  getAnimal();
})

</script>

<template>
  <main class="detail-view">
    <section v-if="animal" class="ui-container">
      <form id="addAnimal" class="add-animal">
        <Input 
          v-for="(inputType, index) in Inputs"
          :key="index"
          :label="inputType.label"
          :input="inputType.input"
          v-model="formData[inputType.vModal].value"
        />

        <Select
          v-model="formData.species.value"
          placeholder="Select Species"
          :label="{for:'species', innerText:'Species:'}"
          id="species"
          :optionValues="Species"
        />

      </form>

      <div class="button-container">
        <Button label="Cancel" :style="'green'" :onClick="reRoute" />
        <Button label="Submit" :style="'red'" :onClick="onSubmitClick" />
      </div>
    </section>
  </main>

  <Modal 
    @onClickSubmit="updateAnimal"
    ref="child"
    sub="This action will replace the old data!"  
  />
</template>

<style>
.detail-view {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.5);
  padding: 1rem;
}

.ui-container {
  border-radius: 5px;
  border: 1px solid black;
  padding: 2rem;
}

.button-container {
  margin-top: 1rem;
  display: flex;
  column-gap: 2rem;
  justify-content: space-between;
}

.animal-image {
  border: 1px solid black;
  width: 200px;
  height: 200px;
  border-radius: 5px;
  user-select: none;
}
</style>
