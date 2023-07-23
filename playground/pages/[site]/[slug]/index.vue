<template>
  <div class="site-slug" v-if="article">
    <h3 class="title">
      {{ article.title }}
    </h3>
    <profile-card
      v-if="profile"
      :avatar="profile.avatar"
      :name="profile.name"
      :tenant="profile.tenant"
    />
    <article class="content prose" v-html="article.body_html" />
  </div>
</template>

<script setup lang="ts">
import { computed, useFetch, useRoute, useTenant } from "#imports";
import type { ArticleDetail } from "~/services/devto/types";

const route = useRoute();
const tenant = useTenant();

const { data: article } = await useFetch<ArticleDetail>(
  `https://dev.to/api/articles/${tenant}/${route.params.slug}`
);

const profile = computed(() =>
  !article.value
    ? null
    : article.value.organization
    ? {
        tenant: article.value.organization.slug,
        name: article.value.organization.name,
        avatar: article.value.organization.profile_image_90,
      }
    : {
        tenant: article.value.user.username,
        name: article.value.user.name,
        avatar: article.value.user.profile_image_90,
      }
);
</script>

<style>
.site-slug {
  background-color: #fff;
  padding: 1rem 1rem;
}

.site-slug .title {
  font-weight: 500;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

.site-slug .content {
}
</style>
