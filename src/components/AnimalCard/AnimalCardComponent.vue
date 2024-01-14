<script setup lang="ts">
import type { Animal } from '../../types/animal'
import Image from '../Image/ImageComponent.vue'
type AnimalCardProp = {
  animalData?: Animal;
}
const props = defineProps<AnimalCardProp>()
</script>

<template>
  <span v-if="(!props.animalData)">Loading...</span>
  <div v-else :class="css.animal">
    <Image :imgName="props.animalData.image" :imgAlt="props.animalData.image" :imgClass="css.animalImage"/>
    <RouterLink :class="css.link" :to="`/preview/${props.animalData.id}`"><h2 :class="css.animalName">{{ props.animalData.name }}</h2></RouterLink>
    
  </div>
</template>

<style module="css">
.animal {
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  padding: 1em;

  align-items: center;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.5);
}

.link {
  text-decoration: none;
  color:black
}

.animalImage {
  width: 200px;
  height: 200px;
  border-radius: 5px;
  user-select: none;
}

.animalName {
  margin: 0;
  margin-top: .5rem;
  cursor: pointer;
  border-bottom: 1px solid black;
}
</style>