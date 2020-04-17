import { TokensList, Renderer } from "marked";

export default interface MarkdownExtension {
  modifyTokens?(tokens: TokensList): TokensList | Promise<TokensList>
  modifyRenderer?(renderer: Renderer): Renderer | Promise<Renderer>
  modifyHTML?(html: string): string | Promise<string>
}
