<script setup lang="ts">
import { RouterView } from 'vue-router';
import BaseLayout from '@/app/layout/layout.base.vue';
import { useAuthStore } from ':/auth/store/auth-store';

const auth = useAuthStore()
</script>

<template>
  	<div>
		<span v-if="auth.user">
			{{ auth.user.name }}
			<button @click="auth.logout">logout</button>
		</span>
		<span v-else>
			<router-link :to="{name: 'auth.login'}">login</router-link>
		</span>
	</div>
  <BaseLayout>
    <RouterView />
  </BaseLayout>
</template>

<style scoped>

</style>
