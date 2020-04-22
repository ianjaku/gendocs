import util from "./util";
import { Page } from "./documentHandler";
import path from "path"
import fileHandler from "./fileHandler";
import logger from "./logger";

const _localLinks: {[hash: string]: string} = {}
const _slugs: {[absolutePath: string]: string} = {}

function registerLocalLink(target: string) {
  const hash = util.checksumForString(target)
  _localLinks[hash] = target
  return "GOTO|" + hash + "|"
}

function registerSlug(absolutePath: string, slug: string) {
  _slugs[absolutePath] = slug
}

function solveLocalLinks(page: Page) {
  const matches = page.html.match(/GOTO\|[a-zA-Z0-9]+\|/g)
  if (matches == null) return page

  for (const match of matches) {
    const hash = match.slice(5, match.length - 1)
    const target = _localLinks[hash]
    if (target == null) return page

    const absolutePath = path.resolve(path.dirname(page.path), target)
    if (!fileHandler.fileExists(absolutePath)) {
      throw Error(`
        We couldn't find the file you were linking to.
        Link target: ${absolutePath}
        In file: ${page.path}

        Make sure all pages have been added to your gendocs.json file.
      `)
    }
    const slug = _slugs[absolutePath]
    page.html = page.html.replace(match, "/" + slug)
  }

  return page
}

export default {
  registerLocalLink,
  registerSlug,
  solveLocalLinks
}
