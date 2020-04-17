import MarkdownExtension from "./MarkdownExtension"
import { TokensList, Renderer } from "marked"
import fileHandler from "../fileHandler"
import authHandler from "../authHandler"
import path from "path"
import FormData from "form-data"
import repository from "../repository"
import { v4 } from "uuid"
import util from "../util"

interface Image {
  path: string;
  key: string;
}

class ImageExtension implements MarkdownExtension {

  private images: {[key: string]: string} = {}

  modifyRenderer(renderer: Renderer): Renderer | Promise<Renderer> {
    renderer.image = (path: string, hoverText: string, altText: string) => {
      this.images[path] = path
      return `<img alt="${altText}" src="${path}" />`
    }
    
    return renderer
  }

  async modifyHTML(html: string) {
    for (const path of Object.values(this.images)) {
      if (!this.isPathLocal(path)) continue

      const uploadedPath = await this.uploadImage(path)
      html = html.replace(path, uploadedPath)
    }
    
    return html
  }

  isPathLocal(path: string) {
    return !path.startsWith("http") && fileHandler.fileExists(path)
  }

  async uploadImage(filePath: string) {
    const form = new FormData()

    try {
      const fileSize = fileHandler.fileSize(filePath)
      const hash = util.checksumForString(filePath + "|" + fileSize)
      
      form.append('token', await authHandler.getToken())
      form.append('file', fileHandler.createReadStream(filePath), path.basename(filePath))
      form.append('hash', hash)
      const result = await repository.uploadFile(form)
      return result.path
    } catch (e) {
      throw Error("Failed" + e.message)
    }
  }

}

export default ImageExtension

// renderer.image = function (path: string, hoverText: string, altText: string) {
//   if (!path.startsWith("http") && fileHandler.fileExists(path)) {
//     try {
//       // const contents = fileHandler.readFileSync(path)
//       const form = new FormData();
//       form.append('file', fileHandler.createReadStream(path), "img2.bmp");
//       form.append('token', 'some_token')
//       // form.submit("http://localhost:4000/api/v1/files")
//       repository.uploadFile(form).catch(e => console.log(e))
//     } catch (e) {
//       console.log("Error:", e)
//     }
//     throw Error("finished")
//   }

//   return `<img src="${path}" alt="${altText}" />`
// }
