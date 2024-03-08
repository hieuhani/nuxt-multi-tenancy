<template>
  <NuxtLink :to="tenantHome" class="profile-card">
    <div class="avatar">
      <img :src="avatar" alt="" />
    </div>
    <h3 class="name">
      {{ name }}
    </h3>
  </NuxtLink>
</template>

<script setup lang="ts">
import { useBuildTenantUrl } from "~/services/url";

const props = defineProps<{
  tenant: string;
  name: string;
  avatar: string;
}>();

const tenantHome = useBuildTenantUrl(props.tenant) || "/";
</script>

<style lang="css">
.profile-card {
  display: flex;
  align-items: center;
}

.profile-card:hover {
  text-decoration: underline;
  color: #3b82f6;
}

.profile-card .avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 0.5rem;
  border: 2px solid #3b82f6;
}

.profile-card .name {
  font-size: 1rem;
}
</style>
