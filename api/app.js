"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ort = __importStar(require("onnxruntime-node"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
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
const mapping = {
    TAS: "literasi",
    TOC: "numerasi",
    TOR: "karakter_sosial",
    TSC: "karakter_moral",
    WEL: "wellbeing"
};
// subject → ID (harus sama saat training!)
const subjectId = {
    literasi: 0,
    numerasi: 1,
    karakter_sosial: 2,
    karakter_moral: 3,
    wellbeing: 4
};
const modelPath = path_1.default.resolve(__dirname, "recommender.onnx");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)()); // allow all origins
let session = null;
// Load ONNX model
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        session = yield ort.InferenceSession.create(modelPath);
    }
    catch (error) {
        console.error("Failed to load ONNX:", error);
    }
}))();
app.post("/predict", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { subjects } = req.body;
        if (!session) {
            return res.status(500).json({ error: "Model not loaded yet" });
        }
        let output = [];
        for (let item of subjects) {
            const name = mapping[item.code];
            const sid = subjectId[name];
            const tensor = new ort.Tensor("float32", new Float32Array([sid, item.score]), [1, 2]);
            const results = yield session.run({ input: tensor });
            const priority = results.output.data[0];
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
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: String(err) });
    }
}));
app.listen(3001, () => {
    console.log("API running on port 3001");
});
