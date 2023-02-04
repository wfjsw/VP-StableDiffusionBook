import { defineConfig } from 'vitepress'
import { SearchPlugin } from '../src/plugins/search/plugin'
import { SitemapStream } from 'sitemap'
import { createWriteStream } from 'node:fs'
import { resolve } from 'node:path'

const links = []

export default defineConfig({
    title: 'AiDraw',
    description:
        '关于使用 Ai 绘画的 Wiki ，翻译，教程，相关资源。主要内容为 StableDiffusionWebUI',
    lang: 'zh-CN',
    lastUpdated: true,
    outDir: './dist',
    srcDir: './src',
    cleanUrls: 'without-subfolders',
    themeConfig: {
        logo: '/paintbrush-solid.svg',
        outlineTitle: '在这一页上',
        nav: [
            {
                text: '指南',
                link: '/guide/',
                activeMatch: '^/guide/',
            },
            {
                text: '深入',
                link: '/advanced/',
                activeMatch: '^/advanced/',
            },
            { text: '新闻', link: '/newsfeed' },
            { text: '附录', link: '/appendix' },
            { text: 'NovelAI.dev', link: 'https://novelai.dev' },
        ],
        sidebar: {
            '/guide/': [
                {
                    text: '新手指南',
                    items: [{ text: '前言', link: '/guide/' }],
                },
                {
                    text: '起步于此',
                    collapsible: true,
                    items: [
                        {
                            text: '硬件要求',
                            link: '/guide/requirements',
                        },
                    ],
                },
                {
                    text: '安装与配置',
                    collapsible: true,
                    items: [
                        {
                            text: 'SD-WebUI 方案',
                            link: '/guide/install/sd-webui',
                        },
                        {
                            text: 'NAI 官方套件方案',
                            link: '/guide/install/original',
                        },
                        {
                            text: '其他方案',
                            link: '/guide/install/others',
                        },
                    ],
                },
                {
                    text: '使用与调参',
                    collapsible: true,
                    items: [
                        { text: '引言', link: '/guide/configuration/' },
                        {
                            text: '调参基础',
                            link: '/guide/configuration/param-basic',
                        },
                        {
                            text: '进阶使用',
                            link: '/guide/configuration/param-advanced',
                        },
                        {
                            text: '疑难解答',
                            link: '/guide/configuration/troubleshoot',
                        },
                        {
                            text: '模型选择',
                            link: '/guide/configuration/model',
                        },
                        {
                            text: '其他',
                            link: '/guide/configuration/other',
                        },
                    ],
                },
                {
                    text: '提示词工程学',
                    collapsible: true,
                    items: [
                        { text: '概述', link: '/guide/prompt-engineering/' },
                        {
                            text: '文字转图片',
                            link: '/guide/prompt-engineering/txt2img',
                        },
                        {
                            text: '图片转图片',
                            link: '/guide/prompt-engineering/img2img',
                        },
                        {
                            text: '实战技巧',
                            link: '/guide/prompt-engineering/practice',
                        },
                        {
                            text: '杂项',
                            link: '/guide/prompt-engineering/misc',
                        },
                    ],
                },
            ],
            '/advanced/': [
                {
                    text: '进阶深入',
                    items: [
                        { text: '前言', link: '/advanced/' },
                        {
                            text: '识别 AI 作品',
                            link: '/advanced/identify',
                        },
                        { text: '术语解释', link: '/advanced/glossary' },
                    ],
                },
                {
                    text: '模型训练',
                    collapsible: true,
                    items: [
                        {
                            text: '概述',
                            link: '/advanced/finetuning/',
                        },
                        {
                            text: 'Textual Inversion',
                            link: '/advanced/finetuning/textual-inversion',
                        },
                        {
                            text: 'Hypernetwork',
                            link: '/advanced/finetuning/hypernetwork',
                        },
                        {
                            text: 'Dreambooth',
                            link: '/advanced/finetuning/dreambooth',
                        },
                        {
                            text: 'Aesthetic Gradients',
                            link: '/advanced/finetuning/aesthetic-gradients',
                        },
                    ],
                },
                {
                    text: '二次开发',
                    collapsible: true,
                    items: [
                        {
                            text: '插件',
                            link: '/advanced/development/extensions',
                        },
                        {
                            text: '自定义脚本',
                            link: '/advanced/development/scripts',
                        },
                        {
                            text: 'API',
                            link: '/advanced/development/api',
                        },
                    ],
                },
            ],
        },
        footer: {
            message: 'Released under the GNU Free Documentation License.',
            copyright:
                'Copyright © 2022-present StableDiffusionBook Contributors',
        },
        socialLinks: [
            {
                icon: 'github',
                link: 'https://github.com/wfjsw/VP-StableDiffusionBook',
            },
        ],
        editLink: {
            pattern:
                'https://github.com/wfjsw/VP-StableDiffusionBook/edit/master/src/:path',
            text: '提出修改意见',
        },
        lastUpdatedText: '修改日期',
        docFooter: {
            prev: '上一页',
            next: '下一页',
        },
    },
    vite: {
        plugins: [
            SearchPlugin({
                profile: 'score',
                tokenize: 'forward',
                cache: 50,
                context: {
                    resolution: 4,
                    depth: 5,
                },
                fastupdate: false,
                filter: [
                    // array blacklist
                    '的',
                    '得',
                    '地',
                    '了',
                    ' ',
                    ...'!@#$%^&*！￥……&*/\\,.，。<>《》；：;:"\'“”’‘[]{}|()（）-—`_+'.split(
                        ''
                    ),
                    'a',
                    'about',
                    'above',
                    'after',
                    'again',
                    'against',
                    'all',
                    'also',
                    'am',
                    'an',
                    // 'and',
                    'any',
                    'are',
                    "aren't",
                    'as',
                    'at',
                    //"back",
                    'be',
                    'because',
                    'been',
                    'before',
                    'being',
                    'below',
                    //"between",
                    'both',
                    'but',
                    'by',
                    'can',
                    'cannot',
                    "can't",
                    'come',
                    'could',
                    "couldn't",
                    //"day",
                    'did',
                    "didn't",
                    'do',
                    'does',
                    "doesn't",
                    'doing',
                    'dont',
                    'down',
                    'during',
                    'each',
                    'even',
                    'few',
                    'first',
                    'for',
                    'from',
                    'further',
                    'get',
                    //"give",
                    'go',
                    //"good",
                    'had',
                    "hadn't",
                    'has',
                    "hasn't",
                    'have',
                    "haven't",
                    'having',
                    'he',
                    'hed',
                    //"hell",
                    'her',
                    'here',
                    "here's",
                    'hers',
                    'herself',
                    'hes',
                    'him',
                    'himself',
                    'his',
                    'how',
                    "how's",
                    'i',
                    'id',
                    'if',
                    'ill',
                    'im',
                    'in',
                    'into',
                    'is',
                    "isn't",
                    'it',
                    "it's",
                    'itself',
                    "i've",
                    'just',
                    'know',
                    "let's",
                    'like',
                    //"look",
                    'make',
                    'me',
                    'more',
                    'most',
                    "mustn't",
                    'my',
                    'myself',
                    'new',
                    'no',
                    'nor',
                    // 'not',
                    'now',
                    'of',
                    'off',
                    'on',
                    'once',
                    //"one",
                    'only',
                    // 'or',
                    'other',
                    'ought',
                    'our',
                    "our's",
                    'ourselves',
                    'out',
                    'over',
                    'own',
                    //"people",
                    'same',
                    'say',
                    'see',
                    "shan't",
                    'she',
                    "she'd",
                    'shell',
                    'shes',
                    'should',
                    "shouldn't",
                    'so',
                    'some',
                    'such',
                    //"take",
                    'than',
                    'that',
                    "that's",
                    'the',
                    'their',
                    'theirs',
                    'them',
                    'themselves',
                    'then',
                    'there',
                    "there's",
                    'these',
                    'they',
                    "they'd",
                    "they'll",
                    "they're",
                    "they've",
                    //"think",
                    'this',
                    'those',
                    'through',
                    'time',
                    'to',
                    'too',
                    //"two",
                    //"under",
                    'until',
                    'up',
                    'us',
                    //"use",
                    'very',
                    'want',
                    'was',
                    "wasn't",
                    'way',
                    'we',
                    'wed',
                    'well',
                    'were',
                    "weren't",
                    "we've",
                    'what',
                    "what's",
                    'when',
                    "when's",
                    'where',
                    "where's",
                    'which',
                    'while',
                    'who',
                    'whom',
                    "who's",
                    'why',
                    "why's",
                    'will',
                    'with',
                    "won't",
                    //"work",
                    'would',
                    "wouldn't",
                    //"year",
                    'you',
                    "you'd",
                    "you'll",
                    'your',
                    "you're",
                    "your's",
                    'yourself',
                    'yourselves',
                    "you've",
                ],
                stemmer: {
                    ational: 'ate',
                    iveness: 'ive',
                    fulness: 'ful',
                    ousness: 'ous',
                    ization: 'ize',
                    tional: 'tion',
                    biliti: 'ble',
                    icate: 'ic',
                    ative: '',
                    alize: 'al',
                    iciti: 'ic',
                    entli: 'ent',
                    ousli: 'ous',
                    alism: 'al',
                    ation: 'ate',
                    aliti: 'al',
                    iviti: 'ive',
                    ement: '',
                    enci: 'ence',
                    anci: 'ance',
                    izer: 'ize',
                    alli: 'al',
                    ator: 'ate',
                    logi: 'log',
                    ical: 'ic',
                    ance: '',
                    ence: '',
                    ness: '',
                    able: '',
                    ible: '',
                    ment: '',
                    eli: 'e',
                    bli: 'ble',
                    ful: '',
                    ant: '',
                    ent: '',
                    ism: '',
                    ate: '',
                    iti: '',
                    ous: '',
                    ive: '',
                    ize: '',
                    al: '',
                    ou: '',
                    er: '',
                    ic: '',
                },
            }),
        ],
    },

    head: [
        [
            'script',
            {
                async: true,
                src: 'https://www.googletagmanager.com/gtag/js?id=G-86153EB058',
            },
        ],
        [
            'script',
            {},
            "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-86153EB058');",
        ],
    ],

    async transformHtml(code, id, { pageData }) {
        if (!id.endsWith('404.html')) {
            links.push({
                // you might need to change this if not using clean urls mode
                url: pageData.relativePath.replace(/((^|\/)index)?\.md$/, '$2'),
                lastmod: pageData.lastUpdated,
            })
        }

        return code
            .split('\n')
            .filter(
                (n) =>
                    !n.includes('virtual_search-preview') &&
                    !n.includes('virtual_search-index')
            )
            .join('\n')
    },
    async buildEnd({ outDir }) {
        const sitemap = new SitemapStream({
            hostname: 'https://guide.novelai.dev/',
        })
        const writeStream = createWriteStream(resolve(outDir, 'sitemap.xml'))
        sitemap.pipe(writeStream)
        links.forEach((link) => sitemap.write(link))
        sitemap.end()
    },
})
