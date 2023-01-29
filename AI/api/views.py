#Import necessary libraries
import pickle
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render
import numpy as np
import pandas as pd
import pickle
from tensorflow import keras


# Create your views here.
@api_view(['GET'])
def index_page(request):
    return_data = {
        "error" : "0",
        "message" : "Successful",
    }
    return Response(return_data)


# predicting the sales forecast
@api_view(['POST'])
def forecast(request):
    modelh5 = keras.models.load_model('ml_model/model.h5')
    # loading the forecast.model file 
    # modelModel = pickle.load(open('ml_model/forecast.model', 'rb'))

    # id = request.data.get('id')
    # id = int(id)

    date = request.data.get('date')

    try:
        # df_model
        df_model = pd.read_csv('ml_model/df_model.csv')

        df_model = df_model.sort_values("date").reset_index(drop=True)

        # getting the id of the item
        # id = int(id)
        train = df_model.loc[(df_model["date"] == date), :]
        # train = df_model.loc[(df_model["id"] == id), :]


        cols = [col for col in train.columns if col not in [
            'date', 'id', "sales", "year"]]        
            
        # print(cols)

        predict_array = train[cols]

        prediction = modelh5.predict(predict_array)
        # prediction = modelModel.predict(predict_array)
        lengthOfData = len(prediction)

        result_prediction = {
            'error' : '0',
            'message' : 'Successfull',
            'lengthOfData' : lengthOfData,
            'prediction' : prediction,
        }

    except Exception as e:
        result_prediction = {
            'error' : '2',
            "message": str(e)
        }

    return Response(result_prediction)