/* tslint:disable */
/* eslint-disable */
export interface Order {
  '_id'?: string;
  items: Array<{
}>;
  orderTime?: string;
  restaurant?: {
'description'?: string;
'name'?: string;
'restaurantType'?: Array<string>;
'currentMenuId'?: string;
'_id'?: string;
};
  total?: number;
  userId?: string;
}
