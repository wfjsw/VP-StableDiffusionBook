<script setup>

const props = defineProps({
    item: Object,
    origin: String,
})
</script>

<template>
    <a :href="origin + item.link">
        <div class="search-item">
            <span class="search-item-icon">{{
                item.link.includes('#') ? '#' : '▤'
            }}</span>
            <div class="search-item-content">
                <h3 class="preview">{{ item.preview || '<多媒体内容>' }}</h3>
                <p class="chapter-header">{{ item.title }}</p>
            </div>
            <span class="search-item-icon">↪</span>
        </div>
    </a>
</template>

<style scoped lang="scss">

.search-item-icon {
    font-family: none;
    align-self: center;
    padding: 0 1rem 0 0;
    font-size: x-large;
}

.search-item {
    padding: 0.25rem 1rem;
    margin: 8px 0 0 0;
    border: solid 1px;
    border-radius: 6px;
    display: flex;

    border-color: var(--vp-custom-block-details-border);
    color: var(--vp-custom-block-details-text);
    background-color: var(--vp-custom-block-details-bg);
}

.search-item p {
    margin: 0px;
    font-size: smaller;
    color: var(--c-text-light-3);
}

.search-item:hover {
    color: #fff;
    background: var(--vp-c-brand-dark);
}

.search-item:hover > p {
    color: #fff;
}

/* .dark .search-item > p {
  color: var(--c-text-light-2);
} */

.preview {
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis
}

.search-item-content {
    width: 100%;
    overflow: hidden;
}

.chapter-header {
    font-weight: 600;
}

</style>
