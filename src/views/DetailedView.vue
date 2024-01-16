<script setup lang="ts">
import Image from '@/components/Image/ImageComponent.vue';
import Modal from '@/components/Modal/ModalComponent.vue';
import Button from '@/components/Button/ButtonComponent.vue';
import type { Animal } from '@/types/animal';
import { readDataOne, deleteData } from '@/utils/crud';
import { DB_ANIMALS, joinLink } from '@/utils/serverLink';
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Toastify from 'toastify-js'

// Route & Router
const route = useRoute();
const router = useRouter();
const id = route.params.id as string;

// Animal & Modal Reference
const animal = ref<Animal>();
const modal = ref<typeof Modal>();

const getAnimal = async () => {
  const data = await readDataOne<Animal>(joinLink(DB_ANIMALS, id));
  animal.value = data;
};

const onDeleteClick = () => {
  modal.value?.toggleModal();
};

const onEditClick = () => {
  router.push(joinLink(id, "edit"));
};

const deleteAnimal = () => {
  deleteData(DB_ANIMALS, +id);
  
  Toastify({
    text: `Deleted Animal`,
    duration: 3000,
    style: {
      background: "linear-gradient(to right, red, darkred)",
    }
  }).showToast();

  router.push('/');
};

onBeforeMount(() => {
  getAnimal();
});

</script>

<template>
  <main v-if="animal" class="detailed-animals">
    <section class="ui">
      <div class="data">
        <Image :imgName="animal.image" :imgAlt="animal.image" imgClass="animal-image" />
        <div class="animal-info">  
          <h2 class="animal-name">{{ animal.name }}</h2>
          <p class="animal-text"><b>Age:</b> {{ animal.age }}</p>
          <p class="animal-text"><b>Species:</b> {{ animal.species }}</p>
        </div>
      </div>

      <div class="button-container">
        <Button label="Edit"   :style="'success'" :onClick="onEditClick" />
        <Button label="Delete" :style="'danger'"  :onClick="onDeleteClick" />
      </div>
    </section>

    <Modal
      ref="modal"
      @acceptCallback="deleteAnimal"
      title="There is no going back!"
      :message="`Are you sure you want to delete ${animal.name}?`"
      acceptionLabel="Delete"
    />
  </main>
</template>

<style>
.detailed-animals {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.5);
  padding: 1rem;
  border-radius: 5px;
}

.ui {
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  padding: 2rem;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.5);
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

.button-container {
  display: flex;
  column-gap: 2rem;
  align-self: flex-end
}

.animal-image {
  border: 1px solid black;
  width: 200px;
  height: 200px;
  border-radius: 5px;
  user-select: none;
}


</style>
