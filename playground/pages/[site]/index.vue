<template>
  <div class="articles-wrapper">
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
import type { Article } from "~/services/devto/types";

const tenant = useTenant();
const { data: articles } = await useFetch<Article[]>(
  `https://dev.to/api/organizations/${tenant}/articles`
);
</script>

<style lang="css">
.articles-wrapper {
  display: grid;
  grid-gap: 1rem;
}
</style>
