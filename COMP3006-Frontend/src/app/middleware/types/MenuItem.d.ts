type MenuItem = {
    id: string,
    name: String,
    itemTypes: Array<string>,
    image: Blob | null,
    description: string,
    price: number,
    nutritionalInfo: NutritionalInfo,
    extras: Array<MenuExtras>
}