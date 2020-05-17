require 'rails_helper'

RSpec.describe 'Measurements API', type: :request do
  let!(:user) { create(:user) }
  let!(:category) { create(:category) }
  let!(:measurements) { create_list(:measurement, 5, category_id: category.id, user_id: user.id) }
  
  let(:category_id){ category.id }
  let(:id){ measurements.first.id }
  let(:headers) { valid_headers } 

  # Test suite for GET /categories

  describe 'GET api/v1/measurements' do
    # make HTTP get request before each example
    before { get "/api/v1/measurements", params: {}, headers: headers }

    context 'when user exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns all measurements items' do
        expect(json['data']['measurements'].size).to eq(5)
      end
    end

  end

  describe 'POST api/v1/categories/:category_id/measurements' do
    let(:valid_attributes) { { day: Faker::Date.forward(days: 2), total_time: "02:35" }.to_json }
    
    context 'when request attributes are valid' do
      before { 
        post "/api/v1/categories/#{category_id}/measurements/", 
        params: valid_attributes,
        headers: headers 
      }

      it 'returns status code 201' do
        print response
        expect(response).to have_http_status(201)
      end
    end
  end

  
end