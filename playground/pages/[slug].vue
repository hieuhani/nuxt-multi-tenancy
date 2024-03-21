<template>
  <div>Dynamic route: {{ route.params.slug }}</div>
</template>

<script setup lang="ts">
import { useRoute } from "#imports";

const route = useRoute();
</script>
