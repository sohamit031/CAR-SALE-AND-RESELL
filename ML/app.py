import streamlit as st
import joblib
import numpy as np
import pandas as pd

# Load trained model and transformer
model = joblib.load("car_price_model.pkl")
transformer = joblib.load("transformer.pkl")

# Load dataset to extract brand-model mapping
df = pd.read_csv("data\cleaned_cardekho_dataset.csv")
brand_models = df.groupby("brand")["model"].unique().to_dict()

# Extract expected columns from transformer
expected_columns = transformer.feature_names_in_

# Streamlit UI
st.title("Car Price Prediction App 🚗💰")

st.sidebar.header("Enter Car Details")

# Select brand
brand = st.sidebar.selectbox("Brand", list(brand_models.keys()))

# Select model based on brand
model_name = st.sidebar.selectbox("Model", brand_models[brand])

# Other categorical inputs
seller_type = st.sidebar.selectbox("Seller Type", df["seller_type"].unique())
fuel_type = st.sidebar.selectbox("Fuel Type", df["fuel_type"].unique())
transmission_type = st.sidebar.selectbox("Transmission Type", df["transmission_type"].unique())
seats = st.sidebar.slider("Seats", int(df["seats"].min()), int(df["seats"].max()), 5)

# Numerical inputs
year = st.sidebar.slider("Manufacturing Year", 2000, 2024, 2015)
km_driven = st.sidebar.number_input("Kilometers Driven", min_value=0, max_value=500000, value=30000)
engine = st.sidebar.number_input("Engine Capacity (CC)", min_value=500, max_value=5000, value=1500)
power = st.sidebar.number_input("Power (HP)", min_value=20, max_value=500, value=100)
mileage = st.sidebar.number_input("Mileage (km/l)", min_value=5.0, max_value=40.0, value=15.0)

# Compute missing features
vehicle_age = 2024 - year  # Calculate vehicle age
max_power = power  # Assuming max_power is the same as power

# Create input DataFrame with all expected columns
input_data = pd.DataFrame([[brand, model_name, seller_type, fuel_type, transmission_type, seats,
                            year, km_driven, engine, power, mileage, vehicle_age, max_power]],
                          columns=['brand', 'model', 'seller_type', 'fuel_type', 'transmission_type', 'seats',
                                   'year', 'km_driven', 'engine', 'power', 'mileage', 'vehicle_age', 'max_power'])

# Add missing column "car_name" if required by the transformer
if "car_name" in expected_columns:
    input_data["car_name"] = "Unknown"  # Placeholder value

# Reorder columns to match transformer expectations
input_data = input_data[[col for col in expected_columns if col in input_data.columns]]

# Apply transformations
input_transformed = transformer.transform(input_data)

# Predict price
if st.sidebar.button("Predict Price"):
    prediction = model.predict(input_transformed)[0]
    st.success(f"Estimated Selling Price: ₹{prediction:,.2f}")
