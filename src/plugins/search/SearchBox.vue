<script setup>
import { ref, onMounted, computed } from 'vue'
import { useData } from 'vitepress'
import FlexSearch from 'flexsearch'
import FlexLogo from './flex-logo.svg'
import SearchItem from './SearchItem.vue'
import { getEncoder } from './encoder.js'

const emit = defineEmits(['close'])

const { localePath } = useData()

const searchTerm = ref()
const origin = ref('')
const input = ref()
const PREVIEW_LOOKUP = ref()
const searchIndex = ref()
const indexLoading = ref(false)

const indexLoaded = computed(
    () => !!searchIndex.value && !!PREVIEW_LOOKUP.value
)

const result = computed(() => {
    if (indexLoaded.value && searchTerm.value) {
        const searchResults = searchIndex.value.search(searchTerm.value, 25)
        const search = searchResults.map((id, i) => {
            const { t, p, l, a, T } = PREVIEW_LOOKUP.value[id]
            return {
                id: i,
                title: t,
                preview: p,
                link: l,
                anchor: a,
                pageTitle: T,
                pageLink: origin.value + l.slice(0, l.indexOf('#')),
            }
        })
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

async function loadSearchIndex() {
    if (indexLoading.value || indexLoaded.value) return
    indexLoading.value = true
    try {
        const [{ indexData, options }, { previewLookup }] =
            await Promise.all([
                import('virtual:search-index'),
                import('virtual:search-preview'),
            ])
        PREVIEW_LOOKUP.value = previewLookup
        const idx = FlexSearch({
            ...options,
            encode: getEncoder(options),
        })

        idx.registry = indexData.reg
        idx.cfg = indexData.cfg
        idx.map = indexData.map
        idx.ctx = indexData.ctx

        searchIndex.value = idx
    } finally {
        indexLoading.value = false
    }
}

onMounted(() => {
    origin.value = window.location.origin + localePath.value
})

function cleanSearch() {
    searchTerm.value = ''
    emit('close')
}

defineExpose({
    load: () => loadSearchIndex(),
    focus: () => input.value.focus(),
    clear: () => (searchTerm.value = ''),
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
                    placeholder="搜索文档"
                    maxlength="64"
                    type="search"
                    ref="input" />
            </form>
            <div class="search-list">
                <template v-if="indexLoaded">
                    <div
                        v-for="(group, groupKey) of GroupBy(
                            result,
                            (x) => x.pageTitle
                        )"
                        :key="groupKey">
                        <span class="search-group">
                            <a :href="group[0].pageLink">{{
                                groupKey
                                    ? groupKey.toString()[0].toUpperCase() +
                                      groupKey.toString().slice(1)
                                    : '主页'
                            }}</a></span
                        >
                        <SearchItem
                            v-for="item in group"
                            :key="item.id"
                            :item="item"
                            :origin="origin"
                            @click="cleanSearch" />
                    </div>
                </template>
                <template v-else>
                    <div class="index-loading">正在加载索引...</div>
                </template>
            </div>
            <div class="DocSearch-Footer">
                <img class="flex-logo" :src="FlexLogo" alt="flex logo" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.DocSearch-Footer {
    padding-top: 0.75rem;
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

.search-list > div {
    color: var(--vp-c-brand-dark);
    /* font-weight: bold; */

    margin-bottom: 0.75rem;

    &.index-loading {
        margin-top: 2rem;
        text-align: center;
        color: var(--docsearch-muted-color);
        font-size: 1.25rem;
    }
}

.DocSearch-MagnifierLabel {
    margin: 16px;
    color: var(--c-brand-light);
    stroke-width: 2px;
}

.DocSearch-Input {
    appearance: none;

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
    overflow: hidden;
}

@media (max-width: 768px) {
    .modal {
        max-width: 100%;
        border-radius: 0px;
        margin-top: 55px;
        max-height: 95vh;
    }
}

.dark .DocSearch-Form {
    // background-color: var(--vt-c-bg-mute);
    background: #58565636;
}

.DocSearch-Form {
    background-color: #fff;
    border: 1px solid var(--vt-c-brand);
}

.DocSearch-Form {
    align-items: center;
    background: var(--docsearch-searchbox-focus-background);
    box-shadow: var(--docsearch-searchbox-shadow);
    display: flex;
    height: var(--docsearch-searchbox-height);
    margin: 0;
    padding: 0 var(--docsearch-spacing);
    position: relative;
    width: 100%;

    // border-radius: 6px;
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
