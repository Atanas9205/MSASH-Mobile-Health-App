import os
import pandas as pd

def test_spasticity_file_exists():
    assert os.path.exists("data/synthetic/spasticity_signal.csv"), "Missing spasticity CSV."

def test_balance_file_exists():
    assert os.path.exists("data/synthetic/balance_signal.csv"), "Missing balance CSV."

def test_spasticity_schema_and_values():
    df = pd.read_csv("data/synthetic/spasticity_signal.csv")
    assert set(df.columns) == {"time", "spasticity_signal"}
    assert len(df) > 0
    assert df["spasticity_signal"].notna().all()

def test_balance_schema_and_values():
    df = pd.read_csv("data/synthetic/balance_signal.csv")
    assert set(df.columns) == {"time", "balance_signal"}
    assert len(df) > 0
    assert df["balance_signal"].notna().all()
