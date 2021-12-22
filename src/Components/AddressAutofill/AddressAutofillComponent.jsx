import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {DebounceInput} from 'react-debounce-input';


const APIKey = 'AIzaSyBjNoEjpdK8ugMe3L8jBWMFI5gypk3mbx0';


const AddressAutofillComponent = props => {

  const [searchText, setSearchText] = useState('');
  const [predictions, setPredictions] = useState([]);

  const getResults = async () => {
    setPredictions([]);
    try {
      const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchText}&key=${APIKey}`;
      const response = await fetch(url, {
        headers: {
          contentType: 'application/json',
          accept: 'application/json',
        }
      });
      console.log(response);
      const data = await response.json();
      console.log(data.predictions);
      setPredictions(data.predictions);
    } catch(e) {
      console.log(e);
    }
    
  }

  const getPlaceDetails = async (placeId) => {
    try {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${APIKey}`;
      const response = await fetch(url, {
        mode: 'no-cors'
      });
      const data = await response.json();
      console.log(data);
    } catch(e) {
      console.log(e);
    }
    
  }

  useEffect(() => {
    if (!searchText) {
      return;
    }
    console.log(searchText)
    getResults();

  }, [searchText])


  return (
    <div className="address-autofill">
      <div className="row">
        <div className="col-md-12">
          <DebounceInput
            value={searchText}
            debounceTimeout={1000}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search for an address"
          />
          {
            predictions.map(prediction => {
              return (
                <div key={prediction.id} className="prediction" onClick={() => getPlaceDetails(prediction.place_id)}>
                  {prediction.description}
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <label htmlFor="">Address</label>
          <input type="text" className="form-control" />
        </div>
        <div className="col-md-4">
          <label htmlFor="">City</label>
          <input type="text" className="form-control" />
        </div>
        <div className="col-md-4">
          <label htmlFor="">State</label>
          <input type="text" className="form-control" />
        </div>
        <div className="col-md-4">
          <label htmlFor="">Zip</label>
          <input type="text" className="form-control" />
        </div>
      </div>
    </div>
    
  )
}

export default AddressAutofillComponent
