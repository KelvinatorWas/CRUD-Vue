<script setup lang="ts">
import Button from '../Button/ButtonComponent.vue';
import { ref } from 'vue'

type ModalProp = {
  title?: string;
  message?: string;
  acceptionLabel?:string;
  rejectionLabel?:string;
}

// Emitters
const emit = defineEmits(['acceptCallback', 'rejectCallback', 'closeCallback']);
const showModal = ref(false);

// Props
const { title, message, acceptionLabel, rejectionLabel } = withDefaults(defineProps<ModalProp>(), {
  title: "Are you sure?",
  message: "There is no undo button, what is lost is lost!",
  acceptionLabel: "Submit",
  rejectionLabel: "Cancel",
});

// Modal Functions
const rejectCallback = () => {
  toggleModal();
  emit('rejectCallback');
};

const acceptCallback = () => {
  emit("acceptCallback");
};

const closeCallback = () => {
  toggleModal();
  emit('closeCallback');
};

const toggleModal = () => {
  // true -> show | false -> hide 
  showModal.value = !showModal.value;
};

defineExpose({ toggleModal });
</script>

<template>
  <div v-if="showModal" :class="css.modal">

    <div :class="css.modal_content">
      <Button label="✖" :style="css.close" :onClick="closeCallback" />
      <p :class="css.info_bold">{{ title }}</p>
      <p>{{ message }}</p>
      <div :class="css.button_container">
        <Button :label="rejectionLabel" :style="'success'" :onClick="rejectCallback" />
        <Button :label="acceptionLabel" :style="'danger'"  :onClick="acceptCallback" />
      </div>
    </div>
  </div>
</template>

<style src="./Modal.css" module="css"></style>