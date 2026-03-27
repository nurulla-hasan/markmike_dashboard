export interface IArtworkCategory {
  id: string;
  name: string;
  image: string;
}

export interface IArtworkSubCategory {
  id: string;
  name: string;
  categoryId: string;
}

export interface IArtworkAsset {
  id: string;
  image: string;
  subCategoryId: string;
}
