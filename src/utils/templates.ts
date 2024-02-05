import { readFile } from 'fs/promises'
import { join } from 'path'

export const loadJSON = async (templateName: string) => {

    const fileName = `template-${templateName}.json`
    const filePath = join(process.cwd(), 'public', fileName)

    try {
        const content = await readFile(filePath, 'utf-8')
        return JSON.parse(content)
    } catch(err) {
        throw new Error('Failed to load template JSON')
    }
}