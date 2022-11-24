import { readdir, readFile } from 'fs/promises'
let rootPath = ''

const replaceMdSyntax = (mdCode) =>
    mdCode
        .replace(/\[(.*?)\]\(.*?\)/g, `$1`) // links
        .replace(/(\*+)(\s*\b)([^\*]*)(\b\s*)(\*+)/gm, `$3`) //bold

/**
 * Get a list of all md files in the docs folders..
 * @param dirName the full path name containing the md files
 * @returns a list of full path location of each md file
 */
const getFileList = async (dirName) => {
    let files = []
    const items = await readdir(dirName, { withFileTypes: true })

    for (const item of items) {
        if (item.isDirectory()) {
            files = [
                ...files,
                ...(await getFileList(`${dirName}/${item.name}`)),
            ]
        } else {
            if (item.name.endsWith('.md')) files.push(`${dirName}/${item.name}`)
        }
    }

    return files
}

/**
 * create index docs to be used later on lunr
 * @param dirName the full path name containing the md files
 * @returns a list cleaned md contents
 */
const processMdFiles = async (dirName) => {
    rootPath = dirName
    let mdFilesList = await getFileList(dirName)
    let allData = []

    for (const mdFile of mdFilesList) {
        let code = await readFile(mdFile, { encoding: 'utf8' })
        let cleanCode = replaceMdSyntax(code)
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
            .replace(/(<!--.*?-->)|(<!--[\S\s]+?-->)|(<!--[\S\s]*?$)/gim, '')
            .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
            .replace(/(<([^>]+)>)/gi, '')
            .trim()
        allData.push({ content: cleanCode, path: mdFile })
    }
    return allData
}

/**
 * Split an md content by anchors in several index docs
 * @param mdCode an md content
 * @param path path of md file
 * @returns array of index docs
 */
const parseMdContent = (mdCode, path) => {
    const pageTitle = mdCode.match(/^# (.*)/m)?.[1]?.trim()
    const result = mdCode.split(/(^|\s)#{2,3}\s/gi)
    const cleaning = result.filter(
        (i) => i.trim() !== '' && !i.startsWith('---')
    )
    const mdData = cleaning.flatMap((i) => {
        const nlIndex = i.indexOf('\n')
        let content = i.split(/(?<=\.\s|:\s|;\s|\?\s|!\s|。|：|；|？|！)|\n/).map(n => n.trim()).filter(n => n.length > 0)
        let anchor = i.slice(0, nlIndex > -1 ? nlIndex : i.length) || ''
        return content
            .map((c) =>
                c
                    .replace(/\s{2,}/g, ' ')
                    .replace(
                        /^:::(?: (?:tip|warning|details|danger|info))?/gm,
                        ''
                    )
                    .replace(/^```[a-z0-9{}\-,]*/gm, '')
                    .replace(/~~[^~]|^~~|~~$/gm, '')
                    .replace(/!\[.*?\]\(.*?\)(?:\{.+?\})?/gm, '')
            )
            .filter((c) => c.trim() !== '' && !i.match(/^\|\s*:?-+/m))
            .map((c) => ({ anchor, content: c.trim(), path, pageTitle }))
    })
    return mdData
}

const buildDoc = (mdDoc, id) => {
    let a = mdDoc.anchor.replace('\r', '')
    if (a[0] === '#') a = a.replace('#', '')

    a = a.trim()

    let link = mdDoc.path.replace(rootPath + '/', '').replace('.md', '')

    if (!id.endsWith('.0')) {
        const normalized = a
            .replace(/[!@#$%^&*()=！@#￥%…&*（）+_：:;；'"“”‘’<>《》?./]/g, ' ')
            .replace(/\s{2,}/g, ' ')
            .replaceAll(' ', '-')
            .replaceAll('/', '-')
            .toLowerCase()
        
        if (normalized.match(/^[0-9]/)) {
            link += `#_${normalized}`
        } else {
            link += `#${normalized}`
        }
    }

    return {
        id,
        link,
        b: mdDoc.content,
        a,
        T: mdDoc.pageTitle,
    }
}

const buildDocs = async (HTML_FOLDER) => {
    const files = await processMdFiles(HTML_FOLDER)

    const docs = []
    if (files !== undefined) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i]
            let mdDocs = parseMdContent(file.content, file.path)

            for (let index = 0; index < mdDocs.length; index++) {
                const mdDoc = mdDocs[index]
                docs.push(
                    buildDoc(mdDoc, i.toString(36) + '.' + index.toString(36))
                )
            }
        }
    }
    return docs
}

export default buildDocs
