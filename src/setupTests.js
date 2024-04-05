// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Mock window object
Object.defineProperty(window, "scrollTo", { value: jest.fn() });
Object.defineProperty(window, "history", { value: { length: 1 } });
