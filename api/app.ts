import express, { Request, Response } from "express";
import * as ort from "onnxruntime-node";
import path from "path";

import cors from "cors";

/*
  OUTPUT CONTOH:
{
  "ranking": [
    {
      "subject": "wellbeing",
      "score": 85,
      "priority": 0.92
    },
    {
      "subject": "literasi",
      "score": 78,
      "priority": 0.74
    },
    {
      "subject": "numerasi",
      "score": 60,
      "priority": 0.41
    }
  ]
}

*/

// mapping kode → nama
const mapping: Record<string, string> = {
  TAS: "literasi",
  TOC: "numerasi",
  TOR: "karakter_sosial",
  TSC: "karakter_moral",
  WEL: "wellbeing"
};

// subject → ID (harus sama saat training!)
const subjectId: Record<string, number> = {
  literasi: 0,
  numerasi: 1,
  karakter_sosial: 2,
  karakter_moral: 3,
  wellbeing: 4
};

interface SubjectInput {
  code: string;
  score: number;
}

interface PredictRequest {
  subjects: SubjectInput[];
}
const modelPath = path.resolve(__dirname, "recommender.onnx");
const app = express();
app.use(express.json());
app.use(cors()); // allow all origins


let session: ort.InferenceSession | null = null;

// Load ONNX model
(async () => {
  try {
    session = await ort.InferenceSession.create(modelPath);
  } catch (error) {
    console.error("Failed to load ONNX:", error);
  }
})();

app.post("/predict", async (req: Request, res: Response) => {
  try {
    const { subjects } = req.body as PredictRequest;
    if (!session) {
      return res.status(500).json({ error: "Model not loaded yet" });
    }

    let output: Array<{ subject: string; score: number; priority: number }> = [];

    for (let item of subjects) {
      const name = mapping[item.code];  
      const sid = subjectId[name];

      const tensor = new ort.Tensor("float32", new Float32Array([sid, item.score]), [1, 2]);

      const results = await session.run({ input: tensor });

      const priority = results.output.data[0] as number;

      output.push({
        subject: name,
        score: item.score,
        priority: priority
      });
    }

    // Sort: highest priority first
    output.sort((a, b) => b.priority - a.priority);
    console.log("Model:", output);

    return res.json({ ranking: output });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: String(err) });
  }
});

app.listen(3001, () => {
  console.log("API running on port 3001");
});
