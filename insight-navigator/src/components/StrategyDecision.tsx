import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, Rocket, CheckCircle, AlertCircle } from "lucide-react";

interface AssessmentData {
  TAS: number;
  TOC: number;
  TOR: number;
  TSC: number;
  WEL: number;
}

interface RankingItem {
  subject: keyof AssessmentData;
  score: number;
  priority: number;
}

interface StrategyDecisionProps {
  scores: AssessmentData;
  prediction: RankingItem[] | null;
}

const subjectLabels: Record<keyof AssessmentData, string> = {
  TAS: "Teks Sastra",
  TOC: "Teks Opini & Campuran",
  TOR: "Teks Reflektif",
  TSC: "Numerasi & Struktur",
  WEL: "Wellbeing & Lingkungan",
};

export const StrategyDecision = ({ scores, prediction }: StrategyDecisionProps) => {
  const entries: [keyof AssessmentData, number][] = prediction
    ? prediction.map((item) => [item.subject, item.score] as [keyof AssessmentData, number])
    : (Object.entries(scores) as [keyof AssessmentData, number][]);

  // Tentukan highest/lowest berdasarkan priority
  const sortedPrediction = prediction
  ? [...prediction].sort((a, b) => b.priority - a.priority)
  : null;

  const highestItem = sortedPrediction ? sortedPrediction[0] : entries.reduce(
    (max, curr) => (curr[1] > max[1] ? { subject: curr[0], score: curr[1] } : max),
    { subject: entries[0][0], score: entries[0][1] }
  );

  const lowestItem = sortedPrediction ? sortedPrediction[sortedPrediction.length - 1] : entries.reduce(
    (min, curr) => (curr[1] < min[1] ? { subject: curr[0], score: curr[1] } : min),
    { subject: entries[0][0], score: entries[0][1] }
  );
  const highestSubject = highestItem.subject;
  const highestScore = highestItem.score;
  const lowestSubject = lowestItem.subject;
  const lowestScore = lowestItem.score;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-6xl space-y-8">
        <div className="text-center space-y-2 animate-slide-up">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Pilih Strategi Belajarmu
          </h1>
          <p className="text-muted-foreground text-lg">
            Dua pendekatan berbeda untuk memaksimalkan potensimu
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Strategy A: Fix Weakness */}
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] animate-scale-in bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardHeader className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl text-center">Perbaiki Kelemahan 🛡️</CardTitle>
              <CardDescription className="text-center text-base">
                Fokus meningkatkan nilai terendahmu ({highestSubject})
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-card rounded-lg border">
                <p className="text-sm font-medium text-muted-foreground mb-2">Target Perbaikan:</p>
                <p className="text-xl font-bold text-foreground">{subjectLabels[highestSubject]}</p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary">{highestScore}</span>
                  <span className="text-muted-foreground">→ Target: 80+</span>
                </div>
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="pros-cons" className="border rounded-lg px-4">
                  <AccordionTrigger className="text-sm font-semibold hover:no-underline">
                    Lihat Pro & Kontra
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3 pt-2">
                    <div className="flex gap-3">
                      <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm text-foreground">Pro:</p>
                        <p className="text-sm text-muted-foreground">
                          Rapor jadi seimbang & aman dari batas bawah
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <AlertCircle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm text-foreground">Cons:</p>
                        <p className="text-sm text-muted-foreground">
                          Mungkin butuh usaha lebih keras & kurang seru
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Strategy B: Maximize Strength */}
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] animate-scale-in bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
            <CardHeader className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                <Rocket className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="text-2xl text-center">Maksimalkan Kekuatan 🚀</CardTitle>
              <CardDescription className="text-center text-base">
                Fokus mempush rank nilai tertinggimu ({lowestSubject})
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-card rounded-lg border">
                <p className="text-sm font-medium text-muted-foreground mb-2">Target Maksimalisasi:</p>
                <p className="text-xl font-bold text-foreground">{subjectLabels[lowestSubject]}</p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-accent">{lowestScore}</span>
                  <span className="text-muted-foreground">→ Target: 95+</span>
                </div>
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="pros-cons" className="border rounded-lg px-4">
                  <AccordionTrigger className="text-sm font-semibold hover:no-underline">
                    Lihat Pro & Kontra
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3 pt-2">
                    <div className="flex gap-3">
                      <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm text-foreground">Pro:</p>
                        <p className="text-sm text-muted-foreground">
                          Potensi jadi ahli/juara & belajar lebih enjoy
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <AlertCircle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm text-foreground">Cons:</p>
                        <p className="text-sm text-muted-foreground">
                          Nilai pelajaran lain mungkin tertinggal
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
