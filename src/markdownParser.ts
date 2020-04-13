import marked from "marked"

const renderer = new marked.Renderer()

renderer.heading = (text: string, level: number) => {
  return `
    <h${level + 1} id="${makeStringUrlSafe(text)}">
      ${text}
    </h${level + 1}>
  `
}

renderer.code = (code: string, language: string, isEscaped: boolean) => {
  language = language.toLowerCase()

  if (language === "info") {
    return `
      <div class="info">
        <div class="info__icon"></div>
        <div class="info__text">${code}</div>
      </div>
    `
  }

  return `
    <div class="code">
      <div class="code__language">${language}</div>
      <pre class="code__value language-${language}"><code class="language-${language}">${code}</code></pre>
    </div>
  `
}


function parseMarkdown(markdown: string) {
  return marked(markdown, { renderer })
}

function findUsedCodeLanguagesInMarkdown(markdown: string) {
  const tokens = marked.lexer(markdown)
  return tokens.reduce((acc: any, curr: any) => {
    if (curr.type === "info") return acc
    if (curr.type === "code" && !acc.includes(curr.lang)) {
      acc.push(curr.lang.toLowerCase())
    }
    return acc
  }, [])
}

function findMenuItems(markdown: string) {
  const tokens = marked.lexer(markdown)
  return tokens.reduce((acc: any, curr: any) => {
    if (curr.type === "heading" && (curr.depth === 1 || curr.depth === 2)) {
      acc.push({
        value: curr.text,
        depth: curr.depth,
        slug: makeStringUrlSafe(curr.text)
      })
    }
    return acc
  }, [])
}

function makeStringUrlSafe(str: string) {
  return str.toLowerCase().replace(" ", "_").replace(/[^a-zA-Z0-9_]/g, "")
}

export default {
  parseMarkdown,
  findUsedCodeLanguagesInMarkdown,
  findMenuItems
}