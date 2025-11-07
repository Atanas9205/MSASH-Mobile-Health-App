import numpy as np
from src.features.signal_processing import band_power

def test_band_power_is_finite():
    fs = 100.0
    t = np.linspace(0, 10, int(fs*10))
    x = np.sin(2*np.pi*5*t) + 0.1*np.random.randn(len(t))
    bp = band_power(x, fs=fs, fmin=4.0, fmax=6.0)
    assert np.isfinite(bp), "Band power should be finite."
    assert bp >= 0.0, "Band power should be non-negative."
