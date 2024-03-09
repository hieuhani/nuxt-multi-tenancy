<template>
  <article class="article-item">
    <NuxtLink :to="`${tenantHome}/${article.slug}`">
      <h3 class="title">
        {{ article.title }}
      </h3>
    </NuxtLink>
    <p class="description">
      {{ article.description }}
    </p>
    <div class="post-bar">
      <profile-card
        :avatar="profile.avatar"
        :name="profile.name"
        :tenant="profile.tenant"
      />
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Article } from "~/services/devto/types";
import { useBuildTenantUrl } from "~/services/url";

const props = defineProps<{
  article: Article;
}>();

const profile = props.article.organization
  ? {
      tenant: props.article.organization.slug,
      name: props.article.organization.name,
      avatar: props.article.organization.profile_image_90,
    }
  : {
      tenant: props.article.user.username,
      name: props.article.user.name,
      avatar: props.article.user.profile_image_90,
    };

const tenantHome = useBuildTenantUrl(profile.tenant);
</script>

<style lang="css">
.article-item {
  background-color: #fff;
  padding: 1rem 1rem;
}

.article-item .title {
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.article-item .description {
  margin-bottom: 0.5rem;
}

.article-item .post-bar {
  display: flex;
  align-items: center;
}
</style>
