/* tslint:disable */
/* eslint-disable */
export interface Order {
  '_id'?: string;
  active?: boolean;
  address?: {
'addresslineOne'?: string;
'addresslineTwo'?: string;
'postcode'?: string;
'_id'?: string;
};
  items?: Array<{
'name'?: string;
'itemTypes'?: Array<string>;
'description'?: string;
'price'?: number;
'allegens'?: Array<string>;
'nutritionalInfo'?: {
'calories'?: number;
'_id'?: string;
};
'extras'?: Array<{
'required'?: boolean;
'minimumRequired'?: number;
'max'?: number;
'name'?: string;
'extras'?: Array<{
'name'?: string;
'NutritionalInfo'?: {
'calories'?: number;
'_id'?: string;
};
}>;
'_id'?: string;
}>;
'_id'?: string;
}>;
  restaurant?: {
'description'?: string;
'name'?: string;
'restaurantType'?: Array<string>;
'currentMenuId'?: string;
'_id'?: string;
};
  stage?: string;
  total?: number;
  userId?: string;
}
