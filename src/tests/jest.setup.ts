// src/tests/jest.setup.ts
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'node:util';

const g = globalThis as any;

if (!g.TextEncoder) {
  g.TextEncoder = TextEncoder;
}

if (!g.TextDecoder) {
  g.TextDecoder = TextDecoder;
}
