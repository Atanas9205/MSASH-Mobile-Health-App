import os
import pandas as pd

def _check_csv(path, expected_cols):
    assert os.path.exists(path), f"Missing file: {path}"
    df = pd.read_csv(path)
    assert set(df.columns) == set(expected_cols), f"Unexpected schema in {path}"
    assert len(df) > 0, f"Empty dataframe: {path}"
    assert df.notna().all().all(), f"NaNs in {path}"

def test_leg_weakness():
    _check_csv("data/synthetic/leg_weakness.csv", ["time", "leg_weakness"])

def test_dizziness():
    _check_csv("data/synthetic/dizziness.csv", ["time", "dizziness"])

def test_vision():
    _check_csv("data/synthetic/vision_impairment.csv", ["time", "vision_impairment"])

def test_headache():
    _check_csv("data/synthetic/headache.csv", ["time", "headache"])
