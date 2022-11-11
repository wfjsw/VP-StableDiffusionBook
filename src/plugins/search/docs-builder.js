import { readdir, readFile } from "fs/promises";
let rootPath = "";

const replaceMdSyntax = (mdCode) =>
    mdCode
        .replace(/\[(.*?)\]\(.*?\)/g, `$1`) // links
        .replace(/(\*+)(\s*\b)([^\*]*)(\b\s*)(\*+)/gm, `$3`); //bold

/**
 * Get a list of all md files in the docs folders..
 * @param dirName the full path name containing the md files
 * @returns a list of full path location of each md file
 */
const getFileList = async (dirName) => {
    let files = [];
    const items = await readdir(dirName, { withFileTypes: true });

    for (const item of items) {
        if (item.isDirectory()) {
            files = [
                ...files,
                ...(await getFileList(`${dirName}/${item.name}`)),
            ];
        } else {
            if (item.name.endsWith(".md"))
                files.push(`${dirName}/${item.name}`);
        }
    }

    return files;
};

/**
 * remove script tags from md content
 * @param mdCode the content of md files
 * @returns the content without script tags
 */
const removeScriptTag = (mdCode) =>
    mdCode
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
        .trim();

/**
 * remove style tags from md content
 * @param mdCode the content of md files
 * @returns the content without style tags
 */
const removeStyleTag = (mdCode) =>
    mdCode
        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
        .trim();

/**
 * create index docs to be used later on lunr
 * @param dirName the full path name containing the md files
 * @returns a list cleaned md contents
 */
const processMdFiles = async (dirName) => {
    rootPath = dirName;
    let mdFilesList = await getFileList(dirName);
    let allData = [];

    for (const mdFile of mdFilesList) {
        let code = await readFile(mdFile, { encoding: "utf8" });
        let cleanCode = removeStyleTag(removeScriptTag(replaceMdSyntax(code)));
        allData.push({ content: cleanCode, path: mdFile });
    }
    return allData;
};

/**
 * Split an md content by anchors in several index docs
 * @param mdCode an md content
 * @param path path of md file
 * @returns array of index docs
 */
const parseMdContent = (mdCode, path) => {
    const pageTitle = mdCode.match(/^# (.*)/m)?.[1]?.trim()
    const result = mdCode.split(/(^|\s)#{2,3}\s/gi)
    const cleaning = result.filter((i) => i.trim() !== "" && !i.startsWith('---') );
    const mdData = cleaning.flatMap((i) => {
        let content = i.split(/\n|。/);
        let anchor = content?.shift() || "";
        return content
            .map((c) => c
                .replace(/(<([^>]+)>)/gi, '')
                .replace(/\s{2,}/g, ' ')
                .replace(/^:::/gm, '')
            )
            .filter((c) => c.trim() !== '')
            .map((c) => ({ anchor, content: c.trim(), path, pageTitle }))
        // return { anchor, content: content.join("\n"), path };
    });
    return mdData;
}

const buildDoc = (mdDoc, id) => {
    let a = mdDoc.anchor.replace("\r", "");
    if (a[0] === "#") a = a.replace("#", "");

    a = a.trim()

    let link = mdDoc.path.replace(rootPath + "/", "").replace("md", "html");

    if (!id.endsWith(".0")) {
        const normalized = a
            .replace(/[!@#$%^&*()=！@#￥%…&*（）+_：:;；'"“”‘’<>《》?/]/g, ' ')
            .replace(/\s{2,}/g, ' ')
            .replaceAll('/', '-')
            .toLowerCase()
        link += `#${normalized}`;
    }

    return {
        id,
        link,
        b: mdDoc.content,
        a,
        T: mdDoc.pageTitle,
    };
};

const buildDocs = async (HTML_FOLDER) => {
    const files = await processMdFiles(HTML_FOLDER);

    const docs = [];
    if (files !== undefined) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            let mdDocs = parseMdContent(file.content, file.path);

            for (let index = 0; index < mdDocs.length; index++) {
                const mdDoc = mdDocs[index];
                docs.push(buildDoc(mdDoc, i.toString(36) + "." + index.toString('36')));
            }
        }
    }
    return docs;
};

export default buildDocs;
