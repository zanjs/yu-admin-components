<template>
  <div class="yu-container-ghost-bs">
    <div v-if="$slots.header" class="yu-container-ghost-bs__header" ref="header">
      <slot name="header"/>
    </div>
    <div class="yu-container-ghost-bs__body" ref="wrapper">
      <div>
        <slot/>
      </div>
    </div>
    <div v-if="$slots.footer" class="yu-container-ghost-bs__footer" ref="footer">
      <slot name="footer"/>
    </div>
  </div>
</template>

<script>
import bs from './mixins/bs'
export default {
  name: 'yu-container-card-bs',
  mixins: [
    bs
  ]
}
</script>
