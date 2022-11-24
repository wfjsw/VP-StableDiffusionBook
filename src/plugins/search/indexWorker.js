import FlexSearch from 'flexsearch'

const state = {
    idx: null,
    preview: null,
}

async function loadIndex() {
    const [{ indexData, options }, { previewLookup }] = await Promise.all([
        import('virtual:search-index'),
        import('virtual:search-preview'),
    ])

    state.idx = FlexSearch({
        ...options,
        encode: (str) => {
            const filter = options.filter ?? []
            const stemmer = options.stemmer ? Object.entries(options.stemmer) : []

            const eng = Array.from(str.toLowerCase().matchAll(/[a-z0-9]+/gi))
                .map((n) => n[0])
                .map((n) => {
                    for (const [key, value] of stemmer) {
                        if (n.endsWith(key)) return n.slice(0, -key.length) + value
                    }
                    return n
                })
            const chs = str.replaceAll(/[a-zA-Z0-9]+/g, '').split('')
            return eng
                .concat(chs)
                .filter((n) => !!n)
                .filter((n) => n.trim() !== '')
                .filter((n) => !filter.includes(n))
        },
    })

    state.idx.registry = indexData.reg
    state.idx.cfg = indexData.cfg 
    state.idx.map = indexData.map
    state.idx.ctx = indexData.ctx

    state.preview = previewLookup
}

async function search({ query, origin }) {
    if (!state.idx || !state.preview) throw new Error('index not ready')
    const searchResults = state.idx.search(query, 10)
    const search = []

    for (let i = 0; i < searchResults.length; i++) {
        const id = searchResults[i]
        const item = state.preview[id]

        const title = item['t']
        const preview = item['p']
        const link = item['l']
        const anchor = item['a']
        const pageTitle = item['T']
        const pageLink = origin + link.slice(0, link.indexOf('#'))
        search.push({
            id: i,
            link,
            title,
            preview,
            anchor,
            pageTitle,
            pageLink,
        })
    }
    return search
}

const exported = {
    loadIndex,
    search,
}
 
self.addEventListener(
    'message',
    async function (e) {
        const { type, callbackID, ...args } = e.data
        try {
            const result = await exported[type](args)
            self.postMessage({ type: 'success', callbackID, result })
        } catch (e) {
            self.postMessage({ type: 'error', callbackID, result: e })
        }
    },
    false
)
