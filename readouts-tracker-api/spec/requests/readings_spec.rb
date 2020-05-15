require 'rails_helper'

RSpec.describe 'Readings API' do
  # Initialize the test data
  let!(:category) { create(:category) }
  let!(:user) { create(:user) }
  let!(:readings) { create_list(:reading, 20, category_id: category.id, user_id: user.id) }
  let(:category_id) { category.id }
  let(:user_id) { user.id }
  let(:id) { readings.first.id }

  # Test suite for GET /api/v1/users/:user_id/categories/:category_id/readings
  describe 'GET /api/v1/users/:user_id/categories/:category_id/readings' do
    before { get "/api/v1/users/#{user_id}/categories/#{category_id}/readings" }

    context 'when category and user exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns all reading items' do
        expect(json.size).to eq(20)
      end
    end

    context 'when category does not exist' do
      let(:category_id) { 0 }

      it 'returns status code 404' do
        print response.body
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Category/)
      end
    end

    context 'when user does not exist' do
      let(:user_id) { 0 }

      it 'returns status code 404' do
        print response.body
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find User/)
      end
    end
  end

  # Test suite for GET /api/v1/users/:user_id/categories/:category_id/readings/:reading_id
  describe 'GET /api/v1/users/:user_id/categories/:category_id/readings/:reading_id' do
    before { get "/api/v1/users/#{user_id}/categories/#{category_id}/readings/#{id}" }

    context 'when reading exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns the reading' do
        expect(json['id']).to eq(id)
      end
    end

    context 'when todo item does not exist' do
      let(:id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Reading/)
      end
    end
  end

  # Test suite for POST /api/v1/users/:user_id/categories/:category_id/readings/
  describe 'POST /api/v1/users/:user_id/categories/:category_id/readings/' do
    let(:valid_attributes) { { description: 'Reading Narnia', duration: "2020-05-15T01:18:11.171Z" } }
    print :valid_attributes

    context 'when request attributes are valid' do
      before { post "/api/v1/users/#{user_id}/categories/#{category_id}/readings/", params: valid_attributes }

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when an invalid request' do
      before { post "/api/v1/users/#{user_id}/categories/#{category_id}/readings/", params: {} }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a failure message' do
        expect(response.body).to match(/Validation failed: Description can't be blank, Duration can't be blank/)
      end
    end
  end

  # Test suite for PUT /api/v1/users/:user_id/categories/:category_id/readings/:reading_id
  describe 'PUT /api/v1/users/:user_id/categories/:category_id/readings/:reading_id' do
    let(:valid_attributes) { { description: 'Reading Mozart Biography' } }

    before { put "/api/v1/users/#{user_id}/categories/#{category_id}/readings/#{id}", params: valid_attributes }

    context 'when item exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'updates the item' do
        updated_reading = Reading.find(id)
        expect(updated_reading.description).to match(/Reading Mozart Biography/)
      end
    end

    context 'when the item does not exist' do
      let(:id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Reading/)
      end
    end
  end

  # Test suite for DELETE /todos/:id
  describe 'DELETE /api/v1/users/:user_id/categories/:category_id/readings/:reading_id' do
    before { delete "/api/v1/users/#{user_id}/categories/#{category_id}/readings/#{id}" }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end