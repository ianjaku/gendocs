import MarkdownExtension from "./MarkdownExtension";
import { TokensList, Renderer } from "marked";

class HeadingsExtension implements MarkdownExtension {

  modifyRenderer(renderer: Renderer): Renderer | Promise<Renderer> {
    renderer.heading = (text: string, level: number) => {
      return `
        <h${level + 1} id="${this.makeStringUrlSafe(text)}">
          ${text}
        </h${level + 1}>
      `
    }
    return renderer
  }

  makeStringUrlSafe(str: string) {
    return str.toLowerCase().replace(" ", "_").replace(/[^a-zA-Z0-9_]/g, "")
  }

}

export default HeadingsExtension
