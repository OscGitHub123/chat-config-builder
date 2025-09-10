import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Settings, MessageSquare } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Chat RAG
            <span className="block bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Prototype
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 sm:mb-8 leading-relaxed px-4">
            Upload dokumen Anda, konfigurasikan model AI, dan mulai percakapan 
            cerdas dengan data Anda menggunakan teknologi RAG terdepan.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4">
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-glow transition-smooth w-full sm:w-auto">
            Mulai Sekarang
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 transition-smooth w-full sm:w-auto">
            Pelajari Lebih Lanjut
          </Button>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 text-white/80 px-4">
          <div className="flex flex-col items-center p-4 sm:p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
            <FileText className="h-6 w-6 sm:h-8 sm:w-8 mb-2 sm:mb-3 text-white" />
            <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Multi-Format Upload</h3>
            <p className="text-xs sm:text-sm text-center">Excel, JSON, Word files didukung</p>
          </div>
          <div className="flex flex-col items-center p-4 sm:p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
            <Settings className="h-6 w-6 sm:h-8 sm:w-8 mb-2 sm:mb-3 text-white" />
            <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Google Studio Models</h3>
            <p className="text-xs sm:text-sm text-center">Akses semua model terbaru</p>
          </div>
          <div className="flex flex-col items-center p-4 sm:p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 sm:col-span-2 lg:col-span-1">
            <MessageSquare className="h-6 w-6 sm:h-8 sm:w-8 mb-2 sm:mb-3 text-white" />
            <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Smart RAG Chat</h3>
            <p className="text-xs sm:text-sm text-center">Percakapan kontekstual cerdas</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;