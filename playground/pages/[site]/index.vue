<template>
  <div class="articles-wrapper tenant">
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
import { computed, useTenant } from "#imports";
import { useFetch, createError } from "#imports";
import type { Article, Organization } from "~/services/devto/types";
import { useServerSeoMeta, useServerHead } from "@unhead/vue";

const tenant = useTenant();

const { data: tenantInfo, error } = await useFetch<Organization>(
  `https://dev.to/api/organizations/${tenant}`
);

const isUserTenant = error.value?.statusCode === 404;

useServerSeoMeta({
  title: tenantInfo.value?.name,
  description: tenantInfo.value?.summary,
  ogImage: tenantInfo.value?.profile_image,
});

const { data: articles, error: articlesError } = await useFetch<Article[]>(
  isUserTenant
    ? `https://dev.to/api/articles?username=${tenant}`
    : `https://dev.to/api/organizations/${tenant}/articles`
);

if (isUserTenant && articlesError.value?.statusCode === 404) {
  throw createError({ statusCode: 404, statusMessage: "Tenant not found 😝" });
}

const canonical = computed(() =>
  tenantInfo.value ? tenantInfo.value?.url + tenantInfo.value?.username : ""
);

useServerHead({
  link: [
    {
      rel: "canonical",
      href: canonical.value,
    },
  ],
});
</script>

<style lang="css">
.articles-wrapper {
  display: grid;
  grid-gap: 1rem;
}
</style>
