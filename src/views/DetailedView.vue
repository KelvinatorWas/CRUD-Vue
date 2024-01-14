<script setup lang="ts">
import Image from '@/components/Image/ImageComponent.vue';
import Modal from '@/components/Modal/ModalComponent.vue';
import Button from '@/components/Button/ButtonComponent.vue';
import type { Animal } from '@/types/animal';
import { readDataOne, deleteData } from '@/utils/crud';
import { DB_ANIMALS, joinLink } from '@/utils/serverLink';
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Route & Router
const route = useRoute();
const router = useRouter();
const id = route.params.id as string;

// Animal & Modal Reference
const animal = ref<Animal>();
const child = ref<typeof Modal>();

const getAnimal = async () => {
  const data = await readDataOne<Animal>(joinLink(DB_ANIMALS, id));
  animal.value = data;
}

const onDeleteClick = () => {
  child.value?.closeModal();
}

const onEditClick = () => {
  router.push(joinLink(id, "edit"));
}

const deleteAnimal = () => {
  deleteData(DB_ANIMALS, +id);
  router.push('/');
}


onBeforeMount(() => {
  getAnimal();
})

</script>

<template>
  <main class="detail-view">
    <section v-if="animal" class="ui-container">
      <Image :imgName="animal.image" :imgAlt="animal.image" imgClass="animal-image" />
      <h2 class="animal-name">{{ animal.name }}</h2>
      <p class="animal-age">Age: {{ animal.age }}</p>
      <p class="animal-species">Species: {{ animal.species }}</p>

      <div class="button-container">
        <Button innerText="Edit" styleClass="green" :onClick="onEditClick" />
        <Button innerText="Delete" styleClass="red" :onClick="onDeleteClick" />
      </div>
    </section>
  </main>
  <Modal @onClickSubmit="deleteAnimal" ref="child" />
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
