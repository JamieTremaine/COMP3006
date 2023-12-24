/* tslint:disable */
/* eslint-disable */
export interface Order {
  '_id'?: string;
  items: Array<{
}>;
  orderTime?: string;
  restaurant?: {
'_id'?: string;
'resturantDescription'?: string;
'restaurantName'?: string;
'restaurantType'?: Array<string>;
'currentMenuId'?: string;
};
  total?: number;
  userId?: string;
}
