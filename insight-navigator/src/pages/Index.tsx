import { useState } from "react";
import { AssessmentInput } from "@/components/AssessmentInput";
import { RadarVisualization } from "@/components/RadarVisualization";
import { StrategyDecision } from "@/components/StrategyDecision";
import * as ort from "onnxruntime-web";

type Stage = "input" | "visualization" | "decision";

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

interface PredictionResponse {
  ranking: RankingItem[];
}

// Mapping from code to display name
const mapping: Record<string, string> = {
  TAS: "literasi",
  TOC: "numerasi",
  TOR: "karakter_sosial",
  TSC: "karakter_moral",
  WEL: "wellbeing"
};

// Internal ID for the model
const subjectId: Record<string, number> = {
  literasi: 0,
  numerasi: 1,
  karakter_sosial: 2,
  karakter_moral: 3,
  wellbeing: 4
};

const Index = () => {
  const [stage, setStage] = useState<Stage>("input");
  const [scores, setScores] = useState<AssessmentData>({
    TAS: 70,
    TOC: 65,
    TOR: 80,
    TSC: 55,
    WEL: 75,
  });

  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);

  const handleScoreChange = (key: keyof AssessmentData, value: number) => {
    setScores((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmitInput = () => {
    setStage("visualization");
  };

  const fetchPrediction = async () => {
    try {
      console.log("Running Local ONNX Prediction...");

      // 1. Create session (Load model from public folder)
      // Note: In Vite, files in /public are served at the root path /
      const session = await ort.InferenceSession.create("/recommender.onnx");

      let output: RankingItem[] = [];

      // 2. Run inference for each subject
      for (const [code, score] of Object.entries(scores)) {
        const name = mapping[code];
        const sid = subjectId[name];

        // Prepare input tensor [1, 2]
        const tensor = new ort.Tensor("float32", new Float32Array([sid, score]), [1, 2]);

        // Run model
        const results = await session.run({ input: tensor });
        const priority = results.output.data[0] as number;

        output.push({
          subject: code as keyof AssessmentData,
          score: score,
          priority: priority
        });
      }

      // 3. Sort: highest priority first
      output.sort((a, b) => b.priority - a.priority);

      console.log("Prediction Results:", output);

      setPrediction({ ranking: output });
      setStage("decision");
    } catch (error) {
      console.error("Local Prediction Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      {stage === "input" && (
        <AssessmentInput
          scores={scores}
          onScoreChange={handleScoreChange}
          onSubmit={handleSubmitInput}
        />
      )}
      {stage === "visualization" && (
        <RadarVisualization scores={scores} onNext={fetchPrediction} />
      )}
      {stage === "decision" && (
        <StrategyDecision scores={scores} prediction={prediction?.ranking ?? null} />
      )}
    </div>
  );
};

export default Index;
