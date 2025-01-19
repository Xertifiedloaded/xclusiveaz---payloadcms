
export interface HeroBlock {
    blockType: 'hero';
    heading: string;
    subheading?: string;
    backgroundImage?: {
      url: string;
      alt: string;
    };
    cta?: {
      text: string;
      link: string;
    };
    id: string;
    blockName: string;
}

export interface FeaturedProductsBlock {
    blockType: 'featuredProducts';
    heading: string;
    products: Array<{
      id: string;
      name: string;
      price: number;
      images: Array<{ image: { url: string } }>; 
      description: any;
    }>;
    id: string;
    blockName: string;
}

export interface CategoriesShowcaseBlock {
    blockType: 'categoriesShowcase';
    heading: string;
    categories: Array<{
      id: string;
      name: string;
      description: string;
      image: { url: string }; 
    }>;
    id: string;
    blockName: string;
}

export type Block = HeroBlock | FeaturedProductsBlock | CategoriesShowcaseBlock;

export interface PageData {
    id: string;
    title: string;
    slug: string;
    pageType: string;
    content: Block[];
    status: 'draft' | 'published';
}

type CombinedData = {
  pages: PageData | null;
  loading: boolean;
  error: Error | null;
};

