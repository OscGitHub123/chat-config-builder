import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, Key, Cpu, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Configuration = () => {
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [selectedModel, setSelectedModel] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const googleStudioModels = [
    { value: "gemini-pro", label: "Gemini Pro" },
    { value: "gemini-pro-vision", label: "Gemini Pro Vision" },
    { value: "gemini-ultra", label: "Gemini Ultra" },
    { value: "chat-bison", label: "Chat Bison" },
    { value: "text-bison", label: "Text Bison" },
    { value: "code-bison", label: "Code Bison" },
  ];

  const handleSave = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key diperlukan",
        description: "Silakan masukkan API Key Google Studio Anda.",
        variant: "destructive"
      });
      return;
    }

    if (!selectedModel) {
      toast({
        title: "Model belum dipilih",
        description: "Silakan pilih model Google Studio yang akan digunakan.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Simulate API validation
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Konfigurasi berhasil disimpan",
        description: `Model ${selectedModel} dengan API Key berhasil dikonfigurasi.`
      });
    }, 1500);
  };

  return (
    <Card className="bg-gradient-card shadow-elegant border-0">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
          <Key className="h-6 w-6 text-primary" />
          Konfigurasi API
        </CardTitle>
        <p className="text-muted-foreground text-center">
          Konfigurasikan API Key dan pilih model Google Studio untuk RAG Chat.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* API Key Input */}
        <div className="space-y-2">
          <Label htmlFor="apiKey" className="text-sm font-medium">
            Google Studio API Key
          </Label>
          <div className="relative">
            <Input
              id="apiKey"
              type={showApiKey ? "text" : "password"}
              placeholder="Masukkan API Key Google Studio Anda"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
              onClick={() => setShowApiKey(!showApiKey)}
            >
              {showApiKey ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Dapatkan API Key Anda di{" "}
            <a 
              href="https://makersuite.google.com/app/apikey" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Google AI Studio
            </a>
          </p>
        </div>

        {/* Model Selection */}
        <div className="space-y-2">
          <Label htmlFor="model" className="text-sm font-medium flex items-center gap-2">
            <Cpu className="h-4 w-4" />
            Pilih Model Google Studio
          </Label>
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih model AI yang akan digunakan" />
            </SelectTrigger>
            <SelectContent>
              {googleStudioModels.map((model) => (
                <SelectItem key={model.value} value={model.value}>
                  {model.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Setiap model memiliki kemampuan dan performa yang berbeda.
          </p>
        </div>

        {/* Model Info */}
        {selectedModel && (
          <div className="p-4 bg-accent rounded-lg border border-border">
            <h4 className="font-semibold mb-2">Informasi Model:</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              {selectedModel === "gemini-pro" && (
                <p>✨ Model terbaru dengan kemampuan reasoning yang sangat baik</p>
              )}
              {selectedModel === "gemini-pro-vision" && (
                <p>👁️ Mendukung pemrosesan gambar dan visual content</p>
              )}
              {selectedModel === "gemini-ultra" && (
                <p>🚀 Model paling canggih dengan performa tertinggi</p>
              )}
              {selectedModel === "chat-bison" && (
                <p>💬 Dioptimalkan untuk percakapan dan dialog</p>
              )}
              {selectedModel === "text-bison" && (
                <p>📝 Terbaik untuk pemrosesan dan generasi teks</p>
              )}
              {selectedModel === "code-bison" && (
                <p>💻 Spesialisasi untuk coding dan programming</p>
              )}
            </div>
          </div>
        )}

        {/* Save Button */}
        <Button 
          onClick={handleSave} 
          disabled={isLoading}
          className="w-full bg-gradient-primary hover:opacity-90 transition-smooth shadow-glow"
          size="lg"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          {isLoading ? "Menyimpan..." : "Simpan Konfigurasi"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default Configuration;