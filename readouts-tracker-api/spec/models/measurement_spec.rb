require 'rails_helper'
# Test suite for the measurement model
RSpec.describe Measurement, type: :model do
  # Association test
  # ensure Measurement model belongs to Category model
  it { should belong_to(:category) }
  it { should belong_to(:user) }
  # Validation tests
  # ensure columns day and total_time are present before saving
  it { should validate_presence_of(:day) }
  it { should validate_presence_of(:total_time) }
end
