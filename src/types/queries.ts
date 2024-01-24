export enum UserQueries {
    getId = 'getId',
    getAll = 'getAll',
    getIdPassword = 'getIdPassword',
    getName = 'getName',
    getEmail = 'getEmail',
    addNew = 'addNew',
    changeName = 'changeName',
    changePassword = 'changePassword',
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
    addNew = 'addNew',
    changeData = 'changeData',
    changePublishment = 'changePublishment',
    remove = 'remove',
}

export enum SectionQueries {
    getAll = 'getAll',
    addNew = 'addNew',
    changeContent = 'changeContent',
    remove = 'remove'
}

export enum StyleQueries {
    addNew = 'addNew',
    changeAll = 'changeAll'
}