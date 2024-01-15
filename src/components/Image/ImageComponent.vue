<script setup lang="tsx">
type ImageData = {
  imgName: string,
  imgClass: string,
  imgAlt: string,
};

const props = defineProps<ImageData>();

const CImage = ({ imgName, imgClass, imgAlt }: ImageData) => {
  const src = `https://www.randomlists.com/img/animals/${imgName.toLowerCase().replace(/[\s']/g, '_')}.webp`;
  return <img src={src} alt={imgAlt} class={"base_img "+imgClass} />;
}
</script>

<template>
  <CImage :imgName="props.imgName" :imgClass="props.imgClass" :imgAlt="props.imgAlt" />
</template>

<style>
.base_img {
  min-width: 200px;
  min-height: 200px;
  border-radius: 5px;
  user-select: none;
  background-image: url('../../assets/default.jpg');
}
</style>
