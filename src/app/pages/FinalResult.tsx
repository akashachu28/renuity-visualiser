import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Download, Mail, Link2, RefreshCw, Check, X, User, Phone } from "lucide-react";
import { useDesign } from "../context/DesignContext";
import { useNavigate } from "react-router";
//ewfrsdkljsfzc
export function FinalResult() {
  const { selections } = useDesign();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactData, setContactData] = useState({ name: "", phone: "", email: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleDownload = () => {
    // Mock download functionality
    alert("Your design has been downloaded!");
  };

  const handleEmail = () => {
    const email = prompt("Enter your email address:");
    if (email) {
      setEmailSent(true);
      setTimeout(() => setEmailSent(false), 3000);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleRegenerate = () => {
    navigate("/configure");
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setShowContactForm(false);
      setFormSubmitted(false);
      setContactData({ name: "", phone: "", email: "" });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-12 py-24">
      <div className="max-w-6xl w-full">
        {/* Top Navigation / Action */}
        <div className="flex justify-end mb-12">
          <motion.button
            onClick={handleRegenerate}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#E8E6E1] text-[#1A3A52] hover:bg-[#F5F4F0] transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="font-medium">Regenerate Design</span>
          </motion.button>
        </div>

        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl font-bold text-[#1A3A52] mb-6">
            Your Dream Bathroom
          </h1>
          <p className="text-xl text-[#6B6B6B] max-w-xl mx-auto leading-relaxed">
            Your personalized design is ready
          </p>
        </motion.div>

        {/* Main Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative mb-12"
        >
          {/* Image Container with fixed aspect ratio */}
          <div className="relative rounded-3xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.08)] bg-[#F5F4F0] p-3">
            <div className="rounded-2xl overflow-hidden relative" style={{ aspectRatio: '16/9' }}>
              <div className="absolute inset-0">
                <div className="w-full h-full flex justify-center items-center relative">
                  {/* Container with fixed aspect ratio */}
                  <div className="relative inline-block">
                    {/* Background Image - Relative Container */}
                    <img
                      src="/assets/staticBG.png"
                      alt="Your Custom Bathroom Design"
                      className="object-contain block"
                      style={{ width: '1000px', height: '475px' }}
                    />

                    {/* Overlay Selected Bathtub */}
                    {selections.selectedProductsData?.["Bathtub"] && (
                      <motion.img
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        src={selections.selectedProductsData["Bathtub"].imageUrl}
                        alt="Selected Bathtub"
                        className="absolute pointer-events-none object-contain"
                        style={{
                          top: '-19%',
                          left: '14.5%',
                          width: '71.5%',
                          height: 'auto',
                          zIndex: 2
                        }}
                      />
                    )}

                    {/* Overlay Selected Faucet */}
                    {selections.selectedProductsData?.["Faucet"] && (
                      <motion.img
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        src={selections.selectedProductsData["Faucet"].imageUrl}
                        alt="Selected Fixture"
                        className="absolute pointer-events-none"
                        style={{
                          top: '0%',
                          right: '15%',
                          width: '70%',
                          height: '90%',
                          zIndex: 2,
                          objectFit: 'fill'
                        }}
                      />
                    )}

                    {/* Overlay Selected Curtain */}
                    {selections.selectedProductsData?.["Curtain"] && (
                      <motion.img
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        src={selections.selectedProductsData["Curtain"].imageUrl}
                        alt="Selected Curtain"
                        className="absolute pointer-events-none object-contain"
                        style={{
                          top: '-14%',
                          left: '14.5%',
                          width: '71%',
                          height: 'auto',
                          zIndex: 5
                        }}
                      />
                    )}

                    {/* Overlay Selected Door */}
                    {selections.selectedProductsData?.["Door"] && (
                      <motion.img
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        src={selections.selectedProductsData["Door"].imageUrl}
                        alt="Selected Door"
                        className="absolute pointer-events-none"
                        style={{
                          top: '-3%',
                          left: '14.6%',
                          width: '71%',
                          height: '95%',
                          objectFit: 'fill',
                          zIndex: 10
                        }}
                      />
                    )}

                    {/* Overlay Selected Wall */}
                    {selections.selectedProductsData?.["Wall"] && (
                      <motion.img
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        src={selections.selectedProductsData["Wall"].imageUrl}
                        alt="Selected Wall"
                        className="absolute pointer-events-none"
                        style={{
                          top: '0%',
                          left: '14.8%',
                          width: '71%',
                          height: '96%',
                          objectFit: 'fill',
                          zIndex: 1
                        }}
                      />
                    )}

                    {/* Overlay Selected Ceiling */}
                    {selections.selectedProductsData?.["Ceiling"] && (
                      <motion.img
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        src={selections.selectedProductsData["Ceiling"].imageUrl}
                        alt="Selected Ceiling"
                        className="absolute pointer-events-none"
                        style={{
                          top: '-3%',
                          left: '14.8%',
                          width: '71%',
                          height: 'auto',
                          objectFit: 'contain',
                          zIndex: 1
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Design Summary */}
        {selections.product && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white rounded-3xl p-10 shadow-[0_2px_16px_rgba(0,0,0,0.04)] mb-20"
          >
            <h2 className="text-2xl font-semibold text-[#1A3A52] mb-8">
              Your Design Summary
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
              {/* Product Type */}
              <div>
                <p className="text-sm text-[#6B6B6B] mb-2">Product Type</p>
                <p className="text-lg font-medium text-[#1A3A52]">
                  {selections.product.title}
                </p>
              </div>

              {/* Tier */}
              {selections.tier && (
                <div>
                  <p className="text-sm text-[#6B6B6B] mb-2">Experience Tier</p>
                  <p className="text-lg font-medium text-[#1A3A52]">
                    {selections.tier.title}
                  </p>
                </div>
              )}

              {/* Wall Finish (Curtain) */}
              {selections.visualizer?.wallFinish && (
                <div>
                  <p className="text-sm text-[#6B6B6B] mb-2">Curtain</p>
                  <p className="text-lg font-medium text-[#1A3A52]">
                    {selections.visualizer.wallFinish}
                  </p>
                </div>
              )}

              {/* Tub Style */}
              {selections.visualizer?.tubStyle && (
                <div>
                  <p className="text-sm text-[#6B6B6B] mb-2">Bathtub</p>
                  <p className="text-lg font-medium text-[#1A3A52]">
                    {selections.visualizer.tubStyle}
                  </p>
                </div>
              )}

              {/* Fixtures (Faucet) */}
              {selections.visualizer?.fixture && (
                <div>
                  <p className="text-sm text-[#6B6B6B] mb-2">Faucet</p>
                  <p className="text-lg font-medium text-[#1A3A52]">
                    {selections.visualizer.fixture}
                  </p>
                </div>
              )}

              {/* Flooring (Door) */}
              {selections.visualizer?.flooring && (
                <div>
                  <p className="text-sm text-[#6B6B6B] mb-2">Door</p>
                  <p className="text-lg font-medium text-[#1A3A52]">
                    {selections.visualizer.flooring}
                  </p>
                </div>
              )}

              {/* Wall */}
              {selections.selectedProductsData?.["Wall"] && (
                <div>
                  <p className="text-sm text-[#6B6B6B] mb-2">Wall</p>
                  <p className="text-lg font-medium text-[#1A3A52]">
                    {selections.selectedProductsData["Wall"].name}
                  </p>
                </div>
              )}

              {/* Ceiling */}
              {selections.selectedProductsData?.["Ceiling"] && (
                <div>
                  <p className="text-sm text-[#6B6B6B] mb-2">Ceiling</p>
                  <p className="text-lg font-medium text-[#1A3A52]">
                    {selections.selectedProductsData["Ceiling"].name}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20"
        >
          {/* Download Image */}
          <motion.button
            onClick={handleDownload}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white hover:bg-[#F5F4F0] rounded-2xl p-8 shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-all duration-300"
          >
            <div className="flex flex-col items-center gap-4">
              <Download className="w-6 h-6 text-[#2A9D8F]" strokeWidth={1.5} />
              <p className="font-medium text-[#1A3A52]">Download</p>
            </div>
          </motion.button>

          {/* Email Design */}
          <motion.button
            onClick={handleEmail}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white hover:bg-[#F5F4F0] rounded-2xl p-8 shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden"
          >
            <div className="flex flex-col items-center gap-4">
              <Mail className="w-6 h-6 text-[#2A9D8F]" strokeWidth={1.5} />
              <p className="font-medium text-[#1A3A52]">Email</p>
            </div>

            {/* Success State */}
            {emailSent && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[#2A9D8F] flex items-center justify-center rounded-2xl"
              >
                <Check className="w-7 h-7 text-white" strokeWidth={2} />
              </motion.div>
            )}
          </motion.button>

          {/* Copy Link */}
          <motion.button
            onClick={handleCopyLink}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white hover:bg-[#F5F4F0] rounded-2xl p-8 shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden"
          >
            <div className="flex flex-col items-center gap-4">
              <Link2 className="w-6 h-6 text-[#2A9D8F]" strokeWidth={1.5} />
              <p className="font-medium text-[#1A3A52]">Copy Link</p>
            </div>

            {/* Success State */}
            {copied && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[#2A9D8F] flex items-center justify-center rounded-2xl"
              >
                <Check className="w-7 h-7 text-white" strokeWidth={2} />
              </motion.div>
            )}
          </motion.button>

          {/* Contact Renuity - Primary Action */}
          <motion.button
            onClick={() => setShowContactForm(true)}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#2A9D8F] hover:bg-[#238b7f] rounded-2xl p-8 shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-all duration-300"
          >
            <div className="flex flex-col items-center gap-4">
              <Mail className="w-6 h-6 text-white" strokeWidth={1.5} />
              <p className="font-medium text-white">Contact Renuity</p>
            </div>
          </motion.button>
        </motion.div>

        {/* Price Range Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-[#F5F4F0] rounded-3xl p-12 shadow-[0_2px_16px_rgba(0,0,0,0.04)]"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-semibold text-[#1A3A52] mb-3">
                Estimated Investment
              </h3>
              <p className="text-[#6B6B6B] leading-relaxed">
                Based on your selections and local rates
              </p>
            </div>

            <div className="flex items-center gap-12">
              <div className="text-center">
                <p className="text-sm text-[#6B6B6B] mb-2">Starting at</p>
                <p className="text-4xl font-semibold text-[#2A9D8F]">$12,500</p>
              </div>
              <div className="h-20 w-px bg-[#E8E6E1]" />
              <div className="text-center">
                <p className="text-sm text-[#6B6B6B] mb-2">Up to</p>
                <p className="text-4xl font-semibold text-[#1A3A52]">$28,000</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {showContactForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !formSubmitted && setShowContactForm(false)}
              className="absolute inset-0 bg-[#1A3A52]/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 sm:p-12">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-3xl font-bold text-[#1A3A52] mb-2">Contact Renuity</h3>
                    <p className="text-[#6B6B6B]">Start your journey to a beautiful new bathroom.</p>
                  </div>
                  {!formSubmitted && (
                    <button 
                      onClick={() => setShowContactForm(false)}
                      className="p-2 hover:bg-[#F5F4F0] rounded-full transition-colors"
                    >
                      <X className="w-6 h-6 text-[#1A3A52]" />
                    </button>
                  )}
                </div>

                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-12 text-center"
                  >
                    <div className="w-20 h-20 bg-[#2A9D8F]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="w-10 h-10 text-[#2A9D8F]" />
                    </div>
                    <h4 className="text-2xl font-bold text-[#1A3A52] mb-3">Thank You!</h4>
                    <p className="text-[#6B6B6B]">Our team will reach out within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
                        <input
                          required
                          type="text"
                          placeholder="Your Name"
                          value={contactData.name}
                          onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                          className="w-full pl-12 pr-4 py-4 rounded-xl border border-[#E8E6E1] focus:border-[#2A9D8F] focus:ring-2 focus:ring-[#2A9D8F]/20 outline-none transition-all"
                        />
                      </div>
                      
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
                        <input
                          required
                          type="tel"
                          placeholder="Phone Number"
                          value={contactData.phone}
                          onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                          className="w-full pl-12 pr-4 py-4 rounded-xl border border-[#E8E6E1] focus:border-[#2A9D8F] focus:ring-2 focus:ring-[#2A9D8F]/20 outline-none transition-all"
                        />
                      </div>

                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
                        <input
                          required
                          type="email"
                          placeholder="Email Address"
                          value={contactData.email}
                          onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                          className="w-full pl-12 pr-4 py-4 rounded-xl border border-[#E8E6E1] focus:border-[#2A9D8F] focus:ring-2 focus:ring-[#2A9D8F]/20 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#1A3A52] hover:bg-[#2d5570] text-white font-bold py-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Submit Design Request
                    </button>
                    
                    <p className="text-center text-xs text-[#6B6B6B] px-4 leading-relaxed">
                      By submitting, you agree to our Terms of Service and Privacy Policy. Our specialists will call to discuss your design.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}