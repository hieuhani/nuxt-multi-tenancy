<template>
  <div v-if="job" class="job-details">
    <div class="organization">
      <div class="avatar">
        <img :src="job.organization.avatar" :alt="job.organization.name" />
      </div>
      <div>
        <h3 class="title">
          {{ job.title }}
        </h3>
        <p class="name">at {{ job.organization.name }}</p>
      </div>
    </div>
    <div>
      <div class="prose" v-html="job.description"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetch, useRoute } from "#imports";
import { JobDetail } from "services/vuejobs/types";

const route = useRoute();

const { data: job } = await useFetch<JobDetail>(
  `https://app.vuejobs.com/posts/${route.params.slug}`
);
</script>

<style lang="css">
.job-details {
  background-color: #fff;
  padding: 1rem 1rem;
  border-radius: 0.5rem;
}

.job-details .organization {
  display: flex;
}

.job-details .organization .title {
  line-height: 1.25;
  font-weight: 700;
  font-size: 2rem;
  margin-bottom: 0;
}
.job-details .organization .name {
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.25rem;
  display: flex;
  align-items: center;
  color: #6b7280;
}
.job-details .avatar {
  width: 6rem;
  height: 6rem;
  border-radius: 0.75rem;
  overflow: hidden;
  margin-right: 1rem;
}
.job-details .avatar img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}

.job-details .prose * {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}
</style>
