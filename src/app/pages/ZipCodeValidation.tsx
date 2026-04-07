import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import { useDesign } from "../context/DesignContext";

// Mock validation - in production, this would be an API call
const VALID_ZIP_CODES = ["90210", "10001", "60601", "94102", "33101", "02101"];

export function ZipCodeValidation() {
  const navigate = useNavigate();
  const { updateSelections } = useDesign();
  const [zipCode, setZipCode] = useState("");
  const [validationState, setValidationState] = useState<"idle" | "success" | "error">("idle");
  const [hasValidated, setHasValidated] = useState(false);

  const handleValidate = () => {
    if (zipCode.trim().length === 5) {
      setHasValidated(true);
      if (VALID_ZIP_CODES.includes(zipCode)) {
        setValidationState("success");
        updateSelections({ zipCode });
        setTimeout(() => {
          navigate("/category-tier");
        }, 1200);
      } else {
        setValidationState("error");
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 5);
    setZipCode(value);
    if (hasValidated) {
      setValidationState("idle");
      setHasValidated(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-[#2A9D8F]/10 rounded-2xl mb-6"
          >
            <svg className="w-8 h-8 text-[#2A9D8F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </motion.div>
          <h1 className="text-5xl font-bold text-[#1A3A52] mb-4">
            Let's Get Started
          </h1>
          <p className="text-xl text-[#6B6B6B]">
            Enter your zip code to check availability
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-[#F5F4F0] rounded-3xl shadow-[0_2px_16px_rgba(0,0,0,0.04)] p-10 mb-6">
          <div className="relative">
            <input
              type="text"
              value={zipCode}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && zipCode.length === 5) {
                  handleValidate();
                }
              }}
              placeholder="Enter 5-digit zip code"
              className={`w-full px-8 py-6 text-2xl text-center font-semibold rounded-2xl outline-none transition-all duration-300 ${
                validationState === "success"
                  ? "border-2 border-[#4CAF50] bg-white text-[#1A3A52]"
                  : validationState === "error"
                  ? "border-2 border-[#E57373] bg-white text-[#1A3A52]"
                  : "border-2 border-transparent focus:border-[#2A9D8F] bg-white text-[#1A3A52]"
              }`}
            />

            {/* Validation Icons */}
            <AnimatePresence>
              {validationState === "success" && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute right-6 top-1/2 -translate-y-1/2"
                >
                  <CheckCircle className="w-8 h-8 text-[#4CAF50]" />
                </motion.div>
              )}
              {validationState === "error" && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute right-6 top-1/2 -translate-y-1/2"
                >
                  <AlertCircle className="w-8 h-8 text-[#E57373]" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Success Message */}
          <AnimatePresence>
            {validationState === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 flex items-center justify-center gap-2 text-[#4CAF50]"
              >
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <p className="font-medium">Great! We service your area.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message */}
          <AnimatePresence>
            {validationState === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 text-center"
              >
                <p className="text-[#E57373] font-medium mb-3">
                  We're not in your area yet
                </p>
                <button
                  onClick={() => {
                    setValidationState("idle");
                    setHasValidated(false);
                    setZipCode("");
                  }}
                  className="text-[#2A9D8F] hover:text-[#238b7f] font-medium transition-colors"
                >
                  Try a different zip code
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Continue Button */}
          {validationState === "idle" && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleValidate}
              disabled={zipCode.length !== 5}
              className={`w-full mt-8 py-6 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                zipCode.length === 5
                  ? "bg-[#2A9D8F] hover:bg-[#238b7f] text-white shadow-[0_4px_24px_rgba(42,157,143,0.25)] cursor-pointer"
                  : "bg-[#E8E6E1] text-[#B0B0B0] cursor-not-allowed"
              }`}
            >
              Continue
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          )}
        </div>

        {/* Helper Text */}
        {validationState === "idle" && !hasValidated && (
          <p className="text-center text-sm text-[#6B6B6B]">
            Try: 90210, 10001, 60601, 94102, 33101, or 02101
          </p>
        )}
      </motion.div>
    </div>
  );
}