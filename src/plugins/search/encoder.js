function collapse(string) {
    let final = '',
        prev = ''

    for (let i = 0, len = string.length, char; i < len; i++) {
        if ((char = string[i]) !== prev) {
            final += prev = char
        }
    }

    return final
}

function encode(str, options) {
    const filter = options.filter ?? []
    const stemmer = options.stemmer ? Object.entries(options.stemmer) : []

    const eng = Array.from(str.matchAll(/[a-z0-9]+/gi))
        .map((n) => n[0])
        .filter((n) => !filter.includes(n.toLowerCase()))
        .flatMap((n) =>
            [n, ...n.split(/(?=[A-Z0-9])/)]
                .filter((e) => !!e)
                .map((e) => e.toLowerCase())
        )
        .flatMap((n) =>
            [
                n,
                n.replace(
                    /^(?:ab|ad|anti|ante|apo|be|com|contra|counter|de|dia|dis|en|em|extra|ex|hyper|hypo|inter|infra|non|ob|out|over|in|im|pre|post|re|semi|sub|syn|trans|under|un)/,
                    ''
                ),
            ].filter((n) => !!n)
        )
        .flatMap((n) => {
            for (const [key, value] of stemmer) {
                if (n.endsWith(key)) return [n, n.slice(0, -key.length) + value]
            }
            return [n]
        })
        .map(
            (n) =>
                n
                    .replace(/ae/gi, 'a')
                    .replace(/oe/gi, 'o')
                    .replace(/sh/gi, 's')
                    .replace(/th/gi, 't')
                    .replace(/ph/gi, 'f')
                    .replace(/pf/gi, 'f')
            // .replace(/(?![aeo])h(?![aeo])/g, '')
            // .replace(/(?!^[aeo])h(?!^[aeo])/, '')
            // .replace(/(?!\\b)[aeo]/gi, '')
        )
        .map((n) => (n.length > 1 ? collapse(n) : n))

    const chs = str.replaceAll(/[a-zA-Z0-9]+/g, '').split('')
    return eng
        .concat(chs)
        .filter((n) => !!n)
        .filter((n) => n.trim() !== '')
        .filter((n) => !filter.includes(n))
}

export function getEncoder(options) {
    return (str) => encode(str, options)
}
