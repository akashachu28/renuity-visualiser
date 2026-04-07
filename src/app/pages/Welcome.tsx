import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function Welcome() {
  const navigate = useNavigate();

  const handleStartVisualizing = () => {
    navigate("/zip");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-8 py-20">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-10"
          >
            <div className="space-y-6">
              <h1 className="text-6xl font-bold text-[#1A3A52] leading-tight">
                See Your Remodel
                <br />
                Before You Buy
              </h1>
              <p className="text-2xl text-[#6B6B6B] leading-relaxed">
                Visualize your space with AI in seconds.
              </p>
            </div>

            {/* CTA Button */}
            <motion.button
              onClick={handleStartVisualizing}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#2A9D8F] hover:bg-[#238b7f] text-white px-12 py-6 rounded-2xl text-xl font-semibold shadow-[0_4px_24px_rgba(42,157,143,0.25)] hover:shadow-[0_6px_32px_rgba(42,157,143,0.35)] transition-all duration-300 flex items-center gap-4 group"
            >
              Start Visualizing
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            {/* Trust Indicators */}
            <div className="flex items-center gap-8 pt-6">
              <div className="flex flex-col">
                <p className="text-sm text-[#6B6B6B] mb-1">No signup required</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#2A9D8F]" />
                  <p className="text-sm font-medium text-[#1A3A52]">100% Free</p>
                </div>
              </div>
              <div className="h-10 w-px bg-[#E8E6E1]" />
              <div className="flex flex-col">
                <p className="text-sm text-[#6B6B6B] mb-1">Quick process</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#2A9D8F]" />
                  <p className="text-sm font-medium text-[#1A3A52]">Takes 5 minutes</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Before/After Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            {/* Before/After Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-[0_8px_48px_rgba(0,0,0,0.12)]">
              {/* Before Image */}
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1722764372202-b8ae35e7d424?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiYXRocm9vbSUyMGJlZm9yZSUyMGFmdGVyJTIwcmVub3ZhdGlvbnxlbnwxfHx8fDE3NzUxMjk1MDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Modern bathroom visualization"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Before Label */}
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-5 py-3 rounded-xl shadow-lg">
                  <p className="text-sm font-semibold text-[#1A3A52]">AI Visualization</p>
                </div>

                {/* After Label */}
                <div className="absolute bottom-6 right-6 bg-[#2A9D8F] px-6 py-3 rounded-xl shadow-lg">
                  <p className="text-sm font-semibold text-white">Your Dream Space</p>
                </div>
              </div>
            </div>

            {/* Floating Feature Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.1)] p-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#2A9D8F]/10 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#2A9D8F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1A3A52]">Instant Results</p>
                  <p className="text-xs text-[#6B6B6B]">AI-powered design</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.1)] p-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#1A3A52]/10 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#1A3A52]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1A3A52]">Premium Quality</p>
                  <p className="text-xs text-[#6B6B6B]">Professional results</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Social Proof Section */}
        
      </div>
    </div>
  );
}