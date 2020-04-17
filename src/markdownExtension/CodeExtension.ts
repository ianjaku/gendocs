import MarkdownExtension from "./MarkdownExtension";
import { TokensList, Renderer } from "marked";

class CodeExtension implements MarkdownExtension {

  modifyRenderer(renderer: Renderer): Renderer | Promise<Renderer> {
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
    return renderer
  }

}

export default CodeExtension
