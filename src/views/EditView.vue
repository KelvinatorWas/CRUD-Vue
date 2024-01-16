<script setup lang="ts">
import Input from '@/components/Input/InputComponent.vue';
import Modal from '@/components/Modal/ModalComponent.vue';
import Button from '@/components/Button/ButtonComponent.vue';
import Select from '@/components/Select/SelectComponent.vue';
import Image from '@/components/Image/ImageComponent.vue';
import type { Animal, SpeciesType } from '@/types/animal';
import { readDataOne, updateData } from '@/utils/crud';
import { DB_ANIMALS, joinLink, str } from '@/utils/serverLink';
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Toastify from 'toastify-js'
import type { InputTypes } from '@/types/input';
import { Species } from '@/types/input'

// All Input Data
const Inputs: InputTypes[] = [
  {
    vModal: "name",
    input: { id: 'name', type: 'text', placeholder: 'Name...', required: true }
  },
  {
    vModal: "image",
    input: { id: 'image', type: 'text', placeholder: 'Image Name...', required: true }
  },
  {
    vModal: "age",
    input: { id: 'age', type: 'text', placeholder: 'Age...', required: true }
  },
]

// Route & Router
const route = useRoute();
const router = useRouter();
const id = route.params.id as string;

// Animal Reference
const animal = ref<Animal>();
const modal = ref<typeof Modal>();
const formData = {
  name: ref(''),
  image: ref(''),
  age: ref(''),
  species: ref<SpeciesType>('Unknown'),
};

// Edit View Functions
const getAnimal = async () => {
  const data = await readDataOne<Animal>(joinLink(DB_ANIMALS, id));
  animal.value = data;

  if (!animal.value) return;

  formData.name.value = animal.value.name;
  formData.image.value = animal.value.image;
  formData.age.value = str(animal.value.age);
  formData.species.value = animal.value.species;

};

const onSubmitClick = () => {
  modal.value?.toggleModal();
};

const reRoute = () => {
  router.push('/'+joinLink('preview', id));
};

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
};

// Mount
onBeforeMount(() => {
  getAnimal();
});

</script>

<template>
  <main :class="css['detail-view']">
    <section v-if="animal" :class="css['ui-container']">
      <form id="updateAnimal" :class="css['update-animal']">
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
          id="species"
          :optionValues="Species"
        />

      </form>

      <div :class="css['button-container']">
        <Button label="Cancel" :style="'success'" :onClick="reRoute" />
        <Button label="Submit" :style="'danger'"   :onClick="onSubmitClick" />
      </div>
      
      <h2>Preview</h2>

      <div :class="css['data']">
        <Image :imgName="formData.image.value" :imgAlt="formData.image.value" :imgClass="css['animal-image']" />
        <div :class="css['animal-info']">  
          <h2 :class="css['animal-name']">{{ formData.name.value }}</h2>
          <p :class="css['animal-text']"><b>Age:</b> {{ formData.age.value }}</p>
          <p :class="css['animal-text']"><b>Species:</b> {{ formData.species.value }}</p>
        </div>
      </div>
    </section>
  </main>

  <Modal 
    @acceptCallback="updateAnimal"
    ref="modal"
    message="This action will replace the old data!"  
  />
</template>

<style module="css">
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
  padding-bottom: .5rem;
  border-bottom: 1px solid rgba(0, 172, 195, 0.733);
}

.update-animal {
  display: flex;
  column-gap: 1rem;
}

.animal-image {
  border: 1px solid black;
  width: 200px;
  height: 200px;
  border-radius: 5px;
  user-select: none;
}

.animal-info {
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border: 1px solid black;
  padding: 0 2rem;
  flex-grow: 1;
}

.data {
  display: flex;
  flex-direction: row;
  border-radius: 5px;
  border: 1px solid black;
  padding: 1rem;
  column-gap: 1rem;
  margin-bottom: 1rem;
}

.animal-text {
  margin: .5rem 0;
}
</style>
