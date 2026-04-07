import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Check, Upload, ArrowRight } from "lucide-react";
import { useDesign } from "../context/DesignContext";

interface RoomOption {
  id: string;
  name: string;
  imageUrl: string;
}

const PREDEFINED_ROOMS: RoomOption[] = [
  {
    id: "room-1",
    name: "Modern Bathroom",
    imageUrl: "https://images.unsplash.com/photo-1595579987159-32ca7b85e0e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXRocm9vbSUyMGludGVyaW9yJTIwZW1wdHl8ZW58MXx8fHwxNzc1MTMwMDI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "room-2",
    name: "Minimal Bathroom",
    imageUrl: "https://images.unsplash.com/photo-1628602813485-4e8b09442e98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiYXRocm9vbSUyMGNsZWFuJTIwbWluaW1hbHxlbnwxfHx8fDE3NzUxMzAwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "room-3",
    name: "Luxury Bathroom",
    imageUrl: "https://images.unsplash.com/photo-1638799869566-b17fa794c4de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYXRocm9vbSUyMGludGVyaW9yJTIwd2hpdGV8ZW58MXx8fHwxNzc1MTMwMDMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

export function RoomSelection() {
  const navigate = useNavigate();
  const { updateSelections } = useDesign();
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setSelectedRoom("upload");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContinue = () => {
    if (selectedRoom) {
      const room = PREDEFINED_ROOMS.find((r) => r.id === selectedRoom);
      updateSelections({
        background: selectedRoom === "upload" ? "custom-upload" : room?.name,
      });
      navigate("/configure");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F4F0] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-[#2A9D8F] tracking-wider uppercase mb-3">
              Step 3 of 5
            </p>
            <h1 className="text-5xl font-bold text-[#1A3A52] mb-4">
              Select Your Room
            </h1>
            <p className="text-xl text-[#6B6B6B]">
              Choose a predefined room or upload your own
            </p>
          </div>

          {/* Predefined Rooms */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[#1A3A52] mb-8">
              Predefined Rooms
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PREDEFINED_ROOMS.map((room) => {
                const isSelected = selectedRoom === room.id;

                return (
                  <motion.button
                    key={room.id}
                    onClick={() => {
                      setSelectedRoom(room.id);
                      setUploadedImage(null);
                    }}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 text-left group ${
                      isSelected
                        ? "ring-4 ring-[#2A9D8F] shadow-2xl"
                        : selectedRoom
                        ? "opacity-50 hover:opacity-70"
                        : "hover:shadow-xl"
                    }`}
                  >
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={room.imageUrl}
                        alt={room.name}
                        className={`w-full h-full object-cover transition-transform duration-500 ${
                          isSelected ? "scale-105" : "group-hover:scale-110"
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      {/* Selected Badge */}
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute top-4 right-4 w-10 h-10 bg-[#2A9D8F] rounded-full flex items-center justify-center shadow-lg"
                        >
                          <Check className="w-6 h-6 text-white" strokeWidth={3} />
                        </motion.div>
                      )}

                      {/* Room Name */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-white">
                          {room.name}
                        </h3>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="relative mb-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E8E6E1]" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-6 bg-[#F5F4F0] text-[#6B6B6B] font-medium">
                OR
              </span>
            </div>
          </div>

          {/* Upload Own Image */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[#1A3A52] mb-8">
              Upload Your Own
            </h2>

            <label
              htmlFor="file-upload"
              className={`relative block bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer group ${
                selectedRoom === "upload"
                  ? "ring-4 ring-[#2A9D8F] shadow-2xl"
                  : "hover:shadow-xl"
              }`}
            >
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              {uploadedImage ? (
                <div className="relative h-64">
                  <img
                    src={uploadedImage}
                    alt="Uploaded room"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Selected Badge */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute top-4 right-4 w-10 h-10 bg-[#2A9D8F] rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Check className="w-6 h-6 text-white" strokeWidth={3} />
                  </motion.div>

                  {/* Change Image Prompt */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-semibold">Your Custom Room</p>
                    <p className="text-white/80 text-sm">Click to change image</p>
                  </div>
                </div>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-[#E8E6E1] group-hover:border-[#2A9D8F] transition-colors">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-16 h-16 bg-[#2A9D8F]/10 rounded-2xl flex items-center justify-center mb-4"
                  >
                    <Upload className="w-8 h-8 text-[#2A9D8F]" />
                  </motion.div>
                  <p className="text-lg font-semibold text-[#1A3A52] mb-2">
                    Upload Your Room Photo
                  </p>
                  <p className="text-sm text-[#6B6B6B]">
                    JPG, PNG or HEIC (max 10MB)
                  </p>
                </div>
              )}
            </label>
          </div>

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: selectedRoom ? 1 : 0 }}
            className="flex justify-center"
          >
            <motion.button
              onClick={handleContinue}
              disabled={!selectedRoom}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-12 py-6 rounded-2xl font-semibold text-lg shadow-xl transition-all duration-300 flex items-center gap-3 ${
                selectedRoom
                  ? "bg-[#2A9D8F] hover:bg-[#238b7f] text-white cursor-pointer"
                  : "bg-[#E8E6E1] text-[#B0B0B0] cursor-not-allowed"
              }`}
            >
              Continue to Product Configuration
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
