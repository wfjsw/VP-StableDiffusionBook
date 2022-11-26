import MarkdownIt from 'markdown-it'
import attrsPlugin from 'markdown-it-attrs'
import FlexSearch from 'flexsearch'
import buildDocs from './docs-builder.js'
import { decode } from 'html-entities'
import { getEncoder } from './encoder.js'

const md = new MarkdownIt()
md.use(attrsPlugin)
const MAX_PREVIEW_CHARS = 64 // Number of characters to show for a given search result

const buildIndexSearch = (docs, options) => {
    const searchIndex = new FlexSearch.Index({
        ...options,
        encode: getEncoder(options),
    })
    for (const doc of docs) {
        if (doc.a.trim() !== '' && doc.b.trim() !== '') {
            searchIndex.add(doc.id, doc.a + '\n' + doc.b)
        }
    }
    return searchIndex
}

function buildPreviews(docs) {
    const result = {}
    for (const doc of docs) {
        let preview = md.render(doc['b']).replace(/(<([^>]+)>)/gi, '')
        if (preview == '') preview = doc['b']

        if (preview.length > MAX_PREVIEW_CHARS)
            preview = preview.slice(0, MAX_PREVIEW_CHARS) + '...'

        preview = decode(preview).trim()
        result[doc['id']] = {
            t: doc['a'],
            p: preview,
            l: doc['link'],
            a: doc['a'],
            T: doc['T'],
        }
    }
    return result
}

export async function buildIndex(HTML_FOLDER, options) {
    // console.log("  🔎 Indexing...");
    const docs = await buildDocs(HTML_FOLDER)
    const flexIdx = buildIndexSearch(docs, options)

    // Shitful hack to get reasonable export
    // https://github.com/nextapps-de/flexsearch/blob/master/src/serialize.js
    const indexExport = {
        reg: flexIdx.register,
        cfg: {
            doc: 0,
            opt: flexIdx.optimize ? 1 : 0,
        },
        map: flexIdx.map,
        ctx: flexIdx.ctx,
    }

    return `export const indexData = ${JSON.stringify(indexExport)};
export const options = ${JSON.stringify(options)};
`
}

export async function buildPreview(HTML_FOLDER) {
    const docs = await buildDocs(HTML_FOLDER)
    const previews = buildPreviews(docs)
    return `export const previewLookup = ${JSON.stringify(previews)};\n`
}
