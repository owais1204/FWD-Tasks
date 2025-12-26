// script.js - Professional Dynamic Book List Implementation

// Book data - Professional bookstore collection
const bookData = [
    {
        id: 1,
        title: "The Midnight Library",
        author: "Matt Haig",
        genre: "Fiction",
        price: 14.99,
        originalPrice: 19.99,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1512820790803-83ca3b5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "A profound exploration of life's infinite possibilities and the choices that shape our destiny."
    },
    {
        id: 2,
        title: "Atomic Habits",
        author: "James Clear",
        genre: "Non-Fiction",
        price: 12.99,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Transform your life through the power of tiny, incremental changes."
    },
    {
        id: 3,
        title: "The Silent Patient",
        author: "Alex Michaelides",
        genre: "Mystery",
        price: 11.99,
        originalPrice: 16.99,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "A psychological thriller that will keep you guessing until the final page."
    },
    {
        id: 4,
        title: "Dune",
        author: "Frank Herbert",
        genre: "Sci-Fi",
        price: 15.99,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1633090744338-735a51d295eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "The epic science fiction saga that redefined the genre."
    },
    {
        id: 5,
        title: "The Love Hypothesis",
        author: "Ali Hazelwood",
        genre: "Romance",
        price: 10.99,
        originalPrice: 14.99,
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "A delightful enemies-to-lovers romance with STEM protagonists."
    },
    {
        id: 6,
        title: "Sapiens",
        author: "Yuval Noah Harari",
        genre: "Non-Fiction",
        price: 16.99,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1524178232363-44bc0839b0d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "A brief history of humankind from the Stone Age to the Silicon Age."
    },
    {
        id: 7,
        title: "Project Hail Mary",
        author: "Andy Weir",
        genre: "Sci-Fi",
        price: 13.99,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "A lone astronaut's desperate mission to save Earth from cosmic disaster."
    },
    {
        id: 8,
        title: "The Maidens",
        author: "Alex Michaelides",
        genre: "Mystery",
        price: 12.49,
        originalPrice: 17.99,
        rating: 4.1,
        image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "A gripping tale of murder and obsession set in Cambridge University."
    },
    {
        id: 9,
        title: "The Seven Husbands of Evelyn Hugo",
        author: "Taylor Jenkins Reid",
        genre: "Fiction",
        price: 11.99,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "A glittering epic of Old Hollywood that reveals scandalous secrets."
    },
    {
        id: 10,
        title: "Educated",
        author: "Tara Westover",
        genre: "Non-Fiction",
        price: 14.49,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "A memoir of a young woman's quest for knowledge against all odds."
    },