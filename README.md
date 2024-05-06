# Genkit Plugin RAG - HNSW Indexer

## Description
This plugin is part of requirements for you to implement Augmented Generation (RAG) in Generative AI for your application with Firebase Genkit, this is a Genkit plugin flow to save data into vector store with HNSW and Gemini Embedder and Gemini LLM.

## Installation
Before installing the plugin, ensure you have the following prerequisites installed:
- [Node.js](https://nodejs.org/) (version 12 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js installation)
- [TypeScript](https://www.typescriptlang.org/) (you can install it globally via npm: `npm install -g typescript`)

Once you have the prerequisites installed, you can install the plugin using npm:

```bash
npm install genkitx-flow-rag-hnsw-indexer
```

## Usage
Import the plugin into your Genkit project
```bash
import { HNSWIndexer } from "genkitx-flow-rag-hnsw-indexer";

export default configureGenkit({
  plugins: [
    HNSWIndexer({ apiKey: "GOOGLE_API_KEY" })
  ]
});


```