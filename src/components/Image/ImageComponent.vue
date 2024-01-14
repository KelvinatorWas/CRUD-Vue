<script setup lang="tsx">
type ImageData = {
  imgName: string,
  imgClass: string,
  imgAlt: string,
};

const props = defineProps<ImageData>();

const CImage = ({ imgName, imgClass, imgAlt }: ImageData) => {
  const src = `https://www.randomlists.com/img/animals/${imgName.toLowerCase().replace(/[\s']/g, '_')}.webp`;
  return <img src={src} alt={imgAlt} className={imgClass} />;
}
</script>

<template>
  <CImage :imgName="props.imgName" :imgClass="props.imgClass" :imgAlt="props.imgAlt" />
</template>
