export interface Book {
  id: number;
  title: string;
  subtitle?: string;
  cover_image?: string;
  author: string;
  publisher: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  purchase_link: string;
  reviews?: number;
  description: string;
  details: {
    language: string;
    pages: number;
    format?: string;
    cod: string;
  };
  highlights?: string[];
  coverColor?: string;
  editorNote?: string;
  document_url?: string;
}

export const books: Book[] = [
  {
    id: 1,
    title: "100 Nutritious Recipes",
    subtitle: "South Indian Inspired",
    author: "Dento Nutrition",
    publisher: "Dento Nutrition",
    purchase_link: "https://rzp.io/rzp/JOWZChe",
    price: 499,
    originalPrice: 999,
    rating: 4.8,
    reviews: 1240,
    description:
      "This eBook features 100 carefully curated nutritious recipes, divided into 25 Breakfast, 25 Lunch, 25 Snack, and 25 Dinner recipes. All are South Indian–inspired, thoughtfully designed for children while being equally suitable for adults.",
    details: {
      language: "English",
      pages: 120,
      format: "Digital PDF",
      cod: "Not available",
    },
    highlights: [
      "Nutritionally balanced and easy to prepare",
      "Uses simple ingredients available at home",
      "No corn flour or baking soda used",
      "Child-friendly yet adult-approved",
    ],
    coverColor: "bg-orange-500",
    cover_image: "/100_nutritious_recipes.png",
    editorNote:
      "A must-have collection for parents looking to introduce nutritious and tasty meals to their children's diet. Highly recommended for its simplicity and health benefits.",
    document_url: "",
  },
  {
    id: 2,
    title: "30 Weight Gain Recipes",
    subtitle: "For Children Above 1 Year",
    author: "Dento Nutrition",
    publisher: "Dento Nutrition",
    purchase_link: "https://rzp.io/rzp/JOWZChe",
    price: 299,
    originalPrice: 599,
    rating: 4.9,
    reviews: 850,
    description:
      "This eBook includes 30 protein-rich and nutrient-dense recipes specially designed to support healthy weight gain in children. Focuses on nutrition, not empty calories.",
    details: {
      language: "English",
      format: "Digital PDF",
      pages: 120,
      cod: "Not available",
    },
    highlights: [
      "Protein-rich and nutrient-dense",
      "Supports healthy weight gain",
      "Focuses on nutrition",
      "Helps improve weight gradually",
    ],
    coverColor: "bg-blue-500",
    cover_image: "/weight_gain_recipes_1year_book_cover.png",
    editorNote:
      "Perfect for parents concerned about their child's weight. These recipes are packed with healthy calories and proteins, making weight gain natural and delicious.",
    document_url: "",
  },
  {
    id: 3,
    title: "30 Weight Gain Recipes",
    subtitle: "For Babies Aged 6 to 12 Months",
    author: "Dento Nutrition",
    publisher: "Dento Nutrition",
    price: 299,
    purchase_link: "https://rzp.io/rzp/JOWZChe",
    originalPrice: 599,
    rating: 4.7,
    reviews: 620,
    description:
      "Thoughtfully created with age-appropriate, nutrient-rich recipes to support healthy weight gain in infants. Gentle on digestion and baby-friendly.",
    details: {
      language: "English",
      format: "Digital PDF",
      pages: 120,
      cod: "Not available",
    },
    highlights: [
      "No salt added",
      "Age-appropriate spices only",
      "Gentle on digestion",
      "Nutrient-rich for infants",
    ],
    coverColor: "bg-green-500",
    cover_image: "/weight_gain_recipes_612mons_book_cover.png",
    editorNote:
      "A thoughtful guide for new parents. The focus on digestion and age-appropriate ingredients makes this a safe and nutritious choice for infants.",
    document_url: "",
  },
  {
    id: 4,
    title: "30 Dessert Recipes",
    subtitle: "No Sugar • No Maida",
    author: "Dento Nutrition",
    publisher: "Dento Nutrition",
    price: 349,
    originalPrice: 699,
    purchase_link: "https://rzp.io/rzp/JOWZChe",
    rating: 4.9,
    reviews: 930,
    description:
      "30 wholesome dessert recipes made using natural sweeteners only, designed for guilt-free indulgence without compromising on taste or nutrition.",
    details: {
      language: "English",
      pages: 120,
      format: "Digital PDF",
      cod: "Not available",
    },
    highlights: [
      "No refined sugar used",
      "No maida (all-purpose flour)",
      "Natural, home-available ingredients",
      "Balanced and nourishing",
    ],
    coverColor: "bg-pink-500",
    cover_image: "",
    editorNote:
      "Finally, desserts you can feel good about! These recipes prove that healthy can be delicious, without the guilt of sugar or maida.",
    document_url: "",
  },
];
