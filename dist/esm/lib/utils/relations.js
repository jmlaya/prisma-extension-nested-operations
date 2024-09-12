import { Prisma } from "@prisma/client";
export function getRelationsByModel(dmmf) {
    const prismaDmmf = dmmf || Prisma.dmmf;
    if (!prismaDmmf) {
        throw new Error("Prisma DMMF not found, please generate Prisma client using `npx prisma generate`");
    }
    const relationsByModel = {};
    prismaDmmf.datamodel.models.forEach((model) => {
        relationsByModel[model.name] = model.fields.filter((field) => field.kind === "object" && field.relationName);
    });
    return relationsByModel;
}
export function findOppositeRelation(relation, dmmf) {
    const parentRelations = getRelationsByModel(dmmf)[relation.type] || [];
    const oppositeRelation = parentRelations.find((parentRelation) => parentRelation !== relation &&
        parentRelation.relationName === relation.relationName);
    if (!oppositeRelation) {
        throw new Error(`Unable to find opposite relation to ${relation.name}`);
    }
    return oppositeRelation;
}
