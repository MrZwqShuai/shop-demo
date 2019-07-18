interface Category {
  id: number;
  // 一级分类名称
  category_name: string;
}

interface CategoryGrandson {
  // 三级分类的编号
  category_grandson_no: number;
  // 三级分类缩略图
  category_thumbnail: string;
  // 三级分类名称
  grandson_name: string;
  // 三级分类id
  id: number;
}

interface CategoryGrandsonMix {
  // 二级分类名称
  name: string;
  // 二级分类名称
  list: Array<CategoryGrandson>;
}

export { Category, CategoryGrandson, CategoryGrandsonMix };
