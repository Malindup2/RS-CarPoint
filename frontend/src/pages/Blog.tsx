import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Blog: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Aluth Avurudu Celebration 2025",
      date: "April 14, 2025",
      category: "Company Events",
      excerpt: "RS Car Point celebrated the traditional Sinhala and Tamil New Year with our team and customers. A day filled with traditional games, delicious food, and community spirit.",
      content: "Our annual Aluth Avurudu celebration brought together our entire RS Car Point family for a day of traditional festivities. The event featured traditional Sri Lankan games, authentic cuisine, and cultural performances. It was a wonderful opportunity to strengthen bonds with our team members and valued customers while celebrating our rich cultural heritage.",
      images: [
        { src: require('../assets/Blogs/b1.jpg'), caption: "Traditional games and activities" },
        { src: require('../assets/Blogs/b3.jpg'), caption: "Team celebration moments" },
        { src: require('../assets/Blogs/b4.jpg'), caption: "Cultural performances and entertainment" }
      ],
      author: "RS Car Point Team",
      readTime: "3 min read"
    },
    {
      id: 2,
      title: "Pirith Chanting Ceremony - Blessing Our Business",
      date: "March 22, 2025",
      category: "Religious Events",
      excerpt: "We organized a special Pirith chanting ceremony to invoke blessings for our business and customers. A peaceful and spiritual event that brought good fortune to RS Car Point.",
      content: "In keeping with our Buddhist traditions, RS Car Point organized a sacred Pirith chanting ceremony at our showroom. The ceremony was conducted by respected monks from the local temple, creating a spiritually enriching environment. This blessing ceremony was organized to invoke protection and prosperity for our business and all our valued customers.",
      images: [
        { src: require('../assets/Blogs/b5.jpg'), caption: "Monks conducting the Pirith ceremony" },
        { src: require('../assets/Blogs/b6.jpg'), caption: "Peaceful spiritual atmosphere" }
      ],
      author: "RS Car Point Management",
      readTime: "2 min read"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="container mx-auto px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              RS Car Point <span className="text-blue-300">Blog</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Stay updated with our latest events, celebrations, and community activities at RS Car Point.
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-300 to-white mx-auto rounded-full"></div>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8 xl:px-12 2xl:px-16">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Latest <span className="text-blue-600">Events & News</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the latest happenings at RS Car Point - from cultural celebrations to 
              community events that bring us together.
            </p>
          </motion.div>

          <div className="space-y-16">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Post Header */}
                <div className="p-8 lg:p-12">
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                      {post.category}
                    </span>
                    <span className="text-gray-500">{post.date}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-500">{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Image Gallery */}
                <div className="px-8 lg:px-12 mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {post.images.map((image, imageIndex) => (                      <motion.div
                        key={imageIndex}
                        className="overflow-hidden rounded-xl shadow-md"
                      >
                        <img
                          src={image.src}
                          alt={image.caption}
                          className="w-full h-64 object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Post Content */}
                <div className="px-8 lg:px-12 pb-8">
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {post.content}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{post.author}</p>
                        <p className="text-sm text-gray-500">Author</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-4">
                      <button className="text-gray-500 hover:text-blue-600 transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.50-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
                        </svg>
                      </button>
                      <button className="text-gray-500 hover:text-red-600 transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6 lg:px-8 xl:px-12 2xl:px-16">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">
              Join Our Community Events
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Stay connected with RS Car Point and be part of our celebrations and community activities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Visit Our Showroom
              </motion.button>
              <motion.button 
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
