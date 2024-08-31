export interface Plan {
    title: string;
    subTitle: string;
    subTitleIcon: JSX.Element;
    perks: string[];
    priceInfo?: { price: number, period: string }
    actions?: {
        label: string,
        icon?: JSX.Element,
        linkTo?: string,
        props?: object,
    }[]
}