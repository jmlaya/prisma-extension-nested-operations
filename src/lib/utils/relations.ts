import { Prisma } from "@prisma/client";

export function getRelationsByModel(dmmf?: typeof Prisma.dmmf): Record<string, Prisma.DMMF.Field[]> {

  const prismaDmmf = dmmf || Prisma.dmmf;

  if (!prismaDmmf) {
    throw new Error(
      "Prisma DMMF not found, please generate Prisma client using `npx prisma generate`"
    );
  }

  const relationsByModel: Record<string, Prisma.DMMF.Field[]> = {};

  prismaDmmf.datamodel.models.forEach((model: Prisma.DMMF.Model) => {
    relationsByModel[model.name] = model.fields.filter(
      (field) => field.kind === "object" && field.relationName
    );
  });

  return relationsByModel;
  
}



export function findOppositeRelation(relation: Prisma.DMMF.Field, dmmf?: typeof Prisma.dmmf): Prisma.DMMF.Field {
  
  const parentRelations =
    getRelationsByModel(dmmf)[relation.type as Prisma.ModelName] || [];

  const oppositeRelation = parentRelations.find(
    (parentRelation) =>
      parentRelation !== relation &&
      parentRelation.relationName === relation.relationName
  );

  if (!oppositeRelation) {
    throw new Error(`Unable to find opposite relation to ${relation.name}`);
  }

  return oppositeRelation;
}
