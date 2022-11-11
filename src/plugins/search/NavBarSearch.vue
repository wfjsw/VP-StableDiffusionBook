<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import SearchBox from './SearchBox.vue'

const metaKey = ref('Ctrl')
const open = ref(false)
const searchBox = ref()

const openSearch = () => {
    setTimeout(() => {
        searchBox.value?.focus()
    }, 100)
    cleanSearch()
    open.value = true
}

const handleSearchHotKey = (e) => {
    if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        openSearch()
    }
}

onMounted(async () => {
    metaKey.value = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)
        ? '⌘'
        : 'Ctrl'

    window.addEventListener('keydown', handleSearchHotKey)
})

onUnmounted(async () => {
    window.removeEventListener('keydown', handleSearchHotKey)
})

function cleanSearch() {
    open.value = false
    searchBox.value?.clear()
}
</script>

<template>
    <div class="VPNavBarSearch">
        <ClientOnly>
            <Teleport to="body">
                <div v-show="open" class="modal-back DocSearch" @click="open = false">
                    <SearchBox @close="open = false" ref="searchBox" />
                </div>
            </Teleport>
        </ClientOnly>
        <div id="docsearch" @click="openSearch()">
            <button
                type="button"
                class="DocSearch DocSearch-Button"
                aria-label="Search">
                <span class="DocSearch-Button-Container">
                    <svg
                        width="20"
                        height="20"
                        class="DocSearch-Search-Icon"
                        viewBox="0 0 20 20">
                        <path
                            d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
                            stroke="currentColor"
                            fill="none"
                            fill-rule="evenodd"
                            stroke-linecap="round"
                            stroke-linejoin="round"></path>
                    </svg>
                    <span class="DocSearch-Button-Placeholder">搜索</span>
                </span>
                <span class="DocSearch-Button-Keys">
                    <kbd class="DocSearch-Button-Key">{{ metaKey }}</kbd>
                    <kbd class="DocSearch-Button-Key">K</kbd>
                </span>
            </button>
        </div>
    </div>
</template>

<style scoped>
.VPNavBarSearch {
    display: flex;
    align-items: center;
    padding: 0 16px;
}

.modal-back {
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #545454b3;
    position: fixed;
    z-index: 30;
}

.DocSearch-Button-Keys {
    display: none;
}

@media (min-width: 768px) {
    .DocSearch-Button .DocSearch-Button-Key {
        display: inline-block;
    }

    .DocSearch-Button-Keys {
        display: flex;
        min-width: calc(40px + 0.8em);
        border: 1px solid #666666;
        border-radius: 4px;
        
    }
}

.DocSearch-Button .DocSearch-Button-Key {
    margin-top: 2px;
    border: 1px solid var(--vt-c-divider);
    border-right: none;
    border-radius: 4px 0 0 4px;
    display: none;
    padding-left: 6px;
    height: 22px;
    line-height: 22px;
    transition: color 0.5s, border-color 0.5s;
    min-width: 0;
}
.DocSearch-Button-Key {
    font-size: 12px;
    font-weight: 500;
    height: 20px;
    margin: 0;
    width: auto;
    color: var(--vt-c-text-3);
    transition: color 0.5s;
    display: inline-block;
    padding: 0 1px;
}
.DocSearch-Button-Key {
    align-items: center;
    background: var(--c-brand-light);
    border-radius: 3px;
    box-shadow: var(--c-brand);
    color: var(--docsearch-muted-color);
    display: flex;
    height: 18px;
    justify-content: center;
    margin-right: 0.4em;
    padding-bottom: 2px;
    position: relative;
    top: -1px;
    width: 20px;
}

body.dark .DocSearch-Button:hover {
    box-shadow: none;
}

.DocSearch {
    --docsearch-primary-color: var(--vp-c-brand);
    --docsearch-highlight-color: var(--docsearch-primary-color);
    --docsearch-text-color: var(--vp-c-text-1);
    --docsearch-muted-color: #ebebeb99;
    --docsearch-searchbox-shadow: none;
    --docsearch-searchbox-focus-background: transparent;
    --docsearch-key-gradient: transparent;
    --docsearch-key-shadow: none;
    --docsearch-modal-background: var(--vp-c-bg-soft);
    --docsearch-footer-background: var(--vp-c-bg);
    --docsearch-spacing: 0.5rem;
}

.dark .DocSearch {
    --docsearch-modal-shadow: none;
    --docsearch-footer-shadow: none;
    --docsearch-logo-color: #ebebeb99;
    --docsearch-hit-background: #2f2f2f;
    --docsearch-hit-color: #ebebeb99;
    --docsearch-hit-shadow: none;
}

.DocSearch-Button-Container {
    align-items: center;
    display: flex;
}

.DocSearch-Button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    width: 48px;
    height: 55px;
    background: transparent;
    border: none;
}

.DocSearch-Button:hover {
    background: transparent;
}
.DocSearch-Button:focus {
    outline: 1px dotted;
    outline: 5px auto -webkit-focus-ring-color;
}
.DocSearch-Button:focus:not(:focus-visible) {
    outline: none !important;
}

@media (min-width: 768px) {
    .DocSearch-Button {
        justify-content: flex-start;
        width: 100%;
    }
}

.DocSearch-Button .DocSearch-Search-Icon {
    transition: color 0.5s;
    fill: currentColor;
    width: 18px;
    height: 18px;
    position: relative;
}

@media (min-width: 768px) {
    .DocSearch-Button .DocSearch-Search-Icon {
        top: 1px;
        margin-right: 10px;
        width: 15px;
        height: 15px;
    }
}

.DocSearch-Button:hover .DocSearch-Search-Icon {
    color: var(--vt-c-text-1);
}

.DocSearch-Button-Placeholder {
    transition: color 0.5s;
    font-size: 13px;
    font-weight: 500;
    color: #999999cc;
    display: none;
    padding: 0 10px 0 0;
}

@media (min-width: 960px) {
    .DocSearch-Button-Placeholder {
        display: inline-block;
    }
}

.DocSearch-Button:hover .DocSearch-Button-Placeholder {
    color: var(--vt-c-text-1);
}

.DocSearch-Button .DocSearch-Button-Key {
    margin-top: 2px;
    border: 1px solid var(--vt-c-divider);
    border-right: none;
    border-radius: 4px 0 0 4px;
    display: none;
    padding-left: 6px;
    height: 22px;
    line-height: 22px;
    transition: color 0.5s, border-color 0.5s;
    min-width: 0;
}

.DocSearch-Button .DocSearch-Button-Key + .DocSearch-Button-Key {
    border-right: 1px solid var(--vt-c-divider);
    border-left: none;
    border-radius: 0 4px 4px 0;
    padding-left: 2px;
    padding-right: 6px;
}

.DocSearch-Button:hover .DocSearch-Button-Key {
    /* border-color: var(--vt-c-brand-light); */
    color: var(--vt-c-brand-light);
}

@media (min-width: 768px) {
    .DocSearch-Button .DocSearch-Button-Key {
        display: inline-block;
    }
}

.DocSearch-Button-Key {
    font-size: 12px;
    font-weight: 500;
    height: 20px;
    margin: 0;
    width: auto;
    color: var(--vt-c-text-3);
    transition: color 0.5s;
    display: inline-block;
    padding: 0 1px;
}

.DocSearch-Container,
.DocSearch-Container * {
    box-sizing: border-box;
}
</style>
