<template>
  <article class="job-card">
    <NuxtLink :to="job.slug">
      <div class="organization">
        <div class="avatar">
          <img :src="job.organization.avatar" :alt="job.organization.name">
        </div>
        <div>
          <h3 class="title">
            {{ job.title }}
          </h3>
          <p class="name">
            at {{ job.organization.name }}
          </p>
        </div>
      </div>
      <div class="badges">
        <span v-for="badge in badges" :key="badge.id" class="badge">
          <img
            v-if="badge.icon"
            :src="badge.icon"
            :alt="badge.label"
            width="20"
            height="20"
          >
          {{ badge.label }}
        </span>
      </div>
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Job } from "~/services/vuejobs/types";

type Badge = { id: string; label: string; icon?: string };
const props = defineProps<{
  job: Job;
}>();

const badges = computed<Badge[]>(
  () =>
    [
      ["ONLY", "HYBRID"].includes(props.job.remote.type || "")
        ? { id: "remote", label: "Remote" }
        : null,

      props.job.salary.from && props.job.salary.to
        ? {
            id: "salary",
            label: `${props.job.salary.currency} ${props.job.salary.from} - ${props.job.salary.to}/${props.job.salary.interval}`,
          }
        : null,
      ...Object.values(
        props.job.locations.reduce((prev, current) => {
          return {
            ...prev,
            [current.country.code]: {
              id: current.country.code,
              label: current.country.name,
              icon: `https://hatscripts.github.io/circle-flags/flags/${current.country.code.toLowerCase()}.svg`,
            },
          };
        }, {})
      ),
    ].filter(Boolean) as Badge[]
);
</script>

<style lang="css">
.job-card {
  background-color: #fff;
  padding: 1rem 1rem;
  border-radius: 0.5rem;
}
.job-card .badges {
  font-size: 0.75rem;
  line-height: 1rem;
  align-items: center;
  gap: 0.5rem;

  flex-wrap: wrap;
  display: flex;
  margin-top: 0.75rem;
}

.job-card .badge {
  font-weight: 500;
  padding-bottom: 0.125rem;
  padding-top: 0.125rem;
  padding-left: 0.375rem;
  padding-right: 0.375rem;
  background-color: #f3f4f6;
  border-radius: 0.5rem;
  gap: 0.375rem;
  align-items: center;
  display: inline-flex;
}
.job-card .badge img {
  height: 0.75rem;
}
.job-card .organization {
  display: flex;
}

.job-card .organization .title {
  line-height: 1.25;
  font-weight: 700;
  font-size: 1.125rem;
  margin-bottom: 0;
}
.job-card .organization .name {
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  display: flex;
  align-items: center;
  color: #6b7280;
}
.job-card .avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  overflow: hidden;
  margin-right: 1rem;
}
.job-card .avatar img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}
</style>
