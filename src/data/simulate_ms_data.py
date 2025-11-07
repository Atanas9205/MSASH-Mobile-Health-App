import numpy as np
import pandas as pd
from typing import Dict, Any

def time_axis(n_samples: int, time_end_s: float) -> np.ndarray:
    return np.linspace(0.0, float(time_end_s), int(n_samples))

def generate_spasticity_signal(t, intensity=1.0, noise=0.12, freq=2.0):
    baseline = np.sin(2 * np.pi * freq * t) * intensity
    return baseline + np.random.normal(0, noise, size=len(t))

def generate_balance_signal(t, instability=0.4, noise=0.05):
    baseline = np.sin(2 * np.pi * 0.5 * t)
    sway = baseline + instability * np.random.randn(len(t))
    return sway + np.random.normal(0, noise, size=len(t))

def generate_leg_weakness(t, base_amp=1.0, weakness_factor=0.5):
    left = np.sin(2 * np.pi * 1.5 * t) * base_amp
    right = np.sin(2 * np.pi * 1.5 * t + 0.3) * (base_amp * weakness_factor)
    return 0.5 * (left + right)

def generate_dizziness(t, noise=0.08):
    drift = 0.15 * np.sin(2 * np.pi * 0.1 * t)
    oscill = 0.2 * np.sin(2 * np.pi * 3.0 * t)
    return drift + oscill + np.random.normal(0, noise, size=len(t))

def generate_vision_series(t, baseline=1.0, degradation=0.25, noise=0.03):
    trend = baseline - degradation * (t / t.max())
    return trend + np.random.normal(0, noise, size=len(t))

def generate_headache_series(t, spikes=4, spike_amp=0.9, base=0.1):
    series = np.full_like(t, base)
    positions = np.linspace(150, len(t) - 150, spikes, dtype=int)
    for p in positions:
        L = 60
        series[p:p+L] += np.hanning(L) * spike_amp
    series += np.random.normal(0, 0.03, size=len(t))
    return series

def build_long_table(t, series_dict: Dict[str, np.ndarray], subject_id: int = 0) -> pd.DataFrame:
    records = []
    for label, arr in series_dict.items():
        records.append(pd.DataFrame({"subject_id": subject_id, "time_s": t, "signal": arr, "label": label}))
    return pd.concat(records, ignore_index=True)

def build_wide_table(t, series_dict: Dict[str, np.ndarray]) -> pd.DataFrame:
    df = pd.DataFrame({"time_s": t})
    for label, arr in series_dict.items():
        df[label] = arr
    return df

def generate_all(config: Dict[str, Any]) -> Dict[str, pd.DataFrame]:
    n = int(config["n_samples"])
    t = time_axis(n, config["time_end_s"])

    sp = config["signals"]["spasticity"]
    ba = config["signals"]["balance"]
    lw = config["signals"]["leg_weakness"]
    dz = config["signals"]["dizziness"]
    vi = config["signals"]["vision"]
    hd = config["signals"]["headache"]

    series = {
        "spasticity": generate_spasticity_signal(t, sp["intensity"], sp["noise"], sp["freq"]),
        "posture_instability": generate_balance_signal(t, ba["instability"], ba["noise"]),
        "leg_weakness": generate_leg_weakness(t, lw["base_amp"], lw["weakness_factor"]),
        "dizziness": generate_dizziness(t, dz["noise"]),
        "vision_impairment": generate_vision_series(t, vi["baseline"], vi["degradation"], vi["noise"]),
        "headache": generate_headache_series(t, hd["spikes"], hd["spike_amp"]),
    }

    df_long = build_long_table(t, series, subject_id=0)
    df_wide = build_wide_table(t, series)
    return {"long": df_long, "wide": df_wide}
