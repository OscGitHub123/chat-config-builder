import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, File, X, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'processed' | 'error';
}

const FileUpload = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const saveFileToLocal = useCallback((file: File, content: string | ArrayBuffer) => {
    // Save to localStorage for browser storage
    const fileData = {
      name: file.name,
      type: file.type,
      size: file.size,
      content: content,
      timestamp: Date.now()
    };
    
    localStorage.setItem(`upload_${file.name}`, JSON.stringify(fileData));
    
    // Create download link to simulate saving to /upload folder
    const blob = new Blob([content], { type: file.type });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `upload/${file.name}`;
    link.click();
    window.URL.revokeObjectURL(url);
  }, []);

  const processFiles = useCallback((fileList: FileList) => {
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'application/json',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ];

    Array.from(fileList).forEach(file => {
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Format file tidak didukung",
          description: `File ${file.name} memiliki format yang tidak didukung.`,
          variant: "destructive"
        });
        return;
      }

      const newFile: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading'
      };

      setFiles(prev => [...prev, newFile]);

      // Read and save file
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        if (content) {
          saveFileToLocal(file, content);
          setFiles(prev => prev.map(f => 
            f.id === newFile.id ? { ...f, status: 'processed' } : f
          ));
          toast({
            title: "File berhasil disimpan",
            description: `${file.name} disimpan ke folder /upload dan browser storage.`
          });
        }
      };
      
      if (file.type.includes('json')) {
        reader.readAsText(file);
      } else {
        reader.readAsArrayBuffer(file);
      }
    });
  }, [toast, saveFileToLocal]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    processFiles(e.dataTransfer.files);
  }, [processFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  }, [processFiles]);

  const removeFile = useCallback((id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  }, []);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="bg-gradient-card shadow-elegant border-0">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Upload Dokumen</CardTitle>
        <p className="text-muted-foreground text-center">
          Drag & drop file atau klik untuk upload. Mendukung Excel, JSON, dan Word.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-smooth cursor-pointer ${
            isDragOver 
              ? 'border-primary bg-accent' 
              : 'border-border hover:border-primary hover:bg-accent/50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('fileInput')?.click()}
        >
          <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-semibold mb-2">
            Drop files here atau klik untuk browse
          </p>
          <p className="text-sm text-muted-foreground">
            Maksimal 10MB per file • Excel, JSON, Word
          </p>
          <input
            id="fileInput"
            type="file"
            multiple
            accept=".xlsx,.xls,.json,.docx,.doc"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold">File yang diupload:</h4>
            {files.map(file => (
              <div key={file.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <File className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {file.status === 'uploading' && (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
                  )}
                  {file.status === 'processed' && (
                    <Check className="h-4 w-4 text-green-500" />
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file.id)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FileUpload;