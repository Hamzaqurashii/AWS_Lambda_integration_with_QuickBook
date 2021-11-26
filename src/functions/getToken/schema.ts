export default {
  type: "object",
  properties: {
    realmId: { type: "string" }
  },
  required: ["realmId"],
} as const;
