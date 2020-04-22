import MarkdownExtension from "./MarkdownExtension";
import { TokensList, Renderer } from "marked";
import fileHandler from "../fileHandler";
import path from "path"
import linkManager from "../linkManager";

class LinkExtension implements MarkdownExtension {

  modifyRenderer(renderer: Renderer): Renderer | Promise<Renderer> {
    renderer.link = (href: string, title: string, text: string) => {
      if (!href.startsWith("http")) {
        href = linkManager.registerLocalLink(href)
      }
      
      return `<a href="${href}" title="${title}">${text}</a>`
    }
    return renderer
  }

}

export default LinkExtension
