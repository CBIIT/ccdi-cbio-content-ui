import { describe, it, expect } from 'vitest';

describe('Hello World', () => {
  it('should pass a simple test', () => {
    expect('Hello World').toBe('Hello World');
  });

  it('should perform basic arithmetic', () => {
    expect(1 + 1).toBe(2);
  });

  it('should check truthy values', () => {
    expect(true).toBeTruthy();
  });
});
