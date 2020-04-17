import marked from "marked"
import MarkdownExtension from "./markdownExtension/MarkdownExtension"
import HeadingsExtension from "./markdownExtension/HeadingsExtension"
import CodeExtension from "./markdownExtension/CodeExtension"
import ImageExtension from "./markdownExtension/ImageExtension"

const extensions: MarkdownExtension[] = [
  new HeadingsExtension(),
  new CodeExtension()
  // new ImageExtension()
]

async function parseMarkdown(markdown: string) {
  let tokens = marked.lexer(markdown)
  let renderer = new marked.Renderer()
  for (const extension of extensions) {
    if (extension.modifyTokens != null) {
      tokens = await Promise.resolve(extension.modifyTokens(tokens))
    }
    if (extension.modifyRenderer != null) {
      renderer = await Promise.resolve(extension.modifyRenderer(renderer))
    }
  }
  let html = marked.parser(tokens, { renderer })
  for (const extension of extensions) {
    if (extension.modifyHTML != null) {
      html = await Promise.resolve(extension.modifyHTML(html))
    }
  }
  return html
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
