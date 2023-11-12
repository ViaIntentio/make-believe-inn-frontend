
<script setup lang="ts">
import LayoutHeader from './layout.base.header.vue';
import LayoutFooter from './layout.base.footer.vue';
</script>

<template>
    <LayoutHeader />
    <main>
        <h1>BaseLayout A</h1>
        <slot></slot>
    </main>
    <LayoutFooter />
</template>
