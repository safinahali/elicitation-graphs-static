import pandas as pd

df = pd.read_csv('cf_norm_sim.csv')

fp_confusion = df.loc[df["threshold"] == 0.2, "fp"]
tp_confusion = df.loc[df["threshold"] == 0.2, "tp"]
fn_confusion = df.loc[df["threshold"] == 0.2, "fn"]

print(fp_confusion.iat[0])