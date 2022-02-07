<template>
  <div id="gateSchemaComponent" class="gate-schema">
    <div id="innerArea" class="inner-area" @dragover="onDragOver" @drop="onDrop"></div>
    <div id="gateArea" class="gate-area" :class="{'opened': gateOpenedState}" @dragover="onDragOver" @drop="onDrop"></div>
    <div id="outterArea" class="outter-area" @dragover="onDragOver" @drop="onDrop">
      <div id="automobile" class="automobile-draggable" draggable="true" @dragstart="onDragStart" @dragend="onDragEnd">
        This is a car!
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import GateSensor from '../../ts/GateSensor';

  export default defineComponent({
    name: 'gate-schema',
    data() {
      return {
        gateSensor: new GateSensor(),
        draggableElement: null,
        carLocation: 'outterArea'
      };
    },

    props: ['gateOpenedState'],

    methods: {
      onDragStart(event: any) {
        this.draggableElement = event.currentTarget;
        event.currentTarget.classList.add('dragging');
      },

      onDragOver(event: any) {
        if (this.carLocation === event.currentTarget.id || this.gateOpenedState) {
          event.preventDefault();
        }
      },

      onDrop(event: any) {
        if (this.carLocation !== event.currentTarget.id) {
          this.carLocation = event.currentTarget.id;
          event.currentTarget.appendChild(this.draggableElement);

          this.gateSensor.sendAlarm();
        }
      },

      onDragEnd(event: any) {
        this.draggableElement.classList.remove('dragging');
        this.draggableElement = null;
      }
    }
  });
</script>

<style lang="scss" scoped>
  .gate-schema {
    .inner-area, .outter-area, .gate-area {
      width: 70px;
      height: 70px;
      padding: 20px;
    }

    .inner-area, .outter-area {
      background-color: lightgreen;
    }

    .gate-area {
      background-color: lightsalmon;

      &.opened {
        background-color: greenyellow;
      }
    }

    .automobile-draggable {
      background-color: lightslategrey;
      width: 60px;
      height: 60px;
      border: 4px solid black;

      &.dragging {
        border-color: yellow;
      }
    }
  }
</style>
