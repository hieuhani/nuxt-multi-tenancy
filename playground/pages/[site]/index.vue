<template>
  <div>
    Tenant: {{ tenant }}
  </div>
</template>

<script setup>
import { useTenant } from '#imports'
const tenant = useTenant()
</script>
