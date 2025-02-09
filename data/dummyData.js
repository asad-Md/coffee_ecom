export const dummyFeaturedData = [
  {
    name: "Arabica",
    price: 18.99,
    img: "/images/bean_image.png",
    location: "Chikmaglur, India",
    description:
      "Smooth, mild, and slightly sweet with hints of chocolate and nuts.",
  },
  {
    name: "Robusta",
    price: 12.99,
    img: "/images/bean_image.png",
    location: "Coorg, India",
    description: "Strong, bold, and earthy with a rich crema.",
  },
  {
    name: "Nilgiri",
    price: 15.99,
    img: "/images/bean_image.png",
    location: "Nilgiri hills, India",
    description: "Bright, floral, and citrusy with a smooth finish.",
  },
  {
    name: "Arabica",
    price: 18.99,
    img: "/images/bean_image.png",
    location: "Chikmaglur, India",
    description:
      "Smooth, mild, and slightly sweet with hints of chocolate and nuts.",
  },
  {
    name: "Robusta",
    price: 12.99,
    img: "/images/bean_image.png",
    location: "Coorg, India",
    description: "Strong, bold, and earthy with a rich crema.",
  },
  {
    name: "Nilgiri",
    price: 15.99,
    img: "/images/bean_image.png",
    location: "Nilgiri hills, India",
    description: "Bright, floral, and citrusy with a smooth finish.",
  }
];



export const dummyTestimonialsData = [
  {
    name: "James M",
    rating: 5,
    review:
      "Smooth, rich, and packed with flavor. My morning coffee has never been better.",
  },
  {
    name: "sarah L",
    rating: 4,
    review:
      "Absolutely the freshest coffee beans I've ever had! The aroma is just incredible.",
  },
  {
    name: "Jane Doe",
    rating: 5,
    review:
      "Fast shipping and top-notch quality. You’ve got a customer for life!",
  }
]; 


//create a dummy data for the products similar to featuresdata


export const dummyProductsData = [
  // Featured Products (first 6 items)
  {
    name: "Arabica",
    price: 18.99,
    img: "/images/bean_image.png",
    location: "Chikmagalur, India",
    description: "Smooth, mild, and slightly sweet with hints of chocolate and nuts.",
  },
  {
    name: "Robusta",
    price: 12.99,
    img: "/images/bean_image.png",
    location: "Coorg, India",
    description: "Strong, bold, and earthy with a rich crema.",
  },
  {
    name: "Nilgiri",
    price: 15.99,
    img: "/images/bean_image.png",
    location: "Nilgiri Hills, India",
    description: "Bright, floral, and citrusy with a smooth finish.",
  },
  {
    name: "Liberica",
    price: 20.99,
    img: "/images/bean_image.png",
    location: "Mount Kitanglad, Philippines",
    description: "Unique smoky aroma with woody and floral notes.",
  },
  {
    name: "Excelsa",
    price: 16.49,
    img: "/images/bean_image.png",
    location: "Lam Dong, Vietnam",
    description: "Tart, fruity characteristics with dark roast tones.",
  },
  {
    name: "Arabica Dark Roast",
    price: 19.99,
    img: "/images/bean_image.png",
    location: "Ouro Preto, Brazil",
    description: "Rich caramel sweetness with low acidity and cocoa notes.",
  },

  // Regular Products (remaining 9 items)
  {
    name: "Robusta Gold",
    price: 14.25,
    img: "/images/bean_image.png",
    location: "Dak Lak, Vietnam",
    description: "Intense flavor with chocolate undertones and thick body.",
  },
  {
    name: "Typica",
    price: 22.99,
    img: "/images/bean_image.png",
    location: "Tarrazú, Costa Rica",
    description: "Delicate sweetness with notes of honey and mild citrus.",
  },
  {
    name: "Bourbon",
    price: 24.5,
    img: "/images/bean_image.png",
    location: "Antigua, Guatemala",
    description: "Complex acidity with caramel and nutty flavors.",
  },
  {
    name: "Geisha",
    price: 45.0,
    img: "/images/bean_image.png",
    location: "Boquete, Panama",
    description: "Jasmine aroma with bergamot and tropical fruit notes.",
  },
  {
    name: "Blue Mountain",
    price: 55.75,
    img: "/images/bean_image.png",
    location: "Jamaica",
    description: "Mild flavor with bright acidity and creamy body.",
  },
  {
    name: "Peaberry",
    price: 28.99,
    img: "/images/bean_image.png",
    location: "Kilimanjaro, Tanzania",
    description: "Concentrated flavor with wine-like acidity and berry notes.",
  },
  {
    name: "Maragogype",
    price: 21.99,
    img: "/images/bean_image.png",
    location: "Chiapas, Mexico",
    description: "Extra-large beans with mild acidity and nutty profile.",
  },
  {
    name: "Pacamara",
    price: 26.4,
    img: "/images/bean_image.png",
    location: "Apaneca, El Salvador",
    description: "Bold citrus notes with chocolate and floral undertones.",
  },
  {
    name: "Catuai",
    price: 17.99,
    img: "/images/bean_image.png",
    location: "Minas Gerais, Brazil",
    description: "Well-balanced with nutty characteristics and sweet finish.",
  }
];

// Featured products could be extracted as:
// export const dummyFeaturedData = dummyProductsData.slice(0, 6);

export const sample_dummyProductsData = [
  {
    id: "clq1", // Simulating cuid
    name: "Arabica",
    description: "Smooth, mild, and slightly sweet with hints of chocolate and nuts.",
    price: 18.99,
    inventory: 100,
    images: ["/images/bean_image.png"],
    category: "ARABICA",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01")
  },
  {
    id: "clq2",
    name: "Robusta",
    description: "Strong, bold, and earthy with a rich crema.",
    price: 12.99,
    inventory: 150,
    images: ["/images/bean_image.png"],
    category: "ROBUSTA",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01")
  },
  {
    id: "clq3",
    name: "Nilgiri",
    description: "Bright, floral, and citrusy with a smooth finish.",
    price: 15.99,
    inventory: 75,
    images: ["/images/bean_image.png"],
    category: "SPECIALTY",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01")
  },
  // ... add more products following the same structure
];

// Example cart items data
export const dummyCartItemsData = [
  {
    id: "cart_item_1",
    cartId: "cart_1",
    productId: "clq1",
    quantity: 2,
    price: 18.99,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01")
  },
  // ... more cart items
];

// Example order items data
export const dummyOrderItemsData = [
  {
    id: "order_item_1",
    orderId: "order_1",
    productId: "clq1",
    quantity: 1,
    price: 18.99,
    createdAt: new Date("2024-01-01")
  },
  // ... more order items
];

// Helper function to get featured products (first 6)
export const sample_dummyFeaturedData = dummyProductsData.slice(0, 6);

// If you need location data, you could add it as metadata in the description
// or create a separate metadata object:
export const productMetadata = {
  "clq1": {
    location: "Chikmaglur, India"
  },
  "clq2": {
    location: "Coorg, India"
  },
  // ... more metadata
};

// Reviews could be a separate model in your schema, but if you want to keep them as is:
export const sample_dummyReviewsData = [
  {
    id: "review_1",
    name: "James M",
    rating: 5,
    review: "Smooth, rich, and packed with flavor. My morning coffee has never been better.",
    productId: "clq1",
    createdAt: new Date("2024-01-01")
  },
  {
    id: "review_2",
    name: "Sarah L",
    rating: 4,
    review: "Absolutely the freshest coffee beans I've ever had! The aroma is just incredible.",
    productId: "clq1",
    createdAt: new Date("2024-01-01")
  },
  // ... more reviews
];