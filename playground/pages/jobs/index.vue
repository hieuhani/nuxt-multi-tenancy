<template>
  <div class="jobs-wrapper">
    <job-card v-for="job in jobs" :key="job.slug" :job="job" />
  </div>
</template>

<script setup lang="ts">
import { computed, useFetch } from "#imports";
import { Job } from "services/vuejobs/types";

const { data } = useFetch<{ data: Job[] }>(
  "https://app.vuejobs.com/posts/items"
);

const jobs = computed(() => data.value?.data || []);
</script>

<style lang="css">
.jobs-wrapper {
  display: grid;
  grid-gap: 1rem;
}
</style>
