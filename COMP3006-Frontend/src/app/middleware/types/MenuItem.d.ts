type MenuItem = {
    _id?: string | undefined,
    name?: string | undefined,
    itemTypes?: Array<string>,
    image?: Buffer | null,
    description?: string | undefined,
    price?: number,
    nutritionalInfo?: NutritionalInfo,
    extras?: Array<MenuExtras>
}