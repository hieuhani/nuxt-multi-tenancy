<template>
  <div class="articles-wrapper">
    <tenant-card v-if="tenantInfo" :organization="tenantInfo">
      {{ tenantInfo }}
    </tenant-card>
    <article-item
      v-for="article in articles"
      :key="article.id"
      :article="article"
    />
  </div>
</template>

<script setup lang="ts">
import { useTenant } from "#imports";
import { useFetch } from "#imports";
import type { Article, Organization } from "~/services/devto/types";

const tenant = useTenant();

const { data: tenantInfo, error } = await useFetch<Organization>(
  `https://dev.to/api/organizations/${tenant}`
);

const { data: articles } = await useFetch<Article[]>(
  error.value?.statusCode === 404
    ? `https://dev.to/api/articles?username=${tenant}`
    : `https://dev.to/api/organizations/${tenant}/articles`
);
</script>

<style lang="css">
.articles-wrapper {
  display: grid;
  grid-gap: 1rem;
}
</style>
