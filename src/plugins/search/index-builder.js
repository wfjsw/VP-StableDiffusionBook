import MarkdownIt from "markdown-it";
import FlexSearch from "flexsearch";
import buildDocs from "./docs-builder.js";

const md = new MarkdownIt();
const MAX_PREVIEW_CHARS = 64; // Number of characters to show for a given search result

const buildIndexSearch = (docs, options) => {
    const searchIndex = new FlexSearch.Index({
        ...options, encode: (str) => {
            const filter = options.filter ?? []
            const eng = Array.from(str.matchAll(/[a-zA-Z0-9]+/g)).map(n => n[0])
            const chs = str.replaceAll(/[a-zA-Z0-9]+/g, '').split('')
            return eng.concat(chs)
                .filter(n => !!n)
                .filter(n => n.trim() !== '')
                .filter(n => !filter.includes(n))
        }
    });
    for (const doc of docs) {
        searchIndex.add(doc.id, doc.a.toLowerCase() + "\n" + doc.b.toLowerCase());
    }
    return searchIndex;
};

function buildPreviews(docs) {
    const result = {};
    for (const doc of docs) {
        let preview = md.render(doc["b"]).replace(/(<([^>]+)>)/gi, "");
        if (preview == "") preview = doc["b"];

        if (preview.length > MAX_PREVIEW_CHARS)
            preview = preview.slice(0, MAX_PREVIEW_CHARS) + " ...";

        preview = preview.trim()
        result[doc["id"]] = {
            t: doc["a"],
            p: preview,
            l: doc["link"],
            a: doc["a"], 
            T: doc["T"],
        };
    }
    return result;
}

export async function IndexSearch(
    HTML_FOLDER,
    options
) {
    // console.log("  🔎 Indexing...");
    const docs = await buildDocs(HTML_FOLDER);
    const previews = buildPreviews(docs);
    const flexIdx = buildIndexSearch(docs, options);

    // Shitful hack to get reasonable export
    // https://github.com/nextapps-de/flexsearch/blob/master/src/serialize.js
    const indexExport = {
        reg: JSON.stringify(flexIdx.register),
        cfg: JSON.stringify({
            doc: 0,
            opt: flexIdx.optimize ? 1 : 0,
        }),
        map: JSON.stringify(flexIdx.map),
        ctx: JSON.stringify(flexIdx.ctx),
    };

    const js = `export const indexData = ${JSON.stringify(indexExport)};
export const previewLookup = ${JSON.stringify(previews)};
export const options = ${JSON.stringify(options)};
`;

    // console.log("  🔎 Done.");

    return js;
}
