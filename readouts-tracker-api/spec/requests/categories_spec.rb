require 'rails_helper'

RSpec.describe 'Categories API', type: :request do
  let(:user) { create(:user) }
  let!(:categories) { create_list(:category, 5) }
  let(:category_id) { categories.first.id }
  let(:headers) { valid_headers }

  # Test suite for GET /categories

  describe 'GET api/v1/categories' do
    # make HTTP get request before each example
    before { get '/api/v1/categories', params: {}, headers: headers }

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
  end
end
