import React from 'react'
import CategoryList from '../components/CategoryList'
import HeroSection from '../components/HeroSection'
import FeaturedProducts from '../components/FeaturedProducts'
import RealEstateShowcase from '../components/RealEstateShowcase'
import WhyChooseUs from '../components/WhyChooseUs'
import Newsletter from '../components/Newsletter'

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection />

      {/* Categories */}
      <div className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Shop by Category</h2>
          <CategoryList />
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Featured Products</h2>
          <FeaturedProducts category="fruits" heading="Fresh Fruits" />
          <FeaturedProducts category="vegetables" heading="Fresh Vegetables" />
        </div>
      </div>

      {/* Real Estate Showcase */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Featured Properties</h2>
          <RealEstateShowcase />
        </div>
      </div>

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  )
}

export default Home