export default {
  type: "object",
  properties: {
    refreshToken: { type: 'string' }
  },
  required: ['name']
} as const;
