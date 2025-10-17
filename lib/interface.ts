export interface MenuItemType {
    id: string,
    title: string,
    url: string
}

export interface productType {
    id: string,
    src: string,
    title: string,
    price: string,
    quantity: number,
    description?: string,
    images?: string[] | any, 
    categories: string[]
    color?: string;         // từ Radio Button
    size?: string;          // từ Radio Button
    colorHex?: string;      // từ Additional value (nếu có)
    attributeValues?: Record<string, any>; // giữ raw để mở rộng
    url?: string;
}

export interface LabelCardType {
    id: string,
    title: string,
    imgSrc: string,
    url: string
}


export interface CategoriesBannerDataType extends LabelCardType { 
    titles?: string[]
    images?: string[]
    links?: string[]
}


export interface BannerDataType{ 
    title: string
    image: string
}

export interface CartDetailsType {
    id: string,
    name: string,
    description: string,
    price: number,
    quantity: number,
    image: string
}