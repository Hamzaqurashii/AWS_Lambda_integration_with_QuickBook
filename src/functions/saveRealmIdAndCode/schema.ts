export default {
  type: "object",
  properties: {
    realmId: { type: "string" },
    code: { type: "string" },
    state: { type: "string" },
  },
  required: ["name"],
} as const;
