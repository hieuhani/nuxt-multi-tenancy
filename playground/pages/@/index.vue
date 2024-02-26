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
import { useFetch } from "#imports";
import type { Article } from "~/services/devto/types";

const { data: articles } = await useFetch<Article[]>(
  "https://dev.to/api/articles"
);
</script>

<style lang="css">
.articles-wrapper {
  display: grid;
  grid-gap: 1rem;
}
</style>
