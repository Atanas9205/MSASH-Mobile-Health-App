import os
import sys
import json
import yaml
import numpy as np
import pandas as pd

# make 'src/' importable when running as a script
CURRENT_DIR = os.path.dirname(__file__)
PROJECT_ROOT = os.path.abspath(os.path.join(CURRENT_DIR, "..", ".."))
SRC_DIR = os.path.join(PROJECT_ROOT, "src")
if SRC_DIR not in sys.path:
    sys.path.insert(0, SRC_DIR)

from data.simulate_ms_data import generate_all  # noqa: E402


def main(cfg_path: str = os.path.join(PROJECT_ROOT, "config", "config.yaml")) -> None:
    with open(cfg_path, "r") as f:
        cfg = yaml.safe_load(f)

    np.random.seed(int(cfg.get("random_seed", 42)))

    out = generate_all(cfg)
    df_long = out["long"]
    df_wide = out["wide"]

    syn_dir = cfg["paths"]["synthetic_dir"]
    os.makedirs(syn_dir, exist_ok=True)

    long_path = os.path.join(syn_dir, "ms_signals_long.csv")
    wide_path = os.path.join(syn_dir, "ms_signals_wide_example.csv")
    df_long.to_csv(long_path, index=False)
    df_wide.to_csv(wide_path, index=False)

    meta = {
        "n_rows_long": len(df_long),
        "n_rows_wide": len(df_wide),
        "n_samples": int(cfg["n_samples"]),
        "time_end_s": float(cfg["time_end_s"]),
        "seed": int(cfg.get("random_seed", 42)),
    }
    with open(os.path.join(syn_dir, "metadata.json"), "w") as f:
        json.dump(meta, f, indent=2)

    print("Saved:")
    print(f"- {long_path}")
    print(f"- {wide_path}")
    print(f"- {os.path.join(syn_dir, 'metadata.json')}")


if __name__ == "__main__":
    main()
