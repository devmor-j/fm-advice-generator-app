<script setup>
</script>

<template>
  <div class="card">
    <h1>Advice #117</h1>
    <q>It is easy to sit up and take notice, what's difficult is getting up and taking action.</q>
    <picture class="separator-line">
      <source media="(min-width: 768px)" srcset="../assets/images/pattern-divider-desktop.svg">
      <img src="../assets/images/pattern-divider-mobile.svg" alt="">
    </picture>
    <button class="get-advice">
      <img src="@/assets/images/icon-dice.svg" alt="get advice">
    </button>
  </div>
</template>

<style scoped>
.card {
  background-color: hsl(217, 19%, 24%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  padding-block-end: 3rem;
  border-radius: 0.75rem;
  position: relative;
  width: min(100% - 2rem, 25rem);
  margin-inline: auto;
}

h1 {
  color: hsl(150, 100%, 66%);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.25rem;
  padding-block: 1.5rem;
}

q {
  font-size: 1.75rem;
  font-weight: 700;
  text-align: center;
}

.separator-line {
  padding-block: 1.5rem;
}

.get-advice {
  background-color: hsl(150, 100%, 66%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  border-radius: 50%;
  border: none;
  position: absolute;
  bottom: -10%;
}
</style>
