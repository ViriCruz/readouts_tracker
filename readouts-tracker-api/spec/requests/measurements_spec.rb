require 'rails_helper'

RSpec.describe 'Measurements API', type: :request do
  let!(:user) { create(:user) }
  let!(:category) { create(:category) }
  let!(:measurements) { create_list(:measurement, 5, category_id: category.id, user_id: user.id) }

  let(:category_id) { category.id }
  let(:id) { measurements.first.id }
  let(:headers) { valid_headers }

  describe 'POST api/v1/categories/:category_id/measurements' do
    let(:valid_attributes) { { day: Faker::Date.forward(days: 2), total_time: '02:35' }.to_json }

    context 'when request attributes are valid' do
      before do
        post "/api/v1/categories/#{category_id}/measurements/",
             params: valid_attributes,
             headers: headers
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end
  end
end
