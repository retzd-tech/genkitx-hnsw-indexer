import { genkitPlugin } from "@genkit-ai/core";
import { defineFlow } from "@genkit-ai/flow";
import * as z from "zod";

import { saveHNSWIndexer } from "./indexer";
import { FlowOptions, PluginOptions } from "./interfaces";
import { throwError } from "./utilities";
import {
  PLUGIN_NAME,
  FLOW_NAME,
  ERROR_NO_API_KEY,
  SCHEMA_INPUT,
  SCHEMA_OUTPUT,
  SCHEMA_RESULT,
} from "./constants";

const flowConfig = {
  name: FLOW_NAME,
  inputSchema: z.object({
    input: z.string().describe(SCHEMA_INPUT),
    output: z.string().describe(SCHEMA_OUTPUT),
  }),
  outputSchema: z.string().describe(SCHEMA_RESULT),
};

const flowAction = async (
  flowOptions: FlowOptions,
  pluginOptions: PluginOptions
) => {
  try {
    await saveHNSWIndexer(flowOptions, pluginOptions);
  } catch (error) {
    return `Vector saving error ${error}`;
  }
  return `Vector store saved at ${flowOptions.output}`;
};

const checkApiKey = (pluginOptions: PluginOptions) => {
  const { apiKey } = pluginOptions;
  const isNoApiKey = !apiKey && !process.env.GOOGLE_API_KEY;
  if (isNoApiKey) return throwError("INVALID_ARGUMENT", ERROR_NO_API_KEY);
};

export const HNSWIndexer = genkitPlugin(
  PLUGIN_NAME,
  async (pluginOptions: PluginOptions) => {
    checkApiKey(pluginOptions);
    defineFlow(flowConfig, (flowOptions) =>
      flowAction(flowOptions, pluginOptions)
    );
  }
);
