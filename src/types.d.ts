import { type localModels } from './server/server-with-local'

declare global {
  interface Array<T> {
    toSorted(compareFn?: ((a: T, b: T) => number) | undefined): T[]
  }
}

export type Models = typeof localModels

// export interface GenericModelType<
//   T,
//   GetParams,
//   GetByIdParams,
//   CreateParams,
//   DeleteParams,
//   UpdateParams
// > {
//   get: (params: GetParams) => Promise<T[]>
//   getById: ({ id }: GetByIdParams) => Promise<T | undefined>
//   create: ({ input }: CreateParams) => Promise<T>
//   delete: ({ id }: DeleteParams) => Promise<boolean>
//   update: ({ id, input }: UpdateParams) => Promise<false | T>
// }
