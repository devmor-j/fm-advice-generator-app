<script setup>
import { onMounted, reactive, ref } from 'vue';

// request below will get a random advice from api
const adviceApiUrl = 'https://api.adviceslip.com/advice';

function waitForAdvice(getAdviceElement) {
  isApiWaiting.value = true;

  setTimeout(() => {
    isApiWaiting.value = false;
  }, 1500);

  getAdviceElement.classList.add('roll-animation');

  // prefersReducedMotion is true if user prefers reduced motion;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // in case user prefers a reduced motion content
    // we do not need to hide quote element
    // so there will be no transition
    return;
  }

  // if user is ok with transitions
  // we trigger a simple one
  isQuoteShown.value = false;
}

function finishWaitForAdvice(getAdviceElement) {
  isQuoteShown.value = true;

  getAdviceElement.addEventListener('animationiteration', () => {
    getAdviceElement.classList.remove('roll-animation');
  });
}

async function getRandomAdvice({ target }) {
  // handle animations and hide current advice
  waitForAdvice(target);

  // call advice api
  const response = await fetch(adviceApiUrl);
  const data = await response.json();

  // inject new advice to dom
  setAdvice(data.slip);

  // finish waiting animations and reveal new advice
  finishWaitForAdvice(target);
}

let quote = reactive({
  id: 117,
  advice: "It is easy to sit up and take notice, what's difficult is getting up and taking action."
});

function setAdvice(data) {
  quote.id = data.id;
  quote.advice = data.advice;
}

let isQuoteShown = ref(true);
let isApiWaiting = ref(false);

// on each page refresh a new advice is recieved
// onMounted(getRandomAdvice);
</script>

<template>
  <div class="card">
    <h1>Advice #{{ quote.id }}</h1>
    <transition name="quote">
      <q v-show="isQuoteShown">{{ quote.advice }}</q>
    </transition>

    <picture class="separator-line">
      <source media="(min-width: 768px)" srcset="../assets/images/pattern-divider-desktop.svg">
      <img src="../assets/images/pattern-divider-mobile.svg" alt="" draggable="false">
    </picture>

    <div class="get-advice-wrapper">
      <button class="get-advice glow-hover" @click="getRandomAdvice" :disabled="isApiWaiting">
        <img src="@/assets/images/icon-dice.svg" alt="get advice" draggable="false">
      </button>
    </div>

  </div>
</template>

<style scoped>
.quote-enter-active,
.quote-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease-in-out;
}

.quote-enter-from,
.quote-leave-to {
  opacity: 0;
  transform: translateY(10%);
}

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

@media screen and (min-width: 768px) {
  .card {
    width: min(100% - 2rem, 32rem);
  }
}

h1 {
  color: hsl(150, 100%, 66%);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.25rem;
  padding-block: 1.25rem;
}

q {
  font-size: 1.75rem;
  font-weight: 700;
  text-align: center;
}

q::before,
q::after {
  opacity: 0.5;
}

.separator-line {
  padding-block: 1.5rem;
  min-width: 100%;
  user-select: none;
}

.separator-line > * {
  min-width: 100%;
  margin: auto;
}

.get-advice-wrapper {
  position: absolute;
  bottom: -10%;
}

.get-advice {
  background-color: hsl(150, 100%, 66%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.375rem;
  border-radius: 50%;
  border: none;
  cursor: pointer;
}

.get-advice[disabled] {
  background-color: hsl(150, 50%, 66%);
  cursor: wait;
}

.glow-hover {
  position: relative;
}

.glow-hover::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  opacity: 0;
  box-shadow: 0px 0px 36px hsl(150, 100%, 66%);
  transition: opacity 0.3s cubic-bezier(0.16, 0.85, 0.45, 1);
}

.glow-hover:hover::after {
  opacity: 1;
}

.roll-animation {
  animation: roll 0.5s ease-in-out 10;
}

@keyframes roll {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
