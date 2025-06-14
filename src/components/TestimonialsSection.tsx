
import React from 'react';
import { Star, Quote, Heart } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Adunni Okafor",
      role: "Mother of 2, Lagos",
      image: "photo-1535268647677-300dbf3d78d1", // Using the available placeholder
      rating: 5,
      text: "MeddyPal made finding the right pediatrician for my children so easy. The hospital reviews helped me choose the best care for my family.",
      highlight: "Best care for my family"
    },
    {
      name: "Fatima Ibrahim",
      role: "Expecting Mother, Abuja",
      image: "photo-1618160702438-9b02ab6515c9", // Using healthy food image as placeholder
      rating: 5,
      text: "During my pregnancy, MeddyPal helped me track all my antenatal appointments and find the best maternity hospitals in Abuja.",
      highlight: "Pregnancy journey support"
    },
    {
      name: "Chioma Eze",
      role: "Mother of 3, Port Harcourt",
      image: "photo-1721322800607-8c38375eef04", // Using home environment image
      rating: 5,
      text: "The insurance comparison feature saved me thousands on my family's health plan. MeddyPal truly understands Nigerian mothers' needs.",
      highlight: "Saved thousands on insurance"
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800 text-sm font-medium mb-6 animate-gentle-bounce">
            <Heart className="h-4 w-4 mr-2 animate-pulse" />
            💝 Loved by Nigerian Mothers
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Real Stories from <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Real Mothers</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how MeddyPal is helping mothers across Nigeria take better care of their families
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.name}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 transform animate-fade-in hover-scale"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <Quote className="h-8 w-8 text-teal-400 mb-4 animate-pulse" />
              
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                "{testimonial.text}"
              </p>
              
              <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg p-3 mb-6">
                <p className="text-sm font-semibold text-teal-700">
                  💡 Key Benefit: {testimonial.highlight}
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-200 to-emerald-200 rounded-full flex items-center justify-center animate-float">
                  <Heart className="h-6 w-6 text-teal-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <div className="flex items-center mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
