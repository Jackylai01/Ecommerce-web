/**
 * 分頁查詢。用於定義分頁查詢時的 req.query
 * @example /:Lang/foo?keyword=Good&page=1&limit=10&sort=+name,-createdAt&projection=name,memo
 */
export class PagingQuery {
  [key: string]: any;
  /** 關鍵字 */
  keyword?: string;
  /** 當前頁數 */
  page?: number;
  /** 每頁顯示筆數 */
  limit?: number;
  /** 排序 */
  sort?: string;
}

export class Links {
  /** 最初頁 link */
  first!: string;
  /** 前一頁 link */
  previous!: string;
  /** 當前頁 link */
  current!: string;
  /** 次一頁 link */
  next!: string;
  /** 最末頁 link */
  last!: string;
}

export class Metadata {
  /** 總筆數 */
  count!: number;
  /** 最末頁數 */
  last!: number;
  /** 當前頁數 */
  page!: number;
  /** 每頁顯示筆數 */
  limit!: number;
  /** 排序 */
  sort: any;
  /** 連結 */
  links!: Links;
}
