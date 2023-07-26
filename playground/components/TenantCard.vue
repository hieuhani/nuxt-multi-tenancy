<template>
  <div class="tenant-card">
    <div class="profile-image">
      <img :src="organization.profile_image" />
    </div>
    <div class="profile-info">
      <h3 class="name">
        {{ organization.name }}
      </h3>
      <p class="tag-line">
        {{ organization.tag_line }}
      </p>
      <p class="joined-on">Joined on: {{ joinedOn }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Organization } from "services/devto/types";

const props = defineProps<{
  organization: Organization;
}>();

const joinedOn = computed(() => props.organization.joined_at.substring(0, 10));
</script>

<style lang="css">
.tenant-card {
  background-color: #fff;
  padding: 1rem 1rem;
  display: flex;
  align-items: center;
}

.tenant-card .profile-image {
  width: 100px;
  margin-right: 1rem;
}

.tenant-card .name {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}
.tenant-card .profile-image img {
  width: 100%;
}
</style>
