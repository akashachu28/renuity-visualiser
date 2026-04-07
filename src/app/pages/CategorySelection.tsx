import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Bath, Sparkles } from "lucide-react";

export function CategorySelection() {
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    navigate("/validate");
  };

  return (
    <div className="min-h-screen bg-[#F5F4F0] flex items-center justify-center px-6">
      {/* Logo Header */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#1A3A52] to-[#2A9D8F] rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-[#1A3A52]">Renuity</span>
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Header Text */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1A3A52] mb-3">
            What would you like to renovate?
          </h1>
          <p className="text-lg text-[#6B6B6B]">
            Choose a project to get started
          </p>
        </div>

        {/* Category Card */}
        <motion.button
          onClick={handleCategoryClick}
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-full bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-12 text-center group cursor-pointer border-2 border-transparent hover:border-[#2A9D8F]/20"
        >
          {/* Icon Container */}
          <div className="relative mb-6 flex justify-center">
            <motion.div
              whileHover={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ duration: 0.5 }}
              className="w-24 h-24 bg-gradient-to-br from-[#2A9D8F]/10 to-[#1A3A52]/10 rounded-2xl flex items-center justify-center group-hover:from-[#2A9D8F]/20 group-hover:to-[#1A3A52]/20 transition-colors duration-300"
            >
              <Bath className="w-12 h-12 text-[#2A9D8F]" strokeWidth={1.5} />
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 w-24 h-24 bg-[#2A9D8F]/10 rounded-2xl blur-xl mx-auto"
            />
          </div>

          {/* Category Title */}
          <h2 className="text-3xl font-bold text-[#1A3A52] mb-3 group-hover:text-[#2A9D8F] transition-colors duration-300">
            Bathroom Remodeling
          </h2>

          {/* Subtitle */}
          <p className="text-lg text-[#6B6B6B] mb-6">
            Transform your space
          </p>

          {/* Features List */}
          <div className="flex flex-wrap justify-center gap-2 text-sm text-[#6B6B6B]">
            <span className="px-3 py-1 bg-[#F5F4F0] rounded-full">Fixtures</span>
            <span className="px-3 py-1 bg-[#F5F4F0] rounded-full">Materials</span>
            <span className="px-3 py-1 bg-[#F5F4F0] rounded-full">Colors</span>
          </div>

          {/* Arrow indicator */}
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="mt-8 text-[#2A9D8F] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <svg
              className="w-6 h-6 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </motion.div>
        </motion.button>

        {/* Coming Soon Cards (Optional - for future categories) */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-white/50 rounded-2xl p-6 text-center opacity-50 cursor-not-allowed">
            <div className="w-12 h-12 bg-[#E8E6E1] rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-[#6B6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <p className="text-sm font-medium text-[#6B6B6B]">Kitchen</p>
            <p className="text-xs text-[#B0B0B0] mt-1">Coming Soon</p>
          </div>

          <div className="bg-white/50 rounded-2xl p-6 text-center opacity-50 cursor-not-allowed">
            <div className="w-12 h-12 bg-[#E8E6E1] rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-[#6B6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <p className="text-sm font-medium text-[#6B6B6B]">Exterior</p>
            <p className="text-xs text-[#B0B0B0] mt-1">Coming Soon</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}