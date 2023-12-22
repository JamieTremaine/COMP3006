type MenuExtras = {
    required?: boolean,
    minimumRequired?: number
    max?: number,
    name: string,
    extras: Array<{
        name: string, 
        NutritionalInfo?: NutritionalInfo
    }>;
}