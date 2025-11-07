import os
import pandas as pd
import subprocess

def test_pipeline_writes_outputs(tmp_path):
    # run pipeline with default config (outputs go to data/synthetic/)
    result = subprocess.run(["python", "src/pipelines/synthetic_pipeline.py"], capture_output=True, text=True)
    assert result.returncode == 0, f"Pipeline failed: {result.stderr}"

    for fname in ["ms_signals_long.csv", "ms_signals_wide_example.csv"]:
        path = os.path.join("data", "synthetic", fname)
        assert os.path.exists(path), f"Missing output: {path}"
        df = pd.read_csv(path)
        assert len(df) > 0
