import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

interface AssessmentData {
  TAS: number;
  TOC: number;
  TOR: number;
  TSC: number;
  WEL: number;
}

interface RadarVisualizationProps {
  scores: AssessmentData;
  onNext: () => void;
}

const subjectLabels: Record<keyof AssessmentData, string> = {
  TAS: "Teks Sastra",
  TOC: "Teks Opini",
  TOR: "Teks Reflektif",
  TSC: "Numerasi",
  WEL: "Wellbeing",
};

export const RadarVisualization = ({ scores, onNext }: RadarVisualizationProps) => {
  const chartData = Object.entries(scores).map(([key, value]) => ({
    subject: key,
    value: value,
    fullMark: 100,
  }));

  const entries = Object.entries(scores) as [keyof AssessmentData, number][];
  const highest = entries.reduce((max, curr) => (curr[1] > max[1] ? curr : max));
  const lowest = entries.reduce((min, curr) => (curr[1] < min[1] ? curr : min));

  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-6xl grid lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <Card className="lg:col-span-2 shadow-lg animate-scale-in">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Visualisasi Kompetensi</CardTitle>
          </CardHeader>
          <CardContent className="h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={chartData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: "hsl(var(--foreground))", fontSize: 14, fontWeight: 600 }}
                />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "hsl(var(--muted-foreground))" }} />
                <Radar
                  name="Nilai"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.6}
                  strokeWidth={2}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Insights Sidebar */}
        <div className="space-y-4 animate-slide-up">
          <Card className="shadow-md bg-gradient-to-br from-accent/10 to-accent/5">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                <CardTitle className="text-lg">Super Power 🌟</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-foreground">{highest[0]}</p>
              <p className="text-sm text-muted-foreground mt-1">{subjectLabels[highest[0]]}</p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-accent">{highest[1]}</span>
                <span className="text-muted-foreground">/100</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md bg-gradient-to-br from-primary/10 to-primary/5">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Needs Focus 🎯</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-foreground">{lowest[0]}</p>
              <p className="text-sm text-muted-foreground mt-1">{subjectLabels[lowest[0]]}</p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-primary">{lowest[1]}</span>
                <span className="text-muted-foreground">/100</span>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={onNext}
            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all"
          >
            Tentukan Strategi →
          </Button>
        </div>
      </div>
    </div>
  );
};
