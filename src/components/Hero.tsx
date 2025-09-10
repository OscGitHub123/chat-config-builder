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
        <div className="mb-8">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Chat RAG
            <span className="block bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Prototype
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-8 leading-relaxed">
            Upload dokumen Anda, konfigurasikan model AI, dan mulai percakapan 
            cerdas dengan data Anda menggunakan teknologi RAG terdepan.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-glow transition-smooth">
            Mulai Sekarang
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 transition-smooth">
            Pelajari Lebih Lanjut
          </Button>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white/80">
          <div className="flex flex-col items-center p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
            <FileText className="h-8 w-8 mb-3 text-white" />
            <h3 className="font-semibold mb-2">Multi-Format Upload</h3>
            <p className="text-sm text-center">Excel, JSON, Word files didukung</p>
          </div>
          <div className="flex flex-col items-center p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
            <Settings className="h-8 w-8 mb-3 text-white" />
            <h3 className="font-semibold mb-2">Google Studio Models</h3>
            <p className="text-sm text-center">Akses semua model terbaru</p>
          </div>
          <div className="flex flex-col items-center p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
            <MessageSquare className="h-8 w-8 mb-3 text-white" />
            <h3 className="font-semibold mb-2">Smart RAG Chat</h3>
            <p className="text-sm text-center">Percakapan kontekstual cerdas</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;