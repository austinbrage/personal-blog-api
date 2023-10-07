import { readFileSync } from 'fs'
import { join } from 'path'

interface SQLQueries {
    [comment: string]: string
}

const processSQLFile = (filePath: string) => {
    const fileText = readFileSync(filePath, 'utf8')
    const lines = fileText.split('\n')

    const data: SQLQueries = {}
    let currentQuery = ''
    let currentComment = ''

    for (const line of lines) {
        const cleanLine = line.trim()

        if(cleanLine.startsWith('--')) {
            currentComment = cleanLine.slice(2).trim()

        } else if(cleanLine !== '') {
            if(currentComment !== '') currentQuery += cleanLine + ' '

        } else if(currentComment !== '' && currentQuery.trim() !== '') {
            data[currentComment] = currentQuery
            currentComment = ''
            currentQuery = ''
        }
    }

    return data
}

const sqlFiles: string[] = ['users.sql', 'articles.sql', 'sections.sql', 'styles.sql']
const results: { [table: string]: SQLQueries } = {}

for (const fileName of sqlFiles) {
    const filePath = join(__dirname, '..', 'sql', fileName)
    const fileData = processSQLFile(filePath)
    results[fileName.replace('.sql', '')] = fileData
}

(process.env.NODE_ENV === 'test') && console.log(results)

export const userQueries = results.users
export const articleQueries = results.articles
export const sectionQueries = results.sections
export const stylesQueries = results.styles