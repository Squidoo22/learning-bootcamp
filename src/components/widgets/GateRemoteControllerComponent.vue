<template>
  <div>
    <button @click="onRemoteControllerClick">
      <span></span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GateInterface from '../../ts/GateInterface';
import GateController from '../../ts/GateController';
import messagesController from '../../ts/MessagesController';

export default defineComponent({
  data() {
    return {
      gateController: new GateController(),
    };
  },
  created() {
    this.gateInterface = new GateInterface(this.gateController);
  },
  methods: {
    onRemoteControllerClick(): void {
      this.gateInterface.sendSignalOnGate();
      console.log(messagesController);
    },
  },
});
</script>
