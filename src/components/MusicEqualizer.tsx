
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type EqualizerPreset = {
  name: string;
  values: number[];
};

const presets: EqualizerPreset[] = [
  { 
    name: "Flat", 
    values: [50, 50, 50, 50, 50] 
  },
  { 
    name: "Rock", 
    values: [70, 60, 40, 60, 80] 
  },
  { 
    name: "Pop", 
    values: [60, 75, 65, 45, 55] 
  },
  { 
    name: "Classical", 
    values: [65, 55, 45, 65, 75] 
  },
  { 
    name: "Jazz", 
    values: [55, 60, 70, 65, 55] 
  },
  { 
    name: "Bass Boost", 
    values: [90, 75, 50, 40, 30] 
  }
];

const frequencyLabels = ["60Hz", "230Hz", "910Hz", "3kHz", "14kHz"];

export function MusicEqualizer() {
  const [selectedPreset, setSelectedPreset] = useState("Flat");
  const [bands, setBands] = useState<number[]>(presets[0].values);

  const handlePresetChange = (preset: string) => {
    if (!preset) return;
    
    setSelectedPreset(preset);
    const selectedPresetData = presets.find(p => p.name === preset);
    if (selectedPresetData) {
      setBands(selectedPresetData.values);
    }
  };

  const handleBandChange = (index: number, value: number[]) => {
    const newBands = [...bands];
    newBands[index] = value[0];
    setBands(newBands);
    
    // Check if current bands match any preset
    const matchingPreset = presets.find(preset => 
      preset.values.every((val, i) => val === newBands[i])
    );
    
    if (matchingPreset) {
      setSelectedPreset(matchingPreset.name);
    } else {
      setSelectedPreset("Custom");
    }
  };

  return (
    <div className="space-y-4">
      <ToggleGroup 
        type="single" 
        value={selectedPreset} 
        onValueChange={handlePresetChange}
        className="flex flex-wrap justify-start gap-2"
      >
        {presets.map((preset) => (
          <ToggleGroupItem 
            key={preset.name} 
            value={preset.name}
            className="text-xs px-3 py-1"
          >
            {preset.name}
          </ToggleGroupItem>
        ))}
        {selectedPreset === "Custom" && (
          <ToggleGroupItem value="Custom" className="text-xs px-3 py-1">
            Custom
          </ToggleGroupItem>
        )}
      </ToggleGroup>

      <div className="flex justify-between items-end h-48 gap-4 pt-4">
        {bands.map((value, index) => (
          <div key={index} className="flex flex-col items-center gap-2 flex-1">
            <Slider
              orientation="vertical"
              min={0}
              max={100}
              step={1}
              value={[value]}
              onValueChange={(values) => handleBandChange(index, values)}
              className="h-40"
            />
            <span className="text-xs text-muted-foreground">{frequencyLabels[index]}</span>
          </div>
        ))}
      </div>

      <Button 
        variant="outline" 
        size="sm" 
        className="w-full mt-4"
        onClick={() => {
          setBands(presets[0].values);
          setSelectedPreset("Flat");
        }}
      >
        Reset
      </Button>
    </div>
  );
}
