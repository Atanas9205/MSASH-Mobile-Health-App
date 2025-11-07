import os
import pandas as pd
from src.features.signal_processing import extract_basic_features

def test_feature_extraction_balance():
    df = pd.read_csv("data/synthetic/balance_signal.csv")
    features = extract_basic_features(df["balance_signal"], fs=100.0)
    
    # Проверяваме базови неща
    assert isinstance(features, dict)
    assert all(k in features for k in ["rms", "variance", "band_power_0p5_3Hz", "sway_index"])
    assert all(isinstance(v, float) for v in features.values())
    assert features["rms"] > 0

def test_feature_extraction_spasticity():
    df = pd.read_csv("data/synthetic/spasticity_signal.csv")
    features = extract_basic_features(df["spasticity_signal"], fs=100.0)
    
    assert features["variance"] > 0
    assert features["rms"] > 0
