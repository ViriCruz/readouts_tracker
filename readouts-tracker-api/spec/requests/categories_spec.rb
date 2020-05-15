require 'rails_helper'

RSpec.describe 'Categories API', type: :request do
  let!(:categories){ create_list(:category, 5) }
  let(:category_id){ categories.first.id }

  # Test suite for GET /categories

  describe 'GET api/v1/categories' do
    # make HTTP get request before each example
    before { get '/api/v1/categories' }

    it 'returns categories' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json['categories']).not_to be_empty
      expect(json['categories'].size).to eq(5)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end

    it 'contains :name key in category object' do
      expect(json['categories'].first).to have_key('name')
    end

    it 'does not contains :id key in category object' do
      expect(json['categories'].first).not_to have_key('id')
    end
  end

  # Test suite for GET /api/v1/categories/:id

  describe 'GET /api/v1/categories/:id' do
    before { get "/api/v1/categories/#{category_id}" }

    context 'when the record exists' do
      it 'returns the category' do
        expect(json['category']).not_to be_empty
        expect(json['category']['id']).to eq(category_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    
    context 'when the record does not exists' do
      let(:category_id) { 100 }
      
      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Category/)
      end
    end
  end  
end