export enum UserQueries {
    getId = 'getId',
    getAll = 'getAll',
    getByEmail = 'getByEmail',
    getIdPassword = 'getIdPassword',
    getByExternalId = 'getByExternalId',
    getName = 'getName',
    getEmail = 'getEmail',
    getAuthor = 'getAuthor',
    addNew = 'addNew',
    changeName = 'changeName',
    changePassword = 'changePassword',
    changeExternalId = 'changeExternalId',
    changeAuthor = 'changeAuthor',
    changeEmail = 'changeEmail',
    remove = 'remove',
}

export enum ArticleQueries {
    getAll = 'getAll',
    getId = 'getId',
    getKeywords = 'getKeywords',
    getByKeyword = 'getByKeyword',
    getAllByKeyword = 'getAllByKeyword',
    getEverything = 'getEverything',
    addNew = 'addNew',
    changeData = 'changeData',
    changePublishment = 'changePublishment',
    remove = 'remove',
}

export enum SectionQueries {
    getAll = 'getAll',
    getLastSequence = 'getLastSequence',
    addNew = 'addNew',
    changeContent = 'changeContent',
    changeSequence = 'changeSequence',
    remove = 'remove'
}

export enum StyleQueries {
    addNew = 'addNew',
    changeAll = 'changeAll'
}