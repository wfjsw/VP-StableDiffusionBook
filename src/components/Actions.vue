<script setup>
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue'
</script>

<template>
    <div class="actions">
        <div class="action">
            <VPButton size="medium" theme="brand" href="/guide/index" text="新手指南" />
        </div>
        <div class="action">
            <VPButton size="medium" theme="alt" href="/advanced/index" text="进阶深入" />
        </div>
        <div class="action">
            <VPButton size="medium" theme="alt" href="https://github.com/wfjsw/VP-StableDiffusionBook" target="_blank" text="在 GitHub 上查看" />
        </div>
    </div>
</template>

<style scoped>
.actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}
</style>
