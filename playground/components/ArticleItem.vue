<template>
  <article class="article-item">
    <NuxtLink :to="`http://${article.user.username}.localhost:3000/${article.slug}`">
      <h3 class="title">
        {{ article.title }}
      </h3>
    </NuxtLink>
    <p class="description">
      {{ article.description }}
    </p>
    <div class="post-bar">
      <NuxtLink :to="`http://${article.user.username}.localhost:3000`" class="article-user">
        <div class="user-avatar">
          <img :src="article.user.profile_image_90" />
        </div>
        <h3 class="name">{{ article.user.name }}</h3>
      </NuxtLink>
    </div>
  </article>
</template>


<script setup lang="ts">
import type { Article } from '../devto/types'

defineProps<{
  article: Article
}>()
</script>

<style lang="css">
.article-item {
  background-color: #fff;
  padding: 1rem 1rem;
}

.article-item .title {
  font-weight: 500;
  margin-bottom: .5rem;
}

.article-item .description {
  margin-bottom: .5rem;
}

.article-item .post-bar {
  display: flex;
  align-items: center;
}

.article-item .article-user {
  display: flex;
  align-items: center;
}

.article-item .article-user:hover {
  text-decoration: underline;
  color: #3b82f6;
}

.article-item .article-user .user-avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  overflow: hidden;
  margin-right: .5rem;
  border: 2px solid #3b82f6;
}

.article-item .article-user .name {
  font-size: 1rem;
}
</style>
