<template>
  <div v-if="article" class="site-slug">
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
import { useServerSeoMeta, useServerHead } from "@unhead/vue";
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

useServerSeoMeta({
  title: article.value?.title,
  description: article?.value?.description,
  ogImageUrl: article?.value?.social_image || article?.value?.cover_image,
});

useServerHead({
  link: [
    {
      rel: "canonical",
      href: article.value?.canonical_url,
    },
  ],
});
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

.site-slug .content .ltag__link {
  border: 1px solid rgb(212, 212, 212);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.06);
  border-radius: 0.5rem;
  display: block;
  margin: 0.95em 0 1.2em;
  max-width: 100%;
}

.site-slug .content .ltag__link .ltag__link__org__pic {
  border-radius: 0.5rem;
  position: relative;
  display: inline-block;
  padding: calc(0.4vw + 8px) calc(0.8vw + 8px);
  padding-right: 10px;
  box-sizing: border-box;
}

.site-slug .content .ltag__link .ltag__link__content {
  display: inline-block;
  vertical-align: top;
  padding: calc(0.7vw + 6px);
  padding-left: 0;
  width: calc(100% - 2.5vw - 70px);
}

.site-slug .content .ltag__link .ltag__link__org__pic > img {
  display: inline-block;
  width: calc(2.2vw + 45px);
  height: calc(2.5vw + 40px);
  margin: auto auto !important;
  border-radius: 0.5rem;
  box-sizing: border-box;
  max-width: 55px;
  max-height: 55px;
}
.site-slug .content .ltag__link .ltag__link__user__pic {
  display: inline-block;
  position: absolute;
  right: 3px;
  bottom: calc(1vw);
  border: 2px solid #ccc;
  border-radius: 100%;
  box-sizing: border-box;
  width: calc(2vw + 28px);
  height: calc(2vw + 28px);
  max-width: 38px;
  max-height: 38px;
  border-radius: 100%;
}

.site-slug .content .ltag__link .ltag__link__user__pic img {
  display: inline-block;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  margin: 0;
}

.site-slug .content .ltag__link .ltag__link__content h2 {
  margin: 0;
  padding: 0;
  font-weight: 500;
  font-size: calc(1.45em + 0.2vw);
}
</style>
