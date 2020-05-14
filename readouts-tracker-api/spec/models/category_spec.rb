require 'rails_helper'
# Test suite for the Category model
RSpec.describe Category, type: :model do
  # Association test
  # ensure Category model has a 1:m relationship with the Reading and Measurements model
  it { should have_many(:readings).dependent(:destroy) }
  it { should have_many(:measurements).dependent(:destroy) }
  # Validation tests
  # ensure column name is present before saving
  it { should validate_presence_of(:name) }
end