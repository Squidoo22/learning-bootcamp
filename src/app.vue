<template>
  <gate-system />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GateSystem from './components/GateSystem.vue';

export default defineComponent({
  components: {
    GateSystem,
  },
});
</script>

<style lang="scss">
body {
  background: url(https://html5book.ru/wp-content/uploads/2015/07/background39.png);
}
</style>
