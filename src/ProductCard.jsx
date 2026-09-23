import React, { useState } from "react";
import "./ProductCard.css";

const mensProducts = [
  {
    id: "vintage-jacket",
    title: "VINTAGE DENIM JACKET",
    colorName: "Black",
    description: "Premium heavy-cotton denim jacket with relaxed drop shoulders.",
    basePrice: 2499,
    images: [
      "https://static.vecteezy.com/system/resources/previews/049/796/162/non_2x/a-black-denim-jacket-on-a-transparent-background-free-png.png",
      "https://static.vecteezy.com/system/resources/previews/049/796/221/non_2x/men-s-denim-jacket-on-transparent-background-free-png.png"
    ],
    sizes: [
      { name: "S", multiplier: 1 },
      { name: "M", multiplier: 1 },
      { name: "L", multiplier: 1.1 },
      { name: "XL", multiplier: 1.2 }
    ]
  },
  {
    id: "heavy-hoodie",
    title: "OVERSIZED HEAVY HOODIE",
    colorName: "Red",
    description: "450 GSM fleece-lined oversized hoodie for streetwear aesthetic.",
    basePrice: 1899,
    images: [
      "https://static.vecteezy.com/system/resources/thumbnails/047/249/404/small_2x/sweater-shirt-hoodie-isolated-png.png",
      "https://static.vecteezy.com/system/resources/thumbnails/032/325/458/small_2x/red-hoodie-front-and-back-side-mockup-template-isolated-on-transparent-background-file-cut-out-ai-generated-png.png"
    ],
    sizes: [
      { name: "S", multiplier: 1 },
      { name: "M", multiplier: 1 },
      { name: "L", multiplier: 1.1 },
      { name: "XL", multiplier: 1.2 }
    ]
  },
  {
    id: "linen-shirt",
    title: "SLIM-FIT LINEN SHIRT",
    colorName: "Blue",
    description: "100% pure breathable linen shirt crafted for summer comfort.",
    basePrice: 1599,
    images: [
      "https://static.vecteezy.com/system/resources/previews/058/666/130/non_2x/classic-light-blue-men-s-long-sleeve-dress-shirt-mockup-free-png.png",
      "https://static.vecteezy.com/system/resources/previews/055/326/585/non_2x/elegant-blue-shirt-mockup-showcasing-front-and-back-views-for-design-and-presentation-purposes-elegant-blue-shirt-mockup-front-and-back-views-on-transparent-background-free-png.png"
      
    ],
    sizes: [
      { name: "S", multiplier: 1 },
      { name: "M", multiplier: 1 },
      { name: "L", multiplier: 1.1 },
      { name: "XL", multiplier: 1.2 }
    ]
  }
];

const ProductCard = () => {
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(mensProducts[0].sizes[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentProduct = mensProducts[activeProductIndex];
  const calculatedPrice = currentProduct.basePrice * selectedSize.multiplier;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(amount);
  };

  const triggerAnimation = (callback) => {
    setIsAnimating(true);
    setTimeout(() => {
      callback();
      setIsAnimating(false);
    }, 250);
  };

  const handleProductSwitch = (index) => {
    if (index === activeProductIndex) return;
    triggerAnimation(() => {
      setActiveProductIndex(index);
      setActiveImageIndex(0);
      setSelectedSize(mensProducts[index].sizes[0]);
    });
  };

  const handleImageSwitch = (imgIdx) => {
    if (imgIdx === activeImageIndex) return;
    triggerAnimation(() => {
      setActiveImageIndex(imgIdx);
    });
  };

  return (
    <div className="mens-showcase-container">
      {/* Left Details */}
      <div className={`mens-info-pane ${isAnimating ? "fade-out" : "fade-in"}`}>
        <h1 className="mens-title">{currentProduct.title}</h1>
        <p className="mens-description">{currentProduct.description}</p>
        <div className="mens-price">{formatCurrency(calculatedPrice)}</div>

        <div className="color-indicator">
          <span className="color-dot"></span>
          <span className="color-text">{currentProduct.colorName}</span>
        </div>

        {/* Size Selection */}
        <div className="size-section">
          <div className="size-buttons">
            {currentProduct.sizes.map((sizeObj) => (
              <button
                key={sizeObj.name}
                className={`size-btn ${selectedSize.name === sizeObj.name ? "active" : ""}`}
                onClick={() => setSelectedSize(sizeObj)}
              >
                {sizeObj.name}
              </button>
            ))}
          </div>
        </div>

        <button
          className="add-to-bag-btn"
          onClick={() =>
            alert(`Added ${currentProduct.title}\nSize: ${selectedSize.name}\nTotal: ${formatCurrency(calculatedPrice)}`)
          }
        >
          ADD TO BAG
        </button>

        {/* 3 Products Swapper Bar */}
        <div className="mens-swapper">
          {mensProducts.map((prod, index) => (
            <div
              key={prod.id}
              className={`swapper-box ${activeProductIndex === index ? "selected" : ""}`}
              onClick={() => handleProductSwitch(index)}
            >
              <img src={prod.images[0]} alt={prod.title} className="swapper-img" />
              <span className="swapper-name">{prod.id.replace("-", " ").toUpperCase()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Gallery Pane */}
      <div className="mens-gallery-pane">
        <div className={`main-image-wrapper ${isAnimating ? "slide-out" : "slide-in"}`}>
          <img
            src={currentProduct.images[activeImageIndex]}
            alt={currentProduct.title}
            className="main-mens-image"
          />
        </div>

        {/* Bottom Image Thumbnail Switcher Bar */}
        <div className="image-switcher-bar">
          {currentProduct.images.map((imgUrl, imgIdx) => (
            <div
              key={imgIdx}
              className={`switcher-thumb-box ${activeImageIndex === imgIdx ? "active-thumb" : ""}`}
              onClick={() => handleImageSwitch(imgIdx)}
            >
              <img src={imgUrl} alt={`View ${imgIdx + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;