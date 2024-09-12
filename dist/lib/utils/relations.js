"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOppositeRelation = exports.getRelationsByModel = void 0;
const client_1 = require("@prisma/client");
function getRelationsByModel(dmmf) {
    const prismaDmmf = dmmf || client_1.Prisma.dmmf;
    if (!prismaDmmf) {
        throw new Error("Prisma DMMF not found, please generate Prisma client using `npx prisma generate`");
    }
    const relationsByModel = {};
    prismaDmmf.datamodel.models.forEach((model) => {
        relationsByModel[model.name] = model.fields.filter((field) => field.kind === "object" && field.relationName);
    });
    return relationsByModel;
}
exports.getRelationsByModel = getRelationsByModel;
function findOppositeRelation(relation, dmmf) {
    console.log('findOppositeRelation:', dmmf);
    const parentRelations = getRelationsByModel(dmmf)[relation.type] || [];
    const oppositeRelation = parentRelations.find((parentRelation) => parentRelation !== relation &&
        parentRelation.relationName === relation.relationName);
    if (!oppositeRelation) {
        throw new Error(`Unable to find opposite relation to ${relation.name}`);
    }
    return oppositeRelation;
}
exports.findOppositeRelation = findOppositeRelation;
