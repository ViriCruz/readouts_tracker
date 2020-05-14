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
      expect(json).not_to be_empty
      expect(json.size).to eq(5)
      expect(json).to have_key('name')
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end
  
end