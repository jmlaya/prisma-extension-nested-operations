import { Prisma } from "@prisma/client";
export declare function getRelationsByModel(dmmf?: typeof Prisma.dmmf): Record<string, Prisma.DMMF.Field[]>;
export declare function findOppositeRelation(relation: Prisma.DMMF.Field, dmmf?: typeof Prisma.dmmf): Prisma.DMMF.Field;
