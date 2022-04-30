<script setup>
import QuoteCard from '@/components/QuoteCard.vue';
</script>

<template>
  <main>
    <QuoteCard />
  </main>
</template>

<style scoped>
main {
  display: grid;
  align-items: center;
  justify-content: center;
  width: min(100% - 2rem, 25rem);
  margin-inline: auto;
  
}
</style>
