require 'rails_helper'
# Test suite for the Reading model
RSpec.describe Reading, type: :model do
  # Association test
  # ensure Reading model belongs to Category model and User model
  it { should belong_to(:category) }
  
  it { should belong_to(:user) }
  # Validation tests
  # ensure columns description, duration and created_at are present before saving
  it { should validate_presence_of(:description) }
  it { should validate_presence_of(:hours) }
  it { should validate_presence_of(:minutes) }
  it { should validate_presence_of(:day) }
end