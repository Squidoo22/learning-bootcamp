<template>
  <gate-system-component />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GateSystemComponent from './components/GateSystemComponent.vue';

export default defineComponent({
  components: {
    GateSystemComponent,
  },
});
</script>

<style lang="scss">
body {
  background: url(https://html5book.ru/wp-content/uploads/2015/07/background39.png);
}
</style>
