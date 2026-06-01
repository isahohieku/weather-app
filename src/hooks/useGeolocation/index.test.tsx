import { renderHook, act } from '@testing-library/react';
import { useGeolocation } from './index';

describe('useGeolocation', () => {
  const mockGeolocation = {
    getCurrentPosition: vi.fn(),
  };

  beforeAll(() => {
    Object.defineProperty(global.navigator, 'geolocation', {
      value: mockGeolocation,
      configurable: true,
      writable: true,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('handles permission denied error', () => {
    mockGeolocation.getCurrentPosition.mockImplementationOnce(
      (
        _: unknown,
        error: (err: {
          code: number;
          PERMISSION_DENIED: number;
          POSITION_UNAVAILABLE: number;
          TIMEOUT: number;
        }) => void,
      ) => {
        error({ code: 1, PERMISSION_DENIED: 1, POSITION_UNAVAILABLE: 2, TIMEOUT: 3 });
      },
    );

    const { result } = renderHook(() => useGeolocation());

    act(() => {
      result.current.getLocation();
    });

    expect(result.current.error).toBe(
      'Location permission denied. Please allow location access or search for your city.',
    );
    expect(result.current.isLocating).toBe(false);
  });

  it('handles position unavailable error', () => {
    mockGeolocation.getCurrentPosition.mockImplementationOnce(
      (
        _,
        error: (err: {
          code: number;
          PERMISSION_DENIED: number;
          POSITION_UNAVAILABLE: number;
          TIMEOUT: number;
        }) => void,
      ) => {
        error({ code: 2, PERMISSION_DENIED: 1, POSITION_UNAVAILABLE: 2, TIMEOUT: 3 });
      },
    );

    const { result } = renderHook(() => useGeolocation());

    act(() => {
      result.current.getLocation();
    });

    expect(result.current.error).toBe(
      'Location information is unavailable. Please allow location access or search for your city.',
    );
  });

  it('handles timeout error', () => {
    mockGeolocation.getCurrentPosition.mockImplementationOnce(
      (
        _,
        error: (err: {
          code: number;
          PERMISSION_DENIED: number;
          POSITION_UNAVAILABLE: number;
          TIMEOUT: number;
        }) => void,
      ) => {
        error({ code: 3, PERMISSION_DENIED: 1, POSITION_UNAVAILABLE: 2, TIMEOUT: 3 });
      },
    );

    const { result } = renderHook(() => useGeolocation());

    act(() => {
      result.current.getLocation();
    });

    expect(result.current.error).toBe(
      'Location request timed out. Please allow location access or search for your city.',
    );
  });

  it('handles unknown error', () => {
    mockGeolocation.getCurrentPosition.mockImplementationOnce(
      (
        _,
        error: (err: {
          code: number;
          PERMISSION_DENIED: number;
          POSITION_UNAVAILABLE: number;
          TIMEOUT: number;
        }) => void,
      ) => {
        error({ code: 999, PERMISSION_DENIED: 1, POSITION_UNAVAILABLE: 2, TIMEOUT: 3 });
      },
    );

    const { result } = renderHook(() => useGeolocation());

    act(() => {
      result.current.getLocation();
    });

    expect(result.current.error).toBe('Unable to retrieve your location');
  });

  it('handles no geolocation support', () => {
    const originalGeolocation = global.navigator.geolocation;
    Object.defineProperty(global.navigator, 'geolocation', {
      value: undefined,
      configurable: true,
      writable: true,
    });

    const { result } = renderHook(() => useGeolocation());

    act(() => {
      result.current.getLocation();
    });

    expect(result.current.error).toBe('Geolocation is not supported by your browser');

    Object.defineProperty(global.navigator, 'geolocation', {
      value: originalGeolocation,
      configurable: true,
      writable: true,
    });
  });
});
