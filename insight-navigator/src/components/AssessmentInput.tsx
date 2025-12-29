import { BookOpen, Newspaper, Brain, Calculator, Smile } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface AssessmentData {
  TAS: number;
  TOC: number;
  TOR: number;
  TSC: number;
  WEL: number;
}

interface AssessmentInputProps {
  scores: AssessmentData;
  onScoreChange: (key: keyof AssessmentData, value: number) => void;
  onSubmit: () => void;
}

const subjects = [
  { key: "TAS" as const, label: "TAS", subtitle: "Teks Sastra", icon: BookOpen },
  { key: "TOC" as const, label: "TOC", subtitle: "Teks Opini & Campuran", icon: Newspaper },
  { key: "TOR" as const, label: "TOR", subtitle: "Teks Reflektif", icon: Brain },
  { key: "TSC" as const, label: "TSC", subtitle: "Numerasi & Struktur", icon: Calculator },
  { key: "WEL" as const, label: "WEL", subtitle: "Wellbeing & Lingkungan", icon: Smile },
];

const getColorClass = (value: number) => {
  if (value < 50) return "bg-destructive";
  if (value < 80) return "bg-warning";
  return "bg-success";
};

export const AssessmentInput = ({ scores, onScoreChange, onSubmit }: AssessmentInputProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Input Nilai Asesmen Nasional 2024
          </CardTitle>
          <CardDescription className="text-base">
            Geser slider untuk memasukkan nilai setiap mata pelajaran (0-100)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 pt-6">
          {subjects.map(({ key, label, subtitle, icon: Icon }) => {
            const value = scores[key];
            return (
              <div key={key} className="space-y-3 animate-slide-up">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-foreground">{label}</p>
                        <p className="text-sm text-muted-foreground">{subtitle}</p>
                      </div>
                      <span className="text-2xl font-bold text-foreground">{value}</span>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <Slider
                    value={[value]}
                    onValueChange={(vals) => onScoreChange(key, vals[0])}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="mt-2 h-2 rounded-full overflow-hidden bg-muted">
                    <div
                      className={`h-full transition-all duration-300 ${getColorClass(value)}`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
          
          <Button
            onClick={onSubmit}
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all animate-pulse-glow"
          >
            Analisa Kekuatanku! 🚀
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
