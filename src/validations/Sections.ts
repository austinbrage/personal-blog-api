import { sectionSchema } from "../schemas/sections"
import { type SectionType } from "../types/sections"
import { type SafeParseReturnType } from "zod"

export interface ISectionsValidation {
    id(data: unknown): SafeParseReturnType<unknown, SectionType['id']>
    idData(data: unknown): SafeParseReturnType<unknown, SectionType['idData']>
    noIdData(data: unknown): SafeParseReturnType<unknown, SectionType['noIdData']>
    articleId(data: unknown): SafeParseReturnType<unknown, SectionType['articleId']>
    idDataNoIMG(data: unknown): SafeParseReturnType<unknown, SectionType['idDataNoIMG']>
    articleIdData(data: unknown): SafeParseReturnType<unknown, SectionType['articleIdData']>
    articleIdDatas(data: unknown): SafeParseReturnType<unknown, SectionType['articleIdDatas']>
    articleIdQuery(data: unknown): SafeParseReturnType<unknown, SectionType['articleIdQuery']>
    idSequenceData(data: unknown): SafeParseReturnType<unknown, SectionType['idSequenceData']>
    articleIdDataNoSQC(data: unknown): SafeParseReturnType<unknown, SectionType['articleIdDataNoSQC']>
    templateData(data: unknown): SafeParseReturnType<unknown, SectionType['templateData']>
}

export class SectionValidation implements ISectionsValidation {
    private sectionSchema: typeof sectionSchema

    constructor() {
        this.sectionSchema = sectionSchema
    }

    id = (data: unknown) => this.sectionSchema.id.safeParse(data)
    idData = (data: unknown) => this.sectionSchema.idData.safeParse(data)
    noIdData = (data: unknown) => this.sectionSchema.noIdData.safeParse(data)
    articleId = (data: unknown) => this.sectionSchema.articleId.safeParse(data)
    idDataNoIMG = (data: unknown) => this.sectionSchema.idDataNoIMG.safeParse(data)
    articleIdData = (data: unknown) => this.sectionSchema.articleIdData.safeParse(data)
    articleIdDatas = (data: unknown) => this.sectionSchema.articleIdDatas.safeParse(data)
    articleIdQuery = (data: unknown) => this.sectionSchema.articleIdQuery.safeParse(data)
    idSequenceData = (data: unknown) => this.sectionSchema.idSequenceData.safeParse(data)
    articleIdDataNoSQC = (data: unknown) => this.sectionSchema.articleIdDataNoSQC.safeParse(data)
    templateData = (data: unknown) => this.sectionSchema.templateData.safeParse(data)
}