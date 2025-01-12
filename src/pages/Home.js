import React from 'react'
import HeroSection from '../components/HeroSection'
import CategorySection from '../components/CategorySection'
import FeaturedProducts from '../components/FeaturedProducts'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'
import WhyChooseUs from '../components/WhyChooseUs'
import Newsletter from '../components/Newsletter'

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Categories Section */}
      <section className="py-16">
        <CategorySection />
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <FeaturedProducts />
      </section>

      {/* Category Wise Products */}
      <section className="py-16">
        <CategoryWiseProductDisplay />
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <WhyChooseUs />
      </section>

      {/* Newsletter Section */}
      <section className="py-16">
        <Newsletter />
      </section>
    </div>
  )
}

export default Home