import React from 'react';
import { motion } from 'framer-motion';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: "Nuwan Perera",
      role: "Business Owner",
      image: require('../assets/customers/1.jpg'),
      quote: "Excellent service and quality vehicles! RS Car Point helped me find the perfect SUV for my family. The financing process was smooth and transparent.",
      rating: 5
    },
    {
      id: 2,
      name: "Kavinda Silva",
      role: "Software Engineer",
      image: require('../assets/customers/2.jpg'),
      quote: "I bought my first car from RS Car Point and couldn't be happier. Great prices, honest dealing, and excellent after-sales support.",
      rating: 5
    },
    {
      id: 3,
      name: "Priyanka Fernando",
      role: "Teacher",
      image: require('../assets/customers/3.jpg'),
      quote: "Professional team, wide selection of vehicles, and competitive leasing options. Highly recommend RS Car Point for anyone looking for quality cars.",
      rating: 5
    },
    {
      id: 4,
      name: "Roshan Jayawardena",
      role: "Businessman",
      image: require('../assets/customers/4.jpg'),
      quote: "Found my dream car at RS Car Point! The team was knowledgeable and helped me with the best financing deal. Outstanding customer service.",
      rating: 5
    },
    {
      id: 5,
      name: "Saman Wickramasinghe",
      role: "Doctor",
      image: require('../assets/customers/5.jpg'),
      quote: "Trustworthy dealer with genuine vehicles. The purchasing process was hassle-free and the staff was very professional throughout.",
      rating: 5
    },
    {
      id: 6,
      name: "Madhavi Gunasekara",
      role: "Entrepreneur",
      image: require('../assets/customers/6.jpg'),
      quote: "Excellent experience buying my vehicle from RS Car Point. Fair pricing, quality cars, and great customer support. Will definitely recommend!",
      rating: 5
    }
  ];

  const renderStars = (rating: number) => {
    return Array(rating).fill(0).map((_, i) => (
      <svg
        key={i}
        className="w-5 h-5 text-yellow-400 fill-current"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="container mx-auto px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            What Our <span className="text-blue-600">Customers Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what our satisfied customers have to say about 
            their experience with RS Car Point.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-6 rounded-full"></div>
        </div>        {/* Testimonials Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, staggerChildren: 0.2 }}
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              viewport={{ once: true }}
            >{/* Customer Photo - Rectangle Format */}
              <div className="relative overflow-hidden">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-48 object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Customer Info and Feedback */}
              <div className="p-4">
                {/* Customer Name */}
                <h4 className="text-lg font-bold text-gray-900 mb-1 text-center">{testimonial.name}</h4>
                <p className="text-blue-600 font-medium text-center mb-3 text-sm">{testimonial.role}</p>

                {/* Star Rating */}
                <div className="flex justify-center mb-3">
                  {renderStars(testimonial.rating)}
                </div>                {/* Feedback */}
                <p className="text-gray-700 leading-relaxed text-center italic text-sm">
                  "{testimonial.quote}"
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>        {/* Location Images Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Kirinda Puhulwella <span className="text-blue-600">Location</span>
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Visit our showroom located in the heart of Kirinda Puhulwella, Matara. 
              Experience our complete range of vehicles in person.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-4 rounded-full"></div>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, staggerChildren: 0.15 }}
            viewport={{ once: true }}
          >
            {[
              { image: require('../assets/location/s1.jpg'), title: "Showroom Exterior" },
              { image: require('../assets/location/s2.jpg'), title: "Vehicle Display Area" },
              { image: require('../assets/location/s3.jpg'), title: "Customer Service" },
              { image: require('../assets/location/s4.jpg'), title: "Location View" }
            ].map((location, index) => (
              <motion.div
                key={index}
                className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                viewport={{ once: true }}
              >
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={location.image}
                    alt={location.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="text-lg font-semibold">{location.title}</h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Located at Kirinda Puhulwella, Matara, Sri Lanka
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-lg hover:shadow-xl">
              Get Directions
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
