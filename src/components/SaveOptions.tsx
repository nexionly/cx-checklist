
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Checklist } from '@/lib/checklistData';
import { exportToPdf, exportDetailsReportToPdf } from '@/lib/pdfExport';
import { Download, Save, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SaveOptionsProps {
  checklist: Checklist;
  onSave: () => void;
}

const SaveOptions: React.FC<SaveOptionsProps> = ({ checklist, onSave }) => {
  const { toast } = useToast();
  const [saveLoading, setSaveLoading] = useState(false);
  
  const handleSave = () => {
    setSaveLoading(true);
    
    // Simulate saving process
    setTimeout(() => {
      onSave();
      setSaveLoading(false);
      
      toast({
        title: "Progress saved",
        description: "Your checklist progress has been saved successfully.",
        duration: 3000,
      });
    }, 600);
  };
  
  const handleSimplePdfExport = () => {
    exportToPdf(checklist);
    
    toast({
      title: "PDF exported",
      description: "Your summary checklist has been exported as a PDF.",
      duration: 3000,
    });
  };
  
  const handleDetailedPdfExport = () => {
    exportDetailsReportToPdf(checklist);
    
    toast({
      title: "Detailed PDF exported",
      description: "Your detailed checklist report has been exported as a PDF.",
      duration: 3000,
    });
  };
  
  return (
    <div className="flex items-center justify-center gap-2 py-4 sticky bottom-0 z-10 bg-background/80 backdrop-blur-sm">
      <Button 
        variant="default" 
        onClick={handleSave} 
        disabled={saveLoading}
        className="flex items-center gap-2"
      >
        {saveLoading ? (
          <>
            <span className="animate-pulse">Saving...</span>
          </>
        ) : (
          <>
            <Save className="h-4 w-4" />
            <span>Save Progress</span>
          </>
        )}
      </Button>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Export PDF</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="space-y-2">
            <h3 className="font-medium">Export Options</h3>
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={handleSimplePdfExport}
            >
              <span>Summary Checklist</span>
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={handleDetailedPdfExport}
            >
              <span>Detailed Report</span>
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SaveOptions;
