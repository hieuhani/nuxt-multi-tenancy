<template>
  <div class="articles-wrapper">
    <a :href="jobLink" class="jobs-link">Jobs</a>
    <article-item
      v-for="article in articles"
      :key="article.id"
      :article="article"
    />
  </div>
</template>

<script setup lang="ts">
import { useFetch, useAppConfig } from "#imports";
import type { Article } from "~/services/devto/types";

const config = useAppConfig();

const [protocol, hostname] = config.url.split("//");
const jobLink = `${protocol}//jobs.${hostname}`;

const { data: articles } = await useFetch<Article[]>(
  "https://dev.to/api/articles"
);
</script>

<style lang="css">
.articles-wrapper {
  display: grid;
  grid-gap: 1rem;
}

.articles-wrapper .jobs-link {
  display: block;
  padding: 0.8rem;
  text-align: center;
  background-color: #18181b;
  color: #fff;
  border-radius: 0.5rem;
}
</style>
