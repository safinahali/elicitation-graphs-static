import plotly.graph_objects as go
import pandas as pd

df = pd.read_csv('cf_norm_sim.csv')

a = 0.3
b = 0.5

threshold_val = a
threshold_val_second = (3*a+b)/4

# confusion matrix corresponding to a
fp_confusion = df.loc[df["threshold"] == threshold_val, "fp"]
tp_confusion = df.loc[df["threshold"] == threshold_val, "tp"]
fn_confusion = df.loc[df["threshold"] == threshold_val, "fn"]
tn_confusion = df.loc[df["threshold"] == threshold_val, "tn"]

fp_confusion_second = df.loc[df["threshold"] == threshold_val_second, "fp"]
tp_confusion_second = df.loc[df["threshold"] == threshold_val_second, "tp"]
fn_confusion_second = df.loc[df["threshold"] == threshold_val_second, "fn"]
tn_confusion_second = df.loc[df["threshold"] == threshold_val_second, "tn"]


x = ["tp", "fp", "tn", "fn"]

fig = go.Figure()

fig.add_trace(go.Bar(x=x, y=[tp_confusion.iat[0], fp_confusion.iat[0], tn_confusion.iat[0], fn_confusion.iat[0]], name='True Positive'))


# fig.add_trace(go.Bar(x=x, y=[tp_confusion_second.iat[0]], marker_color='crimson', name='True Positive'))
# fig.add_trace(go.Bar(x=x, y=[fp_confusion_second.iat[0]], marker_color='lightgrey', name='False Positive'))
# fig.add_trace(go.Bar(x=x, y=[tn_confusion_second.iat[0]], marker_color='deepskyblue', name='True Negative'))
# fig.add_trace(go.Bar(x=x, y=[fn_confusion_second.iat[0]], marker_color='limegreen', name='False Negative'))


fig.update_layout(barmode='relative', title_text='Confusion Matrix Graph')
# fig.show()
fig.write_html("stackedbars.html")


# barclass = go.Figure(data=[
# 	go.Bar(x=x, y=[fp_confusion.iat[0], fp_confusion_second[0]], marker_color='crimson', name='False Positive'),
# 	go.Bar(x=x, y=[tp_confusion.iat[0], tp_confusion_second[0]], marker_color='deepskyblue', name='True Positive'),
# 	go.Bar(x=x, y=[(fn_confusion.iat[0]*-1), (fn_confusion_second[0]*-1)], marker_color='crimson', name='False Negative')
# 	])

# barclass.show()
# barclass.update_layout(barmode='group')
# barclass.write_html("barclass.html")

