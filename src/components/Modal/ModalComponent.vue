<script setup lang="ts">
import Button from '../Button/ButtonComponent.vue';
import {ref} from 'vue'

type ModalProp = {
  heading?: string;
  sub?: string
}

const emit = defineEmits(['onClickSubmit']);
const showModal = ref(false);
const {heading, sub} = withDefaults(defineProps<ModalProp>(), {
  heading: "Are you sure?",
  sub:"There is no undo button, what is lost is lost!",
});

const onClickSubmit = () => {
  emit("onClickSubmit");
}

const closeModal = () => {
  showModal.value = !showModal.value;
}

defineExpose({closeModal});
</script>

<template>
  <div v-if="showModal" :class="css.modal">

    <div :class="css.modal_content">
      <Button innerText="✖" :styleClass="css.close" :onClick="closeModal" />
      <p :class="css.info_bold">{{ heading }}</p>
      <p>{{ sub }}</p>
      <div :class="css.button_container">
        <Button :onClick="closeModal" innerText="Cancel" styleClass="green" />
        <Button innerText="Submit" styleClass="red" :onClick="onClickSubmit" />
      </div>
    </div>
  </div>
</template>

<style src="./Modal.css" module="css"></style>