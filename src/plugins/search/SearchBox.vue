<script setup>
import { ref, onMounted, computed } from 'vue'
import { useData } from 'vitepress'
import FlexSearch from 'flexsearch'
import FlexLogo from './flex-logo.svg'

const emit = defineEmits(['close'])

const { localePath } = useData()

const metaKey = ref('Ctrl')
const searchTerm = ref()
const origin = ref('')
const input = ref()
const PREVIEW_LOOKUP = ref()
const searchIndex = ref()

const result = computed(() => {
    if (searchTerm.value) {
        const searchResults = searchIndex.value.search(searchTerm.value, 10)
        const search = []

        for (let i = 0; i < searchResults.length; i++) {
            const id = searchResults[i]
            const item = PREVIEW_LOOKUP.value[id]

            const title = item['t']
            const preview = item['p']
            const link = item['l'].split(' ').join('-')
            const anchor = item['a']
            search.push({ id: i, link, title, preview, anchor })
        }
        return search
    }
})

const GroupBy = (array, func) => {
    if (!array || !array.length) return []

    return array.reduce((acc, value) => {
        // Group initialization
        if (!acc[func(value)]) {
            acc[func(value)] = []
        }

        // Grouping
        acc[func(value)].push(value)

        return acc
    }, {})
}

onMounted(async () => {
    const { indexData, previewLookup, options } = await import(
        'virtual:search-data'
    )
    PREVIEW_LOOKUP.value = previewLookup
    origin.value = window.location.origin + localePath.value
    const document = FlexSearch({ ...options, encode: (str) => {
        const eng = Array.from(str.matchAll(/[a-zA-Z0-9]+/g)).map(n => n[0])
        const chs = str.replaceAll(/[a-zA-Z0-9]+/g, '').split('')
        return eng.concat(chs)
    }})

    document.registry = indexData.reg && JSON.parse(indexData.reg)
    document.cfg = indexData.cfg && JSON.parse(indexData.cfg)
    document.map = indexData.map && JSON.parse(indexData.map)
    document.ctx = indexData.ctx && JSON.parse(indexData.ctx)

    searchIndex.value = document

    metaKey.value = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)
        ? '⌘'
        : 'Ctrl'
})

function cleanSearch() {
    searchTerm.value = ''
    emit('close')
}

defineExpose({
    focus: () => input.value.focus(),
    clear: () => searchTerm.value = '',
})
</script>

<template>
    <div class="modal" @click.stop>
        <div class="modal-content">
            <form class="DocSearch-Form" @submit.prevent>
                <label
                    class="DocSearch-MagnifierLabel"
                    for="docsearch-input"
                    id="docsearch-label">
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
                </label>

                <input
                    class="DocSearch-Input"
                    aria-autocomplete="both"
                    aria-labelledby="docsearch-label"
                    id="docsearch-input"
                    autocomplete="off"
                    autocorrect="off"
                    autocapitalize="off"
                    enterkeyhint="search"
                    spellcheck="false"
                    autofocus="true"
                    v-model="searchTerm"
                    placeholder="Search docs"
                    maxlength="64"
                    type="search"
                    ref="input"
                    />
            </form>
            <div class="search-list">
                <div
                    v-for="(group, groupKey) of GroupBy(result, (x) =>
                        x.link.split('/').slice(0, -1).join('-')
                    )"
                    :key="groupKey">
                    <span class="search-group">{{
                        groupKey
                            ? groupKey.toString()[0].toUpperCase() +
                              groupKey.toString().slice(1)
                            : 'Home'
                    }}</span>
                    <a
                        :href="origin + item.link"
                        v-for="item in group"
                        :key="item.id"
                        @click="cleanSearch">
                        <div class="search-item">
                            <span class="search-item-icon">{{
                                item.link.includes('#') ? '#' : '▤'
                            }}</span>
                            <div style="width: 100%">
                                <h3>{{ item.title }}</h3>
                                <p v-html="item.preview"></p>
                            </div>
                            <span class="search-item-icon">↪</span>
                        </div>
                    </a>
                </div>
            </div>
            <div class="DocSearch-Footer">
                <img class="flex-logo" :src="FlexLogo" alt="flex logo" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.DocSearch-Footer {
    padding-top: 1rem;
    background-color: var(--docsearch-footer-background);
}

.flex-logo {
    width: 80px;
    margin-left: calc(100% - 90px);
    padding-bottom: 10px;
}

.search-list {
    padding: 1rem;
    min-height: 150px;
    max-height: calc(100vh - 230px);
    overflow-x: auto;
}

.search-item-icon {
    font-family: none;
    align-self: center;
    padding: 0 1rem 0 0;
    font-size: x-large;
}

.search-list > div {
    color: var(--vp-c-brand-dark);
    font-weight: bold;

    margin-bottom: 0.75rem;
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

.DocSearch-MagnifierLabel {
    margin: 16px;
    color: var(--c-brand-light);
    stroke-width: 2px;
}

.DocSearch-Input {
    appearance: none;
    background: #58565636;
    border: solid 1px var(--c-brand-light);
    color: var(--docsearch-text-color);
    flex: 1;
    font: inherit;
    font-size: 1.2em;
    height: 100%;
    outline: none;
    padding: 0 0 0 8px;
    width: 80%;
    margin: 8px;
    padding: 8px;
    border-radius: 6px;
}

.dark .DocSearch-Input {
    color: var(--vp-c-text-1);
    /* background-color: var(--vp-c-bg); */
}

.modal {
    background-color: var(--docsearch-modal-background);
    border-radius: 6px;
    box-shadow: none;
    flex-direction: column;
    margin: 80px auto auto;
    max-width: 560px;
    position: relative;
    /* box-shadow: inset 1px 1px 0 0 hsla(0, 0%, 100%, 0.5), 0 3px 8px 0 #555a64; */
}

@media (max-width: 768px) {
    .modal {
        max-width: 100%;
        border-radius: 0px;
    }
}

.dark .DocSearch-Form {
    background-color: var(--vt-c-bg-mute);
}

.DocSearch-Form {
    background-color: #fff;
    border: 1px solid var(--vt-c-brand);
}

.DocSearch-Form {
    align-items: center;
    background: var(--docsearch-searchbox-focus-background);
    border-radius: 4px;
    box-shadow: var(--docsearch-searchbox-shadow);
    display: flex;
    height: var(--docsearch-searchbox-height);
    margin: 0;
    padding: 0 var(--docsearch-spacing);
    position: relative;
    width: 100%;
}

.DocSearch-MagnifierLabel {
    color: var(--vp-c-brand-dark);
}

.dark .DocSearch-Footer {
    border-top: 1px solid var(--vt-c-divider);
}

.DocSearch-Form {
    background-color: white;
    border: 1px solid var(--vt-c-brand);
}
</style>
