/* tslint:disable */
/* eslint-disable */
export interface Menu {
  MenuItems?: Array<{
'name'?: string;
'itemTypes'?: Array<string>;
'image'?: Buffer;
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
  '_id'?: string;
  restaurantId?: string;
  restaurantName?: string;
}
