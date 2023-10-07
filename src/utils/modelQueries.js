const fs = require('fs')
const path = require('path')

const processSQLFile = (filePath) => {
    const fileText = fs.readFileSync(filePath, 'utf8')
    const lines = fileText.split('\n')

    const data = {}
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

const sqlFiles = ['users.sql', 'articles.sql', 'sections.sql', 'styles.sql']
const results = {}

for (const fileName of sqlFiles) {
    const filePath = path.join(__dirname, '..', 'sql', fileName)
    const fileData = processSQLFile(filePath)
    results[fileName.replace('.sql', '')] = fileData
}

(process.env.NODE_ENV === 'test') && console.log(results)

module.exports = {
    userQueries: results.users,
    articleQueries: results.articles,
    sectionQueries: results.sections,
    stylesQueries: results.styles
}