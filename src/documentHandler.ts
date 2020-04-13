import fs from "fs"
import matter from "gray-matter"
import crypto from "crypto"
import markdownParser from "./markdownParser"

export interface Page {
  category: string;
  title: string;
  slug: string;
  html: string;
  markdown: string;
  path: string;
  checksum: string;
  codeLanguages: string[];
  menuItems: any;
  order: number;
}

function loadPages(paths: string[]) {
  const pages = paths.map((path, index) => loadPage(path, index))
  ensureSlugsAreUnique(pages)
  return pages
}

function loadPage(filePath: string, index: number) {
  filePath = ensureFileEndsWithMD(filePath)
  validateFileExists(filePath)

  const fileContent = fs.readFileSync(filePath, "utf-8")
  const matterResult = matter(fileContent)
  const markdown = matterResult.content
  const metaData = validateMetaData(matterResult.data)
  const slug = generateSlug(metaData.category, metaData.title)
  const html = markdownParser.parseMarkdown(markdown)
  const checksum = checksumForString(markdown)
  const codeLanguages = markdownParser.findUsedCodeLanguagesInMarkdown(markdown)
  const menuItems = markdownParser.findMenuItems(markdown)

  return {
    category: metaData.category,
    title: metaData.title,
    slug,
    markdown: fileContent,
    html,
    path: filePath,
    checksum,
    codeLanguages,
    menuItems,
    order: index
  }
}

function ensureSlugsAreUnique(pages: Page[]) {
  let slugMap: {[slug: string]: Page} = {}
  for (const page of pages) {
    if (slugMap[page.slug] == null) {
      slugMap[page.slug] = page
    } else {
      throw Error(`
        Pages with path "${page.path}" and "${slugMap[page.slug].path}" have the same generated slug: ${page.slug}.
        Please make sure all pages have different a title and category.
      `)
    }
  }
}

function generateSlug(category: string, title: string) {
  return makeStringUrlSafe(category.toLowerCase()) + "-" + makeStringUrlSafe(title.toLowerCase())
}

function makeStringUrlSafe(str: string) {
  return str.replace(" ", "_").replace(/[^a-zA-Z0-9_]/g, "")
}

function ensureFileEndsWithMD(filePath: string): string {
  if (!filePath.endsWith(".md")) {
    filePath += ".md"
  }
  return filePath
}

function validateFileExists(filePath: string) {
  if (!fs.existsSync(filePath)) {
    throw Error(`
      File at filePath "${filePath}" does not exist yet it is defined in the gendocs.json file.
    `)
  }
}

function checksumForString(contentJson: string) {
  return crypto.createHash("md5").update(contentJson).digest("hex")
}

function validateMetaData(metaData: any): {title: string, category: string} {
  if (metaData.title == null || metaData.category == null) {
    throw Error(`
      Title and category are required in markdown files.

      Example at the top of your file:
        ---
        category: "My category",
        title: "My title"
        ---
    `)
  }
  return metaData
}

export default {
  loadPages
}
 