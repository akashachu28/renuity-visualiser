import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Check, Edit2, Download, Mail, Phone, Sparkles } from "lucide-react";
import { StepIndicator } from "../components/StepIndicator";

const steps = ["Style", "Fixtures", "Materials", "Colors", "Summary"];

// Mock data - in a real app, this would come from state management
const designSelections = {
  style: { name: "Modern", icon: "✨" },
  vanity: { name: "Single Floating Vanity", icon: "🚰" },
  bathtub: { name: "Freestanding Tub", icon: "🛁" },
  shower: { name: "Walk-In Glass Shower", icon: "🚿" },
  tile: { name: "White Marble", icon: "⬜" },
  countertop: { name: "Quartz", icon: "💎" },
  colorPalette: { name: "Serene Whites", icon: "🎨" },
};

export function Summary() {
  const navigate = useNavigate();

  const selections = [
    { label: "Style", value: designSelections.style.name, route: "/style", icon: designSelections.style.icon },
    { label: "Vanity", value: designSelections.vanity.name, route: "/fixtures", icon: designSelections.vanity.icon },
    { label: "Bathtub", value: designSelections.bathtub.name, route: "/fixtures", icon: designSelections.bathtub.icon },
    { label: "Shower", value: designSelections.shower.name, route: "/fixtures", icon: designSelections.shower.icon },
    { label: "Tile", value: designSelections.tile.name, route: "/materials", icon: designSelections.tile.icon },
    { label: "Countertop", value: designSelections.countertop.name, route: "/materials", icon: designSelections.countertop.icon },
    { label: "Color Palette", value: designSelections.colorPalette.name, route: "/colors", icon: designSelections.colorPalette.icon },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      {/* Header */}
      <div className="bg-white border-b border-[#E8E6E1]">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <button
            onClick={() => navigate("/colors")}
            className="flex items-center gap-2 text-[#6B6B6B] hover:text-[#1A3A52] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1A3A52] rounded-lg flex items-center justify-center">
              <span className="text-sm font-semibold text-white">R</span>
            </div>
            <span className="text-xl font-semibold text-[#1A3A52]">Renuity</span>
          </div>

          <div className="w-20" />
        </div>
      </div>

      {/* Step Indicator */}
      <StepIndicator currentStep={5} totalSteps={5} steps={steps} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#2A9D8F] rounded-full mb-6 shadow-xl">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-[#1A3A52] mb-4">
            Your Design is Complete!
          </h1>
          <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">
            We've captured your vision for a beautiful bathroom. Review your selections
            below and take the next step toward making it a reality.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Left Column - Design Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
              <div className="relative h-96">
                <img
                  src="https://images.unsplash.com/photo-1769356814886-abdadde25ea7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wbGV0ZWQlMjBiYXRocm9vbSUyMHJlbW9kZWwlMjBsdXh1cnl8ZW58MXx8fHwxNzc1MTI1OTg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Your bathroom design"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 left-6 bg-[#1A3A52]/90 backdrop-blur-md text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-lg flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Your Dream Bathroom
                </div>
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-semibold text-[#1A3A52] mb-4">
                  Modern Elegance
                </h2>
                <p className="text-[#6B6B6B] leading-relaxed mb-6">
                  A sophisticated bathroom featuring clean lines, premium materials, and
                  a serene color palette. Perfect for relaxation and daily luxury.
                </p>
                <div className="flex gap-3">
                  <button className="flex-1 bg-[#F5F4F0] hover:bg-[#E8E6E1] text-[#1A3A52] px-5 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Save Design
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Selections */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold text-[#1A3A52] mb-6">
              Your Selections
            </h2>
            <div className="space-y-3">
              {selections.map((selection, index) => (
                <motion.div
                  key={selection.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                  className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{selection.icon}</div>
                    <div>
                      <p className="text-sm text-[#6B6B6B] mb-1">{selection.label}</p>
                      <p className="font-semibold text-[#1A3A52]">{selection.value}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(selection.route)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#2A9D8F] hover:text-[#238b7f] p-2 rounded-lg hover:bg-[#F5F4F0]"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-gradient-to-br from-[#1A3A52] to-[#0F2537] rounded-3xl p-12 text-center shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Bring Your Vision to Life?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Connect with our expert design team for a free consultation. We'll help you
            refine your design and provide a detailed quote.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#2A9D8F] hover:bg-[#238b7f] text-white px-10 py-5 rounded-2xl font-semibold text-lg shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Phone className="w-6 h-6" />
              Schedule Consultation
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-10 py-5 rounded-2xl font-semibold text-lg border-2 border-white/20 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Mail className="w-6 h-6" />
              Email My Design
            </motion.button>
          </div>

          <p className="text-sm text-white/60">
            Or call us at <span className="text-white font-medium">(555) 123-4567</span>
          </p>
        </motion.div>

        {/* Start Over Option */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => navigate("/")}
            className="text-[#6B6B6B] hover:text-[#1A3A52] font-medium transition-colors"
          >
            Start a New Design →
          </button>
        </motion.div>
      </div>
    </div>
  );
}
