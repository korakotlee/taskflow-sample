require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    subject { create(:user) }
    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:name) }
    it { should validate_uniqueness_of(:email).case_insensitive }
    it { should allow_value('user@example.com').for(:email) }
    it { should_not allow_value('invalid').for(:email) }
  end

  describe 'associations' do
    it { should have_many(:projects).dependent(:destroy) }
    it { should have_many(:created_tasks).class_name('Task').with_foreign_key('creator_id') }
  end

  describe '#downcase_email' do
    it 'converts email to lowercase before saving' do
      user = User.create(email: 'User@EXAMPLE.com', name: 'Test', password: 'password123')
      expect(user.email).to eq('user@example.com')
    end
  end

  describe 'password encryption' do
    it 'stores hashed password' do
      user = User.create(email: 'test@example.com', name: 'Test', password: 'secret123')
      expect(user.password_digest).to be_present
      expect(user.password_digest).not_to eq('secret123')
    end
  end
end
