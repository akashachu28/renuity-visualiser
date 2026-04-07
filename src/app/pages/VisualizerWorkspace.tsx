import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Undo, Redo, Check, ArrowRight } from "lucide-react";
import { StepIndicator } from "../components/StepIndicator";
import { useDesign } from "../context/DesignContext";

interface DesignOption {
  id: string;
  name: string;
  imageUrl: string;
}

interface HistoryState {
  wallFinish: string;
  tubStyle: string;
  fixture: string;
}

const WALL_FINISHES: DesignOption[] = [
  {
    id: "marble",
    name: "White Marble",
    imageUrl: "https://images.unsplash.com/photo-1721406716170-0c8346a7eaad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMG1hcmJsZSUyMHdhbGwlMjB0ZXh0dXJlfGVufDF8fHx8MTc3NTEyNjg0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "gray-tile",
    name: "Gray Tile",
    imageUrl: "https://images.unsplash.com/photo-1603513188937-a5ec7a931eba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmF5JTIwdGlsZSUyMGJhdGhyb29tJTIwd2FsbHxlbnwxfHx8fDE3NzUxMjY4NDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "beige-stone",
    name: "Beige Stone",
    imageUrl: "https://images.unsplash.com/photo-1760067537877-dd4d2722c649?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWlnZSUyMHN0b25lJTIwYmF0aHJvb218ZW58MXx8fHwxNzc1MTI2ODQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

const TUB_STYLES: DesignOption[] = [
  {
    id: "freestanding",
    name: "Freestanding",
    imageUrl: "https://images.unsplash.com/photo-1760564019103-81cd3c225cd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYXRodHViJTIwZnJlZXN0YW5kaW5nfGVufDF8fHx8MTc3NTEyNjg0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "alcove",
    name: "Alcove",
    imageUrl: "https://images.unsplash.com/photo-1575245122563-776ff6af7411?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGNvdmUlMjBiYXRodHViJTIwbW9kZXJufGVufDF8fHx8MTc3NTEyNjg0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

const FIXTURES: DesignOption[] = [
  { id: "chrome", name: "Chrome", imageUrl: "" },
  { id: "brushed-nickel", name: "Brushed Nickel", imageUrl: "" },
  { id: "matte-black", name: "Matte Black", imageUrl: "" },
  { id: "brass", name: "Brass", imageUrl: "" },
];

export function VisualizerWorkspace() {
  const navigate = useNavigate();
  const { updateSelections } = useDesign();
  const [openSection, setOpenSection] = useState<string>("wallFinish");
  const [wallFinish, setWallFinish] = useState("marble");
  const [tubStyle, setTubStyle] = useState("freestanding");
  const [fixture, setFixture] = useState("chrome");

  const [history, setHistory] = useState<HistoryState[]>([
    { wallFinish: "marble", tubStyle: "freestanding", fixture: "chrome" },
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const steps = ["Location", "Product", "Tier", "Style", "Visualizer", "Summary"];

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? "" : section);
  };

  const updateSelection = (
    type: "wallFinish" | "tubStyle" | "fixture",
    value: string
  ) => {
    const newState = { wallFinish, tubStyle, fixture, [type]: value };

    if (type === "wallFinish") setWallFinish(value);
    if (type === "tubStyle") setTubStyle(value);
    if (type === "fixture") setFixture(value);

    // Update history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newState);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const state = history[newIndex];
      setWallFinish(state.wallFinish);
      setTubStyle(state.tubStyle);
      setFixture(state.fixture);
      setHistoryIndex(newIndex);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const state = history[newIndex];
      setWallFinish(state.wallFinish);
      setTubStyle(state.tubStyle);
      setFixture(state.fixture);
      setHistoryIndex(newIndex);
    }
  };

  const getFixtureColor = (id: string) => {
    const colors: Record<string, string> = {
      chrome: "#C0C0C0",
      "brushed-nickel": "#9B9B9B",
      "matte-black": "#2B2B2B",
      brass: "#B5A642",
    };
    return colors[id] || "#C0C0C0";
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-[#E8E6E1] sticky top-0 z-10">
        <div className="max-w-[1800px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Step Indicator */}
            <div className="flex-1">
              <StepIndicator currentStep={5} totalSteps={6} steps={steps} compact />
            </div>

            {/* Undo/Redo Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={undo}
                disabled={historyIndex === 0}
                className={`p-3 rounded-xl transition-all duration-200 ${
                  historyIndex === 0
                    ? "bg-[#F5F4F0] text-[#B0B0B0] cursor-not-allowed"
                    : "bg-white border border-[#E8E6E1] hover:bg-[#F5F4F0] text-[#1A3A52]"
                }`}
                title="Undo"
              >
                <Undo className="w-5 h-5" />
              </button>
              <button
                onClick={redo}
                disabled={historyIndex === history.length - 1}
                className={`p-3 rounded-xl transition-all duration-200 ${
                  historyIndex === history.length - 1
                    ? "bg-[#F5F4F0] text-[#B0B0B0] cursor-not-allowed"
                    : "bg-white border border-[#E8E6E1] hover:bg-[#F5F4F0] text-[#1A3A52]"
                }`}
                title="Redo"
              >
                <Redo className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Left Panel - Controls */}
        <div className="w-[30%] bg-[#F5F4F0] border-r border-[#E8E6E1] overflow-y-auto">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-[#1A3A52] mb-2">
              Customize Your Space
            </h2>
            <p className="text-[#6B6B6B] mb-8">
              Select options to see them in real-time
            </p>

            {/* Accordion Sections */}
            <div className="space-y-4">
              {/* Wall Finish Section */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => toggleSection("wallFinish")}
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-[#F5F4F0] transition-colors"
                >
                  <span className="font-semibold text-[#1A3A52]">Wall Finish</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#6B6B6B] transition-transform duration-300 ${
                      openSection === "wallFinish" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openSection === "wallFinish" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 grid grid-cols-2 gap-3">
                        {WALL_FINISHES.map((option) => (
                          <button
                            key={option.id}
                            onClick={() => updateSelection("wallFinish", option.id)}
                            className={`relative rounded-xl overflow-hidden aspect-square group ${
                              wallFinish === option.id
                                ? "ring-4 ring-[#2A9D8F]"
                                : "ring-1 ring-[#E8E6E1] hover:ring-[#2A9D8F] hover:ring-2"
                            }`}
                          >
                            <img
                              src={option.imageUrl}
                              alt={option.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {wallFinish === option.id && (
                              <div className="absolute inset-0 bg-[#2A9D8F]/20 flex items-center justify-center">
                                <div className="w-8 h-8 bg-[#2A9D8F] rounded-full flex items-center justify-center">
                                  <Check className="w-5 h-5 text-white" strokeWidth={3} />
                                </div>
                              </div>
                            )}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                              <p className="text-white text-sm font-medium">
                                {option.name}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Tub Style Section */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => toggleSection("tubStyle")}
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-[#F5F4F0] transition-colors"
                >
                  <span className="font-semibold text-[#1A3A52]">Tub Style</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#6B6B6B] transition-transform duration-300 ${
                      openSection === "tubStyle" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openSection === "tubStyle" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 grid grid-cols-2 gap-3">
                        {TUB_STYLES.map((option) => (
                          <button
                            key={option.id}
                            onClick={() => updateSelection("tubStyle", option.id)}
                            className={`relative rounded-xl overflow-hidden aspect-square group ${
                              tubStyle === option.id
                                ? "ring-4 ring-[#2A9D8F]"
                                : "ring-1 ring-[#E8E6E1] hover:ring-[#2A9D8F] hover:ring-2"
                            }`}
                          >
                            <img
                              src={option.imageUrl}
                              alt={option.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {tubStyle === option.id && (
                              <div className="absolute inset-0 bg-[#2A9D8F]/20 flex items-center justify-center">
                                <div className="w-8 h-8 bg-[#2A9D8F] rounded-full flex items-center justify-center">
                                  <Check className="w-5 h-5 text-white" strokeWidth={3} />
                                </div>
                              </div>
                            )}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                              <p className="text-white text-sm font-medium">
                                {option.name}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Fixtures Section */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => toggleSection("fixtures")}
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-[#F5F4F0] transition-colors"
                >
                  <span className="font-semibold text-[#1A3A52]">Fixtures</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#6B6B6B] transition-transform duration-300 ${
                      openSection === "fixtures" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openSection === "fixtures" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 grid grid-cols-2 gap-3">
                        {FIXTURES.map((option) => (
                          <button
                            key={option.id}
                            onClick={() => updateSelection("fixture", option.id)}
                            className={`relative rounded-xl overflow-hidden p-6 aspect-square group flex flex-col items-center justify-center ${
                              fixture === option.id
                                ? "ring-4 ring-[#2A9D8F] bg-[#F5F4F0]"
                                : "ring-1 ring-[#E8E6E1] hover:ring-[#2A9D8F] hover:ring-2 bg-white"
                            }`}
                          >
                            <div
                              className="w-16 h-16 rounded-full mb-3 shadow-lg"
                              style={{ backgroundColor: getFixtureColor(option.id) }}
                            />
                            <p className="text-sm font-medium text-[#1A3A52]">
                              {option.name}
                            </p>
                            {fixture === option.id && (
                              <div className="absolute top-2 right-2 w-6 h-6 bg-[#2A9D8F] rounded-full flex items-center justify-center">
                                <Check className="w-4 h-4 text-white" strokeWidth={3} />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Action Button */}
            <motion.button
              onClick={() => {
                // Save visualizer selections before navigating
                updateSelections({
                  visualizer: {
                    wallFinish: WALL_FINISHES.find((w) => w.id === wallFinish)?.name || wallFinish,
                    tubStyle: TUB_STYLES.find((t) => t.id === tubStyle)?.name || tubStyle,
                    fixture: FIXTURES.find((f) => f.id === fixture)?.name || fixture,
                  },
                });
                navigate("/result");
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-8 px-8 py-5 bg-[#2A9D8F] hover:bg-[#238b7f] text-white rounded-2xl font-semibold shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
            >
              Continue to Summary
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="w-[70%] bg-[#E8E6E1] flex items-center justify-center p-12">
          <motion.div
            key={`${wallFinish}-${tubStyle}-${fixture}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full max-w-5xl max-h-[800px] bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1638799869566-b17fa794c4de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3aGl0ZSUyMGJhdGhyb29tJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzc1MTI2ODQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Bathroom Preview"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Preview Info Badge */}
          <div className="absolute bottom-16 right-16 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 max-w-xs">
            <h3 className="font-semibold text-[#1A3A52] mb-3">Current Selection</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#6B6B6B]">Wall Finish:</span>
                <span className="font-medium text-[#1A3A52]">
                  {WALL_FINISHES.find((w) => w.id === wallFinish)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B6B6B]">Tub Style:</span>
                <span className="font-medium text-[#1A3A52]">
                  {TUB_STYLES.find((t) => t.id === tubStyle)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B6B6B]">Fixture:</span>
                <span className="font-medium text-[#1A3A52]">
                  {FIXTURES.find((f) => f.id === fixture)?.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}